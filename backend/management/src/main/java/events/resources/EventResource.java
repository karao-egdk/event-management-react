package events.resources;

import org.dalesbred.Database;

import events.service.EventService;
import events.service.imp.EventServiceImplementation;

public class EventResource {
	private EventService eventService;

	public EventResource(Database database) {
		this.eventService = new EventServiceImplementation(database);
	}
}
