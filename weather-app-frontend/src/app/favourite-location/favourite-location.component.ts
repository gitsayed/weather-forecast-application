import { Component, OnInit } from '@angular/core';
import { ToastService } from '../_services/toast.services';
import { MeteoLocationService } from '../location-services/meteo-location-service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { LazyLoadEvent } from 'primeng/api';
import { Location } from '@angular/common';

const documentStyle = getComputedStyle(document.documentElement);

@Component({
  selector: 'app-favourite-location',
  templateUrl: './favourite-location.component.html',
  styleUrls: ['./favourite-location.component.css']
})
export class FavouriteLocationComponent implements OnInit {


  loading: boolean = false;
  favouriteLocaitonFound: boolean = false;
  locationDetail: any;
  forecastDays = '16';
  currentUser: any;
  favouriteLocations: any[] = [];
  totalFavouriteLocationRecords: number = 0;
  totalFavouriteLocationPages: number = 0;
  selectedRow: any;

  constructor(
    private toast: ToastService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private storageService: TokenStorageService,
    private locationService: MeteoLocationService,
  ) {
    this.currentUser = storageService.getCurrentUser();
  }


  ngOnInit() {

  }

  onFavouriteLocationInfoLazyLoad(event: LazyLoadEvent) {

    let map = new Map<string, any>();
    map.set('userId', this.currentUser.id);
    if (event.first) { map.set('page', event.first / 10); }
    map.set('size', 10);
    this, this.locationService.fecthPagedFavouriteLocations(map).subscribe({
      next: res => {
        this.loading=false;
        if ('content' in res) {
          this.favouriteLocations = res.content;
          this.totalFavouriteLocationRecords = (+(res.size) * + (res.totalPages));
          this.toast.success(res.content.length+" favourite locations received.");
        }

      },
      error: err => {
        this.loading = false;
        this.toast.error(err.message, 'Http Error');
      }
    })
  }



  onFavouriteLocationRowSelect(row: any) {

    if(row){
      this.router.navigate(['/weather-forecast'], {queryParams:{location_detail: JSON.stringify(row.data)}});
    }
  }



  goBack(event:any){
    this.location.back();
}

}




