import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public hide = false;
  public isLoading = false;

  constructor(
    private fb: FormBuilder,
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(3), Validators.maxLength(6), Validators.required]]
    });
  }

  public getErrorMessage(formControlName: string): string {
    return this.loginForm.get(formControlName).invalid && 'field invalid'; // i am sad :( need another decision
  }

  public isInvalid(formControlName: string): boolean {
    return this.loginForm.get(formControlName).invalid;
  }

}
