package events.service.imp;

import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.dalesbred.Database;

import com.google.common.base.Charsets;
import com.google.common.io.Resources;

import events.dao.EventDao;
import events.dto.BudgetDetailsDto;
import events.dto.BudgetDto;
import events.entity.Budget;
import events.entity.Event;
import events.enums.BudgetType;
import events.exceptions.NoDataException;
import events.exceptions.TokenExpiredException;
import events.repo.EventRepository;
import events.service.EventService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

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

	private Optional<UUID> getUUIDFromToken(String token) {
		try {
			Claims claim = Jwts.parser().setSigningKey("SECRET_KEY").parseClaimsJws(token).getBody();
			return Optional.of(UUID.fromString((String) claim.get("uuid")));
		} catch (Exception e) {
			return Optional.empty();
		}

	}

	private String generateTableIfExists() throws IOException {
		URL url = Resources.getResource(DATA_SOURCE);
		String tables = Resources.toString(url, Charsets.UTF_8);
		return tables;
	}

	@Override
	public void addEvent(Event event, String token) throws NoDataException, TokenExpiredException {
		if (event == null)
			throw new NoDataException("Event Data is null");

		if (event.getTitle() == null || event.getDate() == null || event.getLocation() == null
				|| event.getEventId() == null)
			throw new NoDataException("Some data missing");

		Optional<UUID> userId = getUUIDFromToken(token);
		if (userId.isPresent()) {
			event.setUserId(userId.get());
			repo.addEvent(event);
		} else {
			throw new TokenExpiredException("Token Expired");
		}

	}

	@Override
	public List<Event> getEvents(String token) {
		Optional<UUID> userId = getUUIDFromToken(token);

		if (userId.isEmpty())
			return null;

		List<Event> events = repo.getEvents(userId.get());

		if (events.size() <= 0)
			return new ArrayList<>();

		for (Event event : events) {
			BudgetDto budget = new BudgetDto();

			List<BudgetDetailsDto> incomeBudget = repo.getBudget(event.getEventId(), BudgetType.INCOME);
			List<BudgetDetailsDto> expenseBudget = repo.getBudget(event.getEventId(), BudgetType.EXPENSE);

			budget.setExpenses(expenseBudget);
			budget.setIncome(incomeBudget);

			event.setBudget(budget);
		}

		return events;
	}

	@Override
	public void updateEvent(Event event) throws NoDataException {
		if (event == null)
			throw new NoDataException("Event Data is null");

		if (event.getTitle() == null || event.getDate() == null || event.getLocation() == null
				|| event.getEventId() == null)
			throw new NoDataException("Some data missing");

		repo.updateEvent(event);

	}

	@Override
	public void deleteEvent(String eventId) throws NoDataException {
		if (eventId == null || eventId.equals(""))
			throw new NoDataException("Event Data is null");

		repo.deleteEvent(eventId);

	}

	@Override
	public void addBudget(Budget budget) throws NoDataException {
		if (budget == null)
			throw new NoDataException("Event Data is null");

		if (budget.getAmount() == null || budget.getDescription() == null || budget.getEventId() == null
				|| budget.getId() == null || budget.getType() == null)
			throw new NoDataException("Some data missing");

		repo.addBudget(budget);

	}

	@Override
	public void deleteBudget(String budgetId) throws NoDataException {
		if (budgetId == null || budgetId.equals(""))
			throw new NoDataException("Event Data is null");

		repo.deleteBudget(budgetId);

	}
}
