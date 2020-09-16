const clearElement = (el) => {
  el.innerHTML = "";
}

var availabilityParams = {
  locationId: 'livedemo', 
  serviceId: '1523', 
  resourceId: '7351', 
  customerId: '', 
  duration: '15', 
  interval: '15', 
  completeBooking: 'BK' 
}

const updateAvailabilityParams = (param, value) => {
  availabilityParams[param] = value;
}