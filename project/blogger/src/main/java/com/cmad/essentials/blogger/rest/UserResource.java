package com.cmad.essentials.blogger.rest;

import java.util.Collection;

import javax.ws.rs.Consumes;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cmad.essentials.blogger.api.Blog;
import com.cmad.essentials.blogger.api.User;
import com.cmad.essentials.blogger.security.Authentication;
import com.cmad.essentials.blogger.service.BlogService;
import com.cmad.essentials.blogger.service.UserService;

@RestController
@RequestMapping("/rest/user")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {

	@Autowired
	UserService userService;

	@Autowired
	BlogService blogService;

	@PostMapping("/register")
	public ResponseEntity<User> register(@RequestBody User user) {
		// register the user with the site
		userService.register(user);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}

	@PostMapping("/login")
	public ResponseEntity<User> login(@RequestBody Authentication authentication) {
		String userId = authentication.getUsername();
		String password = authentication.getPassword();
		//		String userId = httpHeaders.getRequestHeader("userId").get(0);
		//		String password = httpHeaders.getRequestHeader("password").get(0);
		boolean isSuccessful = userService.login(userId, password);
		if (!isSuccessful) {
			return new ResponseEntity<User>(HttpStatus.UNAUTHORIZED);
		}
		return new ResponseEntity<User>(userService.getUser(userId), HttpStatus.OK);
	}

	@PutMapping("/update/{userId}")
	public ResponseEntity<User> update(@PathVariable("userId") String userId, @RequestBody User user) {
		// register the user with the site
		userService.update(user);
		return new ResponseEntity<User>(user, HttpStatus.ACCEPTED);
	}

	@GetMapping
	@Path("/blogs/{userId}")
	public ResponseEntity<Collection<Blog>> blogs(@PathVariable("userId") String userId) {
		User user = userService.getUser(userId);
		return new ResponseEntity<Collection<Blog>>(blogService.getBlogs(user), HttpStatus.ACCEPTED);
	}

	@DeleteMapping
	@Path("/logout/{userId}")
	public ResponseEntity<User> logout(@RequestParam("userId") String userId) {
		return new ResponseEntity<User>(userService.getUser(userId), HttpStatus.OK);
	}

}
