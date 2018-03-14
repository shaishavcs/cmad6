package com.cmad.essentials.blogger.api;

public enum BlogCategoryType {

	ALL("All"), POLITICAL("Political"), LIFE_SCIENCE("Life Science"), TRAVEL("Travel"), FOOD("Food"), TECHNICAL(
			"Technical"), PERSONAL_CARE("Personal Care"), SPORTS("Sports");

	private String blogCategory;

	private BlogCategoryType(String blogCategory) {
		this.blogCategory = blogCategory;
	}

	public BlogCategoryType getEnum(String blogCatrgory) {
		BlogCategoryType blogCategoryType = BlogCategoryType.ALL;
		if ("Political".equalsIgnoreCase(blogCategory)) {
			blogCategoryType = BlogCategoryType.POLITICAL;
		} else if ("Travel".equalsIgnoreCase(blogCategory)) {
			blogCategoryType = BlogCategoryType.TRAVEL;
		} else if ("Food".equalsIgnoreCase(blogCategory)) {
			blogCategoryType = BlogCategoryType.FOOD;
		} else if ("Life Science".equalsIgnoreCase(blogCategory)) {
			blogCategoryType = BlogCategoryType.LIFE_SCIENCE;
		} else if ("Technical".equalsIgnoreCase(blogCategory)) {
			blogCategoryType = BlogCategoryType.TECHNICAL;
		} else if ("Personal Care".equalsIgnoreCase(blogCategory)) {
			blogCategoryType = BlogCategoryType.PERSONAL_CARE;
		} else if ("Sports".equalsIgnoreCase(blogCategory)) {
			blogCategoryType = BlogCategoryType.SPORTS;
		}
		return blogCategoryType;
	}
}
