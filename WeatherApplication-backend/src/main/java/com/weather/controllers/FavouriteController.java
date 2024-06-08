package com.weather.controllers;


import com.weather.dto.FavouriteLocationDto;
import com.weather.services.FavouriteService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/v1/favourite")
public class FavouriteController {
  private final FavouriteService favouriteService;

    public FavouriteController(FavouriteService favouriteService) {
        this.favouriteService = favouriteService;
    }

    @PostMapping("/location")
    public ResponseEntity<?> saveFavouriteLocation(@Valid @RequestBody FavouriteLocationDto dto){
        favouriteService.saveFavouriteLocation(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }

    @GetMapping("/location")
    public ResponseEntity<?> getFavouriteLocation(
            @RequestParam Integer userId,
            @RequestParam Integer locationId ){
        return favouriteService.getFavouriteLocation(userId, locationId);

    }
    @GetMapping("/locations")
    public ResponseEntity<?> getFavouriteLocations(
            @RequestParam(required = false) Integer userId,
            @RequestParam(required = false) Integer locationId,
            Pageable pageable){
        return favouriteService.fetchFavouriteLocationPageResult(userId, locationId, pageable);

    }


}
