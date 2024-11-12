package events.repo;

import java.util.UUID;

import org.dalesbred.Database;

import events.dao.AuthDao;
import events.entity.Auth;

public class AuthRepository implements AuthDao {
	private Database database;

	public AuthRepository(Database database) {
		this.database = database;
	}

	@Override
	public Auth login(Auth auth) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public UUID isUserPresent(String email) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void signup(Auth auth) {
		// TODO Auto-generated method stub
		
	}



}
