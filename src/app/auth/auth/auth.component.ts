import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router,
        ActivatedRoute,
        CanActivate,
        ActivatedRouteSnapshot,
        RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';
import { User } from '../auth.model';
import { Subscription, Observable } from 'rxjs';


let enter = false;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  mode: string;
  form: FormGroup;
  users: User[];
  routeSub: Subscription;
  usersSub: Subscription;
  constructor(public router: Router,
              public route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
    this.setMode();
    this.initForm();
    this.getUsers();
  }
  getUsers() {
    this.usersSub = this.authService.getUsers()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c =>
            ({...c.payload.doc.data(), id: c.payload.doc.id})
          )
        )
      )
      .subscribe(data => {
        this.users = data;
      });
  }
  initForm() {
    this.form = new FormGroup({
      login: new FormControl(null, {
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        validators: []
      }),
      password: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }
  setMode() {
    this.routeSub = this.route.paramMap.subscribe(paramMap => {
      this.mode = paramMap.get('param');
    });
  }
  register() {
    const newUser: User = {
      id: '',
      login: this.form.value.login,
      email: this.form.value.email,
      password: this.form.value.password
    };
    this.form.get('email').setValidators([Validators.required, Validators.email]);
    this.form.get('email').updateValueAndValidity();
    if (this.form.invalid) {
      return;
    }
    const logins = this.users.map(u => u.login);
    const emails = this.users.map(u => u.email);
    if (logins.indexOf(newUser.login) !== -1) {
      alert('User with this name already exist');
      return;
    }
    if (emails.indexOf(newUser.email) !== -1) {
      alert('User with this email already exist');
      return;
    }
    this.authService.createUser(newUser);
    alert('Registered');
    this.mode = 'login';
  }
  login() {
    this.form.get('email').clearValidators();
    this.form.get('email').updateValueAndValidity();
    if (this.form.invalid) {
      return;
    }
    const user = {
      login: this.form.value.login,
      password: this.form.value.password
    };
    const login = user.login;
    const filtered = this.users.filter(item => {
      return item.login === login;
    });
    if (filtered.length === 0) {
      // tslint:disable-next-line:quotemark
      alert("This user doesn't exist");
      return;
    } else if (filtered[0].password !== user.password) {
      alert('Enter correct password');
      return;
    } else {
      enter = true;
      this.authService.setUser(login);
      this.router.navigate([`users/${login}`]);
    }
  }
  onSendAuth() {
    if (this.mode === 'register') {
      this.register();
    } else if (this.mode === 'login') {
      this.login();
    }
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.usersSub.unsubscribe();
  }
}
export class UserGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (!enter) {
      this.router.navigate(['']);
    }
    return enter;
  }
}
