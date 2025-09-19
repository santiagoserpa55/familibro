import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicamentos } from '../interfaces/medicamentos';
import { environment } from 'src/envinronment/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicamentosService {
  private readonly urlBase = `${environment.api.baseURL}`;

  constructor(private http: HttpClient) { }

   getMedicamentos() {
    return this.http.get<Medicamentos[]>(`${this.urlBase}/${environment.api.medicamentos}`);
  }

  getMedCumFilter(): Observable<string[]> {
    return this.http.get<Medicamentos[]>(`${environment.api.baseURL}/${environment.api.filtroCum}`).pipe(
      map((medicamentos: Medicamentos[]) => medicamentos.map((med) => med.cum ))
    );
  }

  getMedAtcFilter(): Observable<string[]> {
    return this.http.get<Medicamentos[]>(`${environment.api.baseURL}/${environment.api.filtroAtc}`).pipe(
      map((medicamentos: Medicamentos[]) => medicamentos.map((med) => med.atc))
    );
  }
}
