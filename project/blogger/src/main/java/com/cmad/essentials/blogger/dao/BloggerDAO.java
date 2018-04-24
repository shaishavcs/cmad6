package com.cmad.essentials.blogger.dao;

import java.util.List;

import com.cmad.essentials.blogger.api.Blog;
import com.cmad.essentials.blogger.api.Comment;
import com.cmad.essentials.blogger.api.Likes;
import com.cmad.essentials.blogger.api.SearchCriteria;
import com.cmad.essentials.blogger.api.User;

public interface BloggerDAO {

	public Blog findById(Long blogId);

	public List<Blog> listBlogsForUser(User user);

	// public List<BlogCategoryType> blogCategoriesFollowed(User user);
	//
	// public List<User> usersFollowed(User user);

	public List<User> usersFollowing(User user);

	public List<Comment> listCommentsByBlogId(Long blogId);

	public void addComment(Comment comment);

	public void addLike(Likes like);

	public List<Likes> listLikesForBlogId(Long blogId);

	public void add(Blog blog);

	public List<Blog> listAll();

	void addComment(Comment comment, Long blogId);

	public void addLike(Likes like, Long blogId);

	public List<Blog> findByCriteria(SearchCriteria searchCriteria, boolean searchAll);

	// public List<Blog> find(SearchCriteria searchCriteria);
}
