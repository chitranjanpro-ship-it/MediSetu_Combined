// Registration Form Handling
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    if (!name || !email || !phone || !password || !role) {
      alert('Please fill all fields!');
      return;
    }

    // Get existing users from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if email already exists
    const userExists = users.some(user => user.email === email);
    if (userExists) {
      alert('Email already registered! Try logging in.');
      return;
    }

    // Save user
    users.push({ name, email, phone, password, role });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! You can now login.');
    registerForm.reset();
    window.location.href = 'login.html';
  });
}

// Login Form Handling
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    if (!email || !password || !role) {
      alert('Please fill all fields!');
      return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.email === email && user.password === password && user.role === role);

    if (user) {
      // Store current user session
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      alert(`Login successful! Welcome, ${user.name}`);
      
      // Redirect based on role
      if (role === 'customer') {
        window.location.href = 'customer.html';
      } else if (role === 'partner') {
        window.location.href = 'partner.html';
      } else if (role === 'doctor') {
        window.location.href = 'doctor.html';
      } else if (role === 'vendor') {
        window.location.href = 'vendor.html';
      } else if (role === 'delivery') {
        window.location.href = 'delivery.html';
      } else if (role === 'logistics') {
        window.location.href = 'logistics.html';
      } else {
        window.location.href = 'index.html';
      }
    } else {
      alert('Invalid credentials or role!');
    }
  });
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) {
      alert('Please fill all fields!');
      return;
    }

    // Get existing contacts from localStorage
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    // Save contact message
    const contact = {
      id: contacts.length + 1,
      name: name,
      email: email,
      message: message,
      date: new Date().toISOString(),
      status: 'New'
    };

    contacts.push(contact);
    localStorage.setItem('contacts', JSON.stringify(contacts));

    alert('Thank you for contacting us! We will get back to you soon.');
    contactForm.reset();
  });
}

// Advertisement Form Handling
const adForm = document.getElementById('adForm');
if (adForm) {
  adForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const clientName = document.getElementById('clientName').value.trim();
    const clientEmail = document.getElementById('clientEmail').value.trim();
    const clientPhone = document.getElementById('clientPhone').value.trim();
    const adType = document.getElementById('adType').value;
    const creative = document.getElementById('creative').files[0];
    const notes = document.getElementById('notes').value.trim();

    if (!clientName || !clientEmail || !clientPhone || !adType || !creative) {
      alert('Please fill all required fields!');
      return;
    }

    // Get existing ads from localStorage
    let ads = JSON.parse(localStorage.getItem('advertisements')) || [];

    // Create ad object
    const ad = {
      id: ads.length + 1,
      clientName: clientName,
      clientEmail: clientEmail,
      clientPhone: clientPhone,
      adType: adType,
      creative: creative.name, // Store filename
      notes: notes,
      status: 'Pending',
      submittedDate: new Date().toISOString()
    };

    ads.push(ad);
    localStorage.setItem('advertisements', JSON.stringify(ads));

    alert('Advertisement request submitted successfully! Our team will review it shortly.');
    adForm.reset();
    window.location.href = 'adminAds.html';
  });
}

// Initialize dashboard data if needed
function initializeDashboardData() {
  // Initialize orders if not exists
  if (!localStorage.getItem('orders')) {
    localStorage.setItem('orders', JSON.stringify([]));
  }
  
  // Initialize prescriptions if not exists
  if (!localStorage.getItem('prescriptions')) {
    localStorage.setItem('prescriptions', JSON.stringify([]));
  }
  
  // Initialize reports if not exists
  if (!localStorage.getItem('reports')) {
    localStorage.setItem('reports', JSON.stringify([]));
  }
  
  // Initialize notifications if not exists
  if (!localStorage.getItem('notifications')) {
    localStorage.setItem('notifications', JSON.stringify([]));
  }
}

// Run initialization on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeDashboardData);
} else {
  initializeDashboardData();
}
