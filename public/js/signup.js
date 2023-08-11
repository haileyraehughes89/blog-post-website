const signUpButton = document.getElementById("signUpButton");
const signUpForm = document.getElementById("signUpForm");
const firstName = document.getElementById("inputFirstName");
const lastName = document.getElementById("inputLastName");
const email = document.getElementById("inputEmail");
const userName = document.getElementById("userName");

signUpForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const first_name = firstName.value;
  const last_name = lastName.value;
  const user_email = email.value;
  const user_name = userName.value;
  const password = document.getElementById("inputPassword").value;

  const formData = {
    first_name,
    last_name,
    user_email,
    user_name,
    password,
  };

  console.log(formData);

  fetch("api/users/signup", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("success in clientside");
        document.location.replace("/dashboard");
        return response.json();
      } else {
        throw new Error("Signup failed");
      }
    })
    .then((data) => {
      console.log(data);
      // Redirect or show a success message to the user
    })
    .catch((error) => {
      console.log(error);
      // Show an error message to the user
    });
});
