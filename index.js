store = {drivers: [], passengers: [], trips: []};

let userId = 0;
class Driver {
  constructor(name) {
    this.name = name;
    this.id = ++userId;
    store.drivers.push(this)
  } 

  trips() {
    return store.trips.filter(function(trip) {
      return trip.driverId === this.id
    }.bind(this))
  }

  passengers() {
    return store.passengers.filter(function(passenger) {
      return passenger.trips
    }.bind(this))
  }
}

let passId = 0;
class Passenger {
  constructor(name) {
    this.name = name;
    this.id = ++passId;
    store.passengers.push(this)
  }
  trips() {
    return store.trips.filter(function(trip) {
      return trip.passengerId === this.id;
    }.bind(this))
  }

  drivers() {
    return store.drivers.filter(function(driver) {
      return driver.trips
    }.bind(this))
  }
}

let tripId = 0;
class Trip {
  constructor(driver, passenger) {
    this.id = ++tripId;
    store.trips.push(this)
    if(driver) {this.driverId = driver.id}
    if(passenger) {this.passengerId = passenger.id}
  }
  passenger() {
    return store.passengers.find(passenger => {
      return passenger.id === this.passengerId;  // <----right here
    })
  }

  driver() {
   return store.drivers.find(function(driver) {
     return driver.id === this.driverId
   }.bind(this))
  }
}