import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NotasComponent } from './pages/notas/notas.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NotasComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp({"projectId":"notas-8e7df","appId":"1:420181557619:web:204bbc1fda2daae684c506","storageBucket":"notas-8e7df.appspot.com","apiKey":"AIzaSyB7DxQ1FwuFjKnUHx-TZ1nukTJUSi6BgJM","authDomain":"notas-8e7df.firebaseapp.com","messagingSenderId":"420181557619","measurementId":"G-GYT79JNJQ7"})),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp((environment.firebaseConfig)),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
