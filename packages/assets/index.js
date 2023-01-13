export function domReady(fn) {
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
  const modal = document.getElementById("modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const consentForm = document.getElementById("consent-form");
  const modalText = document.getElementById("modal-text");
  const declineBtn = document.getElementById("decline-btn");
  const modalChoiceBtns = document.getElementById("modal-choice-btns");
  function getHtml(id) {
    return document.getElementById(id).innerHTML;
  }

  setTimeout(function () {
    modal.style.display = "inline";
  }, 1500);

  modalCloseBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  declineBtn.addEventListener("mouseenter", function () {
    modalChoiceBtns.classList.toggle("modal-choice-btns-reverse");
  });

  consentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const consentFormData = new FormData(consentForm);
    const fullName = consentFormData.get("fullName");
    modalText.innerHTML = getHtml("get-out-of-here");

    setTimeout(function () {
      document.getElementById("upload-text").innerText = `
        Making the sale...`;
    }, 1500);

    setTimeout(function () {
      const thanks = getHtml("thankyou-sucker");
      document.getElementById("modal-inner").innerHTML = thanks.replace(
        "${idiot}",
        fullName.toString(),
      );
      modalCloseBtn.disabled = false;
    }, 3000);
  });
}
domReady(getOnYourBoots);
