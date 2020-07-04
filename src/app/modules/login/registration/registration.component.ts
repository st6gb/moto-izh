import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public registrationForm: FormGroup;
  public hide = false;
  public isLoading = false;

  constructor(
    private fb: FormBuilder,
  ) {
    this.createRegistrationForm();
  }

  ngOnInit(): void {
  }

  public getErrorMessage(formControlName: string): string {
    return this.registrationForm.get(formControlName).invalid && 'field invalid'; // i am sad :( need another decision
  }

  public isInvalid(formControlName: string): boolean {
    return this.registrationForm.get(formControlName).invalid;
  }

  private createRegistrationForm(): void {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

}
