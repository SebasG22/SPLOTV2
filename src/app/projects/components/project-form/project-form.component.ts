import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UpdateProject, CreateProject } from '../actions/projects.action';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<{}>
  ) { }

  @Input() mode: 'create' | 'edit';

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
      'files': ['', Validators.required]
    });
    this.form.get('id').disable({ onlySelf: true });
  }

  public onSubmitForm({ valid, value }: { valid: boolean, value: any }) {
    if (valid) {
      switch (this.mode) {
        case 'create':
          return this.store.dispatch(new CreateProject(value));
        case 'edit':
          return this.store.dispatch(new UpdateProject(value));
      }
    }
  }

}
