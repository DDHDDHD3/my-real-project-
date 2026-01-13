import { Injectable } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

@Injectable({
    providedIn: 'root'
})
export class MonitoringService {
    private appInsights: ApplicationInsights;

    constructor() {
        this.appInsights = new ApplicationInsights({
            config: {
                connectionString: 'YOUR_CONNECTION_STRING_HERE', // User needs to replace this
                enableAutoRouteTracking: true // Option to enable better route tracking
            }
        });

        this.appInsights.loadAppInsights();
        this.appInsights.trackPageView(); // Manually call trackPageView to establish the current user/session/pageview
    }

    logEvent(name: string, properties?: { [key: string]: any }) {
        this.appInsights.trackEvent({ name }, properties);
    }

    logError(error: Error) {
        this.appInsights.trackException({ exception: error });
    }

    logPageView(name?: string, url?: string) {
        this.appInsights.trackPageView({ name, uri: url });
    }
}
