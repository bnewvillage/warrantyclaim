export const brandFields = {
  ALPINESTARS: {
    fields: [
      {
        name: "endUserPurchaseDate",
        label: "End-User Purchase Date",
        type: "date",
      },
      {
        name: "endUserReturnDate",
        label: "End-User Return Date / Warranty Claim Date",
        type: "date",
      },
    ],
  },
  KLIM: {
    fields: [
      {
        name: "instruction",
        label: "Klim PO number is Required",
        type: "note",
        note: "*If approved, item required to be destroyed.",
      },
      { name: "poNumber", label: "PO Number", type: "text" },
    ],
  },
  LEATT: {
    fields: [
      {
        name: "instruction",
        label: "Leatt PO number is Required",
        type: "note",
        note: "*If approved, item required to be destroyed.",
      },
      { name: "poNumber", label: "PO Number", type: "text" },
      {
        name: "endUserPurchaseDate",
        label: "End-User Purchase Date",
        type: "date",
      },
      {
        name: "endUserReturnDate",
        label: "End-User Return Date / Warranty Claim Date",
        type: "date",
      },
    ],
  },
  "DENALI ELECTRONICS": {
    fields: [
      {
        name: "instruction",
        label: "Denali Serial Number is Required",
        type: "note",
      },
      { name: "serialNumber", label: "Serial Number", type: "text" },
    ],
  },
  AKRAPOVIC: {
    fields: [
      {
        name: "instruction",
        label: "Akrapovic Serial Number is Required",
        type: "note",
      },
      { name: "serialNumber", label: "Serial Number", type: "text" },
      {
        name: "endUserPurchaseDate",
        label: "End-User Purchase Date",
        type: "date",
      },
      {
        name: "endUserReturnDate",
        label: "End-User Return Date / Warranty Claim Date",
        type: "date",
      },
    ],
  },
  SENA: {
    fields: [
      {
        name: "instruction",
        label: "Sena Serial Number and FBD Numbers are Required",
        type: "note",
        note: "These are needed to process the claim",
      },
      { name: "serialNumber", label: "Serial Number", type: "text" },
      { name: "batchNumber", label: "Batch Number (BD / FBD)", type: "text" },
      {
        name: "endUserPurchaseDate",
        label: "End-User Purchase Date",
        type: "date",
      },
      {
        name: "endUserReturnDate",
        label: "End-User Return Date / Warranty Claim Date",
        type: "date",
      },
    ],
  },
  "LONE RIDER": {
    fields: [
      {
        name: "instruction",
        label: "Lone Rider Batch Number (BN) is Required",
        type: "note",
      },
      {
        name: "endUserPurchaseDate",
        label: "End-User Purchase Date",
        type: "date",
      },
      { name: "batchNumber", label: "Batch Number (BD / FBD)", type: "text" },
      ,
      {
        name: "endUserReturnDate",
        label: "End-User Return Date / Warranty Claim Date",
        type: "date",
      },
    ],
  },
};

export default brandFields;
