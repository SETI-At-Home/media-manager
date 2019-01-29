import { AngularFireAuthModule } from 'angularfire2/auth/auth.module';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FirebaseService } from './services/firebase/firebase.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FilesComponent } from './components/files/files.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FileComponent } from './components/file/file.component';
import { AddFileComponent } from './components/add-file/add-file.component';
import { EditFileComponent } from './components/edit-file/edit-file.component';
import { environment } from '../environments/environment';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'files', component: FilesComponent},
  {path: 'file/:id', component: FileComponent},
  {path: 'add-file', component: AddFileComponent},
  {path: 'edit-file/:id', component: EditFileComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FilesComponent,
    NavbarComponent,
    FileComponent,
    AddFileComponent,
    EditFileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [FirebaseService, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
