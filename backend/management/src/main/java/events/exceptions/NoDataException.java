package events.exceptions;

public class NoDataException extends Exception {
	private static final long serialVersionUID = 1L;

	public NoDataException(String errorMessage) {
		super(errorMessage);
	}
}
