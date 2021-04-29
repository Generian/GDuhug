const checkPassword = (event) => {
  event.preventDefault();
  console.log("pw submitted")
  const passwordInput = document.getElementById('password');
  const pw = passwordInput.value  
  try {
    const data = {
      password: pw.trim().toLowerCase()
    }

    fetch("/api/password/first/", {
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
        console.log("wrong password")
        console.log(data)
      }
    })
    .catch(err => console.error(err))
  } catch {
    console.error("Failed to request password validation")
  }     
}

const form = document.getElementById('passwordForm');
form.addEventListener('submit', checkPassword);