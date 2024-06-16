// /********** Toggle Active Class **********/
const buttons = document.querySelectorAll(".filter-nav .nav-link");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});
