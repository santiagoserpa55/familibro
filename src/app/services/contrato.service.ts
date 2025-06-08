import { Injectable } from '@angular/core';
import { Contrato } from '../interfaces/tecnologias';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/envinronment/environment';

@Injectable({
  providedIn: 'root'
})
export class ContratosService {
  private readonly contratosUrl = `${environment.api.baseURL}`;

  constructor(private http: HttpClient) { }

  getContratos() {
    return this.http.get<Contrato[]>(`${this.contratosUrl}/${environment.api.contratos}`);
  }
//filtra la razon social con valor unico
getRazonesUnicas(): Observable<string[]> {
  return this.http.get<Contrato[]>(`${environment.api.baseURL}/${environment.api.razonesUnicas}`).pipe(
    map((contratos: Contrato[]) => contratos.map((c) => c.razonSocial))
  );
}

}
