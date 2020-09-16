const buildAppointmentSettings = () => {
  console.log('building settings');
  var elSettings = document.createElement('DIV');
  elSettings.setAttribute('id', 'settings');
  
  var elServiceDurationField = document.createElement('DIV');
  elServiceDurationField.className = 'renderField';

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

  elNotesField = document.createElement('DIV');
  elNotesField.className = 'renderField'

  elNotes = document.createElement('TEXTAREA');
  elNotes.setAttribute('rows', 15);
  
  elNotesLabel = document.createElement('LABEL');
  elNotesLabel.innerText = 'Appointment notes'

  elNotesField.appendChild(elNotesLabel);
  elNotesField.appendChild(elNotes);

  elSettings.appendChild(elServiceDurationField);
  elSettings.appendChild(elNotesField);

  return elSettings;
}