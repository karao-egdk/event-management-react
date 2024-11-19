package events.resources;

import org.dalesbred.Database;

import events.dto.RefreshTokenDto;
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
			String token = service.login(auth);

			if (token == null) {
				return Response.status(Status.NOT_ACCEPTABLE).entity("Wrong password").build();
			}

			if (token.equals("")) {
				return Response.status(Status.NOT_FOUND).entity("No user").build();
			}

			return Response.status(Status.OK).entity("Successfully logged in").header("Token", token).build();
		} catch (Exception e) {
			return Response.status(Status.BAD_REQUEST).entity(e.getMessage()).build();
		}
	}

	@POST
	@Path("/sign-up")
	public Response signup(Auth auth) {
		try {
			String token = service.signup(auth);

			if (token == null)
				return Response.status(Status.NOT_ACCEPTABLE).entity("User already exists with the email").build();

			return Response.status(Status.OK).header("Token", token).build();
		} catch (Exception e) {
			return Response.status(Status.BAD_REQUEST).entity(e.getMessage()).build();
		}
	}

	@POST
	@Path("/refresh-token")
	public Response refreshToken(RefreshTokenDto tokenDetails) {
		try {
			String token = service.refreshToken(tokenDetails);
			return Response.status(Status.OK).entity("Generated successfully").header("Token", token).build();
		} catch (Exception e) {
			return Response.status(Status.BAD_REQUEST).entity(e.getMessage()).build();
		}

	}
}
