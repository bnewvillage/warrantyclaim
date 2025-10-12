import { renderBrandsDropdown } from "./BrandsDetails.mjs";
import { callWorkerAPI , submitForm} from "./utils.mjs";
import { brands } from "../public/brandObjectDetails/brands.mjs"
import brandFields from "../public/brandObjectDetails/brandFields.mjs";


const parentDropdown = document.querySelector("#brand");
document.addEventListener("DOMContentLoaded", () => {
      const form = document.getElementById("claim-form");
      const submitBtn = document.getElementById("submitBtn");
      const clearBtn = document.getElementById("clearBtn");
      const claimList = document.getElementById("claim-list");

      const clearModal = document.getElementById("clearModal");
      const confirmClear = document.getElementById("confirmClear");
      const cancelClear = document.getElementById("cancelClear");

      const brandModal = document.getElementById("brandModal");
      const brandMessageEl = document.getElementById("brandMessage");
      const continueSubmit = document.getElementById("continueSubmit");
      const cancelSubmit = document.getElementById("cancelSubmit");

      renderBrandsDropdown(brands,parentDropdown,"beforeend");

      const brandSelect = document.getElementById("brand");

      const brandReminder = {
        ALPINESTARS : "Typical resolution is only 50% of cost. If it's a minor damage, ask the customer if they would be willing to keep the slightly damage and recieve 50% of their purchase price. Or if they would like to have the full item replaced instead (we keep the damaged)."
      };

      function wiggleFields(fields) {
        fields.forEach(field => {
          field.classList.remove("wiggle");
          void field.offsetWidth;
          setTimeout(() => field.classList.add("wiggle"), 10);
        });
      }

      async function submitClaim() {
        const fd = new FormData(form);
        const data = Object.fromEntries(fd.entries());
        const brand = data.brand;
        const issue = data.issue;
        const staff = data.staff;
        const resp = await submitForm({ brand, issue, staff });

        console.log("Sheets resp:", resp);
        data.timestamp = new Date().toLocaleString();

        form.reset();
        closeModal(brandModal);
        alert("Claim submitted!");
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
        const invalidFields = fields.filter(f => !f.checkValidity());

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



console.log(await callWorkerAPI("/time"));

