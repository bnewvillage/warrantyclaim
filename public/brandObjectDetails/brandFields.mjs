export const brandForms = {
  KLIM: `
    <p class="note">
      <strong>Klim PO number is Required</strong><br />
      <small>*If approved, item required to be destroyed.</small>
    </p>
    <label class="form-field">
      <span class="label-text">PO Number</span>
      <input type="text" name="poNumber" required />
    </label>
  `,

  LEATT: `
    <p class="note">
      <strong>Leatt PO number is Required</strong><br />
      <small>*If approved, item required to be destroyed.</small>
    </p>
    <label class="form-field">
      <span class="label-text">PO Number</span>
      <input type="text" name="poNumber" required />
    </label>
  `,

  "DENALI ELECTRONICS": `
    <p class="note">
      <strong>Denali Serial Number is Required</strong>
    </p>
    <label class="form-field">
      <span class="label-text">Serial Number</span>
      <input type="text" name="serialNumber" required />
    </label>
  `,

  AKRAPOVIC: `
    <p class="note">
      <strong>Akrapovic Serial Number is Required</strong>
    </p>
    <label class="form-field">
      <span class="label-text">Serial Number</span>
      <input type="text" name="serialNumber" required />
    </label>
    <label class="form-field">
      <span class="label-text">Bike Model/Year</span>
      <input type="text" name="bikeModelYear" required />
    </label>
  `,

  SENA: `
    <p class="note">
      <strong>Sena Serial Number and FBD Numbers are Required</strong><br />
      <small>These are needed to process the claim.</small>
    </p>
    <label class="form-field">
      <span class="label-text">Serial Number</span>
      <input type="text" name="serialNumber" required />
    </label>
    <label class="form-field">
      <span class="label-text">Batch Number (BD / FBD)</span>
      <input type="text" name="batchNumber" required />
    </label>
  `,

  "LONE RIDER": `
    <p class="note">
      <strong>Lone Rider Batch Number (BN) is Required</strong>
    </p>
    <label class="form-field">
      <span class="label-text">Batch Number (BD / FBD)</span>
      <input type="text" name="batchNumber" required />
    </label>
  `,
  "HEX INNOVATE":`
  <p class="note">
      <strong>Hex Serial Numbers is Required</strong>
    </p>
    <label class="form-field">
      <span class="label-text">Serial Number</span>
      <input type="text" name="serialNumber" required />
    </label>
  `
  ,
  "PLANET KNOX":`
  <p class="note">
      <strong>Invoice Copy is Required</strong>
      Please email a copy to Blaine @ Oldtimer.
    </p>
  `
};

export default brandForms;
