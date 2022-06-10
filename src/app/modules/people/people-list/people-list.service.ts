import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

export interface IUser {
  name: string;
  lastName: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class PeopleListModule {

  private _users: IUser[] = [];

  get usersSnapshotUser(): IUser[] {
    return this._users;
  }

  get users(): Observable<IUser[]> {
    return of(this._users);
  }

  addUser(user: IUser): IUser {
    this._users.push(user);
    return user;
  }
}
