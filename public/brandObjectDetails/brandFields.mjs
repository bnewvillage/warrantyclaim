    export const brandFields = {
    "ALPINESTARS": {
        fields: [
        { name: "endUserPurchaseDate", label: "End-User Purchase Date", type: "date" },
        { name: "endUserReturnDate", label: "End-User Return Date / Warranty Claim Date", type: "date" }
        ]
    },
    "MISSING FIELD": {
        fields: [
        { name: "poNumber", label: "PO Number", type: "text" },
        {
            name: "klimPoInstruction",
            label: "Klim PO number is Required",
            type: "note",
            note: "*If approved, item required..."
        }
        ]
    },
    "LEATT - Jacket/Pants 5Y, Other 1Y": {
        fields: [
        {
            name: "leattPoInstruction",
            label: "Leatt PO number is Required",
            type: "note",
            note: "*If approved, item required..."
        },
        { name: "poNumber", label: "PO Number", type: "text" },
        { name: "endUserPurchaseDate", label: "End-User Purchase Date", type: "date" },
        { name: "endUserReturnDate", label: "End-User Return Date / Warranty Claim Date", type: "date" }
        ]
    },
    "DENALI ELECTRONICS": {
        fields: [
        { name: "denaliSerialNote", label: "Denali Serial Number is Required", type: "note" },
        { name: "serialNumber", label: "Serial Number", type: "text" }
        ]
    },
    "AKRAPOVIC - 2Y": {
        fields: [
        { name: "akrapovicSerialNote", label: "Akrapovic Serial Number is Required", type: "note" },
        { name: "serialNumber", label: "Serial Number", type: "text" },
        { name: "endUserPurchaseDate", label: "End-User Purchase Date", type: "date" },
        { name: "endUserReturnDate", label: "End-User Return Date / Warranty Claim Date", type: "date" }
        ]
    },
    "SENA - Undefined": {
        fields: [
        {
            name: "senaSerialNote",
            label: "Sena Serial Number and FBD Numbers are Required",
            type: "note",
            note: "These are needed to process the claim"
        },
        { name: "serialNumber", label: "Serial Number", type: "text" },
        { name: "batchNumber", label: "Batch Number (BD / FBD)", type: "text" },
        { name: "endUserPurchaseDate", label: "End-User Purchase Date", type: "date" },
        { name: "endUserReturnDate", label: "End-User Return Date / Warranty Claim Date", type: "date" }
        ]
    },
    "LONE RIDER - 2Y": {
        fields: [
        { name: "endUserPurchaseDate", label: "End-User Purchase Date", type: "date" },
        { name: "batchNumber", label: "Batch Number (BD / FBD)", type: "text" },
        { name: "loneRiderBatchNote", label: "Lone Rider Batch Number (BN) is Required", type: "note" },
        { name: "endUserReturnDate", label: "End-User Return Date / Warranty Claim Date", type: "date" }
        ]
    },
    "__GLOBAL_CONDITIONS__": {
        fileUpload: {
        trigger: "Images/Video send through...",
        value: "File upload here",
        fields: [
            { name: "fileUpload", label: "File Upload", type: "file" }
        ]
        },
        whatsappMediaInstruction: {
        trigger: "Images/Video send through...",
        value: "Blaine WhatsApp: +971 58 588 9652",
        fields: [
            { name: "whatsappNote", label: "Please send the media files to WhatsApp and include...", type: "note" }
        ]
        },
        claimantRegion: {
        trigger: "Warranty Claimant",
        value: ["KSA Customer", "UAE Customer"],
        fields: [
            { name: "customerName", label: "Customer Name", type: "text" },
            { name: "receiptNumber", label: "Receipt Number", type: "text" }
        ]
        }
    }
    };

    export default brandFields;
