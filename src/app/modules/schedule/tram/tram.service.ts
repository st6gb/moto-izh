import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

export interface ITramModel {
  id?: number;
  Name: string;
  Value: number;
}

@Injectable()
export class TramService {
  private serverPrefix = environment.serverUrl;
  private tramRoutes = 'tramRoutes';
  private tramStations = 'tramStations';
  private scheduleUrl = 'getStation';

  constructor(private httpClient: HttpClient) {}

  public getTramStations(Value: string): Observable<ITramModel[]> {
    return this.httpClient.post<ITramModel[]>(`${this.serverPrefix}${this.tramStations}`, { Value})
  }

  public getAllTramStations(): Observable<ITramModel[]> {
    return this.httpClient.get<ITramModel[]>(`${this.serverPrefix}${this.tramStations}`);
  }

  public getTramRoutes(Value: string): Observable<ITramModel[]> {
    return this.httpClient.post<ITramModel[]>(`${this.serverPrefix}${this.tramRoutes}`, { Value})
  }

  public getAllTramRoutes(): Observable<ITramModel[]> {
    return this.httpClient.get<ITramModel[]>(`${this.serverPrefix}${this.tramRoutes}`);
  }

  public getSchedule(body) {
    return this.httpClient.post(`${this.serverPrefix}${this.scheduleUrl}`, body, {responseType: 'text'});
  }
}
