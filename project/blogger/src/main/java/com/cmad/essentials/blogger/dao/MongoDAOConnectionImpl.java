package com.cmad.essentials.blogger.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MongoDAOConnectionImpl implements DAOConnection {

	@Autowired
	MongoDBConnection mongoConnection;

	@Override
	public Connection create() {
		return mongoConnection;
	}

	@Override
	public void close(Connection connection) {
		mongoConnection.stop();
	}

	@Override
	public DatasourceType getDatasourceType() {
		// TODO Auto-generated method stub
		return DatasourceType.MONGO;
	}

}
