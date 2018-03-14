package com.cmad.essentials.blogger.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.cmad.essentials.blogger.api.Blog;
import com.cmad.essentials.blogger.api.BlogCategory;
import com.cmad.essentials.blogger.api.BlogNotFoundException;
import com.cmad.essentials.blogger.api.Comment;
import com.cmad.essentials.blogger.api.Likes;
import com.cmad.essentials.blogger.api.User;

@Repository
public class BloggerDAOImpl implements BloggerDAO {

	@Autowired
	DAOConnectionRepository daoConnectionRepository;

	@Override
	public Blog findById(Long blogId) {
		// TODO Auto-generated method stub
		Connection connection = daoConnectionRepository.getConnection().create();
		Blog blog = (Blog) connection.get(Blog.class, blogId);
		daoConnectionRepository.getConnection().close(connection);
		// List<Comment> commentsForBlog = getComments(blogId);
		// blog.setComments(commentsForBlog);
		// Hibernate.initialize(blog.getComments());
		return blog;
	}

	@Override
	public List<Blog> listBlogsForUser(User user) {
		Connection connection = daoConnectionRepository.getConnection().create();
		List<Blog> blogs = (List<Blog>) connection.query("from " + Blog.class.getName() + " where blogger");
		daoConnectionRepository.getConnection().close(connection);
		return blogs;
	}
	//
	// @Override
	// public List<BlogCategoryType> blogCategoriesFollowed(User user) {
	// Connection connection = daoConnectionRepository.getConnection().create();
	// List<BlogCategoryType> blogCategoryTypes = (List<BlogCategoryType>)
	// connection
	// .query("from " + BlogCategoryType.class.getName() + " where blogger");
	// daoConnectionRepository.getConnection().close(connection);
	// return blogCategoryTypes;
	// }
	//
	// @Override
	// public List<User> usersFollowed(User user) {
	// // TODO Auto-generated method stub
	// return null;
	// }

	@Override
	public List<User> usersFollowing(User user) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Comment> listCommentsByBlogId(Long blogId) {
		// TODO Auto-generated method stub
		Connection connection = daoConnectionRepository.getConnection().create();
		List<Comment> comments = (List<Comment>) connection
				.query("from " + Comment.class.getName() + " comment where comment.blog.id=:blogId", "blogId", blogId);
		daoConnectionRepository.getConnection().close(connection);
		return comments;
	}

	@Override
	public void add(Blog blog) {
		Connection connection = daoConnectionRepository.getConnection().create();
		blog.getBlogCategory()
				.setId(((BlogCategory) connection.query(
						"from " + BlogCategory.class.getName()
								+ " blog_cat where blog_cat.blogCategoryType=:blogCategoryType",
						"blogCategoryType", blog.getBlogCategory().getBlogCategoryType()).get(0)).getId());
		connection.persist(blog);
		daoConnectionRepository.getConnection().close(connection);
	}

	@Override
	public void addComment(Comment comment, Long blogId) {
		// TODO Auto-generated method stub
		Blog blog = findById(blogId);
		if (blog == null) {
			throw new BlogNotFoundException("Unable to find Blog with id:" + blogId);
		}
		Connection connection = daoConnectionRepository.getConnection().create();
		comment.setBlog(blog);
		connection.persist(comment);
		daoConnectionRepository.getConnection().close(connection);
		connection = daoConnectionRepository.getConnection().create();
		// connection.persist(comment);
		// blog.addComment(comment);
		// connection.merge(blog);
		daoConnectionRepository.getConnection().close(connection);
	}

	@Override
	public void addComment(Comment comment) {
		// TODO Auto-generated method stub
		Connection connection = daoConnectionRepository.getConnection().create();
		connection.persist(comment);
		daoConnectionRepository.getConnection().close(connection);
		Blog blog = findById(comment.getId());
		blog.addComment(comment);
		connection = daoConnectionRepository.getConnection().create(); //
		connection.persist(comment);
		connection.merge(blog);
		daoConnectionRepository.getConnection().close(connection);
	}

	@Override
	public void addLike(Likes like) {
		// TODO Auto-generated method stub
		Blog blog = findById(like.getBlog().getId());
		Connection connection = daoConnectionRepository.getConnection().create();
		like.setBlog(blog);
		connection.persist(like);
		daoConnectionRepository.getConnection().close(connection);
		connection = daoConnectionRepository.getConnection().create();
		// connection.persist(comment);
		// blog.addComment(comment);
		// connection.merge(blog);
		daoConnectionRepository.getConnection().close(connection);
	}

	@Override
	public List<Likes> listLikesForBlogId(Long blogId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Blog> listAll() {
		// TODO Auto-generated method stub
		Connection connection = daoConnectionRepository.getConnection().create();
		List<Blog> blogs = (List<Blog>) connection.query("from " + Blog.class.getName());
		daoConnectionRepository.getConnection().close(connection);
		return blogs;
	}

	@Override
	public void addLike(Likes like, Long blogId) {
		Blog blog = findById(blogId);
		Connection connection = daoConnectionRepository.getConnection().create();
		like.setBlog(blog);
		connection.persist(like);
		daoConnectionRepository.getConnection().close(connection);
		connection = daoConnectionRepository.getConnection().create();
		daoConnectionRepository.getConnection().close(connection);
	}

}
