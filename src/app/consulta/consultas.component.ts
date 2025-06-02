import { Component, OnInit, ViewChild } from '@angular/core';
import { ContratosService } from '../services/contrato.service';
import { Contrato } from '../interfaces/tecnologias';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss'],
})
export class ConsultasComponent implements OnInit {
  razoness!: string[]; // Arreglo para almacenar las razones sociales obtenidas
  razonCtrl = new FormControl(); // Control del formulario para el filtro
  filteredRazones!: Observable<string[]>; // Observable para razones filtradas
  contactsDataArray: any = [];
  formulario!: FormGroup;
  estados: string[] = ['ACTIVO', 'SUSPENDIDO', 'TERMINADO'];
  contratos: string[] = ['Evento-PBS', 'Evento-NoPBS'];
  departamentos!: string[];
  razones!: string[];
  dataSource = new MatTableDataSource<Contrato>();

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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private ContratosService: ContratosService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.filtroRazones();
    this.updateDataSource();

    this.formulario = this.fb.group({
      busqueda: [''],
      estado: [''],
      departamento: [''],
      contrato: [''],
      razon: [''],
    });
  }

  updateDataSource() {
    this.ContratosService.getContratos().subscribe({
      next: (data: Contrato[]) => {
        // Obtener departamentos únicos
        this.departamentos = Array.from(
          new Set(data.map((contact) => contact.departamento))
        );
        //console.log(this.departamentos);
        // Filtrar los departamentos únicos seleccionados
        this.contactsDataArray = data.filter((contact) =>
          this.departamentos.includes(contact.departamento)
        );
        // Crear el MatTableDataSource con los datos filtrados
        this.dataSource = new MatTableDataSource<Contrato>(
          this.contactsDataArray
        );
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
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

  applyFilter() {
    const busqueda = this.formulario.get('busqueda')?.value;
    const estado = this.formulario.get('estado')?.value;
    const contrato = this.formulario.get('contrato')?.value;
    const razon = this.razonCtrl.value; // Obtener valor del FormControl independiente
    const departamento = this.formulario.get('departamento')?.value;

    // Crear una función personalizada para el filtro
    this.dataSource.filterPredicate = (data: Contrato, filter: string) => {
      const filters = JSON.parse(filter);

      const matchesDepartamento = filters.departamento
        ? data.departamento
            .toLowerCase()
            .includes(filters.departamento.toLowerCase())
        : true;

      const matchesRazones = filters.razon
        ? data.razonSocial.toLowerCase().includes(filters.razon.toLowerCase())
        : true;

      const matchesEstado = filters.estado
        ? data.estado.toLowerCase().includes(filters.estado.toLowerCase())
        : true;

      const matchesBusqueda = filters.busqueda
        ? JSON.stringify(data)
            .toLowerCase()
            .includes(filters.busqueda.toLowerCase())
        : true;

      const matchesContrato = filters.contrato
        ? JSON.stringify(data)
            .toLowerCase()
            .includes(filters.contrato.toLowerCase())
        : true;

      // Evaluar si los datos cumplen todos los filtros aplicados
      return (
        matchesDepartamento &&
        matchesEstado &&
        matchesBusqueda &&
        matchesContrato &&
        matchesRazones
      );
    };

    // Crear el objeto de filtro combinado
    const combinedFilter = {
      busqueda: busqueda || '',
      estado: estado || '',
      contrato: contrato || '',
      departamento: departamento || '',
      razon: razon,
    };

    // Aplicar el filtro
    this.dataSource.filter = JSON.stringify(combinedFilter);

    // filtro automatico
  }

  clearFilters() {
    this.formulario.reset();
    this.dataSource.filter = '';
    this.razonCtrl.reset();
  }
}
