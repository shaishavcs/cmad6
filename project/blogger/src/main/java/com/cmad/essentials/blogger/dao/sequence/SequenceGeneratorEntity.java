package com.cmad.essentials.blogger.dao.sequence;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;

@Entity("Sequence")
public class SequenceGeneratorEntity {

	@Id
	protected String key;

	protected long value = 1L;

	protected SequenceGeneratorEntity() {
		super();
	}

	/**
	 * Set the key name — class or class with some other attribute(s).
	 */
	public SequenceGeneratorEntity(final String key) {
		this.key = key;
	}

	/**
	 * Set the key name and initialize the value so it won't start at 1.
	 */
	public SequenceGeneratorEntity(final String key, final long startValue) {
		this(key);
		value = startValue;
	}

	public Long getValue() {
		return value;
	}
}
