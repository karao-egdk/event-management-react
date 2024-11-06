package events.repo;

import org.dalesbred.Database;

import events.dao.EventDao;

public class EventRepository implements EventDao {
	private Database database;

	public EventRepository(Database database) {
		this.database = database;
	}

}
