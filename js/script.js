import {
  renderBrandsDropdown,
  renderBrandSpecificFields,
} from "./BrandsDetails.mjs";
import { callWorkerAPI, submitForm } from "./utils.mjs";
import { brands } from "../public/brandObjectDetails/brands.mjs";
import brandFields from "../public/brandObjectDetails/brandFields.mjs";
import { customerNameField } from "./renderFields.mjs";


document.addEventListener("DOMContentLoaded", () => {
  const parentDropdown = document.querySelector("#brand");
  const form = document.getElementById("claim-form");
  const fields = [...form.querySelectorAll("input, textarea, select")];

  const submitBtn = document.getElementById("submitBtn");
  const clearBtn = document.getElementById("clearBtn");

  const clearModal = document.getElementById("clearModal");
  const confirmClear = document.getElementById("confirmClear");
  const cancelClear = document.getElementById("cancelClear");

  const brandModal = document.getElementById("brandModal");
  const brandMessageEl = document.getElementById("brandMessage");
  const continueSubmit = document.getElementById("continueSubmit");
  const cancelSubmit = document.getElementById("cancelSubmit");

  const claimant = document.querySelectorAll('input[name="claimant"]');
  let selectedClaimant = document.query //idk what to do for now
  claimant.addEventListener("click", ()=>{
    if 
  })
  

  renderBrandsDropdown(brands, parentDropdown, "beforeend");
  const brandSelect = document.getElementById("brand");

  fields.forEach((field) => {
    const saved = localStorage.getItem(field.name || field.id);
    if (saved){
      field.value = saved;
    }

    field.addEventListener("input", ()=>{
      const key = field.name || field.id;
      localStorage.setItem(key, field.value);
    });
  });

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
    try {
      const fd = new FormData(form);
      const data = Object.fromEntries(fd.entries());

      await submitForm(data);

      // attach a timestamp from your worker
      try {
        data.timestamp = await callWorkerAPI("/time");
      } catch (err) {
        console.warn("Could not fetch timestamp:", err);
        data.timestamp = new Date().toISOString();
      }

      form.reset();
      closeModal(brandModal);
      alert("Claim submitted!");
      localStorage.clear();
      window.location.href =
        "https://docs.google.com/spreadsheets/d/1MDK0M72c_H3ix8ASGcsEvUnPhVOZdA5PEfz3HIKVX0k/edit?gid=0#gid=0";
    } catch (e) {
      console.error("Error submitting claim:", e);
      alert(
        "An error occurred while submitting your claim. Please try again later or contact support."
      );
    }
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
    localStorage.clear();
    closeModal(clearModal);
  });
  cancelClear.addEventListener("click", () => closeModal(clearModal));
});
