import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

function init() {
	Sentry.init({
		dsn: "https://4edb3f44507c4dca84c4397627213649@o1134936.ingest.sentry.io/6183413",
		integrations: [new BrowserTracing()],

		// Set tracesSampleRate to 1.0 to capture 100%
		// of transactions for performance monitoring.
		// We recommend adjusting this value in production
		tracesSampleRate: 1.0,
	});
}

function log(error) {
	Sentry.captureException(error);
	Sentry.captureMessage("Something went wrong");
}

export default {
	init,
	log,
};
