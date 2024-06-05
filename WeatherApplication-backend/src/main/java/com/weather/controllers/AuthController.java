package com.weather.controllers;

import com.weather.dto.LoginRequest;
import com.weather.dto.SignupRequest;
import com.weather.entity.TokenEntity;
import com.weather.entity.UserEntity;
import com.weather.repositories.TokenRepository;
import com.weather.services.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/v1/auth")
public class AuthController {

    private final AuthenticationService authenticationService;
    private final TokenRepository tokenRepository;

    public AuthController(AuthenticationService authenticationService,
                          TokenRepository tokenRepository) {
        this.authenticationService = authenticationService;
        this.tokenRepository = tokenRepository;
    }


    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        return authenticationService.signIn(loginRequest);

    }

    @PostMapping("/signup")
    public ResponseEntity<?> signupUser(@Valid @RequestBody SignupRequest signUpRequest) {
        return authenticationService.signUp(signUpRequest);
    }

    @PostMapping("/refresh_token")
    public ResponseEntity refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        return authenticationService.refreshToken(request, response);
    }
    private void saveUserToken(String accessToken, String refreshToken, UserEntity user) {
        TokenEntity token = new TokenEntity();
        token.setAccessToken(accessToken);
        token.setRefreshToken(refreshToken);
        token.setLoggedOut(false);
        token.setUser(user);
        tokenRepository.save(token);
    }

    private void revokeAllTokenByUser(UserEntity user) {
        List<TokenEntity> validTokens = tokenRepository.findAllAccessTokensByUser(user.getId());
        if(validTokens.isEmpty()) {
            return;
        }

        validTokens.forEach(t-> {
            t.setLoggedOut(true);
        });

        tokenRepository.saveAll(validTokens);
    }
}
