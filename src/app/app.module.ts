// module configuration for the application
// NgModule decorator defines and configures angular modules
import { NgModule } from '@angular/core';
// works with Angular's template-driven forms
import { FormsModule } from '@angular/forms';
// services and features for browser-based apps
import { BrowserModule } from '@angular/platform-browser';

// app's root component - entry point for other components
import { AppComponent } from './app.component';
// custom component to display a list of todos
import { TodosComponent } from './components/todos/todos.component';

// typescript for inserting components to be used in the app
@NgModule({
  // array that lists all the components, directives, and pipes that belong to this module
  declarations: [
    AppComponent,
    TodosComponent
  ],
  // array that lists other modules that this module depends on
  imports: [
    BrowserModule,
    FormsModule
  ],
  // services that will be available within the module
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
