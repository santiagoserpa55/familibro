import { map, Observable } from 'rxjs';
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

  getMedCumFilter(): Observable<string[]> {
    return this.http.get<Medicamentos[]>('http://localhost:8080/filtroMedCum').pipe(
      map((medicamentos: Medicamentos[]) => medicamentos.map((med) => med.cum ))
    );
  }

  getMedAtcFilter(): Observable<string[]> {
    return this.http.get<Medicamentos[]>('http://localhost:8080/filtroMedAtc').pipe(
      map((medicamentos: Medicamentos[]) => medicamentos.map((med) => med.atc))
    );
  }
}
