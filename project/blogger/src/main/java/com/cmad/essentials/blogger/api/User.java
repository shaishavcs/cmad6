package com.cmad.essentials.blogger.api;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;

@Entity
public class User {

	@Id
	private String userId;
	private UserType userType;
	private String firstName;
	private String lastName;
	private String emailId;
	private Long phoneNumber;
	private String alternateEmailId;
	private String password;
	@Embedded
	private Address address;
	private String company;

	public User() {
		// TODO Auto-generated constructor stub
	}

	public User(String userId) {
		// TODO Auto-generated constructor stub
	}

	public User(User user) {
		this.userId = user.userId;
		this.userType = user.getUserType();
		this.firstName = user.firstName;
		this.lastName = user.lastName;
		this.emailId = user.emailId;
		this.phoneNumber = user.phoneNumber;
		this.alternateEmailId = user.alternateEmailId;
		this.password = user.password;
		this.address = user.address;
		this.company = user.company;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public UserType getUserType() {
		return userType;
	}

	public void setUserType(UserType userType) {
		this.userType = userType;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public Long getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(Long phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getAlternateEmailId() {
		return alternateEmailId;
	}

	public void setAlternateEmailId(String alternateEmailId) {
		this.alternateEmailId = alternateEmailId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

}
