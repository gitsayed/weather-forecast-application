package com.weather.services;


import com.weather.dto.FavouriteLocationDto;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface FavouriteService {


    void saveFavouriteLocation(FavouriteLocationDto dto);

    ResponseEntity<?> fetchFavouriteLocationPageResult(Integer userId, Integer locationId, Pageable pageable);

    ResponseEntity<?> getFavouriteLocation(Integer userId, Integer locationId);
}
