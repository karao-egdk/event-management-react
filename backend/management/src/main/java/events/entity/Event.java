package events.entity;

import events.dto.BudgetDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {
	private String eventId;
	private String title;
	private String date;
	private String location;
	private BudgetDto budget;

	public Event(String eventId, String title, String date, String location) {
		this.eventId = eventId;
		this.title = title;
		this.date = date;
		this.location = location;
	}
}
