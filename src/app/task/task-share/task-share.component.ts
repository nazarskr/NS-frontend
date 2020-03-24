import { Component, OnInit, OnDestroy, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { TaskService } from '../../task/task.service';
import { Task } from '../task.model';
import { User } from '../../auth/auth.model';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-task-share',
  templateUrl: './task-share.component.html',
  styleUrls: ['./task-share.component.scss']
})
export class TaskShareComponent implements OnInit, OnChanges, OnDestroy {
  @Input() taskId: string;
  @Input() userTasks: Task[];
  @Output() resetTaskId: EventEmitter<string> = new EventEmitter();
  users: User[];
  task: Task;
  taskUsers: string[] = [];
  usersSub: Subscription;
  taskSub: Subscription;
  constructor(private authService: AuthService,
              private taskService: TaskService) { }

  ngOnInit() {
    this.getUsers();
  }
  ngOnChanges() {
    this.getUser();
  }
  getUsers() {
    this.usersSub = this.authService.getUsers()
      .snapshotChanges()
      .pipe(
        map(changes =>
          (changes.map(c =>
            ({...c.payload.doc.data(), id: c.payload.doc.id})
          ))
        )
      )
      .subscribe(data => {
        this.users = data;
      });
  }
  getUser() {
    if (this.userTasks.length > 0) {
      this.taskSub = this.taskService.getTask(this.taskId)
      .snapshotChanges()
      .subscribe(data => {
        if (data.payload.data()) {
          this.task = {
            id: this.taskId,
            title: data.payload.data().title,
            content: data.payload.data().content,
            users: data.payload.data().users
          };
          this.taskUsers = this.task.users;
        }
      });
    } else if (this.userTasks.length === 0) {
      this.taskSub.unsubscribe();
    }
  }
  onShareTask(user) {
    this.task.users.push(user);
    this.taskService.shareTask(this.task.id, this.task.users);
  }
  hide() {
    this.resetTaskId.emit('');
    this.taskSub.unsubscribe();
  }
  ngOnDestroy() {
    this.usersSub.unsubscribe();
    this.taskSub.unsubscribe();
  }
}
