package com.weather.services.impl;

import com.weather.dto.FavouriteLocationDto;
import com.weather.entity.FavouriteLocationEntity;
import com.weather.entity.UserEntity;
import com.weather.repositories.FavouriteRepository;
import com.weather.services.FavouriteService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class FavouriteServiceImpl implements FavouriteService {

    private final FavouriteRepository favouriteRepository;

    public FavouriteServiceImpl(FavouriteRepository favouriteRepository) {
        this.favouriteRepository = favouriteRepository;
    }

    @Override
    public void saveFavouriteLocation(FavouriteLocationDto dto) {
        favouriteRepository.save(mapFavouriteDtoToEntity(dto));
    }

    @Override
    public ResponseEntity<?> getFavouriteLocation(Integer userId, Integer locationId) {
        FavouriteLocationEntity entity= favouriteRepository.findTop1ByLocationIdAndUserEntityId(locationId, userId);
        return ResponseEntity.ok(mapFavouriteEntityToDto(entity));
    }

    @Override
    public ResponseEntity<?> fetchFavouriteLocationPageResult(Integer userId, Integer locationId, Pageable pageable) {
//        PagedModel pagedModel= PagedModel;
        if (userId == null && locationId == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No 'userId' or 'locationId' request parameter found.");
        }
        Page<FavouriteLocationEntity> pageEntities = null;
        if(userId!=null && locationId!=null){
            pageEntities = favouriteRepository.findAllByLocationIdAndUserEntityIdOrderByUpdatedOnDesc(locationId, userId, pageable);
        }

        if(userId!=null && locationId==null){
            pageEntities = favouriteRepository.findAllByUserEntityIdOrderByUpdatedOnDesc( userId, pageable);
        }

        if(userId==null && locationId!=null){
            pageEntities = favouriteRepository.findAllByLocationIdOrderByUpdatedOnDesc( locationId, pageable);
        }

       List<FavouriteLocationDto>  locationDtoList = new ArrayList<>();
        if(pageEntities!=null && pageEntities.getContent()!=null && pageEntities.getContent().size()>0){
            pageEntities.getContent().forEach(entity -> {
                locationDtoList.add(mapFavouriteEntityToDto(entity));
            });
        }

        if(locationDtoList!=null && locationDtoList.size()>0){
            Page<FavouriteLocationDto> dtoPage = new PageImpl<>(locationDtoList,
                    pageEntities.getPageable(),
                    pageEntities.getTotalElements());
            return  ResponseEntity.status(HttpStatus.OK).body(dtoPage);
        }

        return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    private FavouriteLocationEntity mapFavouriteDtoToEntity(FavouriteLocationDto dto) {
        if (dto == null) return null;

        return new FavouriteLocationEntity()
                .setLocationId(dto.getId())
                .setName(dto.getName())
                .setLatitude(dto.getLatitude())
                .setLongitude(dto.getLongitude())
                .setElevation(dto.getElevation())
                .setFeatureCode(dto.getFeature_code())
                .setCountryCode(dto.getCountry_code())
                .setAdmin1Id(dto.getAdmin1_id())
                .setAdmin2Id(dto.getAdmin2_id())
                .setTimezone(dto.getTimezone())
                .setCountryId(dto.getCountry_id())
                .setCountry(dto.getCountry())
                .setAdmin1(dto.getAdmin1())
                .setAdmin2(dto.getAdmin2())
                .setUserEntity(new UserEntity().setId(dto.getUser_id()));

    }

    private FavouriteLocationDto mapFavouriteEntityToDto(FavouriteLocationEntity entity) {
        if (entity == null) return null;

        return new FavouriteLocationDto()
                .setId(entity.getLocationId())
                .setName(entity.getName())
                .setLatitude(entity.getLatitude())
                .setLongitude(entity.getLongitude())
                .setElevation(entity.getElevation())
                .setFeature_code(entity.getFeatureCode())
                .setCountry_code(entity.getCountryCode())
                .setAdmin1_id(entity.getAdmin1Id())
                .setAdmin2_id(entity.getAdmin2Id())
                .setTimezone(entity.getTimezone())
                .setCountry_id(entity.getCountryId())
                .setCountry(entity.getCountry())
                .setAdmin1(entity.getAdmin1())
                .setAdmin2(entity.getAdmin2())
                .setUsername(entity.getUserEntity().getUsername())
                .setUser_id(entity.getUserEntity().getId());
    }


}
