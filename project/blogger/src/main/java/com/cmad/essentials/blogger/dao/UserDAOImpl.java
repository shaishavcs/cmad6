package com.cmad.essentials.blogger.dao;

import java.util.List;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.dao.BasicDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cmad.essentials.blogger.api.User;
import com.cmad.essentials.blogger.api.UserAlreadyExistsException;
import com.cmad.essentials.blogger.api.UserException;
import com.cmad.essentials.blogger.api.UserNotFoundException;
import com.cmad.essentials.blogger.dao.sequence.SequenceGeneratorService;

@Component
public class UserDAOImpl extends BasicDAO<User, String> implements UserDAO {

	public UserDAOImpl(Datastore ds) {
		super(User.class, ds);
		// TODO Auto-generated constructor stub
	}

	@Autowired
	DAOConnectionRepository daoConnectionRepository;

	@Autowired
	SequenceGeneratorService sequenceGeneratorService;

	@Override
	public User getUserByEmailId(String emailId) {
		// TODO Auto-generated method stub
		Connection connection = daoConnectionRepository.getConnection().create();
		User user = (User) connection.query("from " + User.class + " where emailId=" + emailId);
		daoConnectionRepository.getConnection().close(connection);
		return user;
	}

	@Override
	public User getUserByUserId(String userId) {
		// TODO Auto-generated method stub
		Connection connection = daoConnectionRepository.getConnection().create();
		User user = (User) connection.get(User.class, userId);
		//		List<User> users = (List<User>) connection
		//				.query("from " + User.class.getName() + " user where user.userId=:userId", "userId", userId);
		//		daoConnectionRepository.getConnection().close(connection);
		//		if (users.isEmpty()) {
		//			throw new UserNotFoundException();
		//		}
		return user;
	}

	@Override
	public List<User> getUsers() {
		Connection connection = daoConnectionRepository.getConnection().create();
		List<User> users = (List<User>) connection.query("from " + User.class);
		daoConnectionRepository.getConnection().close(connection);
		return users;
	}

	@Override
	public String register(User user) {
		// TODO Auto-generated method stub
		Connection connection = daoConnectionRepository.getConnection().create();
		User userFound = (User) connection.get(User.class, user.getUserId());
		if (userFound != null) {
			daoConnectionRepository.getConnection().close(connection);
			throw new UserAlreadyExistsException();
		} else {
			connection.persist(user);
		}
		daoConnectionRepository.getConnection().close(connection);
		return user.getUserId();
	}

	@Override
	public String update(User user) {
		getUserByUserId(user.getUserId());
		Connection connection = daoConnectionRepository.getConnection().create();
		// User userFound = (User) connection.get(User.class, user.getUserName());
		User mergedUser = new User(user);
		connection.persist(mergedUser);
		daoConnectionRepository.getConnection().close(connection);
		return mergedUser.getUserId();
	}

	@Override
	public Boolean authenticate(String userName, String password) {
		Connection connection = daoConnectionRepository.getConnection().create();
		User userFound = (User) connection.get(User.class, userName);
		if (userFound != null) {
			if (!userFound.getPassword().equals(password)) {
				daoConnectionRepository.getConnection().close(connection);
				throw new UserException();
			}
		} else {
			daoConnectionRepository.getConnection().close(connection);
			throw new UserNotFoundException();
		}
		daoConnectionRepository.getConnection().close(connection);
		return true;
		// TODO Auto-generated method stub
	}

}
