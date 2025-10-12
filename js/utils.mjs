const BASE = "https://uae.oldtimerwarranties.workers.dev";

export async function callWorkerAPI(path, { method = "GET", data } = {}) {
  const options = { method };
  if (data !== undefined) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(data);
  }
  const res = await fetch(`${BASE}${path}`, options);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function submitForm({brand, issue, staff}){
  return callWorkerAPI("/claim", {method: "POST", data: {brand, issue, staff} });
}