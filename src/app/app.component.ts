
import { AuthenticationResult } from '@azure/msal-browser';
import { MsalService } from '@azure/msal-angular';
import { Component, OnInit } from '@angular/core';
import { HelloService } from './services/hello.service';
import { Title } from '@angular/platform-browser';
import { UsersService } from './services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Stock Tracker Application';
  message: string | undefined;
  currentUser: any;
  users: any[];

  constructor(
    private router:Router,
    private authService: MsalService,
    private helloService: HelloService,
    private usersService: UsersService,
    private titleService: Title) {
    this.users = [];

  }
  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.authService.instance.handleRedirectPromise().then(res => {
      if (res != null && res.account != null) {
        this.authService.instance.setActiveAccount(res.account)
      }
    })
    this.getUsers();
  }

  isLoggedIn(): boolean {
    // const user = "girishbalanagu@outlook.com"
    // return this.authService.instance.getActiveAccount() != null;
    const user = this.users.find(user => user.email === this.authService.instance.getActiveAccount()?.username)
    this.currentUser = user;
    return user ? true : false;
  }

  login() {
    // this.authService.loginRedirect();

    this.authService.loginPopup()
      .subscribe((response: AuthenticationResult) => {
        this.authService.instance.setActiveAccount(response.account);
        this.isLoggedIn();
        this.currentUser.role == 'admin'?this.router.navigate(['/admin']) : this.router.navigate(['/analyst']);
        
      });
      
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/'])
  }
  
  getUsers() {
    this.usersService.getUsers().subscribe((users: any[]) => {
      this.users = users;
    })
  }
}
