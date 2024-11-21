package events.resources;

import java.util.List;

import org.dalesbred.Database;

import events.entity.Budget;
import events.entity.Event;
import events.exceptions.TokenExpiredException;
import events.service.EventService;
import events.service.imp.EventServiceImplementation;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.HeaderParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
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
	public Response getEvents(@HeaderParam("token") String token) {
		try {
			List<Event> events = eventService.getEvents(token);

			if (events == null)
				return Response.status(Status.UNAUTHORIZED).entity("Token expired").build();

			return Response.status(Status.OK).entity(events).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Status.BAD_GATEWAY).entity(e.getMessage()).build();
		}
	}

	@POST
	@Path("/add")
	public Response addEvent(Event event, @HeaderParam("token") String token) {
		try {
			eventService.addEvent(event, token);
			return Response.status(Status.OK).entity("Event added successfully").build();

		} catch (TokenExpiredException e) {
			return Response.status(Status.UNAUTHORIZED).entity(e.getMessage()).build();

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
	@Path("/delete/{eventId}")
	public Response deleteEvent(@PathParam("eventId") String eventId) {
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
	@Path("/budget/delete/{budgetId}")
	public Response deleteBudget(@PathParam("budgetId") String budgetId) {
		try {
			eventService.deleteBudget(budgetId);
			return Response.status(Status.OK).entity("Budget deleted successfully").build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Status.BAD_REQUEST).entity(e.getMessage()).build();
		}
	}
}
