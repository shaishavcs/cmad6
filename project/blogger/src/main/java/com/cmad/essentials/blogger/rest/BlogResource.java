package com.cmad.essentials.blogger.rest;

import java.util.Collection;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cmad.essentials.blogger.api.Blog;
import com.cmad.essentials.blogger.api.BlogCategoryType;
import com.cmad.essentials.blogger.api.Comment;
import com.cmad.essentials.blogger.api.Likes;
import com.cmad.essentials.blogger.api.SearchCriteria;
import com.cmad.essentials.blogger.api.SearchType;
import com.cmad.essentials.blogger.api.User;
import com.cmad.essentials.blogger.service.BlogService;
import com.cmad.essentials.blogger.service.UserService;

@RestController
@RequestMapping("/rest/blog")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class BlogResource {

	@Autowired
	BlogService blogService;

	@Autowired
	UserService userService;

	@PostMapping("/add")
	public ResponseEntity<Blog> add(@RequestBody Blog blog, OAuth2Authentication auth) {
		String userName = null;
		if (auth.getPrincipal() != null && auth.getPrincipal() instanceof String) {
			userName = (String) auth.getPrincipal();
		}
		User user = userService.getUser(userName);
		blog.setAuthor(user);
		blogService.postBlog(blog);
		ResponseEntity<Blog> responseEntity = new ResponseEntity<Blog>(blog, HttpStatus.CREATED);
		responseEntity.getHeaders().add(HttpHeaders.LOCATION, "/");
		return responseEntity;
	}

	@PostMapping("/update")
	public ResponseEntity<Blog> update(@RequestBody Blog blog) {
		blogService.postBlog(blog);
		return new ResponseEntity<Blog>(blog, HttpStatus.OK);
	}

	@PostMapping("/comment/{blogId}")
	public ResponseEntity<Collection<Comment>> add(@PathVariable("blogId") Long blogId, @RequestBody Comment comment,
			OAuth2Authentication auth) {
		String userName = null;
		if (auth.getPrincipal() != null && auth.getPrincipal() instanceof String) {
			userName = (String) auth.getPrincipal();
		}
		User user = userService.getUser(userName);
		comment.setCommentedBy(user);
		blogService.addComment(comment, blogId);
		List<Comment> comments = blogService.getBlog(blogId).getComments();
		return new ResponseEntity<Collection<Comment>>(comments, HttpStatus.OK);
	}

	@GetMapping("/find")
	public ResponseEntity<Collection<Blog>> find(
			@QueryParam(value = "searchBasedOn") @DefaultValue(value = "Title") String searchBasedOn,
			@QueryParam(value = "searchString") @DefaultValue(value = "nothing") String searchString,
			@QueryParam(value = "blogCategory") @DefaultValue(value = "ALL") String blogCategory) {
		BlogCategoryType blogCategoryType = BlogCategoryType.getEnum(blogCategory);
		List<Blog> blogs = blogService
				.searchBlogs(new SearchCriteria(SearchType.getEnum(searchBasedOn), searchString, blogCategoryType));
		return new ResponseEntity<Collection<Blog>>(blogs, HttpStatus.OK);
	}

	//	not required anymore.. its get or update
	@GetMapping("/edit/{blogId}")
	public ResponseEntity<Blog> edit(@PathVariable("blogId") Long blogId) {
		Blog blog = blogService.getBlog(blogId);
		return new ResponseEntity<Blog>(blog, HttpStatus.OK);
	}

	@GetMapping("/get/{blogId}")
	public ResponseEntity<Blog> get(@PathVariable("blogId") Long blogId) {
		Blog blog = blogService.getBlog(blogId);
		return new ResponseEntity<Blog>(blog, HttpStatus.OK);
	}

	@GetMapping("/list")
	public ResponseEntity<Collection<Blog>> list() {
		ResponseEntity<Collection<Blog>> responseEntity = new ResponseEntity<Collection<Blog>>(
				(blogService.getAllBlogs()), HttpStatus.OK);
		return responseEntity;
	}

	@PostMapping("/like/{blogId}")
	public ResponseEntity<Likes> add(@PathVariable("blogId") Long blogId, Likes like) {
		blogService.like(like, blogId);
		return new ResponseEntity<Likes>(like, HttpStatus.OK);
	}

}
