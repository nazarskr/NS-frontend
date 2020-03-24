import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  registered: boolean;
  login: string;
  constructor(public router: Router,
              private authService: AuthService) {
              }

  ngOnInit() {
    this.getUser();
  }
  getUser() {
    this.authService.getUser().subscribe(data => {
      this.login = data.login;
      this.registered = data.registered;
    });
  }
  homeUser() {
    this.router.navigate([`users/${this.login}`]);
  }
  logout() {
    this.login = '';
    this.registered = false;
    this.router.navigate(['/']);
  }

}
