// Use ES module imports, no require
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "REMOVED",
  authDomain: "REMOVED",
  projectId: "REMOVED",
  storageBucket: "REMOVED.appspot.com",
  messagingSenderId: "REMOVED",
  appId: "1:REMOVED:web:f851cdd8f33f4ca4e35166",
  measurementId: "REMOVED"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const rsvpForm = document.getElementById('rsvpForm');
const confirmationMessage = document.getElementById('confirmationMessage');

rsvpForm.addEventListener('submit', (e) => {
  e.preventDefault();  // Prevent the default form submission behavior

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
    rsvpForm.reset(); // Reset form after submission
  })
  .catch((error) => {
    confirmationMessage.textContent = 'Something went wrong. Please try again.';
    confirmationMessage.classList.remove('success');
    confirmationMessage.classList.add('error');
    confirmationMessage.style.display = 'block';
  });
});

