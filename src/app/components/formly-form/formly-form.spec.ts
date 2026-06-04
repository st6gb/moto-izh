import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyFormComponent } from './formly-form';
import { ButtonModule } from 'primeng/button';
import { FormlyModule, provideFormlyCore } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { withFormlyPrimeNG } from '@ngx-formly/primeng';

describe('FormlyForm', () => {
  let component: FormlyFormComponent;
  let fixture: ComponentFixture<FormlyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormlyFormComponent, FormlyModule.forRoot(), ReactiveFormsModule, ButtonModule],
      providers: [
        provideFormlyCore([
          ...withFormlyPrimeNG(),
          {
            validationMessages: [{ name: 'required', message: 'This field is required' }],
          },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormlyFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
