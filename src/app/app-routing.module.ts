//Importamos las librerias que necesitamos para la aplicacion
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NotasComponent } from './pages/notas/notas.component';

const routes: Routes = [
  //Aniadimos las rutas para movernos de pagina en pagina en nuestra web
  {path: '', redirectTo: 'pages/inicio', pathMatch: 'full'},
  {path: 'pages/inicio', component: InicioComponent},
  {path: 'pages/notas', component: NotasComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
