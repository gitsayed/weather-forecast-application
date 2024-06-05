import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ToastService } from '../_services/toast.services';
import { Table } from 'primeng/table';
import { MeteoLocationService } from '../location-services/meteo-location-service';
import { GeoCity, Model } from '../model/city-location.model';
import { ActivatedRoute, Router } from '@angular/router';

const documentStyle = getComputedStyle(document.documentElement);
const textColor = documentStyle.getPropertyValue('--text-color');
const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
@Component({
  selector: 'app-weather-forcecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForcecastComponent implements OnInit {



  loading: boolean = false;

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

  constructor(
    private toast: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private locationService: MeteoLocationService,
  ) { }


  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.locationDetail = JSON.parse(params['location_detail']);
      console.log('locationDetail ', this.locationDetail);
      this.fetchDailyWeatherForecastInfo(this.locationDetail, this.forecastDays, this.dailyForecastVariables);

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
        console.log('res', res);
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
        console.log('Houlry', res);
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
          tension: 0.4,
          backgroundColor: '#FF0000',
          borderColor: '#FF0000'
        },
        {
          label: 'Apparent Temperature',
          data: data.hourly.apparent_temperature,
          fill: false,
          tension: 0.4,
          borderColor: '#16F529',
          backgroundColor: '#16F529'
        },
        {
          label: 'Rain',
          data: data.hourly.rain,
          fill: false,
          borderColor: '#0000FF',
          tension: 0.4,
          backgroundColor: '#0000FF'
        },
        {
          label: 'Pressure msl',
          data: data.hourly.pressure_msl,
          fill: false,
          borderColor: '#20B2AA',
          tension: 0.4,
          backgroundColor: '#20B2AA'
        },
        {
          label: 'Surface Pressure',
          data: data.hourly.surface_pressure,
          fill: false,
          type: 'line',
          borderColor: '#e52165',
          tension: 0.4,
          backgroundColor: '#e52165'
        },
        {
          label: 'Visibility',
          data: data.hourly.visibility,
          fill: false,
          type: 'line',
          borderColor: '#0000FF',
          tension: 0.4,
          backgroundColor: '#0000FF'
        },
        {
          label: 'Wind speed 10m',
          data: data.hourly.wind_speed_10m,
          fill: false,
          borderColor: '#e2d810',
          tension: 0.4,
          backgroundColor: '#e2d810'
        },
        {
          label: 'Wind speed 80m',
          data: data.hourly.wind_speed_80m,
          fill: false,
          borderColor: '#00FF00',
          tension: 0.4,
          backgroundColor: '#00FF00'
        },
        {
          label: 'Temperature 80m',
          data: data.hourly.temperature_80m,
          fill: false,
          borderColor: '#FFD700',
          tension: 0.4,
          backgroundColor: '#FFD700'
        },
        {
          label: 'Temperature 180m',
          data: data.hourly.temperature_180m,
          fill: false,
          borderColor: '#DE3163',
          tension: 0.4,
          backgroundColor: '#DE3163'
        },
        {
          label: 'Day/Night',
          data: data.hourly.is_day,
          fill: false,
          borderColor: '#9FE2BF',
          tension: 0.4,
          backgroundColor: '#9FE2BF'
        }
      ]
    };


    this.chartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    };


  }




  onCloseHourlyModal(event: any) {
    this.modalVisible = false;
    this.modalLoading = false;
    this.hourlyResults = [];
  }

  onHourlyWeatherForecastRowSelect(event: any) {
    this.toast.info('Selected Day : ' + event.data.time);
    // this.router.navigate(['weather-forecast'], {queryParams:{location_detail: JSON.stringify(event.data)}});

  }


}



