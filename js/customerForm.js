const formFields = [
  {
    name: 'email',
    label: 'Email',
    required: true
  }
]

var customerForm = document.createElement('FORM');

const buildCustomerForm = () => {
  var elCustomerForm = document.createElement('DIV');
  elCustomerForm.innerHTML = '';
  elCustomerForm.setAttribute('id', 'customerForm');
  customerForm.innerHTML = '';

  var elFormHeader = document.createElement('H4');
  elFormHeader.innerText = 'Sign in'
  
  customerForm.appendChild(elFormHeader);

  formFields.map(field => 
    buildCustomerField(field)
  );
  
  var submitBtn = document.createElement('BUTTON');
  submitBtn.setAttribute('type', 'submit');
  submitBtn.innerText = 'Sign in'
  customerForm.appendChild(submitBtn);
  elCustomerForm.appendChild(customerForm)

  return elCustomerForm;
}

const buildCustomerField = (field) => {
  var stringField = document.createElement('DIV');
  var stringInput = document.createElement('INPUT');
  var stringLabel = document.createElement('LABEL');
  var elError = document.createElement('SPAN');
  
  elError.innerText = '*'
  
  stringField.className = 'renderField';
  stringInput.setAttribute('placeholder', field.label);
  stringInput.setAttribute('name', field.name);
  stringInput.setAttribute('id', field.name);
  
  stringLabel.innerText = field.label;
  console.log('req', field.label, field.required)
  if (field.required)
    stringLabel.appendChild(elError);

  stringField.appendChild(stringLabel);
  stringField.appendChild(stringInput);

  customerForm.appendChild(stringField);
}

customerForm.onsubmit = function(e) {
  e.preventDefault();

  var elEmailField = document.getElementById('email');

  const values = {
    email: elEmailField.value,
  }

  let errors = validateCustomerForm(values)
  
  if (Object.keys(errors).length) {
    const errFields = Object.keys(errors).filter(element => Object.keys(values).includes(element));
    const validFields = Object.keys(values).filter(element => !Object.keys(errors).includes(element));
    
    errFields.map( 
      intersected => 
      document.getElementById(intersected).className = 'error'
    );
    
    validFields.map( 
      intersected => 
      document.getElementById(intersected).className = ''
    );
  }
  else {
    // Successful
    Object.keys(values).map( validField => document.getElementById(validField).className = '' );
    let validEmail = values.email.split('@')[1].toLowerCase() === 'onsched.com';

    if (validEmail) {
      window.location.assign('#/meetings');
      updateCustomerEmail(values.email);
    }
    else
      alert('Sorry you must be an OnSched admin to visit this site');
  }
}

const validateCustomerForm = (values) => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors;
}
