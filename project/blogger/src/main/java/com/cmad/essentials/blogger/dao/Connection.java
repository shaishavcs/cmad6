package com.cmad.essentials.blogger.dao;

import java.util.List;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.query.Query;
import org.mongodb.morphia.query.UpdateOperations;

public interface Connection {

	public void createNew();

	public void stop();

	@Deprecated
	/**
	 * Not required for Mongo-Morphia
	 */
	public void commit();

	public Object get(Class<? extends Object> className1, Long blogId);

	@Deprecated
	/**
	 * Not required for Mongo-Morphia. Use query(Object object, String paramName,
	 * Object paramValue) instead.
	 * 
	 * @param string
	 * @return
	 */
	public List<? extends Object> query(String string);

	public void persist(Object object);

	Object get(Class<? extends Object> className, String id);

	Query<? extends Object> get(Class<? extends Object> className);

	@Deprecated
	/**
	 * Deprecated for Mongo-Morphia. In order to update a document, get the entity
	 * and make changes to it and then call persist (which is
	 * Morphia.create(Entity)).
	 * 
	 * @param object
	 * @return
	 */
	Object merge(Object object);

	@Deprecated
	/**
	 * Deprecated for Mongo-Morphia. Use query(Object object, String paramName,
	 * Object paramValue) instead.
	 * 
	 * @param string
	 * @param paramName
	 * @param paramValue
	 * @return
	 */
	List<? extends Object> query(String string, String paramName, Object paramValue);

	List<? extends Object> query(Object object, String paramName, Object paramValue);

	UpdateOperations<? extends Object> createUpdateOperations(Class<? extends Object> clazz);

	// Object findAndModify(Query<? extends Object> query, UpdateOperations<?
	// extends Object> update);

	Datastore getDatastore();
}
