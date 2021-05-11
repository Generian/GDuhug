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

var $sound = $('<div id="sound" />').appendTo('body');
$('#special-links-that-play-annoying-sounds-when-hovered a').hover(function() {
 $sound.html('<embed src="flymetothemoon.mp3" hidden="true" autostart="true" loop="false">');
}, function() {
 // We could empty the innerHTML of $sound here, but that would only slow things down.
});