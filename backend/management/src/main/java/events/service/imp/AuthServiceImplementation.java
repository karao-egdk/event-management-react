package events.service.imp;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

import org.dalesbred.Database;
import org.dalesbred.result.EmptyResultException;
import org.dalesbred.result.NonUniqueResultException;

import at.favre.lib.crypto.bcrypt.BCrypt;
import events.dao.AuthDao;
import events.dto.RefreshTokenDto;
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
		Instant now = Instant.now();
		return Jwts.builder().setSubject(email).claim("uuid", uuid).signWith(SignatureAlgorithm.HS256, "SECRET_KEY")
				.setIssuedAt(Date.from(now)).setExpiration(Date.from(now.plus(3, ChronoUnit.MINUTES))).compact();
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
		if (auth == null)
			throw new NoDataException("Data cannot be null");

		if (auth.getEmail().equals("") || auth.getEmail() == null || auth.getPassword().equals("")
				|| auth.getPassword() == null)
			throw new NoDataException("Some data missing");

		try {
			repo.isUserPresent(auth.getEmail());
			return null;

		} catch (NonUniqueResultException e) {
			// No user present with that email, can create a new user
		}

		UUID newUserId = UUID.randomUUID();
		String bcryptHashPassword = BCrypt.withDefaults().hashToString(12, auth.getPassword().toCharArray());

		auth.setId(newUserId);
		auth.setPassword(bcryptHashPassword);

		repo.signup(auth);

		String token = generateJWT(newUserId, auth.getEmail());

		return token;
	}

	@Override
	public String refreshToken(RefreshTokenDto tokenDetails) {
		return generateJWT(tokenDetails.getUuid(), tokenDetails.getEmail());
	}

}
