  // Import the functions you need from the SDKs you need
//   import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCN6m0tDyKjGHZZ6jydq8BJ_NRtGqQW5m0",
    authDomain: "edu-sraddha.firebaseapp.com",
    databaseURL: "https://edu-sraddha-default-rtdb.firebaseio.com",
    projectId: "edu-sraddha",
    storageBucket: "edu-sraddha.appspot.com",
    messagingSenderId: "724188304454",
    appId: "1:724188304454:web:e0a1c43c8c929921a8a647"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// Register function
function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const full_name = document.getElementById('full_name').value;
    const favourite_song = document.getElementById('favourite_song').value;
    const milk_before_cereal = document.getElementById('milk_before_cereal').value;

    // Validate input fields
    if (!validate_email(email) || !validate_password(password)) {
        alert('Email or Password is incorrect!');
        return;
    }
    if (!validate_field(full_name) || !validate_field(favourite_song) || !validate_field(milk_before_cereal)) {
        alert('One or more fields are empty!');
        return;
    }

    // Register the user
    auth.createUserWithEmailAndPassword(email, password)
        .then(function () {
            const user = auth.currentUser;
            const database_ref = database.ref();

            // Create user data
            const user_data = {
                email: email,
                full_name: full_name,
                favourite_song: favourite_song,
                milk_before_cereal: milk_before_cereal,
                last_login: Date.now()
            };

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).set(user_data);

            alert('User Created!');
        })
        .catch(function (error) {
            alert(error.message);
        });
}

// Login function
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate input fields
    if (!validate_email(email) || !validate_password(password)) {
        alert('Email or Password is incorrect!');
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(function () {
            const user = auth.currentUser;
            const database_ref = database.ref();

            // Update last login
            const user_data = {
                last_login: Date.now()
            };

            // Update Firebase Database
            database_ref.child('users/' + user.uid).update(user_data);

            alert('User Logged In!');
        })
        .catch(function (error) {
            alert(error.message);
        });
}

// Validation functions
function validate_email(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email);
}

function validate_password(password) {
    return password.length >= 6;
}

function validate_field(field) {
    return field != null && field.trim().length > 0;
}