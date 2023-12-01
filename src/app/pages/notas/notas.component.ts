import { Component } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { Notas } from 'src/app/models/nota';
import { FireServiceService } from 'src/app/services/fire-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss']
})
export class NotasComponent {

  tareas: any ;
  pruebas: any ;
  examenes: any ;
  practicas: any;
  materias: any;

  mostrarFormulario: boolean = false;
  notaEditando!: Notas;
  botonDesac: boolean = false;

  categoria: string  = '';

  constructor(
    private fb: FormBuilder,
    private notasSer: FireServiceService,
    private firestorage: Firestore,
  ){}

  async eliminarNota(nota: Notas){
    const confirmacion = window.confirm(`¿Deseas eliminar la nota: ${nota.titulo}?`)

    if (confirmacion) {
      const respuesta = this.notasSer.eliminarNota(nota);
      console.log(respuesta);
    } else {
      console.log("no se elimino la receta");
    }
  }

  editarNota(nota: Notas){
    this.botonDesac = true;
    this.notaEditando = nota;
    this.mostrarFormulario = true;
  }

  async actualizarNota(nota: Notas){
    this.botonDesac = true;
    console.log("editando")
    try {
      const formulario = document.getElementById('formularioNota') as HTMLFormElement;

      const titulo = (formulario.elements.namedItem('titulo') as HTMLTextAreaElement).value;
      const resenia = (formulario.elements.namedItem('resenia') as HTMLTextAreaElement).value;
      const fecha = (formulario.elements.namedItem('fecha') as HTMLInputElement).value;

      const notaRef = doc(this.firestorage, `notas/${nota.uid}`);
      const notas = {
        titulo: titulo,
        resenia: resenia,
        categoria: this.categoria,
        fecha: fecha,
      };

      console.log("2")
      if (titulo == "" || resenia == "" || this.categoria == "" || fecha == "") {
        alert("Debe llenar todos los parametros");
      } else {

        const confirmacion = window.confirm("¿Seguro que deseas actualizar?")

        if (confirmacion) {
          this.botonDesac = false;
          this.mostrarFormulario = false;
          
          return await updateDoc(notaRef, notas);
        } else {
          this.botonDesac = true;
          this.mostrarFormulario = true;
        }
      }
    } catch (e) {
      //console.log(e);
    }
  }

  cancelarEdicion(){
    this.mostrarFormulario = false;
    this.botonDesac = false;
  }

  ngOnInit(): void {
    this.notasSer.getTareas('Tarea').subscribe(tareas => {
      this.tareas = tareas;
    });

    this.notasSer.getPruebas('Prueba').subscribe(pruebas => {
      this.pruebas = pruebas;
    });

    this.notasSer.getExamenes('Examen').subscribe(examenes => {
      this.examenes = examenes;
    });

    this.notasSer.getPracticas('Práctica').subscribe(practicas => {
      this.practicas = practicas;
    });

    this.notasSer.getMaterias('Materia').subscribe(materias => {
      this.materias = materias;
    });
  }
}
