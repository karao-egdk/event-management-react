package events.dao;

import java.util.List;

import events.entity.Budget;
import events.entity.Event;

public interface EventDao {

	void addEvent(Event event);

	List<Event> getEvents();

	void updateEvent(Event event);

	void deleteEvent(String eventId);

	void addBudget(Budget budget);

	void deleteBudget(String budgetId);
}
