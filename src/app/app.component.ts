import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { AppService } from './app.service';
import { GeocodingModel } from './model/geocoding-model';
import { UnsplashModel } from './model/unsplash.model';
import { WeatherModel } from './model/weather-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private appService: AppService) {}

  private subs = new SubSink();
  weatherObject: WeatherModel | undefined;
  geocodingObject: GeocodingModel | undefined;
  longitude = 0;
  latitude = 0;
  locationWrong = false;
  userLocation = '';
  userCity = '';
  backgroundImageURL = '';

  ngOnInit() {
    this.getLocation();
  }

  logAPIKey() {
    console.log(`${process.env.UNSPLASH_ACCESS_KEY}`);
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
    this.subs.add(
      this.appService
        .getWeather(this.latitude, this.longitude)
        .subscribe((weatherObject: WeatherModel) => {
          this.weatherObject = weatherObject;
        })
    );
    this.getRandomImage();
  }

  wrongLocation() {
    this.locationWrong = !this.locationWrong;
  }

  getCorrectLocation() {
    if (this.userLocation) {
      this.subs.add(
        this.appService
          .getLocation(this.userLocation)
          .subscribe((data: GeocodingModel) => {
            this.geocodingObject = data;
            this.subs.sink = this.appService
              .getWeather(
                this.geocodingObject.features[0].center[1],
                this.geocodingObject.features[0].center[0]
              )
              .subscribe((weatherObject: WeatherModel) => {
                this.weatherObject = weatherObject;
              });
          })
      );
      this.getRandomImage();
    }
  }

  getCityName() {
    this.appService
      .getLocation(this.userLocation)
      .subscribe((result: GeocodingModel) => {
        this.userCity = result.features[0]?.text;
      });
  }

  getRandomImage() {
    this.getCityName();
    this.appService
      .getRandomLocation(this.userCity)
      .subscribe((result: UnsplashModel) => {
        console.log(result);
        this.backgroundImageURL = result.urls.raw;
      });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
