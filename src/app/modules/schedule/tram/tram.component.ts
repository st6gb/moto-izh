import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval, Observable, Subject } from 'rxjs';
import { debounce, switchMap, take } from 'rxjs/internal/operators';

import { ITramModel, TramService } from './tram.service';

@Component({
  selector: 'app-tram',
  templateUrl: './tram.component.html',
  styleUrls: ['./tram.component.sass'],
  providers: [TramService],
})
export class TramComponent implements OnInit {

  routes: ITramModel[] = [];
  stations: ITramModel[] = [];
  scheduleTramForm: FormGroup;
  stationName: Subject<string> = new Subject();

  constructor(
    private fb: FormBuilder,
    private tramService: TramService,
  ) {
    this.createScheduleTramForm();
  }

  ngOnInit() {
    console.log();
    this.tramService.getAllTramRoutes().subscribe(routes => {
      this.routes = routes;
    });
    this.tramService.getAllTramStations().subscribe(stations => {
      this.stations = stations;
    });
    this.scheduleTramForm.get('tramsStation').valueChanges.subscribe(data => {
      console.log(data);
    });

    this.stationName.pipe(
      debounce(() => interval(300)),
      switchMap(data => {
        return this.tramService.getTramStations(data);
      })
    ).subscribe(stations => {
      this.stations = stations;
    });
  }

  displayFn(station: ITramModel): string {
    return station.Name;
  }

  handleChangeStation(value: string) {
    this.stationName.next(value);
  }

  private createScheduleTramForm(): void {
    this.scheduleTramForm = this.fb.group({
      tramRoute: [0, [Validators.required]],
      tramsStation: [0, [Validators.required]],
      scheduleTrams: ['', [Validators.required]]
    });
  }
}
