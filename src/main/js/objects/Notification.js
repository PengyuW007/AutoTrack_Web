import Event from "./Event.js";

export default class Notification extends Event {

    constructor(lead, title, date, id = -1) {
        super(lead, title, date);

        this.setEventID(id);
    }

    getLeadID() {
        return this.lead ? this.lead.getLeadID() : 0;
    }
}