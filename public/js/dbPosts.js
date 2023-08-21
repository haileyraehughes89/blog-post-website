const mostRecentHandler = async (event) => {
  try {
    fetch("/api/post/mostRecent", {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          console.log("most recent post fetched");
          return response.json();
        } else {
          throw new Error("Failed to fetch most recent post");
        }
      })
      .then((data) => {
        console.log(data);
      });
  } catch (error) {
    console.log("error:", error);
  }
};
