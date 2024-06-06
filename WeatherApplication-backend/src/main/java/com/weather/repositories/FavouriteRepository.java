package com.weather.repositories;


import com.weather.entity.FavouriteLocationEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface FavouriteRepository  extends JpaRepository<FavouriteLocationEntity, Integer> , JpaSpecificationExecutor {



    Page<FavouriteLocationEntity> findAllByLocationIdAndUserEntityIdOrderByUpdatedOnDesc(Integer locationId, Integer userId, Pageable pageable);
    Page<FavouriteLocationEntity> findAllByLocationIdOrderByUpdatedOnDesc(Integer locationId, Pageable pageable);
    Page<FavouriteLocationEntity> findAllByUserEntityIdOrderByUpdatedOnDesc( Integer userId, Pageable pageable);
    FavouriteLocationEntity findTop1ByLocationIdAndUserEntityId(Integer locationId, Integer userId);

}
