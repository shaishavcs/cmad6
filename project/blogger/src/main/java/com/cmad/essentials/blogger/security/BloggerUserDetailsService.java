package com.cmad.essentials.blogger.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.cmad.essentials.blogger.api.User;
import com.cmad.essentials.blogger.dao.BloggerUserRepository;

@Component
public class BloggerUserDetailsService implements UserDetailsService {

	@Autowired
	BloggerUserRepository bloggerUserReporitory;

	@Override
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		User user = bloggerUserReporitory.findOne(userName);
		if (user == null) {
			throw new UsernameNotFoundException(userName);
		}
		return new BloggerUserDetails(user);
	}

}
