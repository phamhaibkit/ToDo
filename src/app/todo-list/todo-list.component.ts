import { Component, OnInit } from '@angular/core';
import { IList } from '../modals/list';
import { TodoListService } from '../services/todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  label = 'ToDo Lists';
  newList = '';
  lists: IList[] = [];
  constructor(private todoListService: TodoListService) { }

  ngOnInit() {
    this.todoListService.getLists().subscribe(res => {
      this.lists = res;
    }, error => {
      console.log('getLists Error', error);
    });
  }

  addNewList() {
    this.todoListService.createList(this.newList).subscribe(res => {
      this.lists.unshift(res);
      this.newList = '';
    }, error => {
      console.log('createList Error', error);
    });
  }

  deleteList(id: number) {
    this.todoListService.deleteList(id).subscribe(res => {
      const index = this.lists.findIndex(obj => obj.id === id);
      this.lists.splice(index, 1);
    }, error => {
      console.log('deleteList Error', error);
    });
  }

}
