import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'notas';

  //Creamos una lista/array y guardamos las paginas
  pages = [
    {enlace: 'Inicio', path: 'pages/inicio'},
    {enlace: 'Notas', path: 'pages/notas'},
  ];
}
