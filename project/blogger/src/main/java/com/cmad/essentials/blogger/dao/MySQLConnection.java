package com.cmad.essentials.blogger.dao;

import java.util.ArrayList;
import java.util.List;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.query.Query;
import org.mongodb.morphia.query.UpdateOperations;

import com.cmad.essentials.blogger.api.Blog;

//@Component
public class MySQLConnection implements Connection {

	// EntityManagerFactory entityManagerFactory =
	// Persistence.createEntityManagerFactory("mysql");
	// EntityManager entityManager;

	@Override
	public void createNew() {
		// entityManager = entityManagerFactory.createEntityManager();
		// entityManager.getTransaction().begin();
	}

	@Override
	public void stop() {
		// TODO Auto-generated method stub
		// entityManager.close();
	}

	@Override
	public void commit() {
		// entityManager.getTransaction().commit();
	}

	@Override
	public Object get(Class<? extends Object> className1, Long id) {
		// TODO Auto-generated method stub
		// Object object = entityManager.find(className1, id);
		// return object;
		return null;
	}

	@Override
	public Object get(Class<? extends Object> className, String id) {
		// TODO Auto-generated method stub
		// return entityManager.find(className, id);
		return null;
	}

	@Override
	public List<? extends Object> query(String string, String paramName, Object paramValue) {
		// TODO Auto-generated method stub
		// return entityManager.createQuery(string).setParameter(paramName,
		// paramValue).getResultList();
		return new ArrayList<Blog>();
	}

	@Override
	public Object merge(Object object) {
		// TODO Auto-generated method stub
		// return entityManager.merge(object);
		return null;
	}

	@Override
	public void persist(Object object) {
		// TODO Auto-generated method stub
		// entityManager.persist(object);
		// commit();
	}

	@Override
	public List<? extends Object> query(String string) {
		// TODO Auto-generated method stub
		// return entityManager.createQuery(string).getResultList();
		return null;
	}

	@Override
	public List<? extends Object> query(Object object, String paramName, Object paramValue) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Query<? extends Object> get(Class<? extends Object> className) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public UpdateOperations<? extends Object> createUpdateOperations(Class<? extends Object> clazz) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Datastore getDatastore() {
		// TODO Auto-generated method stub
		return null;
	}

}
