// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKrUVfquiXq0su9Vz-v2oa2yIx0vWa0XY",
  authDomain: "gduhug.firebaseapp.com",
  projectId: "gduhug",
  storageBucket: "gduhug.appspot.com",
  messagingSenderId: "239743156216",
  appId: "1:239743156216:web:84e447f2b678f5a7bee00d",
  measurementId: "G-3KDF5CCWMW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const checkPassword = (event) => {
  event.preventDefault();
  console.log("pw submitted")
  const passwordInput = $( '#password' )
  const pw = passwordInput.val()  
  try {
    const data = {
      password: pw.trim().toLowerCase(),
      page: window.location.pathname,
    }

    fetch("/api/password/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(parsed_data => {
      console.log(parsed_data)
      if (parsed_data.correct_pw) {
        window.location.href = parsed_data.link
      } else {
        console.log("wrong password", data)
        $( "#pwfalsch" ).show();
        setTimeout(function(){ $( "#pwfalsch" ).hide(); }, 2000);
      }
    })
    .catch(err => console.error(err))
  } catch {
    console.error("Failed to request password validation")
  }     
}

// Check password on Kuchen page
const form = $( '#passwordForm' )
form.on('submit', checkPassword)

// Show hint on any page

$( "#hint_icon" ).on( "click", function( event ) {
  $( "#hint" ).toggle();
  // hint_icon.hide();
});

// Buzzer drücken

function changeImage() {

  if (document.getElementById("imgClickAndChange").src = "/assets/Spelunkenbeamer.png") 
  {
      document.getElementById("imgClickAndChange").src = "/assets/Spelunkenbeamer_down.png";
      // Abspielen Sounds
      document.getElementById('audiofile').play();
      // langsames Einblenden des Passierscheins
      $( ".imgfahrkarte" ).show(8000);
      $( ".imgfahrkarte" ).hide(8000);
  }
  else 
  {
    // das Ausschalten funktioniert aber nicht 
    document.getElementById("imgClickAndChange").src = "/assets/Spelunkenbeamer.png";
      document.getElementById('audiofile').pause();
  }
}
