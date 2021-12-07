import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  getWeather(latitude: number, longitude: number) {
    return this.http.get(
      `http://api.weatherapi.com/v1/current.json?key=da44e57457b841df961163400210612&q=${latitude},${longitude}`
    );
  }
}
