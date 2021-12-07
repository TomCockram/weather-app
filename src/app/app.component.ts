import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private appService: AppService) {}

  private subs = new SubSink();

  dummyData = {};
  name = '';
  country = '';
  weatherDescription: string = '';
  windSpeed = '';
  temperature = '';
  feelsLike = '';

  imgSrc = '';
  time = '';
  locationName = '';

  longitude = 0;
  latitude = 0;
  showWeather = false;

  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
        console.log(this.latitude, this.longitude);
        this.getWeatherData();
      });
    } else {
      console.log('No support for geolocation');
    }
  }

  getWeatherData() {
    this.appService
      .getWeather(this.latitude, this.longitude)
      .subscribe((weatherObject: any) => {
        console.log(weatherObject);
        this.showWeather = true;
        this.country = weatherObject.location.country;
        this.name = weatherObject.location.name;
        this.time = weatherObject.location.localtime;
        this.temperature = weatherObject.current.temp_c;
        this.feelsLike = weatherObject.current.feelslike_c;
        this.imgSrc = weatherObject.current.condition.icon;
      });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
