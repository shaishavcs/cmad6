package com.cmad.essentials.blogger.api;

import java.util.List;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Reference;

@Entity
public class BlogCategory {

	@Id
	private Long id;

	private BlogCategoryType blogCategoryType;

	@Reference
	private List<User> followers;

	public List<User> getFollowers() {
		return followers;
	}

	public void setFollowers(List<User> followers) {
		this.followers = followers;
	}

	public BlogCategoryType getBlogCategoryType() {
		return blogCategoryType;
	}

	public void setBlogCategoryType(BlogCategoryType blagCategoryType) {
		this.blogCategoryType = blagCategoryType;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

}
