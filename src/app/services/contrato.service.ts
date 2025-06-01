import { Injectable } from '@angular/core';
import { Contrato } from '../interfaces/tecnologias';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContratosService {

  constructor(private http: HttpClient) { }

  getContratos() {
    return this.http.get<Contrato[]>('http://localhost:8080/contratos');
  }

}
