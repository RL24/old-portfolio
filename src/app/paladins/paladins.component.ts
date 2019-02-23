import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-paladins',
  templateUrl: './paladins.component.html',
  styleUrls: ['./paladins.component.scss']
})
export class PaladinsComponent {

  public searchResults: string[] = [];
  public loadingResults: boolean;

  constructor(private http: HttpClient) { }

  public loadSearchResults(search: string): void {
    if (search.length > 0) {
      this.http.get(`/api/paladins/history/name?u=${search}`).subscribe((next) => {
        if (next != null) {
          console.log(next);
        } else {
          console.error('A response occurred but no value was provided: loadSearchResults');
        }
      }, (error) => {
        if (error != null) {
          console.error('An error occurred: loadSearchResults', error);
        } else {
          console.error('An error occurred but no error was provided: loadSearchResults');
        }
      });
    }
  }

}

