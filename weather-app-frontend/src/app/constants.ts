import { HttpHeaders } from "@angular/common/http";


export const baseURL = 'http://localhost:9000/weather';

export const AUTH_API = baseURL +'/v1/auth';

export const METEO_CITY_SEARCH = "https://geocoding-api.open-meteo.com/v1/search";





export const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };