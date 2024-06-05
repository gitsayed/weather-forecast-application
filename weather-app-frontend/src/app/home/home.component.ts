import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ToastService } from '../_services/toast.services';
import { Table } from 'primeng/table';
import { MeteoLocationService } from '../location-services/meteo-location-service';
import { GeoCity } from '../model/city-location.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn: boolean = false;
  content: string = '';

  statuses: any[] = [];

  loading: boolean = false;

  activityValues: number[] = [0, 100];

  selectedCity = '';

  selectedLocation :any = '';

  cityList: GeoCity[] = [];

  constructor(
    private toast: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private locationService: MeteoLocationService,
    private storageService: TokenStorageService,
    private userService: UserService) { }


  ngOnInit() {

    // this.router.navigate(['/weather-forecast']);

  }


  onCityChanges(event: any) {
    console.log('city :: ', event);

  }

  submitCityName(event: any) {
    this.loading = true;
    this.locationService.fetchCities(this.selectedCity).subscribe({
      next: (res) => {
        this.loading= false;
        this.cityList = res.results;
        if (this.cityList) {
          this.toast.success("Total : " + this.cityList.length + " Cities found.");
          this.loading=false;
        }
      },
      error: err => {
        this.loading= false;
        this.toast.error(err.error.message, 'Http Error');
      }
    })

  }


  onCityTableRowSelect(event:any){
    this.toast.info( 'Selected City : '+ event.data.name);
    this.router.navigate(['weather-forecast'], {queryParams:{location_detail: JSON.stringify(event.data)}});
    
  }

  clear(table: Table) {
    table.clear();
  }


}




