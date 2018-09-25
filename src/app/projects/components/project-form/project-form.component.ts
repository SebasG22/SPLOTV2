import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  public buildForm() {
    this.form = this.fb.group({
      'id': [''],
      'name': ['', Validators.required],
      'description': ['', Validators.required],
      'state': ['', Validators.required],
      'public': ['', Validators.required],
      'participants': ['', Validators.required],
      'files': ['', Validators.required],
      'created_by?': [''],
      'created_at': [''],
      'update_by': [''],
      'updated_at': [''],
    });
  }

}
