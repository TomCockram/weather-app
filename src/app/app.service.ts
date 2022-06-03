import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeocodingModel } from './model/geocoding-model';
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
}
