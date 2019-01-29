import { FirebaseService } from '../../services/firebase/firebase.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  files: any;
  search: any;

  constructor(private firebaseService: FirebaseService, public af: AngularFireAuth) { }

  searchFiles() {
    this.firebaseService.getFilesByTitle(this.search.toLowerCase()).subscribe(files => {
      this.files = files;
    });
  }

  ngOnInit() {
    this.firebaseService.getFiles().subscribe(files => {
      this.files = files;
    });
  }
}
