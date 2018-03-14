package com.cmad.essentials.blogger.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MySQLDAOConnectionImpl implements DAOConnection {

	@Autowired
	MySQLConnection mySQLConnection;

	@Override
	public Connection create() {
		mySQLConnection.createNew();
		return mySQLConnection;
	}

	@Override
	public void close(Connection connection) {
		mySQLConnection.stop();

	}

	@Override
	public DatasourceType getDatasourceType() {
		// TODO Auto-generated method stub
		return DatasourceType.MY_SQL;
	}

}
