import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, IUser } from '../auth.service';

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
    private authService: AuthService,
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

  public registration(): void {

  }

  // private prepareUserDataForRegistration(): IUser {
  //   const userData
  // }

  private createRegistrationForm(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

}
