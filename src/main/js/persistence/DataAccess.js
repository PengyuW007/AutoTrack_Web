export default class DataAccess {
    open() {
        throw new Error("open() must be implemented.");
    }

    close() {
        throw new Error("close() must be implemented.");
    }

    getLeadSequential(leadResult) {
        throw new Error("getLeadSequential() must be implemented.");
    }

    getLeadRandom(lead) {
        throw new Error("getLeadRandom() must be implemented.");
    }

    insertLead(lead) {
        throw new Error("insertLead() must be implemented.");
    }

    updateLead(lead) {
        throw new Error("updateLead() must be implemented.");
    }

    deleteLead(lead) {
        throw new Error("deleteLead() must be implemented.");
    }

    getNotificationSequential(notificationResult) {
        throw new Error("getNotificationSequential() must be implemented.");
    }

    getNotificationRandom(notification) {
        throw new Error("getNotificationRandom() must be implemented.");
    }

    insertNotification(notification) {
        throw new Error("insertNotification() must be implemented.");
    }

    updateNotification(notification) {
        throw new Error("updateNotification() must be implemented.");
    }

    deleteNotification(notification) {
        throw new Error("deleteNotification() must be implemented.");
    }

    getAllNotifications() {
        throw new Error("getAllNotifications() must be implemented.");
    }

    getTaskSequential(taskResult) {
        throw new Error("getTaskSequential() must be implemented.");
    }

    getTaskRandom(task) {
        throw new Error("getTaskRandom() must be implemented.");
    }

    insertTask(task) {
        throw new Error("insertTask() must be implemented.");
    }

    updateTask(task) {
        throw new Error("updateTask() must be implemented.");
    }

    deleteTask(task) {
        throw new Error("deleteTask() must be implemented.");
    }

    getVehicleSequential(vehicleResult) {
        throw new Error("getVehicleSequential() must be implemented.");
    }

    getVehicleRandom(vehicle) {
        throw new Error("getVehicleRandom() must be implemented.");
    }

    insertVehicle(vehicle) {
        throw new Error("insertVehicle() must be implemented.");
    }

    updateVehicle(vehicle) {
        throw new Error("updateVehicle() must be implemented.");
    }

    deleteVehicle(vehicle) {
        throw new Error("deleteVehicle() must be implemented.");
    }

    getFilteredColumnValues(targetColumn, selection, selectionArgs) {
        throw new Error("getFilteredColumnValues() must be implemented.");
    }

    getUniqueColumnValues(columnName) {
        throw new Error("getUniqueColumnValues() must be implemented.");
    }
}