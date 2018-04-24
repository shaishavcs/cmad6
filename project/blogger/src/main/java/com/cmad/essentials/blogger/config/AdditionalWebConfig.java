package com.cmad.essentials.blogger.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

//@Configuration
public class AdditionalWebConfig { //extends WebMvcConfigurerAdapter {
	//
	//	@Override
	//	public void addCorsMappings(CorsRegistry registry) {
	//		registry.addMapping("/info/**")
	//				.allowedOrigins("http://localhost:8082", "http://localhost:7070", "http://localhost:8080")
	//				.allowedMethods("POST", "GET", "PUT", "OPTIONS", "DELETE")
	//				.allowedHeaders("X-Auth-Token", "Content-Type").exposedHeaders("custom-header1", "custom-header2")
	//				.allowCredentials(false).maxAge(4800);
	//	}

	/**
	 * Allowing all origins.
	 *
	 */
	@Bean
	public FilterRegistrationBean corsFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true);
		config.addAllowedOrigin("*");
		config.addAllowedHeader("*");
		config.addAllowedMethod("*");
		source.registerCorsConfiguration("/**", config);
		FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
		bean.setOrder(0);
		return bean;
	}
}
