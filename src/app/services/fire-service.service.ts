//Importamos las librerias que necesitamos para la aplicacion
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Firestore, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { Notas } from '../models/nota';
import { Observable, map, filter, BehaviorSubject } from 'rxjs';
import { NavigationEnd, Router, Event } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FireServiceService {
  public currentUrl = new BehaviorSubject<any>(undefined);
  //Path que permite crear una coleccion en firebase
  private path = '/notas';
  datos: Notas[];
  notas: Notas[] = [];

  //Varaiables para poder obtener los datos y almacenar en firebase
  private notasRef: AngularFirestoreCollection<any>;

  //Constructor
  constructor(
    private db: AngularFirestore,
    private firestorage: Firestore,
    private router: Router) {
      this.datos = [];

      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.currentUrl.next(event.urlAfterRedirects);
        }
      });

    this.notasRef = db.collection(this.path);

    this.notasRef.valueChanges().subscribe(data => {
      console.log(data);
    })

    //Inicializamos las notas
    this.notasRef = this.db.collection<Notas>('notas');
  }

  getNotas(): Observable<Notas[]> { //Este metodo me devuelve un observable para poder obtener todas las recetas
    const respuesta = collection(this.firestorage, 'recetas');
    return collectionData(respuesta, {idField: 'uid'}) as Observable<Notas[]>;
  }

  //Metodo que permite guardar las notas o tareas
  guardarTareaFire(nota: Notas) {
    const uid = this.db.createId();
    nota.uid = uid;
    this.notasRef.doc(uid).set(Object.assign({}, nota));
  }

  //Metodo para mostrar o visualizar las notas
  imprimirNotas(): Observable<Notas[]> {
    const respuesta = collection(this.firestorage, 'notas');
    return collectionData(respuesta, { idField: 'uid' }) as Observable<Notas[]>;
  }

  //Metodo para obtener todos los cambios realizados
  getAll() {
    return this.notasRef.valueChanges();
  }

  //Metodo para eliminar la nota
  eliminarNota(nota: Notas) {
    const recetaRef = doc(this.firestorage, `notas/${nota.uid}`);
    return deleteDoc(recetaRef);
  }

  getInfo() {
    return this.datos;
  }
  
  addInfo(dato: Notas) {
    this.datos.push(dato);
    let datos: Notas[] = [];
    if (localStorage.getItem('datos') === null) {
      datos.push(dato);
      localStorage.setItem('datos', JSON.stringify(datos));
    } else {
      datos = JSON.parse(localStorage.getItem('datos')!);
      datos.push(dato);
      localStorage.setItem('datos', JSON.stringify(datos));
    }
  }

  obtenerItems(): Observable<any[]>{
    return this.db.collection('notas').valueChanges();
  }
}