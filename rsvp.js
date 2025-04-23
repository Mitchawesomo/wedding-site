// Import the necessary Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "REMOVED",
  authDomain: "REMOVED",
  projectId: "REMOVED",
  storageBucket: "REMOVED.firebasestorage.app",
  messagingSenderId: "REMOVED",
  appId: "1:REMOVED:web:f851cdd8f33f4ca4e35166",
  measurementId: "REMOVED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Get the form and confirmation message elements
const rsvpForm = document.getElementById('rsvpForm');
const confirmationMessage = document.getElementById('confirmationMessage');

// Event listener for form submission
rsvpForm.addEventListener('submit', (e) => {
  e.preventDefault();  // Prevent default form submission

  const name = document.getElementById('name').value.trim();
  const attending = document.getElementById('attendance').value;
  const guests = document.getElementById('guests').value;
  const dietary = document.getElementById('dietary').value;

  if (!name) {
    confirmationMessage.textContent = 'Please enter your name.';
    confirmationMessage.classList.remove('success');
    confirmationMessage.classList.add('error');
    confirmationMessage.style.display = 'block';
    return;
  }

  // Save the RSVP to Firestore
  addDoc(collection(db, "rsvps"), {
    name,
    attending,
    guests,
    dietary
  })
  .then(() => {
    let message = '';
    if (attending === 'Yes') {
      message = 'RSVP submitted successfully! We can’t wait to see you!';
    } else {
      message = 'We’re sorry you can’t make it. We’ll miss you, but thank you for letting us know 💛';
    }

    confirmationMessage.textContent = message;
    confirmationMessage.classList.remove('error');
    confirmationMessage.classList.add('success');
    confirmationMessage.style.display = 'block';
    rsvpForm.reset();  // Reset the form after submission
  })
  .catch((error) => {
    confirmationMessage.textContent = 'Something went wrong. Please try again.';
    confirmationMessage.classList.remove('success');
    confirmationMessage.classList.add('error');
    confirmationMessage.style.display = 'block';
  });
});

