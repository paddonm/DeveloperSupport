// Define Pages
const pages = {
  locations: 'locations',
  services: 'services',
  resources: 'resources',
  availability: 'availability',
  confirmation: 'confirmation',
}

// Application div
const appDiv = "app";

// Both set of different routes and template generation functions
let routes = {};
let templates = {};

// Register a template (this is to mimic a template engine)
let template = (name, templateFunction) => {
  return templates[name] = templateFunction;
};

// Define the routes. Each route is described with a route path & a template to render
// when entering that path. A template can be a string (file name), or a function that
// will directly create the DOM objects.
let route = (path, template) => {
    if (typeof template == "function") {
      return routes[path] = template;
    }
    else if (typeof template == "string") {
      return routes[path] = templates[template];
    }
    else {
      return;
    }
};

// Register the templates.
template('template1', () => {
  let elAppDiv = document.getElementById(appDiv);
  let elLink1 = document.createElement('A');
  
  elLink1.href = '#/meetings'
  elLink1.innerText = 'Meetings'

  clearElement(elAppDiv);

  elAppDiv.appendChild(elLink1);
});

template('meetings-template', () => {
  let elAppDiv = document.getElementById(appDiv);
  
  let availabilityDiv = document.createElement('DIV');
  availabilityDiv.setAttribute('id', 'availability');

  clearElement(elAppDiv);

  elAppDiv.appendChild(availabilityDiv);
  mountAvailability();
});

// Create template function
function createTemplateView(elementId, path, mount) {
  const addElement = new Promise((resolve, reject) => {
    template(`template-${elementId}`, () => {
      let elAppDiv = document.getElementById(appDiv);
  
      clearElement(elAppDiv);
      
      const element = createDiv(elementId, `<div id="${elementId}"></div>`);
      
      elAppDiv.appendChild(element);
      resolve(elAppDiv.appendChild(element));
    });

    route(`/${path}`, `template-${elementId}`);
  })

  addElement.then(() => {
    mount();
    detectRoute();
  });
}

// Define the mappings route->template.
route('/', 'template1');
route('/meetings', 'meetings-template');

// Generate DOM tree from a string
let createDiv = (id, xmlString) => {
  let d = document.createElement('div');
  d.id = id;
  d.innerHTML = xmlString;
  return d.firstChild;
};

// Helper function to create a link.
let createLink = (title, text, href) => {
  let a = document.createElement('a');
  let linkText = document.createTextNode(text);
  a.appendChild(linkText);
  a.title = title;
  a.href = href;
  return a;
};

// Helper function to add hrefs to element items
const linkToPage = (data) => {
  data.map(e => {
    var elements = document.querySelectorAll(`[data-id="${e.id}"]`);
    
    let href = `/${e.id}`
    if (window.location.hash.slice(2).length)
      href = `/${window.location.hash.slice(2)}` + href
    
      elements[0].href += href;
  })
}

// Detect what step should be rendered
function routeData() {
  let routes = window.location.hash.slice(2).replace('#', '').split('/');
  let data = { page: pages.locations, ids: {} }

  if (routes[0])
    Object.defineProperty(data.ids, 'locationId', { value: routes[0] })

  if (routes[1])
    Object.defineProperty(data.ids, 'serviceId', { value: routes[1] })

  if (routes[2])
    Object.defineProperty(data.ids, 'resourceId', { value: routes[2] })
  
  // Define page changes
  if (data.ids.locationId) {
    data.page = pages.services
    
    if (data.ids.serviceId) {
      data.page = pages.resources
      
      if (data.ids.resourceId) {
        data.page = pages.availability
      }
    }
  }
  
  return data;
}

// function detectRoute() {
//   let ids = routeData().ids
  
//   switch (routeData().page) {
//     case pages.services:
//       createTemplateView(pages.services, `${ids.locationId}`, mountServices);
//       break;

//     case pages.resources:
//       createTemplateView(pages.resources, `${ids.locationId}/${ids.serviceId}`, mountResources);
//       break;

//     case pages.availability:
//       createTemplateView(pages.availability, `${ids.locationId}/${ids.serviceId}/${ids.resourceId}`, mountAvailability);
//       break;

//     default:
//       break;
//   }
// }

// detectRoute();

// Give the correspondent route (template) or fail
let resolveRoute = (route) => {
  try {
   return routes[route];
  } catch (error) {
      throw new Error("The route is not defined");
  }
};

// The actual router, get the current URL and generate the corresponding template
let router = () => {
  const url = window.location.hash.slice(1) || "/";
  const routeResolved = resolveRoute(url);
  routeResolved();
};

// For first load or when routes are changed in browser url box.
window.addEventListener('load', router);
window.addEventListener('hashchange', router);
