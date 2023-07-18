fetch("/", {
  method: "GET",
})
  .then((response) => {
    if (response.ok) {
      console.log("success in clientside");
      return response.json();
    } else {
      throw new Error("failed");
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
