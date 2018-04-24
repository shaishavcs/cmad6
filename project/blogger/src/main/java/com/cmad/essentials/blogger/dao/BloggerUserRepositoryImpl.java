package com.cmad.essentials.blogger.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cmad.essentials.blogger.api.User;

@Component
public class BloggerUserRepositoryImpl implements BloggerUserRepository {

	@Autowired
	DAOConnectionRepository daoConnectionRepository;

	@Override
	public User findUser(String userName) {
		// TODO Auto-generated method stub
		return (User) daoConnectionRepository.getConnection(DatasourceType.MONGO).create().get(User.class, userName);
	}

}
