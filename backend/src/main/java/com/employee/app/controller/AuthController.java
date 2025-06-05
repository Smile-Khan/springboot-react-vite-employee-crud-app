package com.employee.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import com.employee.app.model.JwtRequest;
import com.employee.app.model.JwtResponse;
import com.employee.app.security.JwtUtil;
import com.employee.app.service.CustomUserDetailsService;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // frontend origin
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @PostMapping("/login")
    public JwtResponse createToken(@RequestBody JwtRequest authRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );
        } catch (AuthenticationException e) {
            throw new Exception("Invalid username or password");
        }

        final var userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
        final String token = jwtUtil.generateToken(userDetails);

        return new JwtResponse(token);
    }

    // Optional /register endpoint for future DB-based implementation
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody JwtRequest user) {
        // For now, just accept and say "Registered" — in real use, save user to DB
        return ResponseEntity.ok("User registered successfully (mocked)");
    }
}
