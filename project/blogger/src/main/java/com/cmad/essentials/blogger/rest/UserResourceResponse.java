package com.cmad.essentials.blogger.rest;

import com.cmad.essentials.blogger.api.User;

public class UserResourceResponse {
	private User user;
	private String token;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

}
