import {
  renderBrandsDropdown,
  renderBrandSpecificFields,
} from "./BrandsDetails.mjs";
import { callWorkerAPI, submitForm, mountHolidayStrip } from "./utils.mjs";
import { brands } from "../public/brandObjectDetails/brands.mjs";
import brandFields from "../public/brandObjectDetails/brandFields.mjs";

const parentDropdown = document.querySelector("#brand");
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("claim-form");
  const submitBtn = document.getElementById("submitBtn");
  const clearBtn = document.getElementById("clearBtn");

  const clearModal = document.getElementById("clearModal");
  const confirmClear = document.getElementById("confirmClear");
  const cancelClear = document.getElementById("cancelClear");

  const brandModal = document.getElementById("brandModal");
  const brandMessageEl = document.getElementById("brandMessage");
  const continueSubmit = document.getElementById("continueSubmit");
  const cancelSubmit = document.getElementById("cancelSubmit");

  renderBrandsDropdown(brands, parentDropdown, "beforeend");
  let brandSelect = document.getElementById("brand");

  callWorkerAPI("/time").then(console.log);
  mountHolidayStrip();

  brandSelect.addEventListener("change", () =>
    renderBrandSpecificFields(brandSelect.value, brandFields)
  );

  const brandReminder = {
    ALPINESTARS:
      "Typical resolution is only 50% of cost. If it's a minor damage, ask the customer if they would be willing to keep the slightly damage and recieve 50% of their purchase price. Or if they would like to have the full item replaced instead (we keep the damaged).",
  };

  function wiggleFields(fields) {
    fields.forEach((field) => {
      field.classList.remove("wiggle");
      void field.offsetWidth;
      setTimeout(() => field.classList.add("wiggle"), 10);
    });
  }

  async function submitClaim() {
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    const resp = await submitForm(data);
    console.log(resp);

    data.timestamp = callWorkerAPI("/time");

    form.reset();
    closeModal(brandModal);
    alert("Claim submitted!");
    window.location.href = "https://docs.google.com/spreadsheets/d/1MDK0M72c_H3ix8ASGcsEvUnPhVOZdA5PEfz3HIKVX0k/edit?gid=0#gid=0";
  }

  function showModal(modal) {
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeModal(modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const fields = [...form.querySelectorAll("input, textarea, select")];
    const invalidFields = fields.filter((f) => !f.checkValidity());

    if (invalidFields.length) {
      wiggleFields(invalidFields);
      invalidFields[0].focus();
      return;
    }

    const brand = brandSelect.value;
    if (brandReminder[brand]) {
      brandMessageEl.textContent = brandReminder[brand];
      showModal(brandModal);
      return;
    }

    submitClaim();
  });

  continueSubmit.addEventListener("click", () => submitClaim());
  cancelSubmit.addEventListener("click", () => closeModal(brandModal));

  clearBtn.addEventListener("click", () => showModal(clearModal));
  confirmClear.addEventListener("click", () => {
    form.reset();
    closeModal(clearModal);
  });
  cancelClear.addEventListener("click", () => closeModal(clearModal));
});
