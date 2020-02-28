import {AppServices} from "SinglePageApp/App";
import {createWithMissingProdAppServices, Services} from "SinglePageApp/Services";
//import {MockHttpRequestDispatcher} from "Common/RequestHandling/Testing/MockHttpRequestDispatcher";

export function createDevServices(): AppServices {
    const services: Services = {
        //httpRequestDispatcher: new MockHttpRequestDispatcher()
    };
    return createWithMissingProdAppServices(services);
}