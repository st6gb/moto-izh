
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  of
} from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface IPerson {
  FirstName: string;
  LastName: string;
  Title: string;
  Email: string;
  PhoneNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class PeopleListsService {

  private _peoples: IPerson[] = [];

  constructor(
    private httpClient: HttpClient
  ) {

  }

  get peopleSnapshot(): IPerson[] {
    return this._peoples;
  }

  get people(): Observable<IPerson[]> {
    return of(this._peoples);
  }

  public addPerson(user: IPerson): IPerson {
    this._peoples.push(user);
    return user;
  }

  public createOrUpdatePerson(person: IPerson): Observable<any> {
    return this.httpClient.post(`${environment.serverUrl}/person`, person);
  }

  public getAllUsers(): Observable<any> {
    return this.httpClient.get(`${environment.serverUrl}/person`);
  }
}
