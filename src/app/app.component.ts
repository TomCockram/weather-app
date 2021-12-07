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

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
      });
    } else {
      console.log('No support for geolocation');
    }
  }

  getWeatherData() {
    if (!this.latitude && this.longitude) {
      alert('Please allow this app to access your location');
    }

    this.http
      .get(
        `http://api.weatherapi.com/v1/current.json?key=da44e57457b841df961163400210612&q=${this.latitude},${this.longitude}`
      )
      // use weather model
      .subscribe((weatherObject: any) => {
        this.country = weatherObject.location.country;
        this.name = weatherObject.location.name;
        this.time = weatherObject.location.localtime;
        this.temperature = weatherObject.current.temp_c;
        this.feelsLike = weatherObject.current.feelslike_c;
        this.imgSrc = weatherObject.current.condition.icon;
      });
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
        console.log(this.longitude, this.latitude);
      });
    } else {
      console.log('No support for geolocation');
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
