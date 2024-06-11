import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { ToastService } from '../_services/toast.services';
import { Table } from 'primeng/table';
import { MeteoLocationService, httpOptions } from '../location-services/meteo-location-service';
import { GeoCity } from '../model/city-location.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  selectedLocation: any = '';

  cityList: GeoCity[] = [];

  currentUser:any;

  constructor(
    private toast: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private locationService: MeteoLocationService,
    private storageService: TokenStorageService) { }


  ngOnInit() {
    this.currentUser = this.storageService.getCurrentUser();
  }

  loadDocument(name: string) {
    const url = 'https://geocoding-api.open-meteo.com/v1/search?name='+name; 

    this.httpClient.get(url)
      .pipe(
    
      ).subscribe(response => {
        console.log('loadDocument ', response);   
        // console.log(JSON.parse(response));   
      
      });
  }

  submitLocationName(event: any) {
    // this.loadDocument(this.selectedCity);
    this.loading = true;
    this.locationService.fetchLocations(this.selectedCity).subscribe({
      next: (res) => {
        this.loading = false;
        
        if ('results' in res) {
          this.cityList = res.results;
          if (this.cityList) {
            this.toast.success("Total : " + this.cityList.length + " Locations found.");
            this.selectedCity='';
            this.loading = false;
          }
        } else {
          this.toast.info("No location found.");
          this.loading = false;
        }
      },
      error: err => {
        this.loading = false;
        this.toast.error(err.message, 'Http Error');
      }
    });

  }


  onLocationTableRowSelect(event: any) {
    this.toast.info('Selected Location : ' + event.data.name);
    this.router.navigate(['weather-forecast'], { queryParams: { location_detail: JSON.stringify(event.data) } });

  }



  actionClick(location_detail:any){
   location_detail.user_id= this.currentUser.id
   this.locationService.saveFavouriteLocation(location_detail).subscribe({
     next: res => {
      this.loading = false;
       this.toast.success("Favourite location has been saved successfully.");
     },

     error: err => {
       this.loading = false;
       this.toast.error(err.error, 'Save Operation Fail');
     }
   })

  }

}




