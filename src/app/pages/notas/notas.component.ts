//Importamos las librerias que necesitamos para la aplicacion
import { Component, OnInit } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { Notas } from 'src/app/models/nota';
import { FireServiceService } from 'src/app/services/fire-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss']
})
export class NotasComponent implements OnInit{

  //Listas/Arrays para las categorias
  listaNotas: any;
  items$: Observable<any[]> | undefined;

  notas: Notas[] = [];

  //Variables Boolean 
  mostrarFormulario: boolean = false;
  notaEditando!: Notas;
  botonDesac: boolean = false;

  categoria: string = '';

  //Constructor
  constructor(
    private fb: FormBuilder,
    private notasSer: FireServiceService,
    private firestorage: Firestore,
  ) {
    this.notas = notasSer.getInfo();
    console.log(this.notas);
    this.listaNotas = notasSer.getAll();

    this.notasSer.getNotas().subscribe((notas) =>
      this.notas = notas);

   }

  //Metodo para eliminar las notas
  async eliminarNota(nota: Notas) {
    const confirmacion = window.confirm(`¿Deseas eliminar la nota: ${nota.titulo}?`);

    if (confirmacion) {
      const respuesta = this.notasSer.eliminarNota(nota);
      console.log(respuesta);
    } else {
      console.log("no se elimino la receta");
    };
  };

  //Metodo para desplegar el formulario de edicion
  editarNota(nota: Notas) {
    this.botonDesac = true;
    this.notaEditando = nota;
    this.mostrarFormulario = true;
  }

  //Metodo para actualizar las notas editadas
  async actualizarNota(nota: Notas) {
    this.botonDesac = true;
    console.log("editando")
    try {
      const formulario = document.getElementById('formularioNota') as HTMLFormElement;

      const titulo = (formulario.elements.namedItem('titulo') as HTMLTextAreaElement).value;
      const resenia = (formulario.elements.namedItem('resenia') as HTMLTextAreaElement).value;
      const fecha = (formulario.elements.namedItem('fecha') as HTMLInputElement).value;

      const notaRef = doc(this.firestorage, `notas/${nota.uid}`);
      const datos = {
        titulo: titulo,
        resenia: resenia,
        categoria: this.categoria,
        fecha: fecha,
      };

      // Validación de los campos
      if (titulo == "" || resenia == "" || this.categoria == "" || fecha == "") {
        alert("Debe llenar todos los parametros");
      } else {

        //Constante para confirmar la actualización
        const confirmacion = window.confirm("¿Seguro que deseas actualizar?")

        if (confirmacion) {
          this.botonDesac = false;
          this.mostrarFormulario = false;

          return await updateDoc(notaRef, datos);
        } else {
          this.botonDesac = true;
          this.mostrarFormulario = true;
        }
      }
    } catch (e) {
      //console.log(e);
    }
  }

  //Metodo para cancelar la edicion (ocultar el formulario)
  cancelarEdicion() {
    this.mostrarFormulario = false;
    this.botonDesac = false;
  }

  //Metodo que permite ejecutar lineas de codigo después de que Angular ha inicializado 
  //todas las propiedades del componente y ha establecido la conexión entre el componente y su vista
  async ngOnInit(){
    this.notasSer.getNotas().subscribe(notas => {
      console.log(notas);
      this.notas = notas;
    })

    this.items$ = this.notasSer.obtenerItems();
  }
}
