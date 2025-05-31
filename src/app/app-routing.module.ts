import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConsultasComponent } from './consulta/consultas.component';
import { PoliticasComponent } from './pages/politicas/politicas.component';
import { MedicamentosComponent } from './medicamentos/medicamentos.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tecnologias', component: ConsultasComponent },
   { path: 'medicamentos', component: MedicamentosComponent },
   { path: 'politicas', component: PoliticasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
