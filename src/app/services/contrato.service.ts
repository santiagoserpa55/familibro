import { Injectable } from '@angular/core';
import { Contrato } from '../interfaces/tecnologias';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContratosService {

  constructor(private http: HttpClient) { }

  getContratos() {
    return this.http.get<Contrato[]>('http://localhost:8080/contratos');
  }
//filtra la razon social con valor unico
getRazonesUnicas(): Observable<string[]> {
  return this.http.get<Contrato[]>('http://localhost:8080/getRazonUnica').pipe(
    map((contratos: Contrato[]) => contratos.map((c) => c.razonSocial))
  );
}

}
