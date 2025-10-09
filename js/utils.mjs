export async function callWorkerAPI(payload = {}) {
  const res = await fetch("https://uae.oldtimerwarranties.workers.dev/time", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    // mode: "cors" // (default for cross-origin fetch in browsers)
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function getDateTime(){
  const response = await fetch("https://uae.oldtimerwarranties.workers.dev/time");
  if (!response.ok){
    throw new Error(`HTTP ${response.status}`);
  }
  return await response.json();
}