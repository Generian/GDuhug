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
const hint_icon = $( "#hint_icon" );
const hint = $( "#hint" );

$( "#hint_icon" ).on( "click", function( event ) {
  hint.show();
  hint_icon.hide();
});