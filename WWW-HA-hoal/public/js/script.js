const header = document.getElementById("header");
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll("#nav li a");
const submitBnt = document.getElementById("submit-btn");

hamburger.onclick = function () {
  if (hamburger.classList.contains("close-btn")) {
    hamburger.classList.remove("close-btn");
    nav.classList.add("collapsed-nav");
  } else {
    hamburger.classList.add("close-btn");
    nav.classList.remove("collapsed-nav");
  }
};


