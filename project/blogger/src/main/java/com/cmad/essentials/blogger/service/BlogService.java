package com.cmad.essentials.blogger.service;

import java.util.List;

import com.cmad.essentials.blogger.api.Blog;
import com.cmad.essentials.blogger.api.Comment;
import com.cmad.essentials.blogger.api.Likes;
import com.cmad.essentials.blogger.api.SearchCriteria;
import com.cmad.essentials.blogger.api.User;

public interface BlogService {

	public void postBlog(Blog blog);

	public void addComment(Comment comment);

	public List<Blog> searchBlogs(SearchCriteria searchCriteria);

	// public List<Blog> getBlogs(BlogCategoryType blogCategory);

	public List<Blog> getAllBlogs();

	public List<Blog> getBlogs(User user);

	public void like(Likes like);

	public void follow(User user);

	public Blog getBlog(long blogId);

	public void addComment(Comment comment, Long blogId);

	public void like(Likes like, Long blogId);
}
