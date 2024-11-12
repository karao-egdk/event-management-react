package events.service.imp;

import java.util.UUID;

import org.dalesbred.Database;
import org.dalesbred.result.EmptyResultException;

import at.favre.lib.crypto.bcrypt.BCrypt;
import events.dao.AuthDao;
import events.entity.Auth;
import events.exceptions.NoDataException;
import events.repo.AuthRepository;
import events.service.AuthService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class AuthServiceImplementation implements AuthService {
	private AuthDao repo;

	public AuthServiceImplementation(Database database) {
		this.repo = new AuthRepository(database);
	}

	private String generateJWT(UUID uuid, String email) {
		return Jwts.builder().setSubject(email).claim("uuid", uuid).signWith(SignatureAlgorithm.HS256, "SECRET_KEY")
				.compact();
	}

	@Override
	public String login(Auth auth) throws NoDataException {
		if (auth == null)
			throw new NoDataException("Data cannot be null");

		if (auth.getEmail().equals("") || auth.getEmail() == null || auth.getPassword().equals("")
				|| auth.getPassword() == null)
			throw new NoDataException("Some data missing");

		Auth loggedInUser = null;

		try {
			loggedInUser = repo.login(auth);

		} catch (EmptyResultException e) {
			return "";

		}

		BCrypt.Result result = BCrypt.verifyer().verify(auth.getPassword().toCharArray(), loggedInUser.getPassword());

		if (result.verified) {
			String token = generateJWT(loggedInUser.getId(), loggedInUser.getEmail());
			return token;
		}

		return null;

	}

	@Override
	public String signup(Auth auth) throws NoDataException {
		return null;
	}

}
