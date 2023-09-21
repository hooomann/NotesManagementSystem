package com.exit.backend.service;

import com.exit.backend.entity.*;
import com.exit.backend.dao.*;

import java.util.HashSet;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserAuthService {

    @Autowired
    private UserAuthRepository userDao;

    @Autowired
    private UserRoleRepository roleDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Initialize roles and an admin user
    public void initRoleAndUser() {
    }

    // Register a new user
    public User registerNewUser(User user) {
    	Iterable<User> allUsers = userDao.findAll();
    	for (User temp : allUsers) {
    	    // Check if the username already exists
    	    if(temp.getUserName().equals(user.getUserName()))
    	    	return null;
    	}

        Role role = roleDao.findById("User").get();
        Set<Role> userRoles = new HashSet<>();
        userRoles.add(role);
        user.setRole(userRoles);
        user.setUserPassword(getEncodedPassword(user.getUserPassword()));

        return userDao.save(user);
    }

    // Get the encoded password using the PasswordEncoder
    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }
}
