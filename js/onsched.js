// Begin OnSchedJs Logic
var onsched = OnSched(window.clientId, 'live');

/// Get instance of elements to use for creating elements
var elements = onsched.elements();

// Locations element
const mountLocations = () => {
  var searchParams = { placeholder: 'Enter Zipcode to find nearest', message: '', searchText: '' };
  var searchOptions = {};
  // location variable is system variable so use something else
  var search = elements.create("search", searchParams, searchOptions);
  var elSearch = document.getElementById("search");

  elSearch.addEventListener("clicked", function (e) {
    locationsParams.nearestTo = e.detail.searchText;
    locations.mount("locations");
  });
  
  elSearch.addEventListener("notFound", function () {
    alert(`We couldn't find a location with the name`);
  });
  
  var locationsParams = { units: "imperial", limit: 8, offset: 0 };
  var locationsOptions = {};
  var locations = elements.create("locations", locationsParams, locationsOptions);
  var elLocations = document.getElementById("locations");
  
  elLocations.addEventListener("clickLocation", function (e) {
    // Hide the Locations element
    elLocations.innerHTML = "";
    elSearch.innerHTML = "";
    
    // Create the Services template
    createTemplateView('services', `${e.detail.locationId}`, mountServices);
  });
  
  elLocations.addEventListener("getLocations", function (e) {
    // Add link routes to location items
    linkToPage(e.detail.data);
  });
  
  search.mount("search");
  locations.mount('locations');
}

// Services element
const mountServices = () => {
  var servicesParams = { locationId: routeData().ids.locationId };
  var servicesOptions = {};
  var services = elements.create("services", servicesParams, servicesOptions);
  var elServices = document.getElementById("services");
  
  elServices.addEventListener("clickService", function (e) {
    // Hide the Services element
    elServices.innerHTML = "";
    
    // Create the Resources template
    createTemplateView('resources', `${routeData().ids.locationId}/${e.detail.serviceId}`, mountResources);
  });
  
  elServices.addEventListener("getServices", function (e) {
    // Add link routes to location items
    linkToPage(e.detail.data);
  });
  
  services.mount('services');
}

// Resources element
const mountResources = () => {
  let ids = routeData().ids
  var resourcesParams = { locationId: ids.locationId, serviceId: ids.serviceId };
  var resourcesOptions = {};
  var resources = elements.create("resources", resourcesParams, resourcesOptions);
  var elResources = document.getElementById("resources");
  
  elResources.addEventListener("clickResource", function (e) {
    // Hide the resources element
    elResources.innerHTML = "";
    
    // Create the Resources template
    createTemplateView(
      'availability', 
      `${ids.locationId}/${ids.serviceId}/${e.detail.resourceId}`, 
      mountAvailability
    );
  });
  
  elResources.addEventListener("getResources", function (e) {
    // Add link routes to location items
    linkToPage(e.detail.data);
  });
  
  resources.mount('resources');
}

const mountAvailability = () => {
  var availabilityParams = { locationId: 'livedemo', serviceId: '1523', resourceId: '7351' };
  var availabilityOptions = {};
  var availability = elements.create("availability", availabilityParams, availabilityOptions);
  // var elavailability = document.getElementById("availability");

  availability.mount('availability')
}