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

  // //consumir todos los contratos sin filtro
  // getContratos(page: number, size: number) {
  //   return this.http.get<Contrato[]>(`${this.contratosUrl}/${environment.api.contratos}?page=${page}&size=${size}`);
  // }

  //filtra la razon social con valor unico
  getRazonesUnicas(): Observable<string[]> {
    return this.http.get<Contrato[]>(`${environment.api.baseURL}/${environment.api.razonesUnicas}`).pipe(
      map((contratos: Contrato[]) => contratos.map((c) => c.razonSocial))
    );
  }
  //de esta manera obtenia los deps igual que las razones
  // getDeps(): Observable<String[]> {
  //   return this.http.get<Contrato[]>(`${environment.api.baseURL}/${environment.api.deps}`).pipe(
  //     map((contratos: Contrato[]) => contratos.map((c) => c.departamento))
  //   )
  // }
  getDeps(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.api.baseURL}/${environment.api.deps}`);
  }


  getContratos(filtros: any, page: number, size: number) { 
  return this.http.post<any>(
    `${this.contratosUrl}/tecnologias/search?page=${page}&size=${size}`,
    filtros
  );
}


}
