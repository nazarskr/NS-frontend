import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {
  taskId: string;
  userName: string;
  tasks: Task[] = [];
  userTasks: Task[] = [];
  tasksSub: Subscription;
  routeSub: Subscription;
  constructor(private taskService: TaskService,
              public route: ActivatedRoute) { }

  ngOnInit() {
    this.getTasks();
  }
  getTasks() {
    this.tasksSub = this.taskService.getTasks()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(change =>
            ({...change.payload.doc.data(), id: change.payload.doc.id})
          )
        )
      )
      .subscribe( data => {
        this.tasks = data;
        this.setUser();
        this.userTasks = this.tasks.filter(task => {
          return task.users.indexOf(this.userName) !== -1;
        });
      });
  }
  setUser() {
    this.routeSub = this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.userName = paramMap.get('name');
    });
  }
  shareTask(id) {
    this.taskId = id;
  }
  resetTaskId(id) {
    this.taskId = id;
  }
  onDelete(id) {
    const sure = confirm('Are you sure?');
    if (sure) {
      this.taskService.deleteTask(id);
    } else {
      return;
    }
  }
  ngOnDestroy() {
    this.tasksSub.unsubscribe();
    this.routeSub.unsubscribe();
  }

}
