import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { InvalidAccessComponent } from './invalid-access/invalid-access.component';
import { AuthGuard } from './_authGuard/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { WeatherForcecastComponent } from './weather-forecast/weather-forecast.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent  , canActivate: [AuthGuard], data: {roles: ['ROLE_USER', 'ROLE_ADMIN']} },
  { path: 'weather-forecast', component: WeatherForcecastComponent  , canActivate: [AuthGuard], data: {roles: ['ROLE_USER', 'ROLE_ADMIN']} },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_USER', 'ROLE_ADMIN']} },
  { path: 'invalid-access', component: InvalidAccessComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
