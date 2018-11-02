import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IConfigurationChildrenParsed, IUserConfiguration } from '../../models/configuration-process.model';

@Component({
  selector: 'app-user-model-configuration',
  templateUrl: './user-model-configuration.component.html',
  styleUrls: ['./user-model-configuration.component.scss']
})
export class UserModelConfigurationComponent implements OnInit {

  @Input() public featureName: string;
  @Input() public featureId: string;
  @Input() public childrenItems: IConfigurationChildrenParsed[];
  @Input() public itsLastFeature: boolean;

  public configurationForm: FormGroup;

  @Input() public stepIndex: number;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.configurationForm = this.fb.group({
      childrenId: [null, Validators.required],
      decisionId: [null, Validators.required],
      preferencesIds: [null]
    });
  }

  public onSubmitForm({ valid, value }: { valid: boolean, value: any }) {

  }

}
