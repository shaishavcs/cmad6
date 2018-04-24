package com.cmad.essentials.blogger.service;

import com.cmad.essentials.blogger.api.User;
import com.cmad.essentials.blogger.rest.ChangePassword;

public interface UserService {

	public boolean login(String userId, String password);

	public void register(User user);

	public void update(User user);

	public User getUser(String userName);

	public User changePassword(String userId, ChangePassword changePassword);

}
