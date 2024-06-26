import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { METEO_CITY_SEARCH, baseURL } from "../constants";
import { Observable } from "rxjs";
import { BaseService } from "../_services/base-services";

export const httpOptions = {
    headers: new HttpHeaders({
        "Content-Type": "application/json; charset=utf-8",
        'Access-Control-Allow-Origin': 'https://geocoding-api.open-meteo.com/v1/search'

    })
};

@Injectable({
    providedIn: 'root'
})
export class MeteoLocationService extends BaseService {

    constructor(private http: HttpClient) {
        super();

    }


    public fetchLocations(payload: string): Observable<any> {
        return this.http.get(
            baseURL + '/v1/geo/location?name=' + payload, httpOptions
            // METEO_CITY_SEARCH + '?name=' + payload, httpOptions
        );
    }

    public saveFavouriteLocation(payload: Object): Observable<any> {
        return this.http.post(
            baseURL + '/v1/favourite/location', payload, httpOptions
        );
    }

    public fecthFavouriteLocation(map: Map<string, any>): Observable<any> {
        let params = this.mapToHttpParams(map);
        return this.http.get(
            baseURL + '/v1/favourite/location' + params, httpOptions
        );
    }

    public fecthPagedFavouriteLocations(map: Map<string, any>): Observable<any> {
        let params = this.mapToHttpParams(map);
        return this.http.get(
            baseURL + '/v1/favourite/locations' + params, httpOptions
        );
    }

    public fetchDailyWeatherForecastInfo(map: Map<string, any>): Observable<any> {
        let params = this.mapToHttpParams(map);
        return this.http.get(
            baseURL + '/v1/geo/daily-weather-forecast' + params, httpOptions
        );
    }


    public fetchHourlyWeatherForecastInfo(map: Map<string, any>): Observable<any> {
        let params = this.mapToHttpParams(map);
        return this.http.get(
            baseURL + '/v1/geo/hourly-weather-forecast' + params, httpOptions
            // 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m'
        );
    }

}