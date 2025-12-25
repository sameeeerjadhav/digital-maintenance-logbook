package com.college.maintenance_backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // ✅ Serve from external "uploads/qr_codes/" folder
        registry.addResourceHandler("/qr_codes/**")
                .addResourceLocations("file:uploads/qr_codes/") // filesystem path, not classpath
                .setCachePeriod(0);
    }

    // ✅ Add CORS for those files as well
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/qr_codes/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("GET", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}