(function () {
  if (window.SplitSpurAB) return;
  window.SplitSpurAB = true;

  const API_BASE = "https://scored-processed-reggae-prefer.trycloudflare.com";
console.log("🔥 SplitSpur AB script loaded");

  async function assignVariant() {
    const res = await fetch(`${API_BASE}/api/assign-variant`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        testId: "TEST_123",
        page: window.location.pathname,
      }),
    });

    const data = await res.json();
    localStorage.setItem("variant", data.variant);
  }

  document.addEventListener("DOMContentLoaded", assignVariant);
})();
