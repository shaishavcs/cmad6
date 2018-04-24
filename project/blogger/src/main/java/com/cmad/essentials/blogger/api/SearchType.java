package com.cmad.essentials.blogger.api;

public enum SearchType {
	TITLE("title"), AUTHOR("author"), CONTENT("blogContent");
	private String searchType;

	private SearchType(String searchType) {
		this.searchType = searchType;
	}

	@Override
	public String toString() {
		return searchType;
	}

	public static SearchType getEnum(String searchBasedOn) {
		// TODO Auto-generated method stub
		SearchType searchEnumType = SearchType.TITLE;
		if ("blogContent".equalsIgnoreCase(searchBasedOn) || "Content".equalsIgnoreCase(searchBasedOn)) {
			searchEnumType = SearchType.CONTENT;
		} else if ("author".equalsIgnoreCase(searchBasedOn)) {
			searchEnumType = SearchType.AUTHOR;
		} else {
			searchEnumType = SearchType.TITLE;
		}
		return searchEnumType;
	}
}
