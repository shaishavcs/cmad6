package com.cmad.essentials.blogger.api;

public class SearchCriteria {

	private SearchType searchType;
	private String searchString;
	private BlogCategoryType blogCategoryType;

	public SearchCriteria(SearchType searchType, String searchString2, BlogCategoryType blogCategoryType) {
		// TODO Auto-generated constructor stub
		this.searchString = searchString2;
		this.searchType = searchType;
		this.blogCategoryType = blogCategoryType;
	}

	public SearchType getSearchType() {
		return searchType;
	}

	public void setSearchType(SearchType searchType) {
		this.searchType = searchType;
	}

	public String getSearchString() {
		return searchString;
	}

	public void setSearchString(String searchString) {
		this.searchString = searchString;
	}

	public BlogCategoryType getBlogCategoryType() {
		return blogCategoryType;
	}

	public void setBlogCategoryType(BlogCategoryType blogCategoryType) {
		this.blogCategoryType = blogCategoryType;
	}

}
