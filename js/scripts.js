const url = "https://server-mama.herokuapp.com/"

const checkPassword = (element) => {
  if(event.key === 'Enter') {
    try {
      const pw = element.value
      const data = {
        password: pw
      }
  
      fetch(`${url}kuchen/password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.link)
        // window.location.href = data.link
      })
      .catch(err => console.error(err))
    } catch {
      console.error("Failed to request password validation")
    }     
  }
}