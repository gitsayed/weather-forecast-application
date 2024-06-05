import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

import {  PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[]=[];
  loggedIn : boolean = false;
  username: string='';

  constructor(
    private tokenStorageService: TokenStorageService,
    private primengConfig: PrimeNGConfig,
    private router : Router

  ) {

 
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.loggedIn = this.tokenStorageService.getIsLoggedIn() && this.tokenStorageService.getToken()? true : false;

    if (this.loggedIn) {
      const user = this.tokenStorageService.getCurrentUser();
      this.roles = user.roles;
      this.username = user.username;
    }else{
      this.goToSignin();
    }
  }


  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }


  goToSignin(){
    this.router.navigate(['/login'], {queryParams: {action: 'login'}});

  }

  goToSignup(){
    this.router.navigate(['/login'], {queryParams: {action: 'signup'}});

  }
}
