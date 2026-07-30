import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-formly-form',
  imports: [CommonModule, FormlyModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './formly-form.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './formly-form.scss',
})
export class FormlyFormComponent {
  form = new UntypedFormGroup({});
  model = {};
  fields = [
    {
      key: 'firstName',
      type: 'input',
      templateOptions: {
        label: 'First Name',
        placeholder: 'Enter your first name',
        required: true,
      },
    }];

  onSubmit(value: any):void {
    console.log(value);
  }
}
