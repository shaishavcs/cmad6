package com.cmad.essentials.blogger.api;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class BlogCategory {

	@Id
	private Long id;

	@Enumerated
	private BlogCategoryType blogCategoryType;

	@OneToMany(cascade = CascadeType.ALL)
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
