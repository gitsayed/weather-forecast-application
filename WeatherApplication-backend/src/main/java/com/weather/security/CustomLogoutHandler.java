package com.weather.security;




import com.weather.entity.TokenEntity;
import com.weather.repositories.TokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;

import java.sql.Timestamp;


@Slf4j
@Configuration
public class CustomLogoutHandler implements LogoutHandler {

    private final TokenRepository tokenRepository;

    public CustomLogoutHandler(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    @Override
    public void logout(HttpServletRequest request,
                       HttpServletResponse response,
                       Authentication authentication) {
        String authHeader = request.getHeader("Authorization");
        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }

        String token = authHeader.substring(7);
        TokenEntity storedToken = tokenRepository.findByAccessToken(token).orElse(null);
        if(storedToken != null) {
            storedToken.setLoggedOut(true);
            storedToken.setLoggedOutAt(new Timestamp(System.currentTimeMillis()));
            tokenRepository.save(storedToken);
        }
        log.info("User Logged out successfully.");
    }



}
