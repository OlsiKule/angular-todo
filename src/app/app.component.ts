// imports the 'component' decorator from @angular/core package
import { Component } from '@angular/core';

// decorator fxn that defines and configures components
// provides metadata and configuration for the component.
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// exports the AppComponent class so that it can be imported and used in other parts of the application
export class AppComponent {
  title = 'angular-todo';
}
