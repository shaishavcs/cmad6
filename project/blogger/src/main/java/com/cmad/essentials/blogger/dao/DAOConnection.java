package com.cmad.essentials.blogger.dao;

public interface DAOConnection {

	public Connection create();

	public void close(Connection connection);

	public DatasourceType getDatasourceType();
}
