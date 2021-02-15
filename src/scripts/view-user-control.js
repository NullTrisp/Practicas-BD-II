window.addEventListener("load", () => {
  /**
   * Creating DB
   */
  let db = null;
  const req = window.indexedDB.open("DB", 1);

  req.onerror = (event) => {
    console.log("error: " + event);
  };

  /**
  * user in session 
  */
  const userInSession = localStorage.getItem("remember") === "true" ? localStorage.getItem("userInSession") : sessionStorage.getItem("userInSession");

  /**
   * render user data
   */
  req.onsuccess = (event) => {
    db = req.result;
    const userData = db
      .transaction("users")
      .objectStore("users")
      .get(userInSession);
    userData.onsuccess = (event) => {
      document.getElementById("user-username").innerHTML =
        userData.result.username;
      if (userData.result.profilePic !== null) {
        document
          .getElementById("user-image")
          .setAttribute("src", userData.result.profilePic);
      }
    };
  };

  /**
   * Left nav bar
   */
  const navBarInstance = M.Sidenav.init(document.querySelector(".sidenav"));

  /**
   * floating icon
   */
  M.FloatingActionButton.init(document.querySelector(".fixed-action-btn"));

  /**
   * render notes
   */
  document.getElementById("notes-btn")?.addEventListener("click", () => {
    document.getElementById("container").innerHTML = "";
    const req = db
      .transaction("users")
      .objectStore("users")
      .get(userInSession);
    req.onsuccess = (event) => {
      let container = document.getElementById("container");
      container.innerHTML = `<div id="page-header"><h1>Notes:</h1></div><br/>`;
      req.result.notes.forEach((element) => {
        container.innerHTML += `<div class='row'><div class='col'><div class='card blue-grey'><div class='card-content white-text'><span class='card-title'>${element.title}</span><p>${element.content}</p></div></div></div></div>`;
      });
      navBarInstance.close();
    };
  });

  /**
   * render images
   */
  document.getElementById("images-btn")?.addEventListener("click", () => {
    document.getElementById("container").innerHTML = "";
    const req = db
      .transaction("users")
      .objectStore("users")
      .get(userInSession);
    req.onsuccess = (event) => {
      let container = document.getElementById("container");
      container.innerHTML = `<div id="page-header"><h1>Images:</h1></div><br/>`;
      req.result.images.forEach((element) => {
        container.innerHTML += `<div class='row'><div class='col'><div class='card blue-grey'><div class='card-content white-text'><img src=${element}></div></div></div></div><br>`;
      });
      navBarInstance.close();
    };
  });

  /**
   * render videos
   */
  document.getElementById("videos-btn")?.addEventListener("click", () => {
    document.getElementById("container").innerHTML = "";
    const req = db
      .transaction("users")
      .objectStore("users")
      .get(userInSession);
    req.onsuccess = (event) => {
      let container = document.getElementById("container");
      container.innerHTML = `<div id="page-header"><h1>Videos:</h1></div><br/>`;
      req.result.videos.forEach((element) => {
        container.innerHTML += `<div class='row'><div class='col'><div class='card blue-grey'><div class='card-content white-text'><video controls width="250"><source src=${element}></video></div></div></div></div><br>`;
      });
      navBarInstance.close();
    };
  });

  /**
   * render audios
   */
  document.getElementById("audios-btn")?.addEventListener("click", () => {
    document.getElementById("container").innerHTML = "";
    const req = db
      .transaction("users")
      .objectStore("users")
      .get(userInSession);
    req.onsuccess = (event) => {
      let container = document.getElementById("container");
      container.innerHTML = `<div id="page-header"><h1>Audios:</h1></div><br/>`;
      req.result.audios.forEach((element) => {
        container.innerHTML += `<div class='row'><div class='col'><div class='card blue-grey'><div class='card-content white-text'><audio controls><source src=${element}></audio></div></div></div></div><br>`;
      });
      navBarInstance.close();
    };
  });
});
