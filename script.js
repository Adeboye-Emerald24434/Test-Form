document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const messageBox = document.createElement('div');
  messageBox.id = 'form-message';
  form.prepend(messageBox); // Insert at top of form

  // Add red asterisk (*) to required labels
  const requiredLabels = form.querySelectorAll('.details, .gender-title');
  requiredLabels.forEach(label => {
    if (!label.querySelector('.required-star')) {
      const star = document.createElement('span');
      star.textContent = ' *';
      star.className = 'required-star';
      star.style.color = 'red';
      label.appendChild(star);
    }
  });

  function showError(input, message) {
    let error = input.nextElementSibling;
    if (!error || !error.classList.contains('error')) {
      error = document.createElement('div');
      error.className = 'error';
      input.insertAdjacentElement('afterend', error);
    }
    error.textContent = message;
    error.style.color = 'red';
    input.style.borderColor = 'red';
  }

  function clearError(input) {
    const error = input.nextElementSibling;
    if (error && error.classList.contains('error')) {
      error.remove();
    }
    input.style.borderColor = '#ccc';
  }

  function showMessage(message, type) {
    messageBox.textContent = message;
    messageBox.style.padding = '10px';
    messageBox.style.marginBottom = '15px';
    messageBox.style.borderRadius = '5px';
    messageBox.style.fontWeight = '500';
    if (type === 'success') {
      messageBox.style.background = '#d4edda';
      messageBox.style.color = '#155724';
      messageBox.style.border = '1px solid #c3e6cb';
    } else {
      messageBox.style.background = '#f8d7da';
      messageBox.style.color = '#721c24';
      messageBox.style.border = '1px solid #f5c6cb';
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const fullname = document.getElementById('fullname');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const state = document.getElementById('state');
    const gender = form.querySelector('input[name="gender"]:checked');

    // Full Name
    if (fullname.value.trim() === '') {
      showError(fullname, 'Full name is required');
      valid = false;
    } else clearError(fullname);

    // Username
    if (username.value.trim() === '') {
      showError(username, 'Username is required');
      valid = false;
    } else clearError(username);

    // Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      showError(email, 'Enter a valid email');
      valid = false;
    } else clearError(email);

    // Phone
    const phonePattern = /^[0-9]{10,15}$/;
    if (!phonePattern.test(phone.value.trim())) {
      showError(phone, 'Enter a valid phone number (10–15 digits)');
      valid = false;
    } else clearError(phone);

    // Password
    if (password.value.trim().length < 6) {
      showError(password, 'Password must be at least 6 characters');
      valid = false;
    } else clearError(password);

    // Confirm Password
    if (confirmPassword.value.trim() !== password.value.trim()) {
      showError(confirmPassword, 'Passwords do not match');
      valid = false;
    } else clearError(confirmPassword);

    // State of Origin
    if (state.value === '') {
      showError(state, 'Please select your state of origin');
      valid = false;
    } else clearError(state);

    // Gender
    if (!gender) {
      showMessage('Please select your gender', 'error');
      valid = false;
    }

    if (valid) {
      showMessage('Form submitted successfully!', 'success');
      form.reset();
    } else {
      showMessage('Please correct the errors before submitting.', 'error');
    }
  });
});
