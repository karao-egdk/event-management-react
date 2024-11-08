package events.service.imp;

import java.io.IOException;
import java.net.URL;
import java.util.List;

import org.dalesbred.Database;

import com.google.common.base.Charsets;
import com.google.common.io.Resources;

import events.dao.EventDao;
import events.entity.Budget;
import events.entity.Event;
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

	@Override
	public void addEvent(Event event) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Event> getEvents() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateEvent(Event event) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteEvent(String eventId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void addBudget(Budget budget) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteBudget(String budgetId) {
		// TODO Auto-generated method stub
		
	}
}
