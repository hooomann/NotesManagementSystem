package com.exit.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.exit.backend.entity.User;
import com.exit.backend.service.UserAuthService;

import javax.annotation.PostConstruct;

@RestController
public class UserAuthController {

    @Autowired
    private UserAuthService userService;

    // Initialize roles and a default admin user upon application startup
    @PostConstruct
    public void initRoleAndUser() {
        userService.initRoleAndUser();
    }

    // Endpoint for registering a new user
    @PostMapping({"/registerNewUser"})
    public User registerNewUser(@RequestBody User user) {
        return userService.registerNewUser(user);
    }

    // Endpoint accessible only to users with the 'Admin' role
    @GetMapping({"/forAdmin"})
    @PreAuthorize("hasRole('Admin')")
    public String forAdmin(){
        return "This URL is only accessible to the admin";
    }

    // Endpoint accessible only to users with the 'User' role
    @GetMapping({"/forUser"})
    @PreAuthorize("hasRole('User')")
    public String forUser(){
        return "This URL is only accessible to the user";
    }
}
