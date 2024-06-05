package com.weather.controllers;


import com.weather.services.WeatherService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/geo/")
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping("/cities")
    public ResponseEntity<?> getGeoCOdeCityByName(@RequestParam String name) {
        return weatherService.getGeoCodeCities(name);
    }

    @GetMapping("/daily-weather-forecast")
    public ResponseEntity<?> getDailyWeatherForecast(
            @RequestParam String latitude,
            @RequestParam String longitude,
            @RequestParam String forecast_days,
            @RequestParam String daily
            ) {
        return weatherService.getDailyWeatherForecast(latitude, longitude,forecast_days,  daily );
    }

    @GetMapping("/hourly-weather-forecast")
    public ResponseEntity<?> getHourlyWeatherForecast(
            @RequestParam String latitude,
            @RequestParam String longitude,
            @RequestParam String start_date,
            @RequestParam String end_date,
            @RequestParam String hourly
    ) {
        log.info("Calling: /hourly-weather-forecast");
        return weatherService.getHourlyWeatherForecast(latitude, longitude, start_date, end_date, hourly );
    }

}
