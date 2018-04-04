package com.cmad.essentials.blogger.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.cmad.essentials.blogger.api.User;
import com.cmad.essentials.blogger.dao.BloggerUserRepository;

@Component
public class BloggerUserDetailsService implements UserDetailsService {

	@Autowired
	BloggerUserRepository bloggerUserReporitory;

	@Override
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		User user = bloggerUserReporitory.findUser(userName);
		if (user == null) {
			throw new UsernameNotFoundException(userName);
		}
		return new BloggerUserDetails(user);
		/*
		 * MongoDatabase database = mongoClient.getDatabase("springsecurity");
		 * 
		 * MongoCollection<Document> collection = database.getCollection("users");
		 * 
		 * Document document = collection.find(Filters.eq("email", email)).first();
		 * 
		 * if (document != null) {
		 * 
		 * String name = document.getString("name");
		 * 
		 * String surname = document.getString("surname");
		 * 
		 * String password = document.getString("password");
		 * 
		 * List<String> authorities = (List<String>) document.get("authorities");
		 * 
		 * MongoUserDetails mongoUserDetails = new MongoUserDetails(email, password,
		 * authorities.toArray(new String[authorities.size()]));
		 * 
		 * return mongoUserDetails;
		 * 
		 * }
		 * 
		 * return null;
		 */
	}

}
