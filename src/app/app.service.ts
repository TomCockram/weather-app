import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GeocodingModel } from './model/geocoding-model';
import { WeatherModel } from './model/weather-model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  getWeather(latitude: number, longitude: number) {
    return this.http.get<WeatherModel>(
      `https://api.weatherapi.com/v1/current.json?key=${environment.keys.weather_api_key}q=${latitude},${longitude}`
    );
  }

  getLocation(location: string) {
    return this.http.get<GeocodingModel>(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${environment.keys.mapBox__access_token}`
    );
  }
}
