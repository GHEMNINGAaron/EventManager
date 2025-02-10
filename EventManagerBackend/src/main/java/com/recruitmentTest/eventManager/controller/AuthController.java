package com.recruitmentTest.eventManager.controller;


import com.recruitmentTest.eventManager.dto.AuthResponse;
import com.recruitmentTest.eventManager.dto.CredentialsDto;
import com.recruitmentTest.eventManager.dto.RegistrationDto;
import com.recruitmentTest.eventManager.model.User;
import com.recruitmentTest.eventManager.service.AuthUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthUserService authUserService;



    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody RegistrationDto registrationDto) {
        User savedUser = authUserService.RegisterUser(registrationDto);
        return new ResponseEntity<>(savedUser, HttpStatus.OK);
    }

    @GetMapping("/getUsers")
    public ResponseEntity<List<User>> getUser() {
        List<User> users = authUserService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginUser(@RequestBody CredentialsDto credentialsDto) {

        String token = authUserService.verifyUser(credentialsDto);
        return new ResponseEntity<>(new AuthResponse(token), HttpStatus.OK);
    }
}
