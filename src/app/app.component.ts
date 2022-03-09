import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { AppService } from './app.service';
import { WeatherModel } from './model/weather-model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private appService: AppService) {}

  private subs = new SubSink();
  weatherObject: WeatherModel | undefined;
  longitude = 0;
  latitude = 0;

  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
        this.getWeatherData();
      });
    } else {
      console.log('No support for geolocation');
    }
  }

  getWeatherData() {
    this.appService
      .getWeather(this.latitude, this.longitude)
      .subscribe((weatherObject: WeatherModel) => {
        console.log(weatherObject);

        this.weatherObject = weatherObject;
      });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
