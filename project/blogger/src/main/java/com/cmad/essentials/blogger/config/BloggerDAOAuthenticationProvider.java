package com.cmad.essentials.blogger.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.cmad.essentials.blogger.security.BloggerUserDetailsService;

//@Component
public class BloggerDAOAuthenticationProvider extends DaoAuthenticationProvider {

	@Autowired
	BloggerUserDetailsService userDetailsService;

	public BloggerDAOAuthenticationProvider() {
		// TODO Auto-generated constructor stub
		super();
	}

	@Override
	protected UserDetailsService getUserDetailsService() {
		// TODO Auto-generated method stub
		return userDetailsService;
	}
}
