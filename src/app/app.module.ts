import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';


// Angular material
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './home/home.component';
import { ConsultasComponent } from './consulta/consultas.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatOption, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PoliticasComponent } from './pages/politicas/politicas.component';
import { MedicamentosComponent } from './medicamentos/medicamentos.component';



@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        ConsultasComponent,
        PoliticasComponent,
        MedicamentosComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatTableModule,
        MatCardModule,
        ReactiveFormsModule,
        MatInputModule,
        MatDialogModule,
        MatExpansionModule,
        MatPaginatorModule,
        MatSortModule,
        MatOptionModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        FlexLayoutModule,
        MatExpansionModule,
        BrowserAnimationsModule, // Requerido para Material
        MatExpansionModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
