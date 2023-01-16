import { getElementById as $, render, Html, SvgLoader } from "./components";
import { allProjects } from "./data";

function domReady(fn) {
  if (typeof fn !== "function") {
    throw new Error("Argument passed to domReady should be a function");
  }
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn, { once: true });
  }
}

function getOnYourBoots() {
  const overlay = $("overlay");
  const modal = $("modal");
  const modalCloseBtn = $("modal-close-btn");
  const consentForm = $("consent-form");
  const modalText = $("modal-text");
  const declineBtn = $("decline-btn");
  const modalChoiceBtns = $("modal-choice-btns");

  declineBtn.addEventListener("mouseenter", function () {
    modalChoiceBtns.classList.toggle("modal-choice-btns-reverse");
  });

  consentForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const consentFormData = new FormData(consentForm);
    const fullName = consentFormData.get("fullName");
    modalText.innerHTML = $("get-out-of-here").innerHTML;

    setTimeout(function () {
      $("upload-text").innerText = `
        Making the sale...`;
    }, 1500);

    setTimeout(function () {
      const thanks = $("thankyou-sucker").innerHTML;
      $("modal-inner").innerHTML = thanks.replace(
        "${idiot}",
        fullName.toString(),
      );
      modalCloseBtn.disabled = false;
    }, 3000);
  });
  function cookieConsent(hide) {
    modal.style.display = overlay.style.display = hide ? "none" : "inline";
    hide && localStorage.setItem("cookieConsent", "accept");
  }
  function thankYou() {
    cookieConsent(true);
  }
  setTimeout(cookieConsent, 1500);
  modalCloseBtn.addEventListener("click", thankYou);
  $("love").addEventListener("click", thankYou);
}

const Projects = (projects) => {
  let projectsHtml = "";
  projects.forEach((p) => {
    if (p.hidden) {
      return;
    }
    projectsHtml += `
    <li class="project-item">
        <a href="${p.package}/index.html">${p.name}</a>
    </li>`;
  });
  return Html(projectsHtml);
};

const Loader = SvgLoader("circle-triple", "#F5F5F5CC");

domReady(function () {
  render(Loader, "projects-list");
  setTimeout(() => {
    render(Projects(allProjects), "projects-list");
  }, 1000);
  localStorage.getItem("cookieConsent") !== "accept" && getOnYourBoots();
});
