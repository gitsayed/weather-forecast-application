package com.weather.services.impl;

import com.weather.entity.FavouriteLocationEntity;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

public class FavouriteLocationSpecification {

    public static Specification<FavouriteLocationEntity> findFavouriteLocations(
            Integer userId, Integer locationId ) {
        return (root, query, cb) -> {
            Predicate predicate = cb.conjunction();
            if (userId != null) {
                predicate = cb.and(predicate, cb.equal(root.get("userEntity"), userId));
            }

            if (locationId != null) {
                predicate = cb.and(predicate, cb.equal(root.get("locationId"), locationId));
            }
            return predicate;
        };
    }
}
