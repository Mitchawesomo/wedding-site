// Import the necessary Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
require('dotenv').config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
const AUTH_DOMAIN = process.env.AUTH_DOMAIN
const APP_ID = process.env.APP_ID

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "GOOGLE_API_KEY",
  authDomain: "AUTH_DOMAIN",
  projectId: "REMOVED",
  storageBucket: "REMOVED.firebasestorage.app",
  messagingSenderId: "REMOVED",
  appId: "APP_ID",
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

  const name = document.getElementById('name').value;
  const attending = document.getElementById('attendance').value;
  const guests = document.getElementById('guests').value;
  const dietary = document.getElementById('dietary').value;

  // Save the RSVP to Firestore
  addDoc(collection(db, "rsvps"), {
    name: name,
    attending: attending,
    guests: guests,
    dietary: dietary
  })
  .then(() => {
    confirmationMessage.textContent = 'RSVP submitted successfully! We can’t wait to see you!';
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

