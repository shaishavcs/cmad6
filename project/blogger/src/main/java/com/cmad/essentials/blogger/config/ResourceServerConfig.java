package com.cmad.essentials.blogger.config;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.ResourceServerTokenServices;
import org.springframework.security.web.util.matcher.RequestMatcher;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {
	@Autowired
	private ResourceServerTokenServices tokenServices;

	@Value("${security.jwt.resource-ids}")
	private String resourceIds;

	@Override
	public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
		resources.resourceId(resourceIds).tokenServices(tokenServices);
	}

	@Override
	public void configure(HttpSecurity http) throws Exception {
		http.requestMatchers().and().authorizeRequests().antMatchers("*/**", "*/oauth/*").permitAll()
				.antMatchers("/rest/blog/comment/**", "/rest/blog/like/**", "/rest/blog/add**", "/rest/blog/edit/**",
						"rest/user/update/**", "rest/user/blog/**", "rest/user/logout/**")
				.authenticated();
		//		http.requestMatchers().and().authorizeRequests().antMatchers(HttpMethod.OPTIONS).permitAll();
	}

	private static class OAuthRequestedMatcher implements RequestMatcher {

		public boolean matches(HttpServletRequest request) {

			String auth = request.getHeader("Authorization");

			// Determine if the client request contained an OAuth Authorization

			boolean haveOauth2Token = (auth != null) && auth.startsWith("Bearer");

			boolean haveAccessToken = request.getParameter("access_token") != null;

			return haveOauth2Token || haveAccessToken;

		}

	}
}
