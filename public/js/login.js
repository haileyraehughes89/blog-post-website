const loginButton = document.getElementById("loginButton");
const loginForm = document.getElementById("loginForm");
const userName = document.getElementById("inputUserName");
const password = document.getElementById("inputPassword");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const user_name = userName.value;
  const password = password.value;

  const formData = {
    user_name,
    password,
  };

  console.log(formData);

  fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("success in clientside");
        document.location.replace("/");
        return response.json();
      } else {
        throw new Error("Login failed");
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
