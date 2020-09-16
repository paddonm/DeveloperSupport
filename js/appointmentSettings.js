const settingsFields = [
  {
    type: 'INPUT',
    label: 'Company name',
  },
  {
    type: 'INPUT',
    label: 'Ticket number',
  },
  {
    type: 'TEXTAREA',
    label: 'Appointment notes',
    attributes: [
      { name: 'rows', value: 15 },
    ]
  }
]

const addSettingsField = (field) => {
  var elField = document.createElement('DIV');
  elField.className = 'renderField';

  var el = document.createElement(field.type);
  
  if (field.attributes) {
    field.attributes.map(attr => {
      el.setAttribute(attr.name, attr.value);
    })
  }
  
  var elLabel = document.createElement('LABEL');
  elLabel.innerText = field.label

  elField.appendChild(elLabel);
  elField.appendChild(el);

  return elField
}

const buildAppointmentSettings = () => {
  console.log('building settings');
  var elSettings = document.createElement('DIV');
  elSettings.setAttribute('id', 'settings');
  
  var elServiceDurationField = document.createElement('DIV');
  elServiceDurationField.className = 'renderField duration';

  var elServiceDurationLabel = document.createElement('LABEL');
  elServiceDurationLabel.innerText = 'Book for'

  var elServiceDuration = document.createElement('INPUT');
  elServiceDuration.setAttribute('type', 'number');
  elServiceDuration.value = availabilityParams.duration;
  elServiceDuration.setAttribute('step', '15');
  elServiceDuration.setAttribute('max', '60');
  elServiceDuration.onchange = e => {
    updateAvailabilityParams('duration', e.target.value)
    mountAvailability();
  }

  var elServiceSpan = document.createElement('span');
  elServiceSpan.innerText = 'mins';

  elServiceDurationField.appendChild(elServiceDurationLabel);
  elServiceDurationField.appendChild(elServiceDuration);
  elServiceDurationField.appendChild(elServiceSpan);

  elSettings.appendChild(elServiceDurationField);

  settingsFields.map(field => {
    var elField = addSettingsField(field);
    elSettings.appendChild(elField);
  })

  return elSettings;
}