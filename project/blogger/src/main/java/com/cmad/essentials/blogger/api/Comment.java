package com.cmad.essentials.blogger.api;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Comment {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@ManyToOne
	@JsonBackReference
	private Blog blog;
	private String commentContent;
	private String commentedBy; // userId
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

	public String getCommentedBy() {
		return commentedBy;
	}

	public void setCommentedBy(String commentedBy) {
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
