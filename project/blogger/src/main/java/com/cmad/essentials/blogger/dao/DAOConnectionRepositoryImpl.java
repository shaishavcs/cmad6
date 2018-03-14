package com.cmad.essentials.blogger.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DAOConnectionRepositoryImpl implements DAOConnectionRepository {

	@Autowired
	List<DAOConnection> daoConnectionRepository = new ArrayList<DAOConnection>();

	Map<DatasourceType, DAOConnection> daoConnectionMap;

	@PostConstruct
	public void init() {
		daoConnectionMap = new HashMap<DatasourceType, DAOConnection>();
		for (DAOConnection BloggerDAO : daoConnectionRepository) {
			daoConnectionMap.put(BloggerDAO.getDatasourceType(), BloggerDAO);
		}
	}

	@Override
	public DAOConnection getConnection(DatasourceType datasourceType) {
		// TODO Auto-generated method stub
		return daoConnectionMap.get(datasourceType);
	}

	@Override
	public DAOConnection getConnection() {
		// TODO Auto-generated method stub
		if (!daoConnectionMap.values().isEmpty()) {
			return daoConnectionMap.values().iterator().next();
		} else {
			throw new BlogDAONotFoundException("Database connection not available. Please try after some time.");
		}
	}

}
