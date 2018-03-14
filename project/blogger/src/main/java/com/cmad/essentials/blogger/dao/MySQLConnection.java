package com.cmad.essentials.blogger.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.springframework.stereotype.Component;

@Component
public class MySQLConnection implements Connection {

	EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("mysql");
	EntityManager entityManager;

	@Override
	public void createNew() {
		entityManager = entityManagerFactory.createEntityManager();
		entityManager.getTransaction().begin();
	}

	@Override
	public void stop() {
		// TODO Auto-generated method stub
		entityManager.close();
	}

	@Override
	public void commit() {
		entityManager.getTransaction().commit();
	}

	@Override
	public Object get(Class<? extends Object> className1, Long id) {
		// TODO Auto-generated method stub
		// // return entityManager.find(class1, blogId);
		Object object = entityManager.find(className1, id);
		return object;
		// return new Blog();
	}

	@Override
	public Object get(Class<? extends Object> className, String id) {
		// TODO Auto-generated method stub
		return entityManager.find(className, id);
		// return new Blog();
	}

	@Override
	public List<? extends Object> query(String string, String paramName, Object paramValue) {
		// TODO Auto-generated method stub
		return entityManager.createQuery(string).setParameter(paramName, paramValue).getResultList();
		// return new ArrayList<Blog>();
	}

	@Override
	public Object merge(Object object) {
		// TODO Auto-generated method stub
		return entityManager.merge(object);
	}

	@Override
	public void persist(Object object) {
		// TODO Auto-generated method stub
		entityManager.persist(object);
		commit();
	}

	@Override
	public List<? extends Object> query(String string) {
		// TODO Auto-generated method stub
		return entityManager.createQuery(string).getResultList();
	}

}
