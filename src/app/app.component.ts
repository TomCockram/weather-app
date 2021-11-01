import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private http: HttpClient) {}

  private subs = new SubSink();
  dummyData = {};
  location: string = '';
  weatherDescription: string = '';
  windSpeed = '';
  temperature = '';
  hideDataObject = true;
  imgSrc = '';
  time = '';
  dataLocation = '';

  ngOnInit() {
    this.getWeatherData('horsham');
  }

  onKey(event: any) {
    this.location = event.target.value;
  }

  getWeatherData(location: string) {
    this.subs.sink = this.http
      .get(
        `http://api.weatherstack.com/current?access_key=0e50280b1799d67ffb967d013b015c5f&query=${location}`
      )
      .subscribe((weatherObject: any) => {
        this.dummyData = weatherObject;
        this.weatherDescription = weatherObject.current.weather_descriptions[0];
        this.windSpeed = weatherObject.current.wind_speed;
        this.temperature = weatherObject.current.temperature;
        this.imgSrc = weatherObject.current.weather_icons[0];
        this.time = weatherObject.current.observation_time;
        this.dataLocation = weatherObject.location.name;
      });
  }

  toggleDataObject() {
    this.hideDataObject = !this.hideDataObject;
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
