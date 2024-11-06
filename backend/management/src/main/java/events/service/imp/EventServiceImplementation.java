package events.service.imp;

import java.io.IOException;
import java.net.URL;

import org.dalesbred.Database;

import com.google.common.base.Charsets;
import com.google.common.io.Resources;

import events.dao.EventDao;
import events.repo.EventRepository;
import events.service.EventService;

public class EventServiceImplementation implements EventService {
	private EventDao repo;
	private static final String DATA_SOURCE = "db/tables.sql";

	public EventServiceImplementation(Database database) {
		this.repo = new EventRepository(database);

		try {
			String tables = generateTableIfExists();
			database.update(tables);

		} catch (Exception e) {
			System.err.println(e);
		}
	}

	private String generateTableIfExists() throws IOException {
		URL url = Resources.getResource(DATA_SOURCE);
		String tables = Resources.toString(url, Charsets.UTF_8);
		return tables;
	}
}
