import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}

  dummyData = {};

  ngOnInit() {
    this.http
      .get(
        'http://api.weatherstack.com/current?access_key=0e50280b1799d67ffb967d013b015c5f&query=horsham'
      )
      .subscribe((testData) => {
        this.dummyData = testData;
      });
  }
}
