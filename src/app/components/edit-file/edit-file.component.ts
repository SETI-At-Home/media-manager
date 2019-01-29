import { Router, ActivatedRoute, Params } from '@angular/router';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-file',
  templateUrl: './edit-file.component.html',
  styleUrls: ['./edit-file.component.css']
})
export class EditFileComponent implements OnInit {
  id;
  title: any;
  description: any;
  type: any;
  fileInput: any;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.firebaseService.getFileDetails(this.id).subscribe(file => {
      this.title = file.title;
      this.description = file.description;
      this.type = file.type;
    });
  }

  onEdit() {
    let file = {
      title: this.title,
      description: this.description,
      type: this.type
    };

    this.firebaseService.updateFile(this.id, file);

    this.router.navigate(['/files']);
  }

}
