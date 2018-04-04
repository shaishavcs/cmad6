package com.cmad.essentials.blogger.api;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Reference;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Likes {

	@Id
	private Long id;

	private String userId;

	@Reference
	@JsonIgnore
	private Blog blog;

	/*
	 * @ManyToOne
	 * 
	 * @JoinColumn(name = "blog_id", nullable = false) private Blog blog;
	 */
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public Blog getBlog() {
		return blog;
	}

	public void setBlog(Blog blog) {
		this.blog = blog;
	}

	/*
	 * public Blog getBlog() { return blog; }
	 * 
	 * public void setBlog(Blog blog) { this.blog = blog; }
	 * 
	 * @Override public boolean equals(Object object) { Likes like = (Likes) object;
	 * return (like.getBlog().getId().equals(this.blog.getId()) && like.getId() ==
	 * this.id && this.userId.equals(like.getUserId())); }
	 * 
	 * @Override public int hashCode() { return Long.valueOf(this.id +
	 * this.blog.getId() + this.userId.hashCode()).hashCode(); }
	 */
}
