package com.weather.controllers;

import com.weather.dto.LoginRequest;
import com.weather.dto.SignupRequest;
import com.weather.repositories.TokenRepository;
import com.weather.services.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Slf4j
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
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, HttpServletRequest httpServletRequest) {
        log.info("Trying to signin");
        return authenticationService.signIn(loginRequest);

    }

    @PostMapping("/signup")
    public ResponseEntity<?> signupUser(@Valid @RequestBody SignupRequest signUpRequest) {
        log.info("Trying to signup");
        return authenticationService.signUp(signUpRequest);
    }

    @PostMapping("/refresh_token")
    public ResponseEntity refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        log.info("Trying to get refresh token");
        return authenticationService.refreshToken(request, response);
    }


}
