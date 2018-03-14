package com.cmad.essentials.blogger.dao;

import java.util.List;

public interface Connection {

	public void createNew();

	public void stop();

	public void commit();

	public Object get(Class<? extends Object> className1, Long blogId);

	public List<? extends Object> query(String string);

	public void persist(Object object);

	Object get(Class<? extends Object> className, String id);

	Object merge(Object object);

	List<? extends Object> query(String string, String paramName, Object paramValue);
}
