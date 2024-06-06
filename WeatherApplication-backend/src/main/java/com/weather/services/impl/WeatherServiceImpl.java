package com.weather.services.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.weather.services.WeatherService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Slf4j
@Service
public class WeatherServiceImpl implements WeatherService {

    private  String geoCityUrl ;
    private  String geoForecastUrl ;
    private final RestTemplate restTemplate;

    public WeatherServiceImpl(
            @Value("${meteo.api.geo_code}") String geoCityUrl,
            @Value("${meteo.api.forecast}") String geoForecastUrl,
                              RestTemplate restTemplate) {
        this.geoCityUrl=geoCityUrl;
        this.geoForecastUrl = geoForecastUrl;
        this.restTemplate = restTemplate;
    }

    @Override
    public ResponseEntity<?> getGeoCodeCities(String city) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Accept", "application/json");
            headers.set("Content-Type", "application/json");
            String customUrl = this.geoCityUrl+"?count=100&language=en&format=json&name="+city;
            HttpEntity entity = new HttpEntity(headers);

            ResponseEntity<JsonNode> response = restTemplate.exchange(customUrl, HttpMethod.GET, entity, JsonNode.class);
            return response;
        } catch (Exception e) {
            log.warn("Unable to process request of couldn't fetch geo Cities.");
            log.error("Exception : {}, Message: {}", e.getClass().getSimpleName(), e.getMessage());
            throw new RuntimeException("Exception in " + this.getClass().getSimpleName() + ".getGeoCodeCities()");
        }
    }

    @Override
    public ResponseEntity<?> getDailyWeatherForecast(String latitude, String longitude, String forecast_days, String dailyList) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", "application/json");
        headers.set("Content-Type", "application/json");
        String customUrl = this.geoForecastUrl+"?latitude="+latitude+"&longitude="+longitude+
                "&forecast_days="+forecast_days+"&daily="+ dailyList;
        HttpEntity entity = new HttpEntity(headers);

        ResponseEntity<JsonNode> response = restTemplate.exchange(customUrl, HttpMethod.GET, entity, JsonNode.class);
        return response;
    }

    @Override
    public ResponseEntity<?> getHourlyWeatherForecast(String latitude, String longitude, String startDate, String endDate, String hourly) {
        HttpHeaders headers = new HttpHeaders();
        HttpEntity entity = new HttpEntity(headers);
        headers.set("Accept", "application/json");
        headers.set("Content-Type", "application/json");
        String customUrl = this.geoForecastUrl+"?latitude="+latitude+"&longitude="+longitude+
                "&start_date="+startDate+"&end_date="+ endDate+"&hourly="+hourly;
        log.info("Calling: {}", this.geoForecastUrl);
        ResponseEntity<JsonNode> response = restTemplate.exchange(customUrl, HttpMethod.GET, entity, JsonNode.class);
        return response;
    }


}
