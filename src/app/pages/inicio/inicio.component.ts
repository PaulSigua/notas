import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Notas } from 'src/app/models/nota';
import { FireServiceService } from 'src/app/services/fire-service.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {

  notas: Notas[] = [];
  listaNotas: any;

  categoria: string = '';
  constructor(
    private router: Router,
    private notasSer: FireServiceService,
  ) {
    this.listaNotas = this.notasSer.getAll();

    this.notasSer.imprimirNotas().subscribe((notas) =>
      this.notas = notas);
  }

  guardarNota(titulo: HTMLInputElement, resenia: HTMLTextAreaElement, fecha: HTMLInputElement) {
    if (!titulo.value || !resenia.value || !this.categoria || !fecha.value) {
      alert('Debe completar todos los campos');
      return false;
    } else {
      const notaExiste = this.router.getCurrentNavigation()?.extras.state?.['notas'];
      const nota = {
        titulo: titulo.value,
        resenia: resenia.value,
        categoria: this.categoria,
        fecha: fecha.value,
      }

      this.notasSer.guardarTareaFire(nota);
      alert('Nota guardada');

      this.router.navigate(['./pages/notas']);
      titulo.focus();
      return false;
    };
  };
}
