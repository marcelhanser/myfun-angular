import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private http: HttpClient) {
  }

  title = 'app';
  results: any;

  fetchData(): void {
    this.http.get('https://0myff4njvi.execute-api.eu-west-1.amazonaws.com/Stage').subscribe(data => {
      // Read the result field from the JSON response.
      this.results = data;
    });
  }
}
