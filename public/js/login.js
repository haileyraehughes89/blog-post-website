function signupClicked() {
  console.log("sign up clicked");
}

document.addEventListener("DOMContentLoaded", function () {
  // ...

  const loginButton = document.getElementById("logInButton");

  // Add a click event listener to the "Log In" button
  loginButton.addEventListener("click", function () {
    loginFormHandler(); // Call the logClicked function
  });

  // ...
});

const loginFormHandler = async (event) => {
  console.log("log in clicked");
  const userName = document.getElementById("inputUserName");

  const user_name = userName.value;
  const password = document.getElementById("inputPassword").value;

  if (user_name && password) {
    // Send a POST request to the API endpoint

    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ user_name, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace("/dashboard");
    } else {
      console.log("not working");
      showAlert("oops", "danger");
    }
  }
};

// document.addEventListener("DOMContentLoaded", function () {
//   // ...

//   const loginButton = document.getElementById("logInButton");

//   // Add a click event listener to the "Log In" button
//   loginButton.addEventListener("click", function () {
//     login(); // Call the logClicked function
//   });

//   // ...
// });
