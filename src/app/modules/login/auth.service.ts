import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  private apiUrl = {
    registration: 'login/addUser'
  };

  constructor(
    private httpClient: HttpClient,
  ) {

  }
  public registration(body: IUser): Observable<any> {
    const fullUrl = environment.serverUrl + this.apiUrl.registration;
    return this.httpClient.post(fullUrl, body);
  }
}
