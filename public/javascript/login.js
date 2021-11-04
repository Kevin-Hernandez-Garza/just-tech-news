// function to handle the signup submission
// using the async/await feature "syntactic sugar"
async function signupFormHandler(event) {
    event.preventDefault();

    // grabbing data from the form 
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // making a fetch POST request to the /api/users route
    // we added a conditional to make sure that all fields have values
    if(username && email && password) {
        
        // adding the await keyword before the Promise
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username, 
                email, 
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });
        
        // checking response status (error handling)
        if(response.ok) {
            console.log('successful signup');
        } else {
            alert(response.statusText);
        }
    }
}

//function that handles the login submission
async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if(email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });

        if(response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}



// submit button event listener
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);