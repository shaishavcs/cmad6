package com.cmad.essentials.blogger.config;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.mongo.MongoProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.mongodb.MongoClient;

@Configuration
public class DatasourceConfig {

	@Autowired
	private MongoProperties mongoProperties;

	private Morphia morphia() {
		final Morphia morphia = new Morphia();
		// tell Morphia where to find your classes
		// can be called multiple times with different packages or classes
		morphia.mapPackage("com.cmad.essentials.blogger");

		return morphia;
	}

	@Bean
	public Datastore datastore(MongoClient mongoClient) {
		// create the Datastore connecting to the default port on the local host
		final Datastore datastore = morphia().createDatastore(mongoClient, mongoProperties.getDatabase());
		datastore.ensureIndexes();

		return datastore;
	}
	/*
	 * @Bean public DataSource datasource() throws PropertyVetoException {
	 * DriverManagerDataSource dataSource = new DriverManagerDataSource();
	 * dataSource.setDriverClassName(datasourceDriverClass);
	 * dataSource.setUrl(datasourceUrl); dataSource.setUsername(datasourceUser);
	 * dataSource.setPassword(datasourcePassword);
	 * 
	 * return dataSource; }
	 * 
	 * @Bean public LocalContainerEntityManagerFactoryBean
	 * entityManagerFactory(@Qualifier("datasource") DataSource datasource) throws
	 * PropertyVetoException { LocalContainerEntityManagerFactoryBean
	 * entityManagerFactory = new LocalContainerEntityManagerFactoryBean();
	 * entityManagerFactory.setDataSource(datasource);
	 * entityManagerFactory.setPackagesToScan(new String[] {
	 * "com.cmad.essentials.blogger" }); JpaVendorAdapter jpaVendorAdapter = new
	 * HibernateJpaVendorAdapter();
	 * entityManagerFactory.setJpaVendorAdapter(jpaVendorAdapter); return
	 * entityManagerFactory; }
	 * 
	 * @Bean public PlatformTransactionManager
	 * transactionManager(EntityManagerFactory entityManagerFactory) {
	 * JpaTransactionManager transactionManager = new JpaTransactionManager();
	 * transactionManager.setEntityManagerFactory(entityManagerFactory); return
	 * transactionManager; }
	 */}