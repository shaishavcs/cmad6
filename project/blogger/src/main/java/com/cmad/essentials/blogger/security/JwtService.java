package com.cmad.essentials.blogger.security;

public interface JwtService {

	Authentication getUser(String token);

	String getToken(Authentication jwtUser);

}
