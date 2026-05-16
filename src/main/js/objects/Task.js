import Event from "./Event.js";

export default class Task extends Event {

    constructor(lead, title, date, id = -1) {
        super(lead, title, date);

        this.setEventID(id);
        this.completed = false;
    }

    isCompleted() {
        return this.completed;
    }

    setCompleted(completed) {
        this.completed = completed;
    }
}