package events;

import org.dalesbred.Database;

import events.resources.EventResource;
import io.dropwizard.core.Application;
import io.dropwizard.core.setup.Bootstrap;
import io.dropwizard.core.setup.Environment;
import io.dropwizard.db.DataSourceFactory;

public class eventsApplication extends Application<eventsConfiguration> {

	public static void main(final String[] args) throws Exception {
		new eventsApplication().run(args);
	}

	@Override
	public String getName() {
		return "events";
	}

	@Override
	public void initialize(final Bootstrap<eventsConfiguration> bootstrap) {
		// TODO: application initialization
	}

	@Override
	public void run(final eventsConfiguration configuration, final Environment environment) {
		DataSourceFactory config = configuration.getDataSourceFactory();
		final Database database = Database.forUrlAndCredentials(config.getUrl(), config.getUser(),
				config.getPassword());

		environment.jersey().register(new EventResource(database));
	}

}
