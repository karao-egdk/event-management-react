package events.repo;

import java.util.List;

import org.dalesbred.Database;
import org.dalesbred.query.SqlQuery;

import events.dao.EventDao;
import events.dto.BudgetDetailsDto;
import events.entity.Budget;
import events.entity.Event;
import events.enums.BudgetType;

public class EventRepository implements EventDao {
	private Database database;

	public EventRepository(Database database) {
		this.database = database;
	}

	@Override
	public List<BudgetDetailsDto> getBudget(String eventId, BudgetType type) {
		final String GET_BUDGET = "SELECT id, description, amount FROM BUDGET WHERE event_id = ? AND budget_type = ?";
		return database.findAll(BudgetDetailsDto.class, SqlQuery.query(GET_BUDGET, eventId, type));

	}

	@Override
	public void addEvent(Event event) {
		// TODO Auto-generated method stub

	}

	@Override
	public List<Event> getEvents() {
		final String GET_EVENTS = "SELECT * FROM EVENTS";

		List<Event> events = database.findAll(Event.class, GET_EVENTS);
		return events;
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
