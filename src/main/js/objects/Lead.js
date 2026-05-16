export default class Lead {

    constructor({
                    leadID = 0,
                    firstName = "",
                    lastName = "",
                    phone = "",
                    leadEmail = "",
                    leadDivision = "",
                    leadAddress = "",
                    leadCity = "",
                    leadProvince = "ON",
                    leadCountry = "Canada",
                    leadPostalCode = "",
                    budget = 0,
                    vehicleInterest = null,
                    tradeInVehicle = null,
                    stage = "NEW",
                    followUpDate = new Date(),
                    score = 0.0,
                    notes = "",
                    createdAt = new Date(),
                    lastInteractionDate = null,
                    lastInteractionBy = "",
                    status = true
                } = {}) {

        const isFirstEmpty = firstName === null || firstName.trim() === "";
        const isLastEmpty = lastName === null || lastName.trim() === "";

        if (isFirstEmpty && isLastEmpty) {
            throw new Error("Lead must have at least a First Name or a Last Name.");
        }

        this.leadID = leadID;
        this.firstName = isFirstEmpty ? "" : firstName.trim();
        this.lastName = isLastEmpty ? "" : lastName.trim();
        this.phone = phone || "";
        this.leadEmail = leadEmail || "";
        this.leadDivision = leadDivision || "";
        this.leadAddress = leadAddress || "";
        this.leadCity = leadCity || "";
        this.leadProvince = leadProvince || "ON";
        this.leadCountry = leadCountry || "Canada";
        this.leadPostalCode = leadPostalCode || "";

        this.budget = budget;
        this.vehicleInterest = vehicleInterest;
        this.tradeInVehicle = tradeInVehicle;
        this.stage = stage || "NEW";
        this.followUpDate = followUpDate || new Date();
        this.score = score;
        this.notes = notes || "";
        this.createdAt = createdAt || new Date();
        this.lastInteractionDate = lastInteractionDate;
        this.lastInteractionBy = lastInteractionBy || "";
        this.status = status;
    }

    getLeadID() {
        return this.leadID;
    }

    setLeadID(leadID) {
        this.leadID = leadID;
    }

    getLeadFirstName() {
        return this.firstName;
    }

    setLeadFirstName(firstName) {
        this.firstName = firstName || "";
    }

    getLeadLastName() {
        return this.lastName;
    }

    setLeadLastName(lastName) {
        this.lastName = lastName || "";
    }

    getLeadName() {
        return `${this.firstName} ${this.lastName}`.trim();
    }

    setLeadName(fullName) {
        if (!fullName || fullName.trim() === "") {
            this.firstName = "";
            this.lastName = "";
            return;
        }

        const trimmedName = fullName.trim();
        const firstSpaceIndex = trimmedName.indexOf(" ");

        if (firstSpaceIndex === -1) {
            this.firstName = trimmedName;
            this.lastName = "";
        } else {
            this.firstName = trimmedName.substring(0, firstSpaceIndex).trim();
            this.lastName = trimmedName.substring(firstSpaceIndex + 1).trim();
        }
    }

    getLeadPhoneNumber() {
        return this.phone;
    }

    setLeadPhoneNumber(phone) {
        this.phone = phone || "";
    }

    getLeadEmail() {
        return this.leadEmail;
    }

    setLeadEmail(leadEmail) {
        this.leadEmail = leadEmail || "";
    }

    getLeadDivision() {
        return this.leadDivision;
    }

    setLeadDivision(leadDivision) {
        this.leadDivision = leadDivision || "";
    }

    getLeadAddress() {
        return this.leadAddress;
    }

    setLeadAddress(leadAddress) {
        this.leadAddress = leadAddress || "";
    }

    getLeadCity() {
        return this.leadCity;
    }

    setLeadCity(leadCity) {
        this.leadCity = leadCity || "";
    }

    getLeadProvince() {
        return this.leadProvince;
    }

    setLeadProvince(leadProvince) {
        this.leadProvince = leadProvince || "ON";
    }

    getLeadCountry() {
        return this.leadCountry;
    }

    setLeadCountry(leadCountry) {
        this.leadCountry = leadCountry || "Canada";
    }

    getLeadPostalCode() {
        return this.leadPostalCode;
    }

    setLeadPostalCode(leadPostalCode) {
        this.leadPostalCode = leadPostalCode || "";
    }

    getLeadBudget() {
        return this.budget;
    }

    setLeadBudget(budget) {
        this.budget = budget;
    }

    getLeadVehicleInterest() {
        return this.vehicleInterest;
    }

    setLeadVehicleInterest(vehicleInterest) {
        this.vehicleInterest = vehicleInterest;
    }

    getTradeInVehicle() {
        return this.tradeInVehicle;
    }

    setTradeInVehicle(tradeInVehicle) {
        this.tradeInVehicle = tradeInVehicle;
    }

    getLeadStage() {
        return this.stage;
    }

    setLeadStage(stage) {
        this.stage = stage || "NEW";
    }

    getLeadFollowUpDate() {
        return this.followUpDate;
    }

    setLeadFollowUpDate(followUpDate) {
        this.followUpDate = followUpDate;
    }

    getFollowUpDate() {
        return this.followUpDate;
    }

    setFollowUpDate(followUpDate) {
        this.followUpDate = followUpDate;
    }

    getLeadScore() {
        return this.score;
    }

    setLeadScore(score) {
        this.score = score;
    }

    getLeadNotes() {
        return this.notes;
    }

    setLeadNotes(notes) {
        this.notes = notes || "";
    }

    getLeadCreatedAt() {
        return this.createdAt;
    }

    setLeadCreatedAt(createdAt) {
        this.createdAt = createdAt;
    }

    getLastInteractionDate() {
        return this.lastInteractionDate;
    }

    setLastInteractionDate(lastInteractionDate) {
        this.lastInteractionDate = lastInteractionDate;
    }

    getLastInteractionBy() {
        return this.lastInteractionBy;
    }

    setLastInteractionBy(lastInteractionBy) {
        this.lastInteractionBy = lastInteractionBy || "";
    }

    getLeadStatus() {
        return this.status;
    }

    setLeadStatus(status) {
        this.status = status;
    }

    equals(otherLead) {
        return otherLead instanceof Lead && this.leadID === otherLead.leadID;
    }

    toString() {
        const interest = this.vehicleInterest
            ? this.vehicleInterest.getFullDescription()
            : "None";

        const tradeIn = this.tradeInVehicle
            ? this.tradeInVehicle.getFullDescription()
            : "None";

        return `Lead{id=${this.leadID}, name='${this.getLeadName()}', interest='${interest}', tradeIn='${tradeIn}', score=${this.score}}`;
    }
}