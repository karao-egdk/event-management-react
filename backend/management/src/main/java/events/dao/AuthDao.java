package events.dao;

import java.util.UUID;

import events.entity.Auth;

public interface AuthDao {

	Auth login(Auth auth);

	UUID isUserPresent(String email);

	void signup(Auth auth);
}
