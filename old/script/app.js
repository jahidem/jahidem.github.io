const ham = document.querySelector('.ham');
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

ham.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    links.forEach(link => {
      link.classList.toggle("fade");
    });
  });