console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: "Type city name to check your weather",
    icon: "https://avatars3.githubusercontent.com/u/53175687?s=400&v=4"
  });
});
