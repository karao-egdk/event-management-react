package events.resources;

import java.util.Map;
import java.util.UUID;

import org.dalesbred.Database;

import events.entity.Auth;
import events.service.AuthService;
import events.service.imp.AuthServiceImplementation;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;

@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthResource {
	private AuthService service;

	public AuthResource(Database database) {
		this.service = new AuthServiceImplementation(database);
	}

	@POST
	@Path("/login")
	public Response login(Auth auth) {
		try {
			Map<String, UUID> uuid = service.login(auth);

			return Response.status(Status.OK).entity(uuid).build();
		} catch (Exception e) {
			return Response.status(Status.BAD_REQUEST).entity(e.getMessage()).build();
		}
	}

	@POST
	@Path("/sign-up")
	public Response signup(Auth auth) {
		try {
			Map<String, UUID> uuid = service.signup(auth);

			return Response.status(Status.OK).entity(uuid).build();
		} catch (Exception e) {
			return Response.status(Status.BAD_REQUEST).entity(e.getMessage()).build();
		}
	}
}
