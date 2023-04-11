import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeocodingModel } from './model/geocoding-model';
import { UnsplashModel } from './model/unsplash.model';
import { WeatherModel } from './model/weather-model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  getWeather(latitude: number, longitude: number) {
    return this.http.get<WeatherModel>(
      `.netlify/functions/getWeather?latitude=${latitude}&longitude=${longitude}`
    );
  }

  getLocation(location: string) {
    return this.http.get<GeocodingModel>(
      `.netlify/functions/getLocation?location=${location}`
    );
  }

  getRandomLocation(location: string) {
    return this.http.get<UnsplashModel>(
      `.netlify/functions/getRandomImage?location=${location}`
    );
  }
}
