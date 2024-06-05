package com.weather.services;

import com.weather.dto.LoginRequest;
import com.weather.dto.SignupRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

public interface AuthenticationService {


    ResponseEntity<?> signIn(LoginRequest loginRequest);
    ResponseEntity<?> signUp(SignupRequest signupRequest);
    ResponseEntity<?> refreshToken( HttpServletRequest request,   HttpServletResponse response);

}
