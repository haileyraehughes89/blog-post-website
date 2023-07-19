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
  })
  .catch((error) => {
    console.log(error);
  });

// remember to change this when I change id name
const modal = document.getElementById("exampleModal");
