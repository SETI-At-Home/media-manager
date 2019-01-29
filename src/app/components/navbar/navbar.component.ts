import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public af: AngularFireAuth,
    public flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  login() {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.flashMessage.show('You are signed in!',
    {cssClass: 'alert-success', timeout: 4000});
  }

  logout() {
    this.af.auth.signOut();
    this.flashMessage.show('You are logged out!',
    {cssClass: 'alert-success', timeout: 4000});
  }
}
