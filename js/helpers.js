import { TIMEOUT_SEC } from "./config.js";

function timeout(s) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took longer than ${s} to respond`));
    }, s * 1000);
  });
}

export async function loadJSON(url) {
  try {
    const res = await Promise.race([timeout(TIMEOUT_SEC), fetch(url)]);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (error) {
    throw error;
  }
}
export async function sendJSON(url, uploadData) {
  try {
    const res = await Promise.race([
      timeout(TIMEOUT_SEC),
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(uploadData),
      }),
    ]);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (error) {
    throw error;
  }
}
