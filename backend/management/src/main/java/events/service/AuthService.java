package events.service;

import java.util.Map;
import java.util.UUID;

import events.entity.Auth;

public interface AuthService {

	Map<String, UUID> login(Auth auth);

	Map<String, UUID> signup(Auth auth);
}
