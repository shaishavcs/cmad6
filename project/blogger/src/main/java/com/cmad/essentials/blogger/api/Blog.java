package com.cmad.essentials.blogger.api;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.mongodb.morphia.annotations.Embedded;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Reference;

@Entity
public class Blog {
	@Id
	private Long id;

	private String title;

	private String blogContent;

	@Reference
	private List<Likes> likes = new ArrayList<>();

	@Embedded
	private User author;

	@Reference
	private List<Comment> comments = new ArrayList<>();

	private Date createdDate;
	private Date modifiedDate;

	@Reference
	private BlogCategory blogCategory;

	public List<Likes> getLikes() {
		return likes;
	}

	public void setLikes(List<Likes> likes) {
		this.likes = likes;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	//
	// public BlogCategory getBlogCategory() {
	// return blogCategory;
	// }
	//
	// public void setBlogCategory(BlogCategory blogCategory) {
	// this.blogCategory = blogCategory;
	// }

	// public BlogType getBlogType() {
	// return blogType;
	// }
	// public void setBlogType(BlogType blogType) {
	// this.blogType = blogType;
	// }
	public String getBlogContent() {
		return blogContent;
	}

	public void setBlogContent(String blogContent) {
		this.blogContent = blogContent;
	}

	public List<Comment> getComments() {
		return comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public User getAuthor() {
		return author;
	}

	public void setAuthor(User author) {
		this.author = author;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getModifiedDate() {
		return modifiedDate;
	}

	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	public void addComment(Comment comment) {
		this.comments.add(comment);
	}

	public void addLike(Likes Like) {
		this.likes.add(Like);
	}

	public BlogCategory getBlogCategory() {
		return blogCategory;
	}

	public void setBlogCategory(BlogCategory blogCategory) {
		this.blogCategory = blogCategory;
	}

}
