import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {
  task: Task;
  form: FormGroup;
  login: string;
  mode = 'create';
  taskId: string;
  constructor(private taskService: TaskService,
              private authService: AuthService,
              public route: ActivatedRoute,
              private router: Router) {
              }

  ngOnInit() {
    this.initForm();
    this.setFormVal();
    this.getUser();
  }
  getUser() {
    this.authService.getUser().subscribe(data => {
      this.login = data.login;
    });
  }
  initForm() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required]
      }),
      content: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }
  setFormVal() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('taskId')) {
        this.mode = 'edit';
        this.taskId = paramMap.get('taskId');
        this.taskService.getTask(this.taskId).valueChanges()
          .subscribe(data => {
            this.task = {
              id: this.taskId,
              title: data.title,
              content: data.content,
              users: data.users
            };
            this.form.setValue({
              title: this.task.title,
              content: this.task.content,
            });
        });
      } else {
        this.mode = 'create';
        this.taskId = null;
      }
    });
  }
  onSaveTask() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      const task: Task = {
        id: '',
        title: this.form.value.title,
        content: this.form.value.content,
        users: [this.login]
      };
      this.taskService.createTask(task);
    } else {
      const task = {
        id: this.task.id,
        title: this.form.value.title,
        content: this.form.value.content,
        users: this.task.users
      };
      this.taskService.updateTask(task.id, task);
    }
    this.form.reset();
    this.router.navigate([`users/${this.login}`]);
  }

}
