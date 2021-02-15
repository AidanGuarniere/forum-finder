// Log users in
async function loginFormHandler(event) {
    event.preventDefault();

    // These ID's can be changed to meet front-end satisfaction.
    // Just document via comments what's been changed, for notes & reference
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // Log users in if email and password match with the users data
    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        // When the accounts been created, taken them to the users dashboard
        if (response.ok) {
            document.location.replace('/dashboard/');
        } else {
            alert(response.statusText);
        }
    }
}

// Sign users up
async function signupFormHandler(event){
    event.preventDefault();
    // These ID's can be changed to meet front-end satisfaction.
    // Just document via comments what's been changed, for notes & reference
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    // When the accounts been created, taken them to the users dashboard
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
}