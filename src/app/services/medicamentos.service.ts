import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicamentos } from '../interfaces/medicamentos';

@Injectable({
  providedIn: 'root'
})
export class MedicamentosService {

  constructor(private http: HttpClient) { }

/*   getMedicamentos() {
    return this.http.get<Medicamentos[]>('https://familibrobackend.onrender.com/medicamentos');
  }

  getMedCumFilter(): Observable<string[]> {
    return this.http.get<Medicamentos[]>('https://familibrobackend.onrender.com/filtroMedCum').pipe(
      map((medicamentos: Medicamentos[]) => medicamentos.map((med) => med.cum ))
    );
  }

  getMedAtcFilter(): Observable<string[]> {
    return this.http.get<Medicamentos[]>('https://familibrobackend.onrender.com/filtroMedAtc').pipe(
      map((medicamentos: Medicamentos[]) => medicamentos.map((med) => med.atc))
    );
  } */
   getMedicamentos() {
    return this.http.get<Medicamentos[]>('http://localhost:8082/medicamentos');
  }

  getMedCumFilter(): Observable<string[]> {
    return this.http.get<Medicamentos[]>('http://localhost:8082/filtroMedCum').pipe(
      map((medicamentos: Medicamentos[]) => medicamentos.map((med) => med.cum ))
    );
  }

  getMedAtcFilter(): Observable<string[]> {
    return this.http.get<Medicamentos[]>('http://localhost:8082/filtroMedAtc').pipe(
      map((medicamentos: Medicamentos[]) => medicamentos.map((med) => med.atc))
    );
  }
}
