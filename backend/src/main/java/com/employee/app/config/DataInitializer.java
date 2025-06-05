package com.employee.app.config;

import com.employee.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.employee.app.model.User;

@Configuration
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Check if user "admin1" exists (assuming findByUsername returns Optional<User>)
        if (userRepository.findByUsername("admin5").isEmpty()) {
            User user = new User();
            user.setUsername("admin5");
            user.setPassword(passwordEncoder.encode("admin1234"));
            userRepository.save(user);
            System.out.println("✅ Default admin user created: admin5 / admin1234");
        } else {
            System.out.println("User 'admin5' already exists.");
        }
    }
}
