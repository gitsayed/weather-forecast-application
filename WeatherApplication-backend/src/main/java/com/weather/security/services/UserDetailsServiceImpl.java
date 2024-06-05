package com.weather.security.services;

import com.weather.entity.UserEntity;
import com.weather.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Slf4j
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final  UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserEntity> opUser = userRepository.findByUsername(username);
        if(opUser.isPresent()){
            return UserDetailsImpl.build(opUser.get());
        }else{
            log.error("User Not Found with username: {}" , username);
            throw new UsernameNotFoundException("User Not Found with username: " + username);
        }
    }

}
