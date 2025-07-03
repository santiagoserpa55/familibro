import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


/* ---------- Angular Material ---------- */
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

/* ---------- (Opcional) Flex‑Layout ---------- */
// Si seguiste nuestra recomendación de la fork actualizada:
//import { FlexLayoutModule } from 'ngx-flexible-layout';   // o '@ngbracket/ngx-layout'

/* ---------- App & feature components ---------- */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ConsultasComponent } from './consulta/consultas.component';
import { MedicamentosComponent } from './medicamentos/medicamentos.component';
import { ModalidadesComponent } from './pages/modalidades/modalidades.component';
import { PoliticasComponent } from './pages/politicas/politicas.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModalidadesComponent,
    PoliticasComponent,
  ], imports:[
    MatTableModule,
    BrowserModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatDialogModule,
    MatAutocompleteModule,
    RouterModule,
        RouterModule,        // ← añade esto si aún no lo tienes
    BrowserAnimationsModule,
    AppRoutingModule
  ],

  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent],
})
export class AppModule {}
