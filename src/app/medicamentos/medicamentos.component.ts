import { Medicamentos } from './../interfaces/medicamentos';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MedicamentosService } from '../services/medicamentos.service';
import { map, Observable, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms'; // si usas FormControl
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { JsonPipe } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.scss'],
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    CommonModule
  ],
})
export class MedicamentosComponent implements OnInit {
  cums!: string[]; // Arreglo para almacenar las razones sociales obtenidas
  atcs!: string[]; // Arreglo para almacenar las razones sociales obtenidas
  MedicamentosDataArray: any = [];
  formulario!: FormGroup;
  cumCtrl = new FormControl();
  atcCtrl = new FormControl();
  filteredCums!: Observable<string[]>;
  filteredAtcs!: Observable<string[]>;
  cum!: string[];
  atc!: string[];

  dataSource = new MatTableDataSource<Medicamentos>();

  columnsToDisplay = ['cum', 'atc', 'descripcion', 'tarifa'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('inputSearch') inputSearch!: ElementRef;

  constructor(
    private medicamentosService: MedicamentosService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.updateDataSource();
    this.filtroCums();
    this.filtroAtcs();
    this.formulario = this.fb.group({
      busqueda: [''],
      cum: [''],
      atc: [''],
    });
  }

  ngAfterViewInit(): void {
    // Activa el foco al cargar el componente
    this.inputSearch.nativeElement.focus();
  }

  updateDataSource() {
    this.medicamentosService.getMedicamentos().subscribe({
      next: (data: Medicamentos[]) => {
        this.cum = Array.from(new Set(data.map((contact) => contact.cum)));
        this.atc = Array.from(new Set(data.map((contact) => contact.atc)));

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

  filtroCums() {
    this.medicamentosService.getMedCumFilter().subscribe({
      next: (cum) => {
        this.cums = cum;
        // Configurar el filtro reactivo
        this.filteredCums = this.cumCtrl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filterCums(value || ''))
        );
      },
      error: (err) => {
        console.error('Error al obtener razones únicas:', err);
      },
    });
  }
  private _filterCums(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cums.filter((cum) => cum.toLowerCase().includes(filterValue));
  }

  filtroAtcs() {
    this.medicamentosService.getMedAtcFilter().subscribe({
      next: (atc) => {
        this.atcs = atc;
        // Configurar el filtro reactivo
        this.filteredAtcs = this.atcCtrl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filterAtcs(value || ''))
        );
      },
      error: (err) => {
        console.error('Error al obtener razones únicas:', err);
      },
    });
  }
  private _filterAtcs(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.atcs.filter((atc) => atc.toLowerCase().includes(filterValue));
  }

  applyFilter() {
    const busqueda = this.formulario.get('busqueda')?.value;
    const cum = this.cumCtrl.value;
    const atc = this.atcCtrl.value;

    // Crear una función personalizada para el filtro
    this.dataSource.filterPredicate = (data: Medicamentos, filter: string) => {
      const filters = JSON.parse(filter);

      const matchesCums = filters.cum
        ? data.cum.toLowerCase().includes(filters.cum.toLowerCase())
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
    this.cumCtrl.reset();
    this.atcCtrl.reset();
  }
}
