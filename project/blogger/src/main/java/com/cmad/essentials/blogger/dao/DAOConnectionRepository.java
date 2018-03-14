package com.cmad.essentials.blogger.dao;

public interface DAOConnectionRepository {

	public DAOConnection getConnection();

	DAOConnection getConnection(DatasourceType datasourceType);

}
