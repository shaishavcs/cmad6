package com.cmad.essentials.blogger.dao;

import java.util.List;

import com.cmad.essentials.blogger.api.User;

public interface UserDAO {

	User getUserByEmailId(String emailId);

	User getUserByUserId(String userId);

	List<User> getUsers();

	String register(User user);

	Boolean authenticate(String userName, String password);

	String update(User user);

	String getEncryptedStoredPassword(String userName);
}
