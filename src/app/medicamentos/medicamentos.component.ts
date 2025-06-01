import { Medicamentos } from './../interfaces/medicamentos';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MedicamentosService } from '../services/medicamentos.service';

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
      next: (data: Medicamentos[]) => {
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
        //console.log('Data loaded successfully');
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

      const matchesCums = filters.cum
        ? data.cum.toLowerCase().includes(filters. cum.toLowerCase())
        : true;

      const matchesAtc = filters.atc
        ? data.atc.toLowerCase().includes(filters.atc.toLowerCase())
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
    this.formulario.reset();
    this.dataSource.filter = '';
  }
}
