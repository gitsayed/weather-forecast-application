package com.weather.repositories;




import com.weather.entity.TokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface TokenRepository extends JpaRepository<TokenEntity, Integer> {


    @Query(value = "select t.* from  access_tokens t inner join Users u on t.user_id = u.id where t.user_id = :userId and t.logged_out = false" , nativeQuery = true)
    List<TokenEntity> findAllAccessTokensByUser(Integer userId);

    Optional<TokenEntity> findByAccessToken(String token);

    boolean existsByAccessTokenAndLoggedOut(String token , boolean logout);

    Optional<TokenEntity> findByRefreshToken(String token);
}
