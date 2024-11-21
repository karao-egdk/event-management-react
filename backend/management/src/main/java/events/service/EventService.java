package events.service;

import java.util.List;

import events.entity.Budget;
import events.entity.Event;
import events.exceptions.NoDataException;

public interface EventService {

	void addEvent(Event event, String token) throws Exception;

	List<Event> getEvents(String token);

	void updateEvent(Event event) throws NoDataException;

	void deleteEvent(String eventId) throws NoDataException;

	void addBudget(Budget budget) throws NoDataException;

	void deleteBudget(String budgetId) throws NoDataException;
}
