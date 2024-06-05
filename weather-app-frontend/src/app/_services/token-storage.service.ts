import { Injectable } from '@angular/core';

const TOKEN_KEY:string = 'accessToken';
const USERNAME_KEY :string = 'username';
const ROLES :string = 'roles';
const USER_DETAIL_KEY :string = 'userDetails';
const IS_LOGGED_IN :string = "isLoggedIn";

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string|null {
    let token = window.sessionStorage.getItem(TOKEN_KEY); 
    return token? JSON.parse(token):null; 
  }

  public saveUser(user:any): void {
    window.sessionStorage.removeItem(USER_DETAIL_KEY);
    window.sessionStorage.setItem(USER_DETAIL_KEY, JSON.stringify(user));
    window.sessionStorage.removeItem(ROLES);
    window.sessionStorage.setItem(ROLES, JSON.stringify(user.roles));
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, JSON.stringify(user.username));
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, JSON.stringify(user.accessToken));
  }

  public getCurrentUser(): any {
    let user = window.sessionStorage.getItem(USER_DETAIL_KEY);
    return user? JSON.parse(user):null;
  }
  public getCurrentUsername(): String {
    let authUser = sessionStorage.getItem(USERNAME_KEY);
    return authUser? JSON.parse(authUser):null;
  }
  
  public setIsLoggedIn(value: boolean): any {
    return sessionStorage.setItem( IS_LOGGED_IN, JSON.stringify(value) );
 
  }
  public getIsLoggedIn(): any {
    let isLoggedIn = sessionStorage.getItem( IS_LOGGED_IN);
    return isLoggedIn?JSON.parse(isLoggedIn):false;
 
  }
}
