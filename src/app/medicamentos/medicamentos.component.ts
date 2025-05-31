import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Medicamentos } from '../interfaces/medicamentos';
import { MedicamentosService } from '../services/medicamentos.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.scss'],
})
export class MedicamentosComponent implements OnInit {
  MedicamentosDataArray: any = [];
  formulario!: FormGroup;

  cum!: string[];
  atc!: string[];

  dataSource = new MatTableDataSource<Medicamentos>();

  columnsToDisplay = ['cum', 'atc', 'descripcion'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private medicamentosService: MedicamentosService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.updateDataSource();

    this.formulario = this.fb.group({
      busqueda: [''],
      cum: [''],
      atc: [''],
    });
  }

  updateDataSource() {
    this.medicamentosService.getMedicamentos().subscribe({
      next: (data) => {
        this.cum = Array.from(new Set(data.map((contact) => contact.cum)));
        this.atc = Array.from(new Set(data.map((contact) => contact.atc)));

        // Filtrar los cums únicos seleccionados
        this.MedicamentosDataArray = data.filter((contact) =>
          this.cum.includes(contact.cum)
        );

        this.MedicamentosDataArray = data.filter((contact) =>
          this.atc.includes(contact.atc)
        );

        this.MedicamentosDataArray = data;
        this.dataSource = new MatTableDataSource<Medicamentos>(
          this.MedicamentosDataArray
        );
        console.log(this.dataSource);
        this.dataSource = new MatTableDataSource<Medicamentos>(
          this.MedicamentosDataArray
        );
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = function (
          data,
          filter: string
        ): boolean {
          return (
            data.cum.toLowerCase().includes(filter) ||
            data.atc.toLowerCase().includes(filter)
          );
        };
        console.log('Data loaded successfully');
      },
    });
  }

  applyFilter() {
    const busqueda = this.formulario.get('busqueda')?.value;
    const cum = this.formulario.get('cum')?.value;
    const atc = this.formulario.get('atc')?.value;

    // Crear una función personalizada para el filtro
    this.dataSource.filterPredicate = (data: Medicamentos, filter: string) => {
      const filters = JSON.parse(filter);

      const matchesCums = filters.departamento
        ? data.cum.toLowerCase().includes(filters. departamento.toLowerCase())
        : true;

      const matchesAtc = filters.razon
        ? data.atc.toLowerCase().includes(filters.razon.toLowerCase())
        : true;

      const matchesBusqueda = filters.busqueda
        ? JSON.stringify(data)
            .toLowerCase()
            .includes(filters.busqueda.toLowerCase())
        : true;

      // Evaluar si los datos cumplen todos los filtros aplicados
      return matchesCums && matchesAtc && matchesBusqueda;
    };

    // Crear el objeto de filtro combinado
    const combinedFilter = {
      busqueda: busqueda || '',
      cum: cum || '',
      atc: atc || '',
    };

    // Aplicar el filtro
    this.dataSource.filter = JSON.stringify(combinedFilter);

    // filtro automatico
  }
  clearFilters() {
    // Restablecer los valores del formulario
    this.formulario.reset();

    // Restablecer el filtro de la tabla
    this.dataSource.filter = '';

    // Opcional: puedes volver a cargar los datos o resetear cualquier otra lógica
    console.log('Filtros limpiados');
  }
}
