package com.cmad.essentials.blogger.dao;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.query.Query;
import org.mongodb.morphia.query.UpdateOperations;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.mongodb.MongoClient;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;

@Component
public class MongoDBConnection implements Connection {

	@Value("${spring.data.mongodb.host}")
	private String hostName;
	@Value("${spring.data.mongodb.port}")
	private String portNumber;
	@Value("${spring.data.mongodb.database}")
	private String databaseName;
	@Value("${spring.data.mongodb.username}")
	private String userName;
	@Value("${spring.data.mongodb.password}")
	private String password;

	private Datastore datastore;
	private MongoClient mongoClient;
	private Morphia morphia;

	@PostConstruct
	void initialize() {
		List<ServerAddress> serverAddresses = new ArrayList<>();
		serverAddresses.add(new ServerAddress(hostName));
		List<MongoCredential> credentials = new ArrayList<>();
		credentials.add(MongoCredential.createCredential(userName, databaseName, password.toCharArray()));
		mongoClient = new MongoClient(serverAddresses, credentials);
		//		mongoClient = new MongoClient(hostName);
		morphia = new Morphia();
		datastore = morphia.createDatastore(mongoClient, databaseName);
	}

	@Override
	public void createNew() {
		// datastore = morphia.createDatastore(mongoClient, "blogger");
	}

	@Override
	public void stop() {
		// TODO Auto-generated method stub
		// mongoClient.close();
	}

	@Override
	public void commit() {
		// TODO Auto-generated method stub
	}

	@Override
	public Object get(Class<? extends Object> className, Long blogId) {
		// TODO Auto-generated method stub
		return datastore.get(className, blogId);

	}

	@Override
	public List<? extends Object> query(String string) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void persist(Object object) {
		// TODO Auto-generated method stub
		datastore.save(object);
	}

	@Override
	public Object get(Class<? extends Object> className, String id) {
		// TODO Auto-generated method stub
		return datastore.get(className, id);
	}

	@Override
	public Object merge(Object object) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<? extends Object> query(String string, String paramName, Object paramValue) {
		// TODO Auto-generated method stub
		return null;
		// return datastore.find(string, paramName, paramValue);
	}

	@Override
	public List<? extends Object> query(Object object, String paramName, Object paramValue) {
		// TODO Auto-generated method stub
		return datastore.createQuery(object.getClass()).field(paramName).equalIgnoreCase(paramValue).asList();
	}

	@Override
	public Query<? extends Object> get(Class<? extends Object> className) {
		// TODO Auto-generated method stub
		return datastore.find(className);
	}

	@Override
	public UpdateOperations<? extends Object> createUpdateOperations(Class<? extends Object> clazz) {
		// TODO Auto-generated method stub
		return datastore.createUpdateOperations(clazz);
	}

	/*	@Override
		public Object findAndModify(Query<? extends Object> query, UpdateOperations<? extends Object> update) {
			// TODO Auto-generated method stub
			return datastore.findAndModify(query, update);
		}
	*/
	@Override
	public Datastore getDatastore() {
		// TODO Auto-generated method stub
		return datastore;
	}

}
