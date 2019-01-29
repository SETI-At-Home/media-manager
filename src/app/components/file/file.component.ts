import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './../../services/firebase/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  id: any;
  file = [];
  fileUrl: any;
  fileName: any;

  constructor(
    private FirebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    public af: AngularFireAuth
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.FirebaseService.getFileDetails(this.id).subscribe(file => {
      this.file = file;
      this.fileName = file.fileName;

      let storageRef = firebase.storage().ref();
      let spaceRef = storageRef.child(file.path);
      storageRef.child(file.path).getDownloadURL().then((url) => {
        this.fileUrl = url;
      });
    });
  }

  onDelete() {
    this.FirebaseService.deleteFile(this.id, this.fileName);

    this.router.navigate(['/files']);
  }

}
