window.addEventListener("load", () => {
  if (
    localStorage.getItem("userInSession") === "" ||
    localStorage.getItem("userInSession") === null
  ) {
    window.location = "../views/index.html";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const instance = M.Sidenav.init(document.querySelector(".sidenav"));
  instance.open();
});
