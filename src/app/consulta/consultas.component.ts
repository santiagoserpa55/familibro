import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ContratosService } from '../services/contrato.service';
import { Contrato } from '../interfaces/tecnologias';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { MatSort, MatSortModule } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { map, Observable, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { JsonPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  selector: 'app-contacts',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss'],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatOptionModule,
    FormsModule,
    MatSlideToggleModule,
    JsonPipe,
    ReactiveFormsModule,
    CommonModule,
    MatProgressSpinnerModule
  ]
})

export class ConsultasComponent implements OnInit {

  columnsToDisplay = [
    'nit',
    'razonSocial',
    'numContrato',
    'estado',
    'departamento',
    'tipoContrato',
    'codTarifa',
    'codPropio',
    'descTarifa',
    'valor',
  ];

  total = 0;
  page = 0;
  size = 10;
  dataSource = new MatTableDataSource<Contrato>();

  /*paginator*/
  showFirstLastButtons = true;
  
  //filtros iniciales
  filtros = {
    razon_social: '',
    estado: '',
    tipo: '',
    departamento: '',
    busquedaGeneral: ''
  };

  razoness!: string[]; // Arreglo para almacenar las razones sociales obtenidas
  razonCtrl = new FormControl(); // Control del formulario para el filtro
  filteredRazones!: Observable<string[]>; // Observable para razones filtradas
  
  //contactsDataArray: any = []; // eliminar hasta el momento
  formulario!: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // Obtén la referencia al elemento
  @ViewChild('inputSearch') inputSearch!: ElementRef;

  estados: string[] = ['ACTIVO', 'SUSPENDIDO', 'TERMINADO'];
  contratos: string[] = ['Evento-PBS', 'Evento-NoPBS'];
  
  departamentos!: string[];
  filteredDeps!: Observable<String[]>;//deps filter
  razones!: string[];
  totalItems: any;

  constructor(
    private ContratosService: ContratosService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      busqueda: [''],
      estado: [''],
      departamento: [''],
      contrato: [''],
      razon: [''],
    });
    this.filtroRazones();
    //this.updateDataSource();
    this.filterDeps();
    this.buscarContratos(); // carga inicial
  }
  /****/
  ngAfterViewInit(): void {
    // Activa el foco al cargar el componente
    this.inputSearch.nativeElement.focus();
    // Configura paginator y sort una sola vez
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadContratos(page: number = 0, size: number = 10): void {
    const filtros = {
      razonSocial: (this.razonCtrl.value || '').toString(),
      estado: (this.formulario.get('estado')?.value || '').toString(),
      tipo: (this.formulario.get('contrato')?.value || '').toString(),
      departamento: (this.formulario.get('departamento')?.value || '').toString(),
      busquedaGeneral: (this.formulario.get('busqueda')?.value || '').toString()
    };

    //console.log('Enviando filtros ->', filtros, ' page:', page, ' size:', size);

    this.ContratosService.getContratos(filtros, page, size).subscribe({
      next: (response: any) => {
        //console.log('Respuesta backend ->', response);
        this.dataSource.data = response.data;
        // Actualiza el total de elementos para el paginador
        this.totalItems = response.totalItems;
        this.page = response.page;
        this.size = response.size;
      },
      error: err => console.error('Error al cargar contratos:', err)
    });
  }

  // buscador desde botón o submit -> reinicia la página a 0
  buscarContratos(): void {
    this.page = 0;
    this.loadContratos(this.page, this.size);
  }

  onPageChange(event: PageEvent) {
    //this.updateDataSource(event.pageIndex, event.pageSize);
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.loadContratos(this.page, this.size);
  }

  filtroRazones() {
    this.ContratosService.getRazonesUnicas().subscribe({
      next: (raz) => {
        this.razoness = raz;
        // Configurar el filtro reactivo
        this.filteredRazones = this.razonCtrl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filterRazones(value || ''))
        );
      },
      error: (err) => {
        console.error('Error al obtener razones únicas:', err);
      },
    });
  }

  private _filterRazones(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.razoness.filter((razon) =>
      razon.toLowerCase().includes(filterValue)
    );
  }

  filterDeps() {
    this.ContratosService.getDeps().subscribe({
      next: (data: string[]) => {
        this.departamentos = data;
      },
      error: (err) => console.error(err),
    });
  }

  //comentamos este filtro en el siguiente commit, este permitia filtrar pero desde el datasource(cuando cargaba toda la base de datos en la tabla)
  // applyFilter() {
  //   const busqueda = this.formulario.get('busqueda')?.value;
  //   const estado = this.formulario.get('estado')?.value;
  //   const contrato = this.formulario.get('contrato')?.value;
  //   const razon = this.razonCtrl.value; // Obtener valor del FormControl independiente
  //   const departamento = this.formulario.get('departamento')?.value;

  //   // Crear una función personalizada para el filtro
  //   this.dataSource.filterPredicate = (data: Contrato, filter: string) => {
  //     const filters = JSON.parse(filter);

  //     const matchesDepartamento = filters.departamento
  //       ? data.departamento
  //         .toLowerCase()
  //         .includes(filters.departamento.toLowerCase())
  //       : true;

  //     const matchesRazones = filters.razon
  //       ? data.razonSocial.toLowerCase().includes(filters.razon.toLowerCase())
  //       : true;

  //     const matchesEstado = filters.estado
  //       ? data.estado.toLowerCase().includes(filters.estado.toLowerCase())
  //       : true;

  //     const matchesBusqueda = filters.busqueda
  //       ? JSON.stringify(data)
  //         .toLowerCase()
  //         .includes(filters.busqueda.toLowerCase())
  //       : true;

  //     const matchesContrato = filters.contrato
  //       ? JSON.stringify(data)
  //         .toLowerCase()
  //         .includes(filters.contrato.toLowerCase())
  //       : true;

  //     // Evaluar si los datos cumplen todos los filtros aplicados
  //     return (
  //       matchesDepartamento &&
  //       matchesEstado &&
  //       matchesBusqueda &&
  //       matchesContrato &&
  //       matchesRazones
  //     );
  //   };

  //   // Crear el objeto de filtro combinado
  //   const combinedFilter = {
  //     busqueda: busqueda || '',
  //     estado: estado || '',
  //     contrato: contrato || '',
  //     departamento: departamento || '',
  //     razon: razon,
  //   };

  //   // Aplicar el filtro
  //   this.dataSource.filter = JSON.stringify(combinedFilter);

  //   // filtro automatico
  // }

  clearFilters() {
    this.formulario.reset();
    this.dataSource.filter = '';
    this.razonCtrl.reset();
    this.buscarContratos(); // carga inicial
  }
}
