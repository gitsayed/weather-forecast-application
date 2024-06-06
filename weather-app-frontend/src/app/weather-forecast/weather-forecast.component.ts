import { Component, OnInit } from '@angular/core';
import { ToastService } from '../_services/toast.services';
import { MeteoLocationService } from '../location-services/meteo-location-service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { Location } from '@angular/common';

const documentStyle = getComputedStyle(document.documentElement);
const textColor = documentStyle.getPropertyValue('--text-color');

@Component({
  selector: 'app-weather-forcecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForcecastComponent implements OnInit {



  loading: boolean = false;
  favouriteLocaitonFound: boolean = false;
  locationDetail: any;

  forecastDays = '16';
  dailyForecastVariables = "weather_code,temperature_2m_max,temperature_2m_min,rain_sum,wind_speed_10m_max";
  hourlyForecastVariables = "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,weather_code,pressure_msl,surface_pressure,cloud_cover,visibility,wind_speed_10m,wind_speed_80m,temperature_80m,temperature_120m,temperature_180m,is_day";

  dailyResults: any[] = [];
  hourlyResults: any[] = [];

  selectedDailyWeather: any;
  daily_units: any;
  hourly_units: any;

  modalVisible = false;
  modalLoading = false;

  chartOptions: any;
  chartDataSet: any;

  currentUser: any;

  constructor(
    private toast: ToastService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private storageService: TokenStorageService,
    private locationService: MeteoLocationService,
  ) {
    this.currentUser = this.storageService.getCurrentUser();
  }


  ngOnInit() {

    this.route.queryParams.subscribe((params) => {
      this.locationDetail = JSON.parse(params['location_detail']);
      this.fetchDailyWeatherForecastInfo(this.locationDetail, this.forecastDays, this.dailyForecastVariables);
      this.getFavouriteLocationDetail(this.currentUser.id, this.locationDetail.id);
    });


  }

  fetchDailyWeatherForecastInfo(locationDetail: any, forecastDays: string, dailyForecastVariables: any) {
    let params: Map<string, any> = new Map<string, string>();
    this.loading = true;

    params.set('latitude', locationDetail.latitude);
    params.set('longitude', locationDetail.longitude);
    params.set('forecast_days', forecastDays);
    params.set('daily', dailyForecastVariables);
    this.locationService.fetchDailyWeatherForecastInfo(params).subscribe({
      next: (res) => {
        this.loading = false;
        if (res) {
          this.daily_units = res.daily_units;
          let tempArr = res.daily.time;
          if (tempArr && tempArr.length > 0) {
            for (var i = 0; i < tempArr.length; i++) {
              let obj = {
                time: res.daily.time[i],
                weather_code: res.daily.weather_code[i],
                temperature_2m_max: res.daily.temperature_2m_max[i],
                temperature_2m_min: res.daily.temperature_2m_min[i],
                rain_sum: res.daily.rain_sum[i],
                wind_speed_10m_max: res.daily.wind_speed_10m_max[i]
              }
              this.dailyResults.push(obj);
            }
          }
        }
      },
      error: err => {
        this.loading = false;
        this.toast.error(err.error.message, 'Http Error');
      }
    })

  }



  onDailyWeatherForecastRowSelect(event: any) {
    this.toast.info('Selected Day : ' + event.data.time);
    this.fetchHoulyWeatherForecastInfo(event.data.time);

  }

  fetchHoulyWeatherForecastInfo(time: string) {

    let params: Map<string, any> = new Map<string, string>();

    params.set('latitude', this.locationDetail.latitude);
    params.set('longitude', this.locationDetail.longitude);
    params.set('start_date', time);
    params.set('end_date', time);
    params.set('hourly', this.hourlyForecastVariables);

    this.modalLoading = true;
    this.modalVisible = true;
    this.locationService.fetchHourlyWeatherForecastInfo(params).subscribe({
      next: (res) => {
        this.modalLoading = false;
        if (res) {
          this.arrangeCharDataSet(res);
          this.hourlyResults = [];
          this.hourly_units = res.hourly_units;
          let tempArr = res.hourly.time;

          if (tempArr && tempArr.length > 0) {
            for (var i = 0; i < tempArr.length; i++) {
              let obj = {
                time: res.hourly.time[i],
                temperature_2m: res.hourly.temperature_2m[i],
                relative_humidity_2m: res.hourly.relative_humidity_2m[i],
                apparent_temperature: res.hourly.apparent_temperature[i],
                precipitation_probability: res.hourly.precipitation_probability[i],
                precipitation: res.hourly.precipitation[i],
                rain: res.hourly.rain[i],
                weather_code: res.hourly.weather_code[i],
                pressure_msl: res.hourly.pressure_msl[i],
                surface_pressure: res.hourly.surface_pressure[i],
                cloud_cover: res.hourly.cloud_cover[i],
                visibility: res.hourly.visibility[i],
                wind_speed_10m: res.hourly.wind_speed_10m[i],
                wind_speed_80m: res.hourly.wind_speed_80m[i],
                temperature_80m: res.hourly.temperature_80m[i],
                temperature_120m: res.hourly.temperature_120m[i],
                temperature_180m: res.hourly.temperature_180m[i],
                is_day: res.hourly.is_day[i]
              }

              this.hourlyResults.push(obj);
            }
          }

        }

      },

      error: err => {
        this.modalVisible = false;
        this.modalLoading = false;
        this.loading = false;
        this.toast.error(err.error.message, 'Http Error');
      }

    });

  }

  arrangeCharDataSet(data: any) {
    this.chartDataSet = {
      labels: data.hourly.time,
      datasets: [
        {
          label: 'Temperature 2m',
          data: data.hourly.temperature_2m,
          fill: false,
          backgroundColor: '#FF0000',
          borderColor: '#FF0000'
        },
        {
          label: 'Apparent Temperature',
          data: data.hourly.apparent_temperature,
          fill: false,

          borderColor: '#04AA6D',
          backgroundColor: '#04AA6D'
        },
        {
          label: 'Rain',
          data: data.hourly.rain,
          fill: false,
          borderColor: '#0000FF',

          backgroundColor: '#0000FF'
        },
        // {
        //   label: 'Pressure msl',
        //   data: data.hourly.pressure_msl,
        //   fill: false,
        //   borderColor: '#20B2AA',
        //   
        //   backgroundColor: '#20B2AA'
        // },
        // {
        //   label: 'Surface Pressure',
        //   data: data.hourly.surface_pressure,
        //   fill: false,
        //   type: 'line',
        //   borderColor: '#e52165',
        //   
        //   backgroundColor: '#e52165'
        // },
        // {
        //   label: 'Visibility',
        //   data: data.hourly.visibility,
        //   fill: false,
        //   type: 'line',
        //   borderColor: '#0000FF',
        //   
        //   backgroundColor: '#0000FF'
        // },
        {
          label: 'Wind speed 10m',
          data: data.hourly.wind_speed_10m,
          fill: false,
          borderColor: '#FF8C00',
          backgroundColor:  '#FF8C00'
        },
        {
          label: 'Wind speed 80m',
          data: data.hourly.wind_speed_80m,
          fill: false,
          borderColor: '#00FF00',
          backgroundColor: '#00FF00'
        },
        {
          label: 'Temperature 80m',
          data: data.hourly.temperature_80m,
          fill: false,
          borderColor: '#FFD700',

          backgroundColor: '#FFD700'
        },
        {
          label: 'Temperature 180m',
          data: data.hourly.temperature_180m,
          fill: false,
          borderColor: '#DE3163',

          backgroundColor: '#DE3163'
        },
        {
          label: 'Day/Night',
          data: data.hourly.is_day,
          fill: false,
          borderColor: '#FF00FF',

          backgroundColor: '#FF00FF'
        }
      ]
    };


    this.chartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: '#808080'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#000000',
            font_weight:'bold'
          },
          grid: {
            color: '#808080'
          }
        },
        y: {
          ticks: {
            color: '#000000',
          },
          grid: {
            color: '#808080'
          }
        }
      }
    };


  }


  saveFavouriteLocation(event: any) {
    if (this.favouriteLocaitonFound) {
      this.toast.warn("It is alreday saved as your favourite location!");
      return;
    }
    this.locationDetail.user_id= this.currentUser.id
    this.locationService.saveFavouriteLocation(this.locationDetail).subscribe({
      next: res => {
        this.toast.success("Favourite location has been saved successfully.");
        this.favouriteLocaitonFound = true;
      },

      error: err => {
        this.loading = false;
        this.toast.error(err.error, 'Save Operation Fail');
      }
    })


  }


  getFavouriteLocationDetail(userId:any, locationId:any) {

    let map = new Map<string, any>();
    map.set('userId', userId);
    map.set('locationId', locationId);

    this.locationService.fecthFavouriteLocation(map).subscribe({next:res=>{

      if(res){
        if(res.id==this.locationDetail.id && 
          res.latitude==this.locationDetail.latitude && 
          res.longitude == this.locationDetail.longitude &&
          res.user_id == this.currentUser.id
        ){
          this.favouriteLocaitonFound = true;
        this.toast.success('This is one of your favourite location.');
        }
        
      }
    },
    error: err => {
      this.toast.error(err.error, 'Http Error');
    }
  })


  }


  onCloseHourlyModal(event: any) {
    this.modalVisible = false;
    this.modalLoading = false;
    this.hourlyResults = [];
  }

  onHourlyWeatherForecastRowSelect(event: any) {
    this.toast.info('Selected Time : ' + event.data.time);

  }


  goBack(event:any){
    this.location.back();
}


}




