import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-formly-form',
  imports: [CommonModule, FormlyModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './formly-form.html',
  styleUrl: './formly-form.scss',
})
export class FormlyFormComponent {
  form = new FormGroup({});
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
