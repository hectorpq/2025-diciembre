import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ApiService} from './core/services/api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'dad-frontend';

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.getVentas().subscribe(response => {
      console.log(response);
    });
  }
}

