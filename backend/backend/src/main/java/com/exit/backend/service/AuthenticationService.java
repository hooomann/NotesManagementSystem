package com.exit.backend.service;

import com.exit.backend.dao.UserAuthRepository;
import com.exit.backend.entity.JwtRequest;
import com.exit.backend.entity.JwtResponse;
import com.exit.backend.entity.User;
import com.exit.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class AuthenticationService implements UserDetailsService {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserAuthRepository userDao;

    @Autowired
    private AuthenticationManager authenticationManager;

    // Create JWT token based on the provided JWT request
    public JwtResponse createJwtToken(JwtRequest jwtRequest) throws Exception {
    	System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        String userName = jwtRequest.getUserName();
        String userPassword = jwtRequest.getUserPassword();
        authenticate(userName, userPassword); // Authenticate the user credentials

        UserDetails userDetails = loadUserByUsername(userName); // Load user details
        String newGeneratedToken = jwtUtil.generateToken(userDetails); // Generate a new JWT token

        User user = userDao.findById(userName).get(); // Retrieve the user from the database
        return new JwtResponse(user, newGeneratedToken); // Return the user details and the JWT token
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDao.findById(username).get();

        if (user != null) {
            // Create and return a UserDetails object based on the retrieved user
            return new org.springframework.security.core.userdetails.User(
                    user.getUserName(),
                    user.getUserPassword(),
                    getAuthority(user)
            );
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }

    // Retrieve user authorities and convert them to SimpleGrantedAuthority
    private Set<SimpleGrantedAuthority> getAuthority(User user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        user.getRole().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getRoleName()));
        });
        return authorities;
    }

    // Perform user authentication using AuthenticationManager
    private void authenticate(String userName, String userPassword) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userName, userPassword));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}
