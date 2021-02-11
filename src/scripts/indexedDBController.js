/**
 * Init config
 */
window.addEventListener("load", function () {
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
        localStorage.setItem(
          "userInSession",
          document.getElementById("username").value
        );
        window.location = "../views/view-user.html";
      } else {
        alert("Incorrect credentials!");
      }
    };
  });
});
