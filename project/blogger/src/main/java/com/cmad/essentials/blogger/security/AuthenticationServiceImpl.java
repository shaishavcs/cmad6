package com.cmad.essentials.blogger.security;

import org.springframework.beans.factory.annotation.Autowired;

public class AuthenticationServiceImpl implements AuthenticationService {

	@Autowired
	JwtService jwtService;

	@Override
	public Authentication getUser(String token) {
		// TODO Auto-generated method stub
		return jwtService.getUser(token);
	}

	@Override
	public String getToken(Authentication jwtUser) {
		// TODO Auto-generated method stub
		return jwtService.getToken(jwtUser);
	}

}
