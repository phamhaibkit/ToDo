import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITask } from './../modals/list';
import { TodoTaskService } from '../services/todo-task.service';
import { TodoListService } from '../services/todo-list.service';

@Component({
  selector: 'app-todo-list-detail',
  templateUrl: './todo-list-detail.component.html',
  styleUrls: ['./todo-list-detail.component.scss']
})
export class TodoListDetailComponent implements OnInit {
  listName = '';
  newTask = '';
  tasks: ITask[] = [];
  listId: number;
  isEditTask = false;
  constructor(private route: ActivatedRoute, private todoTaskService: TodoTaskService, private todoListService: TodoListService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.listId = +params.get('id');
      this.listName = params.get('name');
      this.getTasks();
      console.log('PRAMPARMSSSS===', params, params.get('name'), params.get('id'));
    });
  }

  getTasks() {
    this.todoTaskService.getTasks(this.listId).subscribe(res => {
      this.tasks = res;
    }, error => {
      console.log('getTasks Error', error);
    });
  }

  editListName() {
    this.todoListService.updateList(this.listId, this.listName).subscribe(res => {
      console.log('RESS', res);
    }, error => {
      console.log('getTasks Error', error);
    });
  }

  addNewTask() {
    this.todoTaskService.createTask(this.listId, this.newTask).subscribe(res => {
      this.tasks.unshift(res);
      this.newTask = '';
    }, error => {
      console.log('createTask Error', error);
    });
  }

  onCheckbox(taskId: number) {
    this.tasks.map( item => {
      if (item.id === taskId) {
        item.completed = !item.completed;
        this.todoTaskService.updateTask(this.listId, taskId, item).subscribe(res => {
          console.log('RESS', res);
        }, error => {
          console.log('deleteList Error', error);
        });
      }
    });
  }

  deleteTask(id: number) {
    this.todoTaskService.deleteTask(this.listId, id).subscribe(res => {
      const index = this.tasks.findIndex(obj => obj.id === id);
      this.tasks.splice(index, 1);
    }, error => {
      console.log('deleteList Error', error);
    });
  }

  editTask(id: number) {

  }

}
