window.addEventListener("load", function () {
  if (
    window.location.pathname.split("/").pop() !== "index.html" &&
    window.location.pathname.split("/").pop() !== "view-register.html"
  ) {
    if (
      sessionStorage.getItem("userInSession") === "" ||
      sessionStorage.getItem("userInSession") === null
    ) {
      window.location = "../views/index.html";
    }
  }
  /**
   * Checks indexedDB compatibility
   */
  window.indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB;

  window.IDBTransaction =
    window.IDBTransaction ||
    window.webkitIDBTransaction ||
    window.msIDBTransaction;
  window.IDBKeyRange =
    window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

  if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.");
  }

  /**
   * Creating DB
   */
  let db = null;
  const req = window.indexedDB.open("DB", 1);

  req.onerror = (event) => {
    console.log("error: " + event);
  };

  req.onsuccess = (event) => {
    db = req.result;
  };

  /**
   * Creating users "table"
   */
  req.onupgradeneeded = (event) => {
    event.target.result.createObjectStore("users", { keyPath: "username" });
  };

  /**
   * Register users function
   */
  document.getElementById("register-btn")?.addEventListener("click", () => {
    const transaction = db
      .transaction("users", "readwrite")
      .objectStore("users")
      .add({
        username: document.getElementById("username").value,
        password: stringToHash(document.getElementById("password").value),
        profilePic: null,
        notes: [{ title: "test", content: "test content" }],
        images: [],
        videos: [],
        audios: [],
      });

    transaction.onsuccess = (event) => {
      alert(event.target.result + " succesfully added!");
    };

    transaction.onerror = (event) => {
      alert(event.srcElement.error.message);
    };

    clearForm();
  });

  /**
   * Login user
   */
  document.getElementById("login-btn")?.addEventListener("click", () => {
    const req = db
      .transaction("users")
      .objectStore("users")
      .get(document.getElementById("username").value);

    req.onerror = (event) => {
      alert("Unable to retrieve data from database!");
    };

    req.onsuccess = (event) => {
      // Do something with the request.result!
      if (
        req.result?.password ===
        stringToHash(document.getElementById("password").value)
      ) {
        sessionStorage.setItem(
          "userInSession",
          document.getElementById("username").value
        );
        window.location = "../views/view-user.html";
      } else {
        alert("Incorrect credentials!");
      }
    };
  });

  /**
   * add note
   */
  document.getElementById("add-note-btn")?.addEventListener("click", () => {
    window.location = "../views/view-notes.html";
  });

  document.getElementById("create-note-btn")?.addEventListener("click", () => {
    let req = db
      .transaction("users")
      .objectStore("users")
      .get(sessionStorage.getItem("userInSession"));

    req.onerror = (event) => {
      alert("Unable to retrieve data from database!");
    };

    req.onsuccess = (event) => {
      req.result.notes.push({
        title: document.getElementById("title").value,
        content: document.getElementById("content").value,
      });
      req = db
        .transaction("users", "readwrite")
        .objectStore("users")
        .put(req.result);
      req.onsuccess() = (event) => {
        //TODO CEHCK TYPEERROR
        alert("Note added!");
      };
    };
  });

  /**
   * add image
   */
  document.getElementById("add-image-btn")?.addEventListener("click", () => {
    window.location = "../views/view-images.html";
  });
  document.getElementById("image")?.addEventListener("change", (event) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      document
        .getElementById("create-image-btn")
        ?.addEventListener("click", () => {
          let req = db
            .transaction("users")
            .objectStore("users")
            .get(sessionStorage.getItem("userInSession"));

          req.onerror = (event) => {
            alert("Unable to retrieve data from database!");
          };

          req.onsuccess = (event) => {
            req.result.images.push(reader.result);
            req = db
              .transaction("users", "readwrite")
              .objectStore("users")
              .put(req.result);
          };
        });
    });
    reader.readAsDataURL(event.target.files[0]);
  });

  /**
   * add video
   */
  document.getElementById("add-video-btn")?.addEventListener("click", () => {
    window.location = "../views/view-videos.html";
  });
  document.getElementById("video")?.addEventListener("change", (event) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      document
        .getElementById("create-video-btn")
        ?.addEventListener("click", () => {
          let req = db
            .transaction("users")
            .objectStore("users")
            .get(sessionStorage.getItem("userInSession"));

          req.onerror = (event) => {
            alert("Unable to retrieve data from database!");
          };

          req.onsuccess = (event) => {
            req.result.videos.push(reader.result);
            req = db
              .transaction("users", "readwrite")
              .objectStore("users")
              .put(req.result);
          };
        });
    });
    reader.readAsDataURL(event.target.files[0]);
  });

  /**
   * add audio
   */
  document.getElementById("add-audio-btn")?.addEventListener("click", () => {
    window.location = "../views/view-audios.html";
  });
  document.getElementById("audio")?.addEventListener("change", (event) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      document
        .getElementById("create-audio-btn")
        ?.addEventListener("click", () => {
          let req = db
            .transaction("users")
            .objectStore("users")
            .get(sessionStorage.getItem("userInSession"));

          req.onerror = (event) => {
            alert("Unable to retrieve data from database!");
          };

          req.onsuccess = (event) => {
            req.result.audios.push(reader.result);
            req = db
              .transaction("users", "readwrite")
              .objectStore("users")
              .put(req.result);
          };
        });
    });
    reader.readAsDataURL(event.target.files[0]);
  });
});

/**
 * logout
 */
document.getElementById("logout")?.addEventListener("click", () => {
  sessionStorage.removeItem("userInSession");
  window.location = "../views/index.html";
});
