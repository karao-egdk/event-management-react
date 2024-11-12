package events.service;

import events.entity.Auth;
import events.exceptions.NoDataException;

public interface AuthService {

	String login(Auth auth) throws NoDataException;

	String signup(Auth auth) throws NoDataException;
}
