import { Component } from '@angular/core';
import { BasicService } from './utils/basic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cars-crud';

  constructor(
    public basicService: BasicService
  ) { }
}
