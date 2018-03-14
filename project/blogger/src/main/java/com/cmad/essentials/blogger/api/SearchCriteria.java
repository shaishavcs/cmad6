package com.cmad.essentials.blogger.api;

public class SearchCriteria {

	private String searchType;
	private String searchString;

	public SearchCriteria(String searchBasedOn, String searchString2) {
		// TODO Auto-generated constructor stub
		this.searchString = searchString2;
		this.searchType = searchBasedOn;
	}

	public String getSearchType() {
		return searchType;
	}

	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}

	public String getSearchString() {
		return searchString;
	}

	public void setSearchString(String searchString) {
		this.searchString = searchString;
	}

}
