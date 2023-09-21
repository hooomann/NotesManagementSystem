package com.exit.backend.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class Cors {

    // Define HTTP methods
    private static final String GET = "GET";
    private static final String POST = "POST";
    private static final String PUT = "PUT";
    private static final String DELETE = "DELETE";

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // Configure CORS mappings for all endpoints ("/**")
                registry.addMapping("/**")
                        .allowedMethods(GET, POST, PUT, DELETE) // Allow specified HTTP methods
                        .allowedHeaders("*") // Allow all headers
                        .allowedOriginPatterns("*") // Allow requests from all origins
                        .allowCredentials(true); // Allow including cookies and credentials in requests
            }
        };
    }
}
