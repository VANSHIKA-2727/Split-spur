// ------------ SplitSpur WYSIWYG Helper Script ------------

// Prevent default browser right-click
window.addEventListener("contextmenu", (e) => {
  e.preventDefault();

  const el = e.target;
  const selector = generateSelector(el);

  parent.postMessage(
    {
      type: "rightclick",
      selector,
      tag: el.tagName.toLowerCase(),
    },
    "*"
  );
});

// Receive commands from editor
window.addEventListener("message", (e) => {
  const msg = e.data;

  if (msg.type === "applyVariant") applyEdits(msg.edits);

  if (msg.type === "getElementText") {
    const el = document.querySelector(msg.selector);
    parent.postMessage(
      {
        type: "elementText",
        selector: msg.selector,
        text: el ? el.textContent : "",
      },
      "*"
    );
  }

  if (msg.type === "getElementColor") {
    const el = document.querySelector(msg.selector);
    const color = el ? getComputedStyle(el).color : "rgb(0,0,0)";
    parent.postMessage(
      {
        type: "elementColor",
        selector: msg.selector,
        color,
      },
      "*"
    );
  }
});

// Apply variant changes
function applyEdits(edits) {
  edits.forEach((ed) => {
    const el = document.querySelector(ed.selector);
    if (!el) return;

    if (ed.type === "text") el.textContent = ed.value;
    if (ed.type === "color") el.style.color = ed.value;
    if (ed.type === "delete") el.remove();
  });
}

// Generate unique selector
function generateSelector(el) {
  if (el.id) return `#${el.id}`;

  let path = [];
  while (el && el.nodeType === 1) {
    let selector = el.tagName.toLowerCase();

    let nth = 1;
    let sib = el;
    while ((sib = sib.previousElementSibling)) nth++;

    selector += `:nth-of-type(${nth})`;
    path.unshift(selector);

    el = el.parentElement;
  }
  return path.join(" > ");
}
