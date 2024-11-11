package events.dao;

import java.util.List;

import events.dto.BudgetDetailsDto;
import events.entity.Budget;
import events.entity.Event;
import events.enums.BudgetType;

public interface EventDao {

	void addEvent(Event event);

	List<Event> getEvents();

	void updateEvent(Event event);

	void deleteEvent(String eventId);

	void addBudget(Budget budget);

	void deleteBudget(String budgetId);

	List<BudgetDetailsDto> getBudget(String eventId, BudgetType type);
}
