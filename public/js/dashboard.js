document.addEventListener("DOMContentLoaded", function () {
  const dashboardButton = document.getElementById("dashboardButton");

  dashboardButton.addEventListener("click", function () {
    dashboardHandler();
  });
});
const dashboardHandler = async (event) => {
  try {
    fetch("/dashboard", {
      method: "GET",
    }).then((response) => {
      if (response.ok) {
        console.log("logged in");
        return response.json();
      } else {
        const loginAlert = new bootstrap.Modal(
          document.getElementById("loginAlert")
        );
        loginAlert.show();
        throw new Error("not logged in");
      }
    });
  } catch (error) {
    console.log("error");
  }

  console.log("dashboard button clicked");
};
