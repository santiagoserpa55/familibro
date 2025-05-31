import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicamentos } from '../interfaces/medicamentos';

@Injectable({
  providedIn: 'root'
})
export class MedicamentosService {

    constructor(private http: HttpClient) { }
  
    getMedicamentos() {
      return this.http.get<Medicamentos[]>('http://localhost:8080/medicamentos');
    }
}
