import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
// OnInit interface:  precursor to lifecycle hook method called ngOnInit()
export class TodosComponent implements OnInit {
// todo property with empty array
  todos: Todo[] = [];

// inputTodo property with empty string
  inputTodo: string = "";

  // constructor method used for dependency injection and initialization
  constructor() {}

  // lifecycle hook called after component is initialized
  ngOnInit(): void {
    this.todos = [
      // this is the blueprint of a given todo item
      // {
      //   content: "",
      //   completed: false
      // }
    ];
  }
// method used to toggle the completed property
  toggleDone (id: number) {
    // value, ID as params
    this.todos.map((v, i) => {
      if (i == id) v.completed = !v.completed;
      return v;
    })
  }



  // method to delete a todo item from array
  deleteTodo (id: number) {
    this.todos = this.todos.filter((v, i) => i != id);
  }

  // method to add a new todo item to array
  addTodo () {
    // prevents empty strings from being added to the list
    if (this.inputTodo.trim() !== '') {
          this.todos.push ({
            content: this.inputTodo,
            completed: false
          });
      this.inputTodo = "";
    }
  }
}
