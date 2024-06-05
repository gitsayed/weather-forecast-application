package com.weather.services.impl;

import com.weather.dto.*;
import com.weather.entity.TokenEntity;
import com.weather.entity.UserEntity;
import com.weather.entity.RoleEntity;
import com.weather.repositories.TokenRepository;
import com.weather.repositories.UserRepository;
import com.weather.repositories.UserRolesRepository;
import com.weather.security.jwt.JwtUtils;
import com.weather.security.services.UserDetailsImpl;
import com.weather.services.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    private final AuthenticationManager authenticationManager;

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;

    private final UserRolesRepository userRolesRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtUtils jwtUtils;

    public AuthenticationServiceImpl(AuthenticationManager authenticationManager,
                                     UserRepository userRepository,
                                     TokenRepository tokenRepository,
                                     UserRolesRepository userRolesRepository,
                                     PasswordEncoder passwordEncoder,
                                     JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.userRolesRepository = userRolesRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    @Override
    public ResponseEntity<?> signIn(LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        String refreshToken = jwtUtils.generateRefreshToken(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        revokeAllTokenByUser(loginRequest.getUsername());
        saveUserToken(jwt, refreshToken, loginRequest.getUsername());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @Override
    public ResponseEntity<?> signUp(SignupRequest signupRequest) {

        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        UserEntity user = new UserEntity().setUsername(signupRequest.getUsername())
                .setEmail(signupRequest.getEmail())
                .setPassword(passwordEncoder.encode(signupRequest.getPassword()));

        Set<String> strRoles = signupRequest.getRoles();
        Set<RoleEntity> roles = new HashSet<>();

        if (strRoles == null) {
            RoleEntity userRole = userRolesRepository.findByName(RoleEnum.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        RoleEntity adminRole = userRolesRepository.findByName(RoleEnum.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    case "mod":
                        RoleEntity modRole = userRolesRepository.findByName(RoleEnum.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);

                        break;
                    default:
                        RoleEntity userRole = userRolesRepository.findByName(RoleEnum.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @Override
    public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        return null;
    }

    private void saveUserToken(String accessToken, String refreshToken, String username) {

        UserEntity user = userRepository.findByUsername(username).orElse(null);
        TokenEntity token = new TokenEntity();
        token.setAccessToken(accessToken);
        token.setRefreshToken(refreshToken);
        token.setLoggedInAt(new Timestamp(System.currentTimeMillis()));
        token.setTokenExpiresAt(new Timestamp(jwtUtils.extractExpiration(accessToken).getTime()));
        token.setLoggedOut(false);
        token.setUser(user);
        tokenRepository.save(token);
    }

    private void revokeAllTokenByUser(String username) {
        Optional<UserEntity> opUser = userRepository.findByUsername(username);
        opUser.ifPresent(user -> {
            List<TokenEntity> validTokens = tokenRepository.findAllAccessTokensByUser(user.getId());
            if (validTokens.isEmpty()) {
                return;
            }
            validTokens.forEach(t -> {
                t.setLoggedOut(true);
            });
            tokenRepository.saveAll(validTokens);
        });

    }

}
