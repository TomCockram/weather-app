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
      `https://api.weatherapi.com/v1/current.json?key=da44e57457b841df961163400210612&q=${latitude},${longitude}`
    );
  }

  getLocation(location: string) {
    return this.http.get<GeocodingModel>(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoidG9tY29ja3JhbSIsImEiOiJja3ZpYWo4dWsxcmJ0MzBuM2x4dzJ1b3J2In0.50tAlCeWmoDAxzxOIcdXiQ`
    );
  }
}
