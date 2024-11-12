package events.repo;

import java.util.UUID;

import org.dalesbred.Database;
import org.dalesbred.query.SqlQuery;

import events.dao.AuthDao;
import events.entity.Auth;

public class AuthRepository implements AuthDao {
	private Database database;

	public AuthRepository(Database database) {
		this.database = database;
	}

	@Override
	public Auth login(Auth auth) {
		final String LOGIN = "SELECT * FROM AUTH WHERE email=:email";
		Auth loggedInUser = database.findUnique(Auth.class, SqlQuery.namedQuery(LOGIN, auth));

		return loggedInUser;

	}

	@Override
	public void signup(Auth auth) {
		final String SIGNUP = "INSERT INTO AUTH (id, email, password) VALUES (:id, :email, :password)";

		database.update(SqlQuery.namedQuery(SIGNUP, auth));

	}

	@Override
	public UUID isUserPresent(String email) {
		final String LOGIN = "SELECT * FROM AUTH WHERE email=?";
		Auth loggedInUser = database.findUnique(Auth.class, SqlQuery.query(LOGIN, email));

		return loggedInUser.getId();
	}

}
