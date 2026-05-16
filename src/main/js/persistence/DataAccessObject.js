import DataAccess from "./DataAccess.js";
import Lead from "../objects/Lead.js";
import Vehicle from "../objects/Vehicle.js";
import Task from "../objects/Task.js";
import Notification from "../objects/Notification.js";

export default class DataAccessObject extends DataAccess {
    constructor(dbName = "AutoTrack") {
        super();

        this.dbName = dbName;
        this.isOpen = false;

        this.leadsKey = `${dbName}_Leads`;
        this.tasksKey = `${dbName}_Tasks`;
        this.notificationsKey = `${dbName}_Notifications`;
        this.vehiclesKey = `${dbName}_Vehicles`;
    }

    open() {
        this.isOpen = true;

        this.#initializeTable(this.leadsKey);
        this.#initializeTable(this.tasksKey);
        this.#initializeTable(this.notificationsKey);
        this.#initializeTable(this.vehiclesKey);

        console.log(`Database opened: ${this.dbName}`);
    }

    close() {
        this.isOpen = false;
        console.log(`Database closed: ${this.dbName}`);
    }

    // =========================
    // Lead
    // =========================

    getLeadSequential(leadResult) {
        this.#checkOpen();

        leadResult.length = 0;

        const leads = this.#load(this.leadsKey).map(data => this.#deserializeLead(data));
        leadResult.push(...leads);

        return null;
    }

    getLeadRandom(criteria) {
        this.#checkOpen();

        const leads = this.#load(this.leadsKey).map(data => this.#deserializeLead(data));

        if (criteria.getLeadID && criteria.getLeadID() > 0) {
            return leads.filter(lead => lead.getLeadID() === criteria.getLeadID());
        }

        return leads.filter(lead =>
            lead.getLeadFirstName() === criteria.getLeadFirstName() &&
            lead.getLeadLastName() === criteria.getLeadLastName() &&
            lead.getLeadPhoneNumber() === criteria.getLeadPhoneNumber()
        );
    }

    insertLead(lead) {
        this.#checkOpen();

        const leads = this.#load(this.leadsKey);
        const newID = this.#generateID(leads, "leadID");

        lead.setLeadID(newID);
        leads.push(this.#serializeLead(lead));

        this.#save(this.leadsKey, leads);

        return null;
    }

    updateLead(lead) {
        this.#checkOpen();

        const leads = this.#load(this.leadsKey);
        const index = leads.findIndex(item => item.leadID === lead.getLeadID());

        if (index === -1) {
            return `Update failed: Lead ID ${lead.getLeadID()} not found`;
        }

        leads[index] = this.#serializeLead(lead);
        this.#save(this.leadsKey, leads);

        return null;
    }

    deleteLead(lead) {
        this.#checkOpen();

        const leads = this.#load(this.leadsKey);
        const updatedLeads = leads.filter(item => item.leadID !== lead.getLeadID());

        if (updatedLeads.length === leads.length) {
            return "Delete failed: Lead not found";
        }

        this.#save(this.leadsKey, updatedLeads);

        return null;
    }

    // =========================
    // Notification
    // =========================

    getNotificationSequential(notificationResult) {
        this.#checkOpen();

        notificationResult.length = 0;

        const notifications = this.#load(this.notificationsKey)
            .map(data => this.#deserializeNotification(data))
            .sort((a, b) => b.getDate() - a.getDate());

        notificationResult.push(...notifications);

        return null;
    }

    getNotificationRandom(criteria) {
        this.#checkOpen();

        const notifications = this.#load(this.notificationsKey)
            .map(data => this.#deserializeNotification(data));

        if (criteria.getTitle && criteria.getTitle()) {
            return notifications.filter(notification =>
                notification.getTitle().toLowerCase().includes(criteria.getTitle().toLowerCase())
            );
        }

        return notifications.filter(notification =>
            notification.getEventID() === criteria.getEventID()
        );
    }

    insertNotification(notification) {
        this.#checkOpen();

        const notifications = this.#load(this.notificationsKey);
        const newID = this.#generateID(notifications, "eventID");

        notification.setEventID(newID);
        notifications.push(this.#serializeNotification(notification));

        this.#save(this.notificationsKey, notifications);

        return null;
    }

    updateNotification(notification) {
        this.#checkOpen();

        const notifications = this.#load(this.notificationsKey);
        const index = notifications.findIndex(item => item.eventID === notification.getEventID());

        if (index === -1) {
            return "Update failed: Notification not found";
        }

        notifications[index] = this.#serializeNotification(notification);
        this.#save(this.notificationsKey, notifications);

        return null;
    }

    deleteNotification(notification) {
        this.#checkOpen();

        const notifications = this.#load(this.notificationsKey);
        const updatedNotifications = notifications.filter(
            item => item.eventID !== notification.getEventID()
        );

        if (updatedNotifications.length === notifications.length) {
            return "Delete failed: Notification not found";
        }

        this.#save(this.notificationsKey, updatedNotifications);

        return null;
    }

    getAllNotifications() {
        const result = [];
        this.getNotificationSequential(result);
        return result;
    }

    // =========================
    // Task
    // =========================

    getTaskSequential(taskResult) {
        this.#checkOpen();

        taskResult.length = 0;

        const tasks = this.#load(this.tasksKey)
            .map(data => this.#deserializeTask(data))
            .sort((a, b) => a.getDate() - b.getDate());

        taskResult.push(...tasks);

        return null;
    }

    getTaskRandom(criteria) {
        this.#checkOpen();

        const tasks = this.#load(this.tasksKey).map(data => this.#deserializeTask(data));

        if (!criteria.getLead()) {
            return [];
        }

        return tasks.filter(task =>
            task.getLead() &&
            task.getLead().getLeadID() === criteria.getLead().getLeadID()
        );
    }

    insertTask(task) {
        this.#checkOpen();

        const tasks = this.#load(this.tasksKey);
        const newID = this.#generateID(tasks, "eventID");

        task.setEventID(newID);
        tasks.push(this.#serializeTask(task));

        this.#save(this.tasksKey, tasks);

        return null;
    }

    updateTask(task) {
        this.#checkOpen();

        const tasks = this.#load(this.tasksKey);
        const index = tasks.findIndex(item => item.eventID === task.getEventID());

        if (index === -1) {
            return "Update failed: Task not found";
        }

        tasks[index] = this.#serializeTask(task);
        this.#save(this.tasksKey, tasks);

        return null;
    }

    deleteTask(task) {
        this.#checkOpen();

        const tasks = this.#load(this.tasksKey);
        const updatedTasks = tasks.filter(item => item.eventID !== task.getEventID());

        if (updatedTasks.length === tasks.length) {
            return "Delete failed: Task not found";
        }

        this.#save(this.tasksKey, updatedTasks);

        return null;
    }

    // =========================
    // Vehicle
    // =========================

    getVehicleSequential(vehicleResult) {
        this.#checkOpen();

        vehicleResult.length = 0;

        const vehicles = this.#load(this.vehiclesKey)
            .map(data => this.#deserializeVehicle(data))
            .sort((a, b) => String(b.getYear()).localeCompare(String(a.getYear())));

        vehicleResult.push(...vehicles);

        return null;
    }

    getVehicleRandom(criteria) {
        this.#checkOpen();

        const searchText = (
            criteria.getModel() ||
            criteria.getMake() ||
            ""
        ).toLowerCase();

        return this.#load(this.vehiclesKey)
            .map(data => this.#deserializeVehicle(data))
            .filter(vehicle =>
                String(vehicle.getModel()).toLowerCase().includes(searchText) ||
                String(vehicle.getMake()).toLowerCase().includes(searchText)
            );
    }

    insertVehicle(vehicle) {
        this.#checkOpen();

        const vehicles = this.#load(this.vehiclesKey);
        const newID = this.#generateID(vehicles, "vehicleID");

        vehicle.setVehicleID(newID);
        vehicles.push(this.#serializeVehicle(vehicle));

        this.#save(this.vehiclesKey, vehicles);

        return null;
    }

    updateVehicle(vehicle) {
        this.#checkOpen();

        const vehicles = this.#load(this.vehiclesKey);
        const index = vehicles.findIndex(item => item.vehicleID === vehicle.getVehicleID());

        if (index === -1) {
            return "Update failed: Vehicle not found";
        }

        vehicles[index] = this.#serializeVehicle(vehicle);
        this.#save(this.vehiclesKey, vehicles);

        return null;
    }

    deleteVehicle(vehicle) {
        this.#checkOpen();

        const vehicles = this.#load(this.vehiclesKey);
        const updatedVehicles = vehicles.filter(
            item => item.vehicleID !== vehicle.getVehicleID()
        );

        if (updatedVehicles.length === vehicles.length) {
            return "Delete failed: Vehicle not found";
        }

        this.#save(this.vehiclesKey, updatedVehicles);

        return null;
    }

    getFilteredColumnValues(targetColumn, selection, selectionArgs) {
        this.#checkOpen();

        const leads = this.#load(this.leadsKey);

        return leads
            .map(lead => lead[targetColumn])
            .filter(value => value !== null && value !== undefined && value !== "");
    }

    getUniqueColumnValues(columnName) {
        this.#checkOpen();

        const leads = this.#load(this.leadsKey);
        const values = leads
            .map(lead => lead[columnName])
            .filter(value => value !== null && value !== undefined && value !== "");

        return [...new Set(values)];
    }

    // =========================
    // Private Helpers
    // =========================

    #initializeTable(key) {
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, JSON.stringify([]));
        }
    }

    #load(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    #save(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    #checkOpen() {
        if (!this.isOpen) {
            throw new Error("Database connection has not been opened.");
        }
    }

    #generateID(items, idField) {
        if (items.length === 0) {
            return 1;
        }

        return Math.max(...items.map(item => item[idField] || 0)) + 1;
    }

    #serializeVehicle(vehicle) {
        if (!vehicle) {
            return null;
        }

        return {
            vehicleID: vehicle.getVehicleID(),
            make: vehicle.getMake(),
            model: vehicle.getModel(),
            year: vehicle.getYear(),
            trim: vehicle.getTrim(),
            price: vehicle.getPrice(),
            color: vehicle.getColor(),
            inStock: vehicle.isInStock(),
            vin: vehicle.getVin(),
            transmission: vehicle.getTransmission()
        };
    }

    #deserializeVehicle(data) {
        if (!data) {
            return null;
        }

        const vehicle = new Vehicle(
            data.make,
            data.model,
            data.year,
            data.trim,
            data.price,
            data.color,
            data.inStock,
            data.vin,
            data.transmission
        );

        vehicle.setVehicleID(data.vehicleID || 0);

        return vehicle;
    }

    #serializeLead(lead) {
        return {
            leadID: lead.getLeadID(),
            firstName: lead.getLeadFirstName(),
            lastName: lead.getLeadLastName(),
            phone: lead.getLeadPhoneNumber(),
            leadEmail: lead.getLeadEmail(),
            leadDivision: lead.getLeadDivision(),
            leadAddress: lead.getLeadAddress(),
            leadCity: lead.getLeadCity(),
            leadProvince: lead.getLeadProvince(),
            leadCountry: lead.getLeadCountry(),
            leadPostalCode: lead.getLeadPostalCode(),
            budget: lead.getLeadBudget(),
            vehicleInterest: this.#serializeVehicle(lead.getLeadVehicleInterest()),
            tradeInVehicle: this.#serializeVehicle(lead.getTradeInVehicle()),
            stage: lead.getLeadStage(),
            followUpDate: lead.getLeadFollowUpDate()
                ? lead.getLeadFollowUpDate().getTime()
                : null,
            score: lead.getLeadScore(),
            notes: lead.getLeadNotes(),
            createdAt: lead.getLeadCreatedAt()
                ? lead.getLeadCreatedAt().getTime()
                : null,
            lastInteractionDate: lead.getLastInteractionDate()
                ? lead.getLastInteractionDate().getTime()
                : null,
            lastInteractionBy: lead.getLastInteractionBy(),
            status: lead.getLeadStatus()
        };
    }

    #deserializeLead(data) {
        return new Lead({
            leadID: data.leadID,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            leadEmail: data.leadEmail,
            leadDivision: data.leadDivision,
            leadAddress: data.leadAddress,
            leadCity: data.leadCity,
            leadProvince: data.leadProvince,
            leadCountry: data.leadCountry,
            leadPostalCode: data.leadPostalCode,
            budget: data.budget,
            vehicleInterest: this.#deserializeVehicle(data.vehicleInterest),
            tradeInVehicle: this.#deserializeVehicle(data.tradeInVehicle),
            stage: data.stage,
            followUpDate: data.followUpDate ? new Date(data.followUpDate) : new Date(),
            score: data.score,
            notes: data.notes,
            createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
            lastInteractionDate: data.lastInteractionDate
                ? new Date(data.lastInteractionDate)
                : null,
            lastInteractionBy: data.lastInteractionBy,
            status: data.status
        });
    }

    #serializeTask(task) {
        return {
            eventID: task.getEventID(),
            title: task.getTitle(),
            date: task.getDate().getTime(),
            lead: this.#serializeLead(task.getLead()),
            completed: task.isCompleted()
        };
    }

    #deserializeTask(data) {
        const task = new Task(
            this.#deserializeLead(data.lead),
            data.title,
            new Date(data.date),
            data.eventID
        );

        task.setCompleted(data.completed);

        return task;
    }

    #serializeNotification(notification) {
        return {
            eventID: notification.getEventID(),
            title: notification.getTitle(),
            date: notification.getDate().getTime(),
            lead: this.#serializeLead(notification.getLead())
        };
    }

    #deserializeNotification(data) {
        return new Notification(
            this.#deserializeLead(data.lead),
            data.title,
            new Date(data.date),
            data.eventID
        );
    }
}