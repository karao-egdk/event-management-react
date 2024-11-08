package events.service;

import java.util.List;

import events.entity.Budget;
import events.entity.Event;

public interface EventService {

	void addEvent(Event event);

	List<Event> getEvents();

	void updateEvent(Event event);

	void deleteEvent(String eventId);

	void addBudget(Budget budget);

	void deleteBudget(String budgetId);
}
