import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastService } from '../_services/toast.services';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  action: string = 'login';

  loginForm: FormGroup;
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      this.action = params['action'];
    });

    if (this.tokenStorageService.getIsLoggedIn()) {
      this.router.navigate(['/home']);
    } else {
      localStorage.clear();
      sessionStorage.clear();
    }

  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  }


  submitLogin() {

    this.loginForm.markAllAsTouched();
    if (!this.loginForm.valid) {
      this.toast.error("Please fill all required fields.", "Invalid Form");
      return;
    }

    let loginPayload = this.loginForm.value;
    this.authService.submitLogin(loginPayload).subscribe({
      next: (res: any) => {
        this.tokenStorageService.setIsLoggedIn(true);
        this.tokenStorageService.saveUser(res);
        this.loginForm.reset();
        window.location.reload();
        this.router.navigate(['']);
      } ,
      error: err => {
        this.toast.error('Invalid username / password', "Login Error");
        this.toast.error(err?.error?.message, "Login Error");
        this.tokenStorageService.setIsLoggedIn(false);
        this.tokenStorageService.signOut();
  
      }
    }
    );

   
  }

  submitSignup() {

    this.signupForm.markAllAsTouched();
    if (!this.signupForm.valid) {
      this.toast.error("Please fill all required fields.", "Invalid Form");
      return;
    }

    let signinPayload = this.signupForm.value;
    this.authService.submitSingin(signinPayload).subscribe({
      next: (res: any) => {
        this.toast.success('Login now', "Success");
        this.signupForm.reset();
        this.action='login';
      }
      ,
      error: (err: { error: { message: string; }; }) => {
        this.toast.error('Invalid username / email / password',  "Invalid Form");
        this.toast.error(err.error.message, "Registration Error");
        this.tokenStorageService.setIsLoggedIn(false);
  
      }
    }
    );

   
  }


  

  reloadPage(): void {
    window.location.reload();

  }

  takeAction(action: string){
    this.action=action;
  }



}
