const newPostForm = document.getElementById("newPost");
const submitButton = document.getElementById("submitButton");
const newTitle = document.getElementById("inputNewTitle");
const newContent = document.getElementById("inputNewContent");

newPostForm.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("clicked");
  const title = newTitle.value;
  const content = newContent.value;

  const formData = {
    title,
    content,
  };

  console.log(formData);

  fetch("api/newposts/create", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("success in clientside");

        return response.json();
      } else {
        throw new Error("post failed");
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
