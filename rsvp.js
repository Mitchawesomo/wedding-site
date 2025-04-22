import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// Set up Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBY_OPbVrCYOp9MyPa8YHpKzy8Htm55MRA',  // Reference Firebase API key as an environment variable
  authDomain: 'wedding-7bfad.firebaseapp.com',  // Use Firebase auth domain
  projectId: 'wedding-7bfad',
  storageBucket: 'wedding-7bfad.appspot.com',
  messagingSenderId: '681822932115',
  appId: '1:681822932115:web:f851cdd8f33f4ca4e35166',  // Reference Firebase app ID
  measurementId: 'G-G60RPYXDCL'
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

