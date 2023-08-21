const newPostForm = document.getElementById("newPost");
const submitButton = document.getElementById("submitButton");
const newTitle = document.getElementById("inputNewTitle");
const newContent = document.getElementById("inputNewContent");
function getUserIdFromSession() {
  return localStorage.getItem("userId");
}

newPostForm.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("clicked");
  const title = newTitle.value;
  const content = newContent.value;
  const userId = getUserIdFromSession();
  const formData = {
    title,
    content,
    userId,
  };

  console.log(formData);

  fetch("api/post/", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        document.location.replace("/dashboard");
        return response.json();
      } else {
        throw new Error("post failed");
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
});
