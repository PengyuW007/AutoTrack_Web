import Services from "./Services.js";

export default class App {
    static dbName = "AutoTrack";
    static dbPathName = "AutoTrack.db";

    static main() {
        App.startUp();

        console.log("AutoTrack Web Application is running.");

        // Later, this is where your controller/UI startup logic can go.
        // Example:
        // LeadListController.run();
    }

    static startUp() {
        console.log("Starting AutoTrack Web Application...");

        App.setDBPathName(App.dbPathName);

        Services.initialize({
            appName: "AutoTrack Web",
            environment: "development"
        });

        console.log(`Database name: ${App.dbName}`);
        console.log(`Database path: ${App.getDBPathName()}`);

        // Later, when persistence layer is ready:
        // const dao = new DataAccessObject(App.getDBPathName());
        // Services.createDataAccess(dao);
    }

    static shutDown() {
        Services.closeDataAccess();
        console.log("AutoTrack Web Application shut down successfully.");
    }

    static getDBPathName() {
        return App.dbPathName || App.dbName;
    }

    static setDBPathName(pathName) {
        console.log(`Setting DB path to: ${pathName}`);
        App.dbPathName = pathName;
    }
}

App.main();