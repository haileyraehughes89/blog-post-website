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
  });
