package com.cmad.essentials.blogger.security;

public interface AuthenticationService {

	Authentication getUser(String token);

	String getToken(Authentication jwtUser);
}
