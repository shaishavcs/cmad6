package com.cmad.essentials.blogger.dao.sequence;

import org.mongodb.morphia.query.Query;
import org.mongodb.morphia.query.UpdateOperations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cmad.essentials.blogger.dao.Connection;
import com.cmad.essentials.blogger.dao.DAOConnection;

@Component
public class SequenceGeneratorServiceImpl implements SequenceGeneratorService {

	@Autowired
	DAOConnection mongoDAOConnection;

	private static final String KEY = "Blogger";
	private static Integer MIN_VALUE = 10;

	@SuppressWarnings("unchecked")
	@Override
	public Long getNextSequenceId() {
		Connection connection = mongoDAOConnection.create();
		// Get the given key from the entity and try to increment it.
		final Query<SequenceGeneratorEntity> query = (Query<SequenceGeneratorEntity>) connection
				.get(SequenceGeneratorEntity.class).field("_id").equal(KEY);
		final UpdateOperations<SequenceGeneratorEntity> updateOperations = (UpdateOperations<SequenceGeneratorEntity>) connection
				.createUpdateOperations(SequenceGeneratorEntity.class).inc("value");
		Object sequenceGenerator = connection.getDatastore().findAndModify(query, updateOperations);

		// If none is found, we need to create one for the given key.
		if (sequenceGenerator == null) {
			sequenceGenerator = new SequenceGeneratorEntity(KEY, MIN_VALUE);
			connection.persist(sequenceGenerator);
		}
		return ((SequenceGeneratorEntity) sequenceGenerator).getValue();
	}

}
