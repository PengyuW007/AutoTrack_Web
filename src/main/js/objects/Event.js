export default class Event {

    constructor(lead, title, date) {

        // Simulate Java abstract class behavior
        if (new.target === Event) {
            throw new Error("Cannot instantiate abstract class Event directly.");
        }

        this.title = title || "";
        this.date = date || new Date();
        this.lead = lead || null;
        this.eventID = -1;
    }

    getLead() {
        return this.lead;
    }

    setLead(lead) {
        this.lead = lead;
    }

    getTitle() {
        return this.title;
    }

    setTitle(title) {
        this.title = title;
    }

    getDate() {
        return this.date;
    }

    setDate(date) {
        this.date = date;
    }

    getEventID() {
        return this.eventID;
    }

    setEventID(eventID) {
        this.eventID = eventID;
    }
}