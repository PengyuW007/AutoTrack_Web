export default class Services {
    static dataAccessService = null;
    static appContext = null;

    static initialize(context = null) {
        Services.appContext = context;
        console.log("Services initialized.");
    }

    static getAppContext() {
        return Services.appContext;
    }

    static createDataAccess(dataAccessService) {
        if (Services.dataAccessService === null) {
            Services.dataAccessService = dataAccessService;

            if (Services.dataAccessService && typeof Services.dataAccessService.open === "function") {
                Services.dataAccessService.open();
            }
        }

        return Services.dataAccessService;
    }

    static getDataAccess() {
        if (Services.dataAccessService === null) {
            throw new Error("Connection to data access has not been established.");
        }

        return Services.dataAccessService;
    }

    static closeDataAccess() {
        if (
            Services.dataAccessService !== null &&
            typeof Services.dataAccessService.close === "function"
        ) {
            Services.dataAccessService.close();
        }

        Services.dataAccessService = null;
        console.log("Data access service closed.");
    }
}