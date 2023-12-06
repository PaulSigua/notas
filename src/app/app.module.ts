import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NotasComponent } from './pages/notas/notas.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore, enableIndexedDbPersistence } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ServiceWorkerModule } from '@angular/service-worker';
import { getStorage, provideStorage } from '@angular/fire/storage';

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
    AngularFirestoreModule.enablePersistence(),
    provideFirebaseApp(() => initializeApp({"projectId":"notas-8e7df","appId":"1:420181557619:web:204bbc1fda2daae684c506","storageBucket":"notas-8e7df.appspot.com","apiKey":"AIzaSyB7DxQ1FwuFjKnUHx-TZ1nukTJUSi6BgJM","authDomain":"notas-8e7df.firebaseapp.com","messagingSenderId":"420181557619","measurementId":"G-GYT79JNJQ7"})),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    AngularFireModule.initializeApp((environment.firebaseConfig)),
    provideFirestore(() => {
      const firestore = getFirestore();
      enableIndexedDbPersistence(firestore)
        .catch((err) => {
          console.error('Error enabling offline persistence:', err);
        });
      return firestore;
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
      {
        provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
