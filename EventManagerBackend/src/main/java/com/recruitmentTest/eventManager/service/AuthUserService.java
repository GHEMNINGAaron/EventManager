package com.recruitmentTest.eventManager.service;


import com.recruitmentTest.eventManager.dto.CredentialsDto;
import com.recruitmentTest.eventManager.dto.RegistrationDto;
import com.recruitmentTest.eventManager.model.User;
import com.recruitmentTest.eventManager.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthUserService {


    private final UserRepository userRepository;


    private final AuthenticationManager authenticationManager;


    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final JwtService jwtService;


    public AuthUserService(UserRepository userRepository, AuthenticationManager authenticationManager, BCryptPasswordEncoder bCryptPasswordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.jwtService = jwtService;
    }

    public User RegisterUser(RegistrationDto registrationDto) {

        if (userRepository.findUserByEmail(registrationDto.email()) != null) {
            throw new RuntimeException("Email déjà utilisé !");
        }

        User user = new User();
        user.setName(registrationDto.name());
        user.setEmail(registrationDto.email());
        user.setPassword(bCryptPasswordEncoder.encode(String.valueOf(registrationDto.password())));
        System.out.println(bCryptPasswordEncoder.matches(String.valueOf(registrationDto.password()), user.getPassword()));
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    public String verifyUser(CredentialsDto credentialsDto) {
        Authentication authenticate
                = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        credentialsDto.email(), String.valueOf(credentialsDto.password())
                )
        );

        if (authenticate.isAuthenticated()) {
            User user = userRepository.findUserByEmail(credentialsDto.email());
            return jwtService.generateToken(user);
        }
        return null;
    }
}
