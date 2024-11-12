package events.service.imp;

import java.util.Map;
import java.util.UUID;

import org.dalesbred.Database;

import events.dao.AuthDao;
import events.entity.Auth;
import events.repo.AuthRepository;
import events.service.AuthService;

public class AuthServiceImplementation implements AuthService {
	private AuthDao repo;

	public AuthServiceImplementation(Database database) {
		this.repo = new AuthRepository(database);
	}

	@Override
	public Map<String, UUID> login(Auth auth) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map<String, UUID> signup(Auth auth) {
		// TODO Auto-generated method stub
		return null;
	}

}
