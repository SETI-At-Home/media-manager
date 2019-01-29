import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FirebaseService } from './../../services/firebase/firebase.service';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.css']
})
export class AddFileComponent implements OnInit {
  title: any;
  description: any;
  type: any;
  fileInput: any;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    public af: AngularFireAuth
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    let file = {
      title: this.title,
      description: this.description,
      type: this.type
    };

    this.firebaseService.addFile(file);

    this.router.navigate(['files']);
  }

}
