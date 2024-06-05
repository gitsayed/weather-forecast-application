package com.weather.services;

import org.springframework.http.ResponseEntity;

import java.util.List;

public interface WeatherService {
    ResponseEntity<?> getGeoCodeCities(String city);

    ResponseEntity<?> getDailyWeatherForecast(String latitude, String longitude,String forecast_days,  String daily);

    ResponseEntity<?> getHourlyWeatherForecast(String latitude, String longitude, String startDate, String endDate, String hourly);



}
