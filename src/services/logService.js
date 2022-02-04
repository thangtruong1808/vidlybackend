import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

function init() {
	Sentry.init({
		dsn: "https://876868fb4fec454db535ab3ddc2e96fc@o1135048.ingest.sentry.io/6183571",
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
