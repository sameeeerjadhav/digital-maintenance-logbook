package com.college.maintenance_backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // ✅ Serve QR code images from classpath
        registry.addResourceHandler("/qr_codes/**")
                .addResourceLocations("classpath:/static/qr_codes/")
                .setCachePeriod(0);
    }
}