package com.cmad.essentials.blogger.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cmad.essentials.blogger.api.CurrentPasswordDoesNotMatchException;
import com.cmad.essentials.blogger.api.User;
import com.cmad.essentials.blogger.config.BloggerPasswordEncoder;
import com.cmad.essentials.blogger.dao.UserDAO;
import com.cmad.essentials.blogger.rest.ChangePassword;

@Component
public class UserServiceImpl implements UserService {

	@Autowired
	UserDAO userDAO;

	@Autowired
	BloggerPasswordEncoder passwordEncoder;

	@Override
	public boolean login(String userName, String password) {
		// TODO Auto-generated method stub
		//		String encryptedPassword = passwordEncoder.encode(password);
		String storedEncryptedPassword = userDAO.getEncryptedStoredPassword(userName);
		//		return userDAO.authenticate(userName, encryptedPassword);
		return passwordEncoder.matches(password, storedEncryptedPassword);
	}

	@Override
	public void register(User user) {
		// TODO Auto-generated method stub
		String encodedBcrpyt = passwordEncoder.encode("bloggerXYZ2808");
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		userDAO.register(user);
	}

	@Override
	public void update(User user) {
		// TODO Auto-generated method stub
		// User existingUser = userDAO.getUserByUserId(user.getUserId());
		User updatedUser = new User(user);
		userDAO.update(updatedUser);

	}

	private void updateExistingUser(User existingUser, User user) {
		existingUser.setAddress(user.getAddress());
		existingUser.setUserId(user.getUserId());
		existingUser.setUserType(user.getUserType());
		existingUser.setFirstName(user.getFirstName());
		existingUser.setLastName(user.getLastName());
		existingUser.setEmailId(user.getEmailId());
		existingUser.setPhoneNumber(user.getPhoneNumber());
		existingUser.setAlternateEmailId(user.getAlternateEmailId());
		existingUser.setCompany(user.getCompany());
	}

	@Override
	public User getUser(String userName) {
		// TODO Auto-generated method stub
		return userDAO.getUserByUserId(userName);
	}

	@Override
	public User changePassword(String userId, ChangePassword changePassword) {
		// TODO Auto-generated method stub
		User user = userDAO.getUserByUserId(userId);
		// get the existing password and compare with currentPassword
		boolean matches = this.passwordEncoder.matches(changePassword.getCurrentPassword(), user.getPassword());
		if (!matches) {
			throw new CurrentPasswordDoesNotMatchException("Current password and existing password do not match");
		}
		user.setPassword(passwordEncoder.encode(changePassword.getNewPassword()));
		userDAO.update(user);
		return user;
	}

}
