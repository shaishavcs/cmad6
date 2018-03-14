package com.cmad.essentials.blogger.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cmad.essentials.blogger.api.Blog;
import com.cmad.essentials.blogger.api.Comment;
import com.cmad.essentials.blogger.api.Likes;
import com.cmad.essentials.blogger.api.SearchCriteria;
import com.cmad.essentials.blogger.api.User;
import com.cmad.essentials.blogger.dao.BloggerDAO;

@Component
public class BlogServiceImpl implements BlogService {

	@Autowired
	BloggerDAO blogRepository;

	@Override
	public void postBlog(Blog blog) {
		// TODO Auto-generated method stub
		blogRepository.add(blog);
	}

	@Override
	public void addComment(Comment comment) {
		// TODO Auto-generated method stub
		blogRepository.addComment(comment);
	}

	@Override
	public List<Blog> searchBlogs(SearchCriteria searchCriteria) {
		// TODO Auto-generated method stub
		List<Blog> blogsFound = new ArrayList<>();
		List<Blog> blogList = blogRepository.listAll();
		for (Blog blog : blogList) {
			if (searchCriteria.getSearchType().equalsIgnoreCase("Title")) {
				if (blog.getTitle().contains(searchCriteria.getSearchString())) {
					blogsFound.add(blog);
				}
			} else if (searchCriteria.getSearchType().equalsIgnoreCase("Content")) {
				if (blog.getBlogContent().contains(searchCriteria.getSearchString())) {
					blogsFound.add(blog);
				}
			}
		}

		return blogsFound;
	}

	// @Override
	// public List<Blog> getBlogs(BlogCategoryType blogCategory) {
	// // TODO Auto-generated method stub
	// return blogRepository.listAll()(blogCategory);
	// }

	@Override
	public List<Blog> getAllBlogs() {
		// TODO Auto-generated method stub
		return blogRepository.listAll();
	}

	@Override
	public List<Blog> getBlogs(User user) {
		// TODO Auto-generated method stub
		return blogRepository.listBlogsForUser(user);
	}

	@Override
	public void like(Likes like) {
		// TODO Auto-generated method stub
		blogRepository.addLike(like);
	}

	@Override
	public void follow(User user) {
		// TODO Auto-generated method stub
		// blogRepository.addFollow(user);
	}

	@Override
	public Blog getBlog(long blogId) {
		// TODO Auto-generated method stub
		return (Blog) blogRepository.findById(blogId);
		// return null;
	}

	@Override
	public void addComment(Comment comment, Long blogId) {
		// TODO Auto-generated method stub
		blogRepository.addComment(comment, blogId);
	}

	@Override
	public void like(Likes like, Long blogId) {
		// TODO Auto-generated method stub
		blogRepository.addLike(like, blogId);
	}

}
