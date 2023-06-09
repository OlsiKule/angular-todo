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

  // property to track edit mode
  editMode: boolean = false;
  // property to store the index of the todo being edited
  editedTodoIndex: number = -1;

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
    });
  }



  // method to delete a todo item from array
  deleteTodo (id: number) {
    this.todos = this.todos.filter((v, i) => i != id);
  }

  // method to add a new todo item to array
  addTodo() {
    if (this.inputTodo.trim() !== '') {
      if (this.editMode) {
        // Update the existing todo item in edit mode
        this.todos[this.editedTodoIndex].content = this.inputTodo;
        this.editMode = false;
        this.editedTodoIndex = -1;
      } else {
        // Add a new todo item
        this.todos.push({
          content: this.inputTodo,
          completed: false
        });
      }
      this.inputTodo = "";
    }
  }

  editTodo (id: number) {
    this.inputTodo = this.todos[id].content;
    this.editMode = true;
    this.editedTodoIndex = id;
  }
}
