import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject, interval } from 'rxjs';
import { catchError, switchMap, debounce } from 'rxjs/operators';
import { DialogTramComponent } from './dialog_table_schedule/dialog_table_schedule.component';

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
    public dialog: MatDialog,
  ) {
    this.createScheduleTramForm();
  }

  ngOnInit() {
    this.tramService.getAllTramRoutes().subscribe(routes => {
      this.routes = routes;
    });
    this.tramService.getAllTramStations().subscribe(stations => {
      this.stations = stations;
    });
    this.scheduleTramForm.get('scheduleTrams').valueChanges.subscribe(data => {
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

  stationsFiltered(): ITramModel[] {
    return this.stations.filter((station) => {
      return station.Value !== this.scheduleTramForm.get('tramsStationFrom').value?.Value;
    });
  }

  handleChangeStation(value: string) {
    this.stationName.next(value);
  }

  handleSubmit($event: Event) {
    $event?.preventDefault();
    this.tramService.getSchedule(this.scheduleTramForm.value)
    .pipe(
      catchError((err) => {
        console.log(err);
        return err;
      })
    )
      .subscribe(data => this.openDialog(data));
  }

  private openDialog(data): void {
    const dialogRef = this.dialog.open(DialogTramComponent, {
      width: '100%',
      data
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed', result);
    // });
  }

  private createScheduleTramForm(): void {
    this.scheduleTramForm = this.fb.group({
      tramRoute: [0, [Validators.required]],
      tramsStationFrom: [0, [Validators.required]],
      tramsStationTo: [0, [Validators.required]],
      scheduleTrams: [new Date(), [Validators.required]],
      scheduleTramsTime: [`${new Date().getHours()}:${new Date().getMinutes()}`, [Validators.required]],
      timeTrams: [30, [Validators.required, Validators.min(0)]]
    });
  }
}
