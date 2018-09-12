import {Component} from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {

  constructor() {
  }

  public navigate(url: string): void {
    window.open(url);
  }

}
