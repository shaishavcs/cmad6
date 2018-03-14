package com.cmad.essentials.blogger.rest;

import java.util.Collection;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cmad.essentials.blogger.api.Blog;
import com.cmad.essentials.blogger.api.Comment;
import com.cmad.essentials.blogger.api.Likes;
import com.cmad.essentials.blogger.api.SearchCriteria;
import com.cmad.essentials.blogger.service.BlogService;

@RestController
@RequestMapping("/rest/blog")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class BlogResource {

	@Autowired
	BlogService blogService;

	@PostMapping("/add")
	public ResponseEntity<Blog> add(@RequestBody Blog blog) {
		blogService.postBlog(blog);
		ResponseEntity<Blog> responseEntity = new ResponseEntity<Blog>(blog, HttpStatus.CREATED);
		return responseEntity;
	}

	@PutMapping("/update")
	public ResponseEntity<Blog> update(@RequestBody Blog blog) {
		blogService.postBlog(blog);
		return new ResponseEntity<Blog>(blog, HttpStatus.OK);
	}

	@PostMapping("/comment/{blogId}")
	public ResponseEntity<Comment> add(@PathVariable("blogId") Long blogId, @RequestBody Comment comment) {
		blogService.addComment(comment, blogId);
		return new ResponseEntity<Comment>(comment, HttpStatus.OK);
	}

	@GetMapping("/find")
	public ResponseEntity<Collection<Blog>> find(
			@QueryParam(value = "searchBasedOn") @DefaultValue(value = "All") String searchBasedOn,
			@QueryParam(value = "searchString") @DefaultValue(value = "nothing") String searchString) {
		List<Blog> blogs = blogService.searchBlogs(new SearchCriteria(searchBasedOn, searchString));
		return new ResponseEntity<Collection<Blog>>(blogs, HttpStatus.OK);
	}

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
