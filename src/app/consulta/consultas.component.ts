import { Component, OnInit, ViewChild } from '@angular/core';
import { ContratosService } from '../services/contrato.service';
import { Contrato } from '../interfaces/tecnologias';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-contacts',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss'],
})
export class ConsultasComponent implements OnInit {

  contactsDataArray: any = [];
  formulario!: FormGroup;
  estados: string[] = ['ACTIVO', 'SUSPENDIDO', 'TERMINADO'];
  contratos: string[] = ['Evento-PBS', 'Evento-NoPBS'];
  departamentos!: string[];
  razones!: string[];
  dataSource = new MatTableDataSource<Contrato>();

  //implementando buscador interno
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
    this.updateDataSource();

    this.formulario = this.fb.group({
      busqueda: [''],
      estado: [''],
      departamento: [''],
      contrato: [''],
      razon:['']
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
        // obtener razones unicas razones
        this.razones = Array.from(
          new Set(data.map((contact) => contact.razonSocial))
        );

        // Filtrar los departamentos únicos seleccionados
        this.contactsDataArray = data.filter((contact) =>
          this.departamentos.includes(contact.departamento)
        );

        //filtrar razones
        this.contactsDataArray = data.filter((contact) =>
          this.razones.includes(contact.razonSocial)
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

  applyFilter() {
    const busqueda = this.formulario.get('busqueda')?.value;
    const estado = this.formulario.get('estado')?.value;
    const contrato = this.formulario.get('contrato')?.value;
    const razon = this.formulario.get('razon')?.value;
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
        ? data.razonSocial
            .toLowerCase()
            .includes(filters.razon.toLowerCase())
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
      razon:razon
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
