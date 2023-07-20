function signupClicked() {
  console.log("sign up clicked");
}

document.addEventListener("DOMContentLoaded", function () {
  // ...

  const loginButton = document.getElementById("logInButton");

  loginButton.addEventListener("click", function () {
    loginFormHandler();
  });

  // ...
});

const loginFormHandler = async (event) => {
  //   console.log("log in clicked");
  const userName = document.getElementById("inputUserName");

  const user_name = userName.value;
  const password = document.getElementById("inputPassword").value;
  if (!user_name && !password) {
    showPopover("Username and Password required for login");
    return;
  }

  if (!user_name) {
    showPopover("Username missing. Please try again.");
    return;
  }

  if (!password) {
    showPopover("Password missing. Please try again.");
    return;
  }
  if (user_name && password)
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ user_name, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        console.log("not working");
        showPopover("Username or Password incorrect. Please try again.");
      }
    } catch (error) {
      console.log("error");
    }
};

const showPopover = (message) => {
  const loginButton = document.getElementById("logInButton");
  loginButton.setAttribute("data-bs-content", message);
  const popover = new bootstrap.Popover(loginButton);
  if (popover) {
    popover.update();
    popover.show();
  } else {
    popover = new bootstrap.Popover(loginButton);
    popover.show();

    new bootstrap.Popover(loginButton);
  }
};
