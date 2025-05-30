package com.employee.app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()  // Disable CSRF for simplicity, needed for H2 console
            .headers().frameOptions().disable() // Allow H2 console frames
            .and()
            .authorizeHttpRequests()
                .requestMatchers("/api/login").permitAll()
                .requestMatchers("/h2-console/**").permitAll()  // <-- Allow H2 console access
                .anyRequest().authenticated()
            .and()
                .httpBasic();  // You can replace this later with JWT or form login

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return new InMemoryUserDetailsManager(
            User.withUsername("admin")
                .password("{noop}password")  // No password encoding
                .roles("USER")
                .build()
        );
    }
}
