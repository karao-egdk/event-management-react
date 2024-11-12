package events.entity;

import java.util.UUID;

import events.dto.BudgetDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {
	private UUID userId;
	private String eventId;
	private String title;
	private String date;
	private String location;
	private BudgetDto budget;

	public Event(String eventId, String title, String date, String location, UUID userId) {
		this.eventId = eventId;
		this.title = title;
		this.date = date;
		this.location = location;
		this.userId = userId;
	}
}
