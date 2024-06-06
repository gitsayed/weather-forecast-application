import { Component, OnInit } from '@angular/core';
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

  selectedLocation: any = '';

  cityList: GeoCity[] = [];

  constructor(
    private toast: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private locationService: MeteoLocationService,
    private storageService: TokenStorageService) { }


  ngOnInit() {

  }


  onCityChanges(event: any) {

  }

  submitLocationName(event: any) {
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
    })

  }


  onLocationTableRowSelect(event: any) {
    this.toast.info('Selected Location : ' + event.data.name);
    this.router.navigate(['weather-forecast'], { queryParams: { location_detail: JSON.stringify(event.data) } });

  }

  clear(table: Table) {
    table.clear();
  }


}




