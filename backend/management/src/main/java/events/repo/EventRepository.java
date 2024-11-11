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
		final String GET_BUDGET = "SELECT id, description, amount FROM BUDGET WHERE event_id = ? AND budget_type = cast(? as BUDGET_TYPE)";
		return database.findAll(BudgetDetailsDto.class, SqlQuery.query(GET_BUDGET, eventId, type));

	}

	@Override
	public void addEvent(Event event) {
		final String ADD_EVENT = "INSERT INTO EVENT (id, title, date, location) VALUES (:eventId, :title, :date, :location)";

		database.update(SqlQuery.namedQuery(ADD_EVENT, event));
	}

	@Override
	public List<Event> getEvents() {
		final String GET_EVENTS = "SELECT * FROM EVENT";

		List<Event> events = database.findAll(Event.class, GET_EVENTS);
		return events;
	}

	@Override
	public void updateEvent(Event event) {
		final String UPDATE_EVENT = "UPDATE EVENT SET title = :title, date = :date, location = :location WHERE id = :eventId";

		database.update(SqlQuery.namedQuery(UPDATE_EVENT, event));

	}

	@Override
	public void deleteEvent(String eventId) {
		final String DELETE_EVENT = "DELETE FROM EVENT WHERE id = ?";

		database.update(SqlQuery.query(DELETE_EVENT, eventId));

	}

	@Override
	public void addBudget(Budget budget) {
		final String ADD_BUDGET = "INSERT INTO BUDGET (id, event_id, description, amount, budget_type) VALUES (:id, :eventId, :description, :amount, cast(:type as BUDGET_TYPE))";

		database.update(SqlQuery.namedQuery(ADD_BUDGET, budget));
	}

	@Override
	public void deleteBudget(String budgetId) {
		final String DELETE_BUDGET = "DELETE FROM BUDGET WHERE id = ?";

		database.update(SqlQuery.query(DELETE_BUDGET, budgetId));

	}

}
