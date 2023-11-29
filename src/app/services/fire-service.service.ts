import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Firestore, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { Notas } from '../models/nota';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireServiceService {
  private path = '/notas';

  private notasRef: AngularFirestoreCollection<any>;
  private tareaCategoria: AngularFirestoreCollection<Notas>;
  private pruebaCategoria: AngularFirestoreCollection<Notas>;
  private examenCategoria: AngularFirestoreCollection<Notas>;
  private practicaCategoria: AngularFirestoreCollection<Notas>;
  private materiaCategoria: AngularFirestoreCollection<Notas>;

  constructor(
    private db: AngularFirestore,
    private firestorage: Firestore) {
    this.notasRef = db.collection(this.path);

    this.notasRef.valueChanges().subscribe(data => {
      console.log(data);
    })

    this.tareaCategoria = this.db.collection<Notas>('notas');
    this.pruebaCategoria = this.db.collection<Notas>('notas');
    this.examenCategoria = this.db.collection<Notas>('notas');
    this.practicaCategoria = this.db.collection<Notas>('notas');
    this.materiaCategoria = this.db.collection<Notas>('notas');
  }

  guardarTareaFire(nota: Notas) {
    const uid = this.db.createId();
    nota.uid = uid;
    this.notasRef.doc(uid).set(Object.assign({}, nota));
  }

  imprimirNotas(): Observable<Notas[]> {
    const respuesta = collection(this.firestorage, 'notas');
    return collectionData(respuesta, { idField: 'uid' }) as Observable<Notas[]>;
  }

  getAll() {
    return this.notasRef.valueChanges();
  }

  eliminarNota(nota: Notas) {
    const recetaRef = doc(this.firestorage, `notas/${nota.uid}`);
    return deleteDoc(recetaRef);
  }

  getTareas(categoria: string): Observable<Notas[]> {
    return this.tareaCategoria
      .valueChanges({ idField: 'uid' }) // Obtén cambios en los documentos y agrega el campo 'uid'
      .pipe(
        map((notas: Notas[]) => {
          // Filtra las notas por la categoría deseada
          return notas.filter(nota => nota.categoria === categoria);
        })
      );
  }

  getPruebas(categoria: string): Observable<Notas[]> {
    return this.pruebaCategoria
      .valueChanges({ idField: 'uid' }) // Obtén cambios en los documentos y agrega el campo 'uid'
      .pipe(
        map((notas: Notas[]) => {
          // Filtra las notas por la categoría deseada
          return notas.filter(nota => nota.categoria === categoria);
        })
      );
  }

  getExamenes(categoria: string): Observable<Notas[]> {
    return this.examenCategoria
      .valueChanges({ idField: 'uid' }) // Obtén cambios en los documentos y agrega el campo 'uid'
      .pipe(
        map((notas: Notas[]) => {
          // Filtra las notas por la categoría deseada
          return notas.filter(nota => nota.categoria === categoria);
        })
      );
  }

  getPracticas(categoria: string): Observable<Notas[]> {
    return this.practicaCategoria
      .valueChanges({ idField: 'uid' }) // Obtén cambios en los documentos y agrega el campo 'uid'
      .pipe(
        map((notas: Notas[]) => {
          // Filtra las notas por la categoría deseada
          return notas.filter(nota => nota.categoria === categoria);
        })
      );
  }

  getMaterias(categoria: string): Observable<Notas[]> {
    return this.materiaCategoria
      .valueChanges({ idField: 'uid' }) // Obtén cambios en los documentos y agrega el campo 'uid'
      .pipe(
        map((notas: Notas[]) => {
          // Filtra las notas por la categoría deseada
          return notas.filter(nota => nota.categoria === categoria);
        })
      );
  }


}
