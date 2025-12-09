// SplitspurApp.jsx
import React, { useRef, useState, useEffect } from "react";
import {
  Undo2,
  Redo2,
  HelpCircle,
  Eye,
  Sun,
  Save,
  Trash2,
} from "lucide-react";

/**
 * Advanced Splitspur editor (Option A)
 *
 * - Right-click inside iframe (same-origin) opens popup for that element
 * - For cross-origin, expects iframe helper script to post a rightclick message
 * - Edit Text and Change Color modals update "variants"
 * - Variants applied to iframe (same-origin via DOM, cross-origin via postMessage)
 *
 * Notes:
 * - To enable full cross-origin editing you must add a helper script on the target page
 *   that posts rightclick info to parent and listens for "applyVariant" or element queries.
 * - This file focuses on the editor UI & variant logic. Helper script is optional and described below.
 */

export default function SplitspurApp() {
  const [currentPage, setCurrentPage] = useState("setup");
  const [testData, setTestData] = useState({
    name: "",
    url: "",
    duration: "14 Days",
  });

  const handleInputChange = (field, value) => {
    setTestData((prev) => ({ ...prev, [field]: value }));
  };

  return currentPage === "setup" ? (
    <SetupPage
      testData={testData}
      handleInputChange={handleInputChange}
      setCurrentPage={setCurrentPage}
    />
  ) : (
    <EditorPage
      testData={testData}
      handleInputChange={handleInputChange}
      setCurrentPage={setCurrentPage}
    />
  );
}

/* ---------------- Setup Page (unchanged) ---------------- */
const SetupPage = ({ testData, handleInputChange, setCurrentPage }) => {
  const handleContinue = () => {
    if (!testData.url || !testData.url.trim()) {
      alert("Please enter a valid URL");
      return;
    }
    let finalUrl = testData.url.trim();
    if (!/^https?:\/\//.test(finalUrl)) finalUrl = "https://" + finalUrl;
    handleInputChange("url", finalUrl);
    setCurrentPage("editor");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Create New Test</h1>
          <p className="text-gray-600 mb-8">With AI Recommendations</p>

          <div className="flex gap-6">
            <div className="flex-1 bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-xl font-semibold mb-6">Test Setup</h2>
              <div className="space-y-6">
                <InputField
                  label="Test Name"
                  placeholder="e.g., Homepage Hero Test"
                  value={testData.name}
                  onChange={(val) => handleInputChange("name", val)}
                />
                <InputField
                  label="Page URL"
                  placeholder="https://yourwebsite.com"
                  value={testData.url}
                  onChange={(val) => handleInputChange("url", val)}
                />
                <DurationDropdown
                  label="Test Duration"
                  value={testData.duration}
                  onChange={(val) => handleInputChange("duration", val)}
                />
              </div>
            </div>
            <SmartSetupCard />
          </div>

          <div className="mt-8 flex justify-between">
            <button className="px-6 py-2 border rounded-lg">
              Back to Dashboard
            </button>
            <div className="flex gap-3">
              <button className="px-6 py-2 border rounded-lg">
                Save as Draft
              </button>
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                onClick={handleContinue}
              >
                Continue to Visual Editor
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

/* ---------------- Editor Page (Advanced) ---------------- */
const EditorPage = ({ testData, handleInputChange, setCurrentPage }) => {
  const handleBack = () => setCurrentPage("setup");

  // iframe + preview refs
  const iframeRef = useRef(null);
  const previewRef = useRef(null);

  // whether iframe is same-origin accessible
  const [iframeAccessible, setIframeAccessible] = useState(false);

  // popup (centered within preview) and selected element selector
  const [popup, setPopup] = useState({
    visible: false,
    selector: null,
    tag: null,
  });

  // currently selected element (for editing) -- used by modals
  const [selected, setSelected] = useState({ selector: null, tag: null });

  // modals
  const [showTextModal, setShowTextModal] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);

  // edit values
  const [editTextValue, setEditTextValue] = useState("");
  const [editColorValue, setEditColorValue] = useState("#000000");

  // variants store
  const [variants, setVariants] = useState({
    control: [],
    variant1: [],
    variant2: [],
  });

  // which variant active
  const [currentVariant, setCurrentVariant] = useState("control");

  // keep original HTML snapshot (same-origin)
  const originalSnapshotRef = useRef(null);

  // When URL changes / iframe loads, try to snapshot and attach contextmenu listener if same-origin
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const onLoad = () => {
      // try access document
      try {
        const doc =
          iframe.contentDocument || iframe.contentWindow.document;
        // snapshot original HTML (string) - used to restore control when applying variants
        originalSnapshotRef.current =
          doc.documentElement.cloneNode(true).outerHTML;
        setIframeAccessible(true);
        attachContextMenuToIframe(doc);
      } catch (err) {
        // cross-origin -> cannot access DOM
        setIframeAccessible(false);
      }
    };

    iframe.addEventListener("load", onLoad);
    if (iframe.contentDocument?.readyState === "complete") onLoad();

    return () => iframe.removeEventListener("load", onLoad);
  }, [testData.url]);

  // Listen for postMessage from iframe helper (cross-origin) or injected script (same-origin fallback)
  useEffect(() => {
    const onMessage = (e) => {
      const msg = e.data || {};
      if (!msg || typeof msg !== "object") return;

      // RIGHT-CLICK from helper: { type: 'rightclick', selector, tag, x, y }
      if (msg.type === "rightclick") {
        setPopup({
          visible: true,
          selector: msg.selector,
          tag: msg.tag || null,
        });
        setSelected({
          selector: msg.selector,
          tag: msg.tag || null,
        });
      }

      // Response to "getElementText" from helper: { type: 'elementText', selector, text }
      if (
        msg.type === "elementText" &&
        msg.selector === selected.selector
      ) {
        setEditTextValue(msg.text || "");
        setShowTextModal(true);
      }

      // Response to "elementColor": { type: 'elementColor', selector, color }
      if (
        msg.type === "elementColor" &&
        msg.selector === selected.selector
      ) {
        setEditColorValue(msg.color || "#000000");
        setShowColorModal(true);
      }

      // Acknowledge apply done etc (not strictly needed here)
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [selected.selector]);

  /* ---------------- Attach right-click inside same-origin iframe ---------------- */
  const attachContextMenuToIframe = (doc) => {
    // remove prior
    try {
      if (doc._splitspurListener)
        doc.removeEventListener(
          "contextmenu",
          doc._splitspurListener,
          true
        );
    } catch (e) {}

    const listener = function (ev) {
      ev.preventDefault();
      ev.stopPropagation();

      const el = ev.target;
      const selector = getUniqueSelector(el);
      const tag = el.tagName.toLowerCase();

      setPopup({ visible: true, selector, tag });
      setSelected({ selector, tag });
    };

    doc._splitspurListener = listener;
    doc.addEventListener("contextmenu", listener, true);
  };

  /* ---------------- Utility: unique selector (simple heuristic) ---------------- */
  function getUniqueSelector(el) {
    if (!el) return null;
    if (el.id) return `#${el.id}`;
    const path = [];
    let node = el;
    while (
      node &&
      node.nodeType === 1 &&
      node !==
        (node.ownerDocument && node.ownerDocument.documentElement)
    ) {
      let name = node.nodeName.toLowerCase();
      if (node.className && typeof node.className === "string") {
        const cls = node.className.split(/\s+/)[0];
        if (cls) name += "." + cls;
      }
      // nth-of-type if multiple siblings
      let sibIndex = 1;
      let sib = node.previousElementSibling;
      while (sib) {
        if (sib.nodeName === node.nodeName) sibIndex++;
        sib = sib.previousElementSibling;
      }
      if (sibIndex > 1) name += `:nth-of-type(${sibIndex})`;
      path.unshift(name);
      node = node.parentElement;
    }
    return path.join(" > ");
  }

  /* ---------------- Apply variant edits (same-origin or postMessage) ---------------- */
  const applyVariantToIframe = async (variantKey) => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const edits = variants[variantKey] || [];

    // same-origin DOM apply
    try {
      const doc =
        iframe.contentDocument || iframe.contentWindow.document;
      if (originalSnapshotRef.current) {
        // restore original snapshot
        doc.documentElement.outerHTML = originalSnapshotRef.current;
      }
      edits.forEach((ed) => {
        try {
          const el = doc.querySelector(ed.selector);
          if (!el) return;
          if (ed.type === "text") el.textContent = ed.value;
          if (ed.type === "color") el.style.color = ed.value;
          if (ed.type === "delete") el.remove();
        } catch (err) {}
      });
      // reattach contextmenu listener because we replaced DOM
      attachContextMenuToIframe(doc);
      return;
    } catch (err) {
      // cross-origin -> fallback to postMessage apply
      const msg = { type: "applyVariant", edits };
      iframe.contentWindow?.postMessage(msg, "*");
      return;
    }
  };

  // apply currentVariant when it changes
  useEffect(() => {
    applyVariantToIframe(currentVariant);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVariant, variants]);

  /* ---------------- Popup actions ---------------- */
  const onEditText = () => {
    const sel = popup.selector || selected.selector;
    if (!sel) return;

    // If same-origin, read current text synchronously
    if (iframeAccessible) {
      try {
        const doc = iframeRef.current.contentDocument;
        const el = doc.querySelector(sel);
        setEditTextValue(el ? el.textContent || "" : "");
        setShowTextModal(true);
        setPopup((p) => ({ ...p, visible: false }));
        return;
      } catch (err) {
        // fallthrough to postMessage
      }
    }

    // cross-origin: ask helper for current text, open modal when response arrives
    setSelected((s) => ({ ...s, selector: sel }));
    // ask iframe helper to send current text
    iframeRef.current.contentWindow?.postMessage(
      { type: "getElementText", selector: sel },
      "*"
    );
    setPopup((p) => ({ ...p, visible: false }));
    // modal will open when elementText message arrives
  };

  const commitTextEdit = () => {
    const sel = selected.selector;
    if (!sel) return;

    setVariants((prev) => {
      const arr = [...(prev[currentVariant] || [])];
      const idx = arr.findIndex(
        (e) => e.selector === sel && e.type === "text"
      );
      const editObj = {
        selector: sel,
        type: "text",
        value: editTextValue,
      };
      if (idx >= 0) arr[idx] = editObj;
      else arr.push(editObj);
      return { ...prev, [currentVariant]: arr };
    });

    setShowTextModal(false);
    // apply immediately to preview
    setTimeout(() => applyVariantToIframe(currentVariant), 50);
  };

  const onChangeColor = () => {
    const sel = popup.selector || selected.selector;
    if (!sel) return;

    if (iframeAccessible) {
      try {
        const doc = iframeRef.current.contentDocument;
        const el = doc.querySelector(sel);
        const computed = el
          ? el.style.color || getComputedStyle(el).color
          : "#000000";
        setEditColorValue(rgbToHex(computed));
        setShowColorModal(true);
        setPopup((p) => ({ ...p, visible: false }));
        return;
      } catch (err) {
        // fallthrough
      }
    }

    // cross-origin: ask helper for current color
    setSelected((s) => ({ ...s, selector: sel }));
    iframeRef.current.contentWindow?.postMessage(
      { type: "getElementColor", selector: sel },
      "*"
    );
    setPopup((p) => ({ ...p, visible: false }));
  };

  const commitColorEdit = () => {
    const sel = selected.selector;
    if (!sel) return;

    setVariants((prev) => {
      const arr = [...(prev[currentVariant] || [])];
      const idx = arr.findIndex(
        (e) => e.selector === sel && e.type === "color"
      );
      const editObj = {
        selector: sel,
        type: "color",
        value: editColorValue,
      };
      if (idx >= 0) arr[idx] = editObj;
      else arr.push(editObj);
      return { ...prev, [currentVariant]: arr };
    });

    setShowColorModal(false);
    setTimeout(() => applyVariantToIframe(currentVariant), 50);
  };

  const onDeleteElement = () => {
    const sel = popup.selector || selected.selector;
    if (!sel) return;

    setVariants((prev) => {
      const arr = [...(prev[currentVariant] || [])];
      arr.push({ selector: sel, type: "delete", value: true });
      return { ...prev, [currentVariant]: arr };
    });

    setPopup((p) => ({ ...p, visible: false }));
    setTimeout(() => applyVariantToIframe(currentVariant), 50);
  };

  /* ---------------- Helpers ---------------- */
  function componentToHex(c) {
    const hex = (+c).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }
  function rgbToHex(rgb) {
    if (!rgb) return "#000000";
    // rgb or rgba
    const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!m) return rgb;
    return (
      "#" +
      componentToHex(m[1]) +
      componentToHex(m[2]) +
      componentToHex(m[3])
    );
  }

  /* ---------------- Render ---------------- */
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 px-6 py-6 bg-gray-100 overflow-hidden">
        <button
          onClick={handleBack}
          className="mb-4 underline text-blue-600"
        >
          ← Back
        </button>

        <div className="max-w-7xl mx-auto flex gap-6">
          {/* LEFT preview column */}
          <div className="flex-1 flex flex-col">
            <div className="bg-white rounded-lg border p-4 mb-4">
              <label className="font-semibold">Page URL</label>
              <input
                type="text"
                className="w-full mt-2 p-3 border rounded-lg"
                value={testData.url}
                onChange={(e) =>
                  handleInputChange("url", e.target.value)
                }
                placeholder="https://example.com"
              />
            </div>

            <div className="flex gap-2 mb-4">
              <VariantTab
                color="black"
                label="Control"
                onClick={() => setCurrentVariant("control")}
              />
              <VariantTab
                color="pink"
                label="Variant 1"
                onClick={() => setCurrentVariant("variant1")}
              />
              <VariantTab
                color="orange"
                label="Variant 2"
                onClick={() => setCurrentVariant("variant2")}
              />
            </div>

            {/* Preview container: limited size and scrollable inside */}
            <div
              ref={previewRef}
              className="flex-1 bg-white rounded-lg border overflow-auto relative"
              style={{ minHeight: "60vh" }}
            >
              {/* iframe */}
              <iframe
                ref={iframeRef}
                src={testData.url || "about:blank"}
                className="w-full h-full"
                title="Preview"
                style={{ border: "none", minHeight: "400px" }}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />

              {/* Centered Popup inside preview */}
              {popup.visible && (
                <div
                  className="absolute inset-0 z-40 flex items-center justify-center bg-black bg-opacity-20"
                  onClick={() =>
                    setPopup((p) => ({ ...p, visible: false }))
                  }
                >
                  <div
                    className="bg-white rounded-lg shadow-xl p-4 w-[360px] border"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h2 className="text-lg font-semibold mb-3 text-center">
                      Edit Options
                    </h2>

                    {/* MAIN ACTION BUTTONS */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <ActionBtn
                        label="Edit Text"
                        onClick={onEditText}
                      />
                      <ActionBtn
                        label="Change Colour"
                        onClick={onChangeColor}
                      />
                      <ActionBtn
                        label="Resize"
                        onClick={() => alert("Resize")}
                      />
                      <ActionBtn
                        label="Reposition"
                        onClick={() => alert("Reposition")}
                      />
                      <ActionBtn
                        label="Show / Hide"
                        onClick={() => alert("Show / Hide")}
                      />
                      <ActionBtn
                        label="Track Clicks"
                        onClick={() => alert("Track Clicks")}
                      />
                    </div>

                    {/* ADD COMPONENTS DROPDOWN */}
                    <details className="border rounded-md p-2">
                      <summary className="cursor-pointer font-medium">
                        Add Components
                      </summary>

                      <div className="mt-2 text-sm">
                        <h3 className="font-semibold mt-2">
                          Urgency &amp; Scarcity
                        </h3>
                        <ComponentRow label="Countdown Timer" />
                        <ComponentRow label="Stock Level Indicator" />
                        <ComponentRow label="Limited Time Offer" />

                        <h3 className="font-semibold mt-3">
                          Social Proof
                        </h3>
                        <ComponentRow label="Social Validation" />
                        <ComponentRow label="Recent Activity" />
                        <ComponentRow label="Trust Badges" />

                        <h3 className="font-semibold mt-3">
                          E-commerce Boosters
                        </h3>
                        <ComponentRow label="Shipping Information" />
                        <ComponentRow label="Conversion Urgency Triggers" />
                      </div>
                    </details>

                    <div className="flex justify-between mt-4 gap-2">
                      <button
                        className="flex-1 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 text-sm py-2 rounded-md"
                        onClick={onDeleteElement}
                      >
                        Delete Element
                      </button>
                      <button
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-sm py-2 rounded-md"
                        onClick={() =>
                          setPopup((p) => ({ ...p, visible: false }))
                        }
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT sidebar */}
          <div
            className="w-80 space-y-4 flex flex-col"
            style={{ minHeight: "60vh" }}
          >
            <div className="bg-white rounded-lg border p-4 h-auto">
              <h3 className="font-semibold text-lg text-center mb-3">
                AI Suggestions
              </h3>
              <SidebarCard text="Add testimonials in Variant 2." />
              <SidebarCard text="Add cart icon in Variant 1 navbar." />
              <SidebarCard text="Fix CTA text in Variant 2." />
            </div>

            <div className="bg-white rounded-lg border p-4 h-auto">
              <h3 className="font-semibold text-lg text-center mb-3">
                Recent Changes
              </h3>
              <ul className="space-y-2 text-sm">
                <li>• CTA color set to black</li>
                <li>• Banner autoplay enabled</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <CenteredBottomToolbar
        onUndo={() => alert("Undo")}
        onRedo={() => alert("Redo")}
        onHelp={() => alert("Help")}
        onPreview={() =>
          window.open(testData.url || "", "_blank")
        }
        onGoals={() => alert("Goals")}
        onSaveDraft={() => alert("Saved")}
        onDeleteDraft={() => alert("Deleted")}
        onLaunchTest={() => alert("Launch")}
      />

      <Footer />

      {/* Text edit modal */}
      {showTextModal && (
        <Modal
          onClose={() => setShowTextModal(false)}
          title="Edit Text"
        >
          <textarea
            className="w-full p-2 border rounded h-32"
            value={editTextValue}
            onChange={(e) => setEditTextValue(e.target.value)}
          />
          <div className="mt-3 flex justify-end gap-2">
            <button
              className="px-3 py-1 border rounded"
              onClick={() => setShowTextModal(false)}
            >
              Discard
            </button>
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded"
              onClick={commitTextEdit}
            >
              Done
            </button>
          </div>
        </Modal>
      )}

      {/* Color edit modal */}
      {showColorModal && (
        <Modal
          onClose={() => setShowColorModal(false)}
          title="Change Color"
        >
          <div className="mb-3">
            <div className="text-sm mb-1">Pick color</div>
            <input
              type="color"
              value={editColorValue}
              onChange={(e) => setEditColorValue(e.target.value)}
            />
          </div>
          <div className="mt-3 flex justify-end gap-2">
            <button
              className="px-3 py-1 border rounded"
              onClick={() => setShowColorModal(false)}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded"
              onClick={commitColorEdit}
            >
              Done
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

/* -------------------- Small components -------------------- */
const Modal = ({ onClose, title, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div
      className="absolute inset-0 bg-black opacity-30"
      onClick={onClose}
    />
    <div className="bg-white rounded-lg shadow-lg p-4 z-60 w-[520px] max-w-full">
      <div className="font-semibold mb-2">{title}</div>
      <div>{children}</div>
    </div>
  </div>
);

const InputField = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium mb-2">{label}</label>
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const DurationDropdown = ({ label, value, onChange }) => {
  const options = [
    "7 Days",
    "10 Days",
    "14 Days",
    "21 Days",
    "30 Days",
    "45 Days",
    "60 Days",
  ];
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div
        className="border rounded-lg p-3 bg-white cursor-pointer"
        onClick={() => setOpen((v) => !v)}
      >
        {value}
      </div>
      {open && (
        <div className="absolute mt-1 w-full bg-white border rounded-lg shadow max-h-40 overflow-y-auto z-20">
          {options.map((opt) => (
            <div
              key={opt}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SmartSetupCard = () => (
  <div className="w-80 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-6">
    <h3 className="font-semibold text-lg mb-4">Smart Setup</h3>
    <ul className="space-y-3 text-sm text-gray-700 mb-6">
      <li>• Tests need ~14 days for significance.</li>
      <li>• AI insights personalized to your page.</li>
      <li>• Helps you pick best elements to test.</li>
    </ul>
  </div>
);

const VariantTab = ({ color, label, onClick }) => (
  <button
    className={`px-4 py-2 rounded-t-lg ${bgFromColor(
      color
    )} flex items-center gap-2 font-medium`}
    onClick={onClick}
  >
    <div className={`${dotFromColor(color)} rounded-full w-2 h-2`} />
    {label}
  </button>
);
function bgFromColor(color) {
  if (color === "pink") return "bg-pink-100";
  if (color === "orange") return "bg-orange-100";
  return "bg-gray-200";
}
function dotFromColor(color) {
  if (color === "pink") return "bg-pink-500";
  if (color === "orange") return "bg-orange-500";
  return "bg-black";
}

const SidebarCard = ({ text }) => (
  <div className="border p-3 rounded-lg bg-orange-50 mb-2">
    <p className="text-sm mb-2">{text}</p>
    <button className="w-full bg-blue-600 text-white py-1 rounded text-sm">
      Apply
    </button>
  </div>
);

const CenteredBottomToolbar = ({
  onUndo,
  onRedo,
  onHelp,
  onPreview,
  onGoals,
  onSaveDraft,
  onDeleteDraft,
  onLaunchTest,
}) => (
  <div className="bg-white border-t px-6 py-3">
    <div className="w-full flex justify-center">
      <div className="flex items-center gap-3">
        <ToolbarItem
          icon={<Undo2 size={18} />}
          text="Undo"
          onClick={onUndo}
        />
        <ToolbarItem
          icon={<Redo2 size={18} />}
          text="Redo"
          onClick={onRedo}
        />
        <ToolbarItem
          icon={<HelpCircle size={18} />}
          text="Help"
          onClick={onHelp}
        />
        <ToolbarItem
          icon={<Eye size={18} />}
          text="Preview"
          onClick={onPreview}
        />
        <ToolbarItem
          icon={<Sun size={18} />}
          text="Goals Active"
          onClick={onGoals}
        />
        <ToolbarItem
          icon={<Save size={18} />}
          text="Save Draft"
          onClick={onSaveDraft}
        />
        <ToolbarItem
          icon={<Trash2 size={18} />}
          text="Delete Draft"
          onClick={onDeleteDraft}
        />
        <button
          onClick={onLaunchTest}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700"
        >
          Launch Test
        </button>
      </div>
    </div>
  </div>
);

const ToolbarItem = ({ icon, text, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-2 border px-4 py-2 rounded-md cursor-pointer hover:bg-gray-50"
  >
    {icon}
    <span className="text-sm">{text}</span>
  </div>
);

const Footer = () => (
  <footer className="bg-white border-t px-6 py-8 mt-4">
    <p className="text-center text-gray-500 text-sm">
      © 2025 Splitspur – All Rights Reserved.
    </p>
  </footer>
);

/* --- Extra helper components for popup --- */

const ActionBtn = ({ label, onClick }) => (
  <button
    className="border rounded-md py-2 text-sm hover:bg-gray-50"
    onClick={onClick}
  >
    {label}
  </button>
);

const ComponentRow = ({ label }) => (
  <div className="p-1 hover:bg-gray-50 rounded cursor-pointer">
    {label}
  </div>
);