import { brandDropdownTemplateFn, brands, renderBrandsDropdown } from "./BrandsDetails.mjs";
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

      const brandSelect = document.getElementById("brand");

      const specialBrands = {
        brandB: "Reminder: Brand B requires a serial number and 3 photos to process a claim."
      };

      function wiggleFields(fields) {
        fields.forEach(field => {
          field.classList.remove("wiggle");
          void field.offsetWidth;
          setTimeout(() => field.classList.add("wiggle"), 10);
        });
      }

      function submitClaim() {
        const fd = new FormData(form);
        const data = Object.fromEntries(fd.entries());
        data.timestamp = new Date().toLocaleString();

        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${Date.now().toString(36).toUpperCase()}</td>
          <td>${data.brand}</td>
          <td>${data.issue}</td>
          <td>${data.staff}</td>
          <td>Submitted</td>
          <td>${data.timestamp}</td>
        `;
        claimList.prepend(tr);

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
        if (specialBrands[brand]) {
          brandMessageEl.textContent = specialBrands[brand];
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

renderBrandsDropdown(brands,parentDropdown,"afterbegin");

