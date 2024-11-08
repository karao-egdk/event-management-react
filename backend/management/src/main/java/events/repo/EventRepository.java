package events.repo;

import java.util.List;

import org.dalesbred.Database;

import events.dao.EventDao;
import events.entity.Budget;
import events.entity.Event;

public class EventRepository implements EventDao {
	private Database database;

	public EventRepository(Database database) {
		this.database = database;
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
