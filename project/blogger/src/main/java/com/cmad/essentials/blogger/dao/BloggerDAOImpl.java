package com.cmad.essentials.blogger.dao;

import java.util.ArrayList;
import java.util.List;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.dao.BasicDAO;
import org.mongodb.morphia.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cmad.essentials.blogger.api.Blog;
import com.cmad.essentials.blogger.api.BlogCategory;
import com.cmad.essentials.blogger.api.BlogNotFoundException;
import com.cmad.essentials.blogger.api.Comment;
import com.cmad.essentials.blogger.api.Likes;
import com.cmad.essentials.blogger.api.SearchCriteria;
import com.cmad.essentials.blogger.api.User;
import com.cmad.essentials.blogger.dao.sequence.SequenceGeneratorService;

@Component
public class BloggerDAOImpl extends BasicDAO<Blog, Long> implements BloggerDAO {

	@Autowired
	DAOConnectionRepository daoConnectionRepository;

	@Autowired
	SequenceGeneratorService sequenceGeneratorService;

	@Autowired
	UserDAO userDAO;

	public BloggerDAOImpl(Datastore ds) {
		super(Blog.class, ds);
	}

	@Override
	public Blog findById(Long blogId) {
		// TODO Auto-generated method stub
		Connection connection = daoConnectionRepository.getConnection().create();
		Blog blog = (Blog) connection.get(Blog.class, blogId);
		daoConnectionRepository.getConnection().close(connection);
		return blog;
	}

	@Override
	public List<Blog> listBlogsForUser(User user) {
		Connection connection = daoConnectionRepository.getConnection().create();
		List<Blog> blogs = (List<Blog>) connection.get(Blog.class).filter("author.userId", user.getUserId()).asList();
		daoConnectionRepository.getConnection().close(connection);
		return blogs;
	}

	@Override
	public List<User> usersFollowing(User user) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Comment> listCommentsByBlogId(Long blogId) {
		// TODO Auto-generated method stub
		Connection connection = daoConnectionRepository.getConnection().create();
		Blog blog = findById(blogId);
		List<Comment> comments = blog.getComments();
		daoConnectionRepository.getConnection().close(connection);
		return comments;
	}

	@Override
	public void add(Blog blog) {
		Connection connection = daoConnectionRepository.getConnection().create();
		if (blog.getId() == null) {
			blog.setId(sequenceGeneratorService.getNextSequenceId());
			blog.getBlogCategory().setId(sequenceGeneratorService.getNextSequenceId());
		}
		connection.persist(blog.getBlogCategory());
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
		if (comment.getId() == null) {
			comment.setId(sequenceGeneratorService.getNextSequenceId());
		}
		User user = userDAO.getUserByUserId(comment.getCommentedBy().getUserId());
		comment.setCommentedBy(user);
		connection.persist(comment);
		blog.addComment(comment);
		connection.persist(blog);
		connection = daoConnectionRepository.getConnection().create();
	}

	@Override
	public void addComment(Comment comment) {
		// TODO: not used anymore
	}

	@Override
	public void addLike(Likes like) {
		// TODO Auto-generated method stub
		Blog blog = findById(like.getBlog().getId());
		Connection connection = daoConnectionRepository.getConnection().create();
		like.setBlog(blog);
		if (like.getId() == null) {
			like.setId(sequenceGeneratorService.getNextSequenceId());
		}

		connection.persist(like);
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
		Query<Blog> query = (Query<Blog>) connection.get(Blog.class);
		List<Blog> blogs = query.asList();
		daoConnectionRepository.getConnection().close(connection);
		return blogs;
	}

	@Override
	public void addLike(Likes like, Long blogId) {
		Blog blog = findById(blogId);
		Connection connection = daoConnectionRepository.getConnection().create();
		like.setBlog(blog);
		if (like.getId() == null) {
			like.setId(sequenceGeneratorService.getNextSequenceId());
		}
		connection.persist(like);
		blog.addLike(like);
		connection.persist(blog);
		daoConnectionRepository.getConnection().close(connection);
	}

	@Override
	public List<Blog> findByCriteria(SearchCriteria searchCriteria, boolean searchAll) {
		List<Blog> blogs = new ArrayList<>();
		Connection connection = daoConnectionRepository.getConnection().create();
		Datastore datastore = connection.getDatastore();
		Query<Blog> query;
		if (searchAll) {
			switch (searchCriteria.getSearchType()) {
			case TITLE:
			case CONTENT:
				query = (Query<Blog>) datastore.createQuery(Blog.class).field(searchCriteria.getSearchType().toString())
						.containsIgnoreCase(searchCriteria.getSearchString());
				break;
			case AUTHOR:
				query = (Query<Blog>) datastore.createQuery(Blog.class).disableValidation().field("author.userId")
						.containsIgnoreCase(searchCriteria.getSearchString());
				break;
			default:
				query = (Query<Blog>) datastore.createQuery(Blog.class).field(searchCriteria.getSearchType().toString())
						.containsIgnoreCase(searchCriteria.getSearchString());
				break;
			}

		} else {// It has specific Blog Categories
			List<BlogCategory> blogCats = ((Query<BlogCategory>) datastore.createQuery(BlogCategory.class))
					.field("blogCategoryType").equal(searchCriteria.getBlogCategoryType()).asList();

			switch (searchCriteria.getSearchType()) {
			case TITLE:
			case CONTENT:
				query = (Query<Blog>) datastore.createQuery(Blog.class).disableValidation()
						.field(searchCriteria.getSearchType().toString())
						.containsIgnoreCase(searchCriteria.getSearchString()).field("blogCategory.blogCategoryType")
						.containsIgnoreCase((searchCriteria.getBlogCategoryType().toString()));
				break;
			case AUTHOR:
				query = (Query<Blog>) datastore.createQuery(Blog.class).disableValidation().field("author.userId")
						.containsIgnoreCase(searchCriteria.getSearchString()).field("blogCategory").in(blogCats);
				break;
			default:
				query = (Query<Blog>) datastore.createQuery(Blog.class).field(searchCriteria.getSearchType().toString())
						.containsIgnoreCase(searchCriteria.getSearchString());
				break;
			}
		}
		blogs = query.asList();
		daoConnectionRepository.getConnection().close(connection);
		return blogs;
	}

}
