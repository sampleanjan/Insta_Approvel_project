package com.example.DashboardService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class DashboardServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(DashboardServiceApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer configure() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry reg) {
				reg.addMapping("/").allowedOrigins("*");
			}
		};
	}

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

}