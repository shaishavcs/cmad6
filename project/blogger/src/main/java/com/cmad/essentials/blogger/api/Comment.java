package com.cmad.essentials.blogger.api;

import java.util.Date;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Reference;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Comment {
	@Id
	private Long id;

	@Reference
	@JsonIgnore
	private Blog blog;
	private String commentContent;

	@Reference
	private User commentedBy; // userId
	private Date postedDate;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCommentContent() {
		return commentContent;
	}

	public void setCommentContent(String commentContent) {
		this.commentContent = commentContent;
	}

	public User getCommentedBy() {
		return commentedBy;
	}

	public void setCommentedBy(User commentedBy) {
		this.commentedBy = commentedBy;
	}

	public Date getPostedDate() {
		return postedDate;
	}

	public void setPostedDate(Date postedDate) {
		this.postedDate = postedDate;
	}

	public Blog getBlog() {
		return blog;
	}

	public void setBlog(Blog blog) {
		this.blog = blog;
	}

	// public Blog getBlog() {
	// return blog;
	// }
	//
	// public void setBlog(Blog blog) {
	// this.blog = blog;
	// }

	// @Override
	// public boolean equals(Object object) {
	// Comment comment = (Comment) object;
	// return (comment.getBlog().getId().equals(this.blog.getId()) &&
	// comment.getId() == this.id
	// && this.commentedBy.equals(comment.getCommentedBy())
	// && this.commentContent.equals(comment.getCommentContent()));
	// }
	//
	// @Override
	// public int hashCode() {
	// return Long.valueOf(this.id + this.blog.getId() + this.commentedBy.hashCode()
	// + this.commentContent.hashCode())
	// .hashCode();
	// }
}
