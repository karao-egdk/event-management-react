package events;

import io.dropwizard.core.Application;
import io.dropwizard.core.setup.Bootstrap;
import io.dropwizard.core.setup.Environment;

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
    public void run(final eventsConfiguration configuration,
                    final Environment environment) {
        // TODO: implement application
    }

}
