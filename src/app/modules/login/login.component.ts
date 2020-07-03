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

  constructor(
    private fb: FormBuilder,
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', [Validators.minLength(3), Validators.maxLength(6)]]
    });
  }

  public getErrorMessage(): string {
    // return this.loginForm.get('email').invalid ? 'email.invalid' : '';
    return '';
  }

  public isInvalid(formControlName: string): boolean {
    // return this.loginForm.get(formControlName).invalid;
    return false;
  }

}
