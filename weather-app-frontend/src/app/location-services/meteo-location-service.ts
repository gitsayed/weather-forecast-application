import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { METEO_CITY_SEARCH, baseURL } from "../constants";
import { Observable } from "rxjs";
import { BaseService } from "../_services/base-services";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
    'Access-Control-Allow-Origin':  '*',
    // 'Access-Control-Allow-Methods': 'POST, GET',
    // 'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    })
  };

@Injectable({
    providedIn: 'root'
})
export class MeteoLocationService extends BaseService {

    constructor(private http: HttpClient) {
        super();

    }


    public fetchCities(payload: string): Observable<any> {
        return this.http.get(
        //    "https://geocoding-api.open-meteo.com/v1/search?name="+payload,httpOptions
            baseURL + '/geo/cities?name=' + payload, httpOptions
        );
    }

    public fetchDailyWeatherForecastInfo(map: Map<string, any>): Observable<any>{
        let params = this.mapToHttpParams(map);
        return this.http.get(
                baseURL + '/geo/daily-weather-forecast'+params, httpOptions
            );
    }


    public fetchHourlyWeatherForecastInfo(map: Map<string, any>): Observable<any>{
        let params = this.mapToHttpParams(map);
        return this.http.get(
                baseURL + '/geo/hourly-weather-forecast'+params, httpOptions
            );
    }

}