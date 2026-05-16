export default class Vehicle {

    constructor(
        make = null,
        model = null,
        year = null,
        trim = null,
        price = 0.0,
        color = null,
        inStock = false,
        vin = "N/A",
        transmission = "Automatic"
    ) {
        this.vehicleID = 0;
        this.make = make;
        this.model = model;
        this.year = year;
        this.trim = trim;
        this.price = price;
        this.color = color;
        this.inStock = inStock;
        this.vin = vin;
        this.transmission = transmission || "Automatic";
    }

    getMake() {
        return this.make;
    }

    setMake(make) {
        this.make = make;
    }

    getModel() {
        return this.model;
    }

    setModel(model) {
        this.model = model;
    }

    getYear() {
        return this.year;
    }

    setYear(year) {
        this.year = year;
    }

    getTrim() {
        return this.trim;
    }

    setTrim(trim) {
        this.trim = trim;
    }

    getTransmission() {
        return this.transmission;
    }

    setTransmission(transmission) {
        this.transmission = transmission || "Automatic";
    }

    getColor() {
        return this.color;
    }

    setColor(color) {
        this.color = color;
    }

    getPrice() {
        return this.price;
    }

    setPrice(price) {
        this.price = price;
    }

    isInStock() {
        return this.inStock;
    }

    setInStock(inStock) {
        this.inStock = inStock;
    }

    getVin() {
        return this.vin;
    }

    setVin(vin) {
        this.vin = vin;
    }

    getVehicleID() {
        return this.vehicleID;
    }

    setVehicleID(vehicleID) {
        this.vehicleID = vehicleID;
    }

    getFullDescription() {
        if (!this.make && !this.model) {
            return "No Vehicle Details";
        }

        const displayYear = this.year || "";
        const displayMake = this.make || "";
        const displayModel = this.model || "";
        const displayTrim = this.trim ? ` (${this.trim})` : "";

        return `${displayYear} ${displayMake} ${displayModel}${displayTrim}`.trim();
    }
}