package events.resources;

import org.dalesbred.Database;

import events.entity.Budget;
import events.entity.Event;
import events.service.EventService;
import events.service.imp.EventServiceImplementation;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;

@Path("/events")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class EventResource {
	private EventService eventService;

	public EventResource(Database database) {
		this.eventService = new EventServiceImplementation(database);
	}

	@GET
	public Response getEvents() {
		try {
			return Response.status(Status.OK).entity(eventService.getEvents()).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Status.BAD_GATEWAY).entity(e.getMessage()).build();
		}
	}

	@POST
	@Path("/add")
	public Response addEvent(Event event) {
		try {
			eventService.addEvent(event);
			return Response.status(Status.OK).entity("Event added successfully").build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Status.BAD_REQUEST).entity(e.getMessage()).build();
		}
	}

	@PUT
	@Path("/update")
	public Response updateEvent(Event event) {
		try {
			eventService.updateEvent(event);
			return Response.status(Status.OK).entity("Event updated successfully").build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Status.BAD_REQUEST).entity(e.getMessage()).build();
		}
	}

	@DELETE
	@Path("/delete")
	public Response deleteEvent(String eventId) {
		try {
			eventService.deleteEvent(eventId);
			return Response.status(Status.OK).entity("Event deleted successfully").build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Status.BAD_REQUEST).entity(e.getMessage()).build();
		}
	}

	@POST
	@Path("/budget/add")
	public Response addBudget(Budget budget) {
		try {
			eventService.addBudget(budget);
			return Response.status(Status.OK).entity("Budget added successfully").build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Status.BAD_REQUEST).entity(e.getMessage()).build();
		}
	}

	@DELETE
	@Path("/budget/delete")
	public Response deleteBudget(String budgetId) {
		try {
			eventService.deleteBudget(budgetId);
			return Response.status(Status.OK).entity("Budget deleted successfully").build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Status.BAD_REQUEST).entity(e.getMessage()).build();
		}
	}
}
