import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loadedOption: string = 'recipe';

  navigateTransporter1($event: string) {
    this.loadedOption = $event;
  }
}
