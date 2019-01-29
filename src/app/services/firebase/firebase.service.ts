import { Observable } from 'rxjs/Observable';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'rxjs/Rx';
import { FileInterface } from '../../model/file.interface';

@Injectable()
export class FirebaseService {
  files: FirebaseListObservable<any[]>;
  file: FirebaseObjectObservable<any>;
  folder: any;

  constructor(private af: AngularFireDatabase) {
    this.folder = 'mediafiles';
    this.files = this.af.list('/files') as FirebaseListObservable<FileInterface[]>;
   }

  getFiles() {
    return this.files;
  }

  getFileDetails(id) {
    this.file = this.af.object('/files/' + id) as FirebaseObjectObservable<FileInterface>;
    return this.file;
  }

  getFilesByTitle(title: any): Observable<FileInterface[]> {
    return this.af.list('files').map(files => files.filter(file => file.title.toLowerCase().indexOf(title) !== -1));
    // return this.af.list('files').map(files => console.log(files))
  }

  addFile(file) {
    let storageRef = firebase.storage().ref();
    for (let selectedFile of [(<HTMLInputElement>document.getElementById('fileInput')).files[0]]) {
      let filePath = `/${this.folder}/${selectedFile.name}`;
      let spaceRef = storageRef.child(filePath);
      spaceRef.put(selectedFile).then((snapshot) => {
        file.fileName = selectedFile.name;
        file.path = filePath;
        this.files.push(file);
      });
    }
  }

  updateFile(id: string, file): void {
    this.files.update(id, file);
  }

  deleteFile(id, fileStorage) {
    this.files.remove(id);
    firebase.storage()
      .ref('/mediafiles')
      .child(fileStorage).delete();
  }
}

