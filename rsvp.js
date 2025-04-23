// Import the necessary Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBY_OPbVrCYOp9MyPa8YHpKzy8Htm55MRA",
  authDomain: "wedding-7bfad.firebaseapp.com",
  projectId: "wedding-7bfad",
  storageBucket: "wedding-7bfad.firebasestorage.app",
  messagingSenderId: "681822932115",
  appId: "1:681822932115:web:f851cdd8f33f4ca4e35166",
  measurementId: "G-G60RPYXDCL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const rsvpForm = document.getElementById('rsvpForm');
const confirmationMessage = document.getElementById('confirmationMessage');

rsvpForm.addEventListener('submit', async (e) => {
  e.preventDefault();

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

  try {
    await addDoc(collection(db, "rsvps"), {
      name,
      attending,
      guests,
      dietary
    });

    const message = attending === 'Yes'
      ? 'RSVP submitted successfully! We can’t wait to see you!'
      : 'We’re sorry you can’t make it. We’ll miss you, but thank you for letting us know 💛';

    confirmationMessage.textContent = message;
    confirmationMessage.classList.remove('error');
    confirmationMessage.classList.add('success');
    confirmationMessage.style.display = 'block';

    // Delay the reset to avoid clashing with the message
    setTimeout(() => {
      rsvpForm.reset();
    }, 200); // short delay so nothing weird sneaks in

  } catch (error) {
    confirmationMessage.textContent = 'Something went wrong. Please try again.';
    confirmationMessage.classList.remove('success');
    confirmationMessage.classList.add('error');
    confirmationMessage.style.display = 'block';
  }
});

