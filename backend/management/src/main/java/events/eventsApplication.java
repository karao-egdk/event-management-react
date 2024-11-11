package events;

import java.util.EnumSet;

import org.dalesbred.Database;
import org.eclipse.jetty.servlets.CrossOriginFilter;

import events.resources.EventResource;
import io.dropwizard.core.Application;
import io.dropwizard.core.setup.Bootstrap;
import io.dropwizard.core.setup.Environment;
import io.dropwizard.db.DataSourceFactory;
import jakarta.servlet.DispatcherType;
import jakarta.servlet.FilterRegistration;

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

		// --- Start of the CORS Configuration --//
		final FilterRegistration.Dynamic cors = environment.servlets().addFilter("CORS", CrossOriginFilter.class);

		cors.setInitParameter(CrossOriginFilter.ALLOWED_ORIGINS_PARAM, "*");
		cors.setInitParameter(CrossOriginFilter.ALLOWED_HEADERS_PARAM,
				"X-Requested-With,Content-Type,Accept,Origin,Authorization");
		cors.setInitParameter(CrossOriginFilter.ALLOWED_METHODS_PARAM, "OPTIONS,GET,PUT,POST,DELETE,HEAD");
		cors.setInitParameter(CrossOriginFilter.ALLOW_CREDENTIALS_PARAM, "true");
		cors.setInitParameter(CrossOriginFilter.ACCESS_CONTROL_ALLOW_ORIGIN_HEADER,
				"X-Requested-With,Content-Type,Accept,Origin,Authorization");
		cors.setInitParameter(CrossOriginFilter.CHAIN_PREFLIGHT_PARAM, Boolean.FALSE.toString());

		// Add URL mapping
		cors.addMappingForUrlPatterns(EnumSet.allOf(DispatcherType.class), true, "/*");

		environment.jersey().register(new EventResource(database));
	}

}
