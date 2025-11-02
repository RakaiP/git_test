// Password matching validation
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

function validatePasswords() {
  if (confirmPassword.value === '') {
    confirmPassword.setCustomValidity('');
    return;
  }
  
  if (password.value !== confirmPassword.value) {
    confirmPassword.setCustomValidity('Passwords do not match');
  } else {
    confirmPassword.setCustomValidity('');
  }
}

password.addEventListener('input', validatePasswords);
confirmPassword.addEventListener('input', validatePasswords);

// Phone number formatting with +62
const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, ''); // remove non-digits
  
  // If user types without +62, prepend it
  if (value.length > 0 && !e.target.value.startsWith('+62')) {
    value = '62' + value;
  }
  
  // Format: +62 XXX-XXXX-XXXX
  if (value.startsWith('62')) {
    let formatted = '+62';
    const digits = value.slice(2); // remove '62'
    
    if (digits.length > 0) {
      formatted += ' ' + digits.slice(0, 3);
    }
    if (digits.length > 3) {
      formatted += '-' + digits.slice(3, 7);
    }
    if (digits.length > 7) {
      formatted += '-' + digits.slice(7, 11);
    }
    
    e.target.value = formatted;
  }
});

// Validate phone number format
phoneInput.addEventListener('blur', (e) => {
  const value = e.target.value;
  const digitsOnly = value.replace(/\D/g, '');
  
  // Indonesian phone: +62 followed by 9-12 digits
  if (value && (digitsOnly.length < 11 || digitsOnly.length > 14 || !digitsOnly.startsWith('62'))) {
    phoneInput.setCustomValidity('Please enter a valid Indonesian phone number');
  } else {
    phoneInput.setCustomValidity('');
  }
});

// Form submission
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Trigger validation
  validatePasswords();
  
  if (form.checkValidity()) {
    console.log('Form is valid!');
    // You can submit the form here
    alert('Account created successfully!');
  } else {
    form.reportValidity();
  }
});