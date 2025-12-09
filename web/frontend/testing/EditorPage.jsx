import React, { useRef, useState, useEffect } from "react";

import VariantTab from "./VariantTab";
import SidebarCard from "./Sidebar";
import ComponentRow from "./ComponentRow";
import PopupActionBtn from "./PopupActionBtn";

import Footer from "./Footer";
import CenteredBottomToolbar from "./CenteredBottomToolbar";

export default function EditorPage({ testData, handleInputChange, setCurrentPage }) {
  const iframeRef = useRef(null);
  const previewRef = useRef(null);

  const [iframeAccessible, setIframeAccessible] = useState(false);
  const [popup, setPopup] = useState({ visible: false, selector: null, tag: null });
  const [selected, setSelected] = useState({ selector: null, tag: null });

  const [showTextModal, setShowTextModal] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);

  const [editTextValue, setEditTextValue] = useState("");
  const [editColorValue, setEditColorValue] = useState("#000000");

  const [variants, setVariants] = useState({
    control: [],
    variant1: [],
    variant2: [],
  });

  const [currentVariant, setCurrentVariant] = useState("control");
  const originalSnapshotRef = useRef(null);

  /* --------------------------------------------------------
      LOAD IFRAME / CHECK ACCESS
  -------------------------------------------------------- */
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const onLoad = () => {
      try {
        const doc = iframe.contentDocument;

        originalSnapshotRef.current = doc.documentElement.cloneNode(true).outerHTML;
        setIframeAccessible(true);
        attachRightClick(doc);
      } catch (err) {
        setIframeAccessible(false);
      }
    };

    iframe.addEventListener("load", onLoad);
    return () => iframe.removeEventListener("load", onLoad);
  }, [testData.url]);

  /* --------------------------------------------------------
      RIGHT CLICK LISTENER (A/B test editing)
  -------------------------------------------------------- */
  const attachRightClick = (doc) => {
    if (doc._listenerInstalled) return;

    doc.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      const sel = generateSelector(e.target);
      setSelected({ selector: sel, tag: e.target.tagName.toLowerCase() });
      setPopup({ visible: true, selector: sel });
    });

    doc._listenerInstalled = true;
  };

  /* --------------------------------------------------------
      GENERATE UNIQUE CSS SELECTOR
  -------------------------------------------------------- */
  const generateSelector = (el) => {
    if (!el) return null;
    if (el.id) return `#${el.id}`;

    let path = [];
    while (el.parentElement) {
      let tag = el.tagName.toLowerCase();
      const index = [...el.parentElement.children].filter(n => n.tagName === el.tagName).indexOf(el) + 1;
      path.unshift(`${tag}:nth-of-type(${index})`);
      el = el.parentElement;
    }
    return path.join(" > ");
  };

  /* --------------------------------------------------------
      APPLY VARIANT CHANGES TO IFRAME
  -------------------------------------------------------- */
  useEffect(() => applyVariant(currentVariant), [currentVariant, variants]);

  const applyVariant = (variantKey) => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const edits = variants[variantKey];

    if (!iframeAccessible) {
      iframe.contentWindow.postMessage({ type: "applyVariant", edits }, "*");
      return;
    }

    const doc = iframe.contentDocument;

    if (originalSnapshotRef.current)
      doc.documentElement.outerHTML = originalSnapshotRef.current;

    edits.forEach((ed) => {
      const el = doc.querySelector(ed.selector);
      if (!el) return;

      if (ed.type === "text") el.textContent = ed.value;
      if (ed.type === "color") el.style.color = ed.value;
      if (ed.type === "delete") el.remove();
    });

    attachRightClick(doc);
  };

  /* --------------------------------------------------------
      POPUP ACTIONS: EDIT TEXT
  -------------------------------------------------------- */
  const onEditText = () => {
    const sel = selected.selector;

    if (iframeAccessible) {
      const el = iframeRef.current.contentDocument.querySelector(sel);
      setEditTextValue(el?.textContent || "");
    }

    setShowTextModal(true);
    setPopup({ visible: false });
  };

  const commitText = () => {
    const sel = selected.selector;

    setVariants((prev) => {
      const edits = [...prev[currentVariant]];
      const idx = edits.findIndex((e) => e.selector === sel && e.type === "text");

      const editObj = { selector: sel, type: "text", value: editTextValue };
      if (idx >= 0) edits[idx] = editObj;
      else edits.push(editObj);

      return { ...prev, [currentVariant]: edits };
    });

    setShowTextModal(false);
  };

  /* --------------------------------------------------------
      POPUP ACTIONS: CHANGE COLOR
  -------------------------------------------------------- */
  const onChangeColor = () => {
    const sel = selected.selector;

    if (iframeAccessible) {
      const el = iframeRef.current.contentDocument.querySelector(sel);
      const raw = getComputedStyle(el).color;

      const hex = rgbToHex(raw);
      setEditColorValue(hex);
    }

    setShowColorModal(true);
    setPopup({ visible: false });
  };

  const rgbToHex = (rgb) => {
    const [r, g, b] = rgb.match(/\d+/g).map(Number);
    return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
  };

  const commitColor = () => {
    const sel = selected.selector;

    setVariants((prev) => ({
      ...prev,
      [currentVariant]: [
        ...prev[currentVariant],
        { selector: sel, type: "color", value: editColorValue },
      ],
    }));

    setShowColorModal(false);
  };

  /* --------------------------------------------------------
      DELETE ELEMENT
  -------------------------------------------------------- */
  const onDeleteElement = () => {

    const sel = selected.selector;

    setVariants((prev) => ({
      ...prev,
      [currentVariant]: [
        ...prev[currentVariant],
        { selector: sel, type: "delete" },
      ],
    }));

    setPopup({ visible: false });
  };

  /* --------------------------------------------------------
      RENDER UI
  -------------------------------------------------------- */
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <main className="flex-1 px-6 py-4 bg-gray-100 overflow-hidden flex flex-col">

        {/* BACK */}
        <button
          onClick={() => setCurrentPage("setup")}
          className="mb-4 text-blue-600 underline"
        >
          ← Back
        </button>

        {/* MAIN LAYOUT */}
        <div className="flex gap-6 h-full">

          {/* LEFT PREVIEW PANEL */}
          <div className="flex-1 flex flex-col overflow-hidden">

            {/* URL BOX */}
            <div className="bg-white rounded border p-4 mb-4 flex-shrink-0">
              <label className="font-semibold">Page URL</label>
              <input
                className="w-full border p-2 mt-2 rounded"
                value={testData.url}
                onChange={(e) => handleInputChange("url", e.target.value)}
              />
            </div>

            {/* VARIANT TABS */}
            <div className="flex gap-2 mb-4 flex-shrink-0">
              <VariantTab label="Control" color="black" onClick={() => setCurrentVariant("control")} />
              <VariantTab label="Variant 1" color="pink" onClick={() => setCurrentVariant("variant1")} />
              <VariantTab label="Variant 2" color="orange" onClick={() => setCurrentVariant("variant2")} />
            </div>

            {/* PREVIEW FRAME */}
            <div
              ref={previewRef}
              className="flex-1 bg-white rounded border overflow-auto relative"
            >
              <iframe
                ref={iframeRef}
                src={testData.url}
                className="w-full"
                style={{ border: "none", minHeight: "1000px" }}
              />

              {/* POPUP */}
              {popup.visible && (
                <div
                  className="absolute inset-0 bg-black/20 flex items-center justify-center"
                  onClick={() => setPopup({ visible: false })}
                >
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white p-4 rounded-lg w-[360px] shadow-xl"
                  >
                    <h2 className="font-semibold text-lg text-center mb-3">
                      Edit Options
                    </h2>

                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <PopupActionBtn label="Edit Text" onClick={onEditText} />
                      <PopupActionBtn label="Change Colour" onClick={onChangeColor} />
                      <PopupActionBtn label="Resize" onClick={() => alert("Resize")} />
                      <PopupActionBtn label="Reposition" onClick={() => alert("Reposition")} />
                      <PopupActionBtn label="Show / Hide" onClick={() => alert("Hide")} />
                      <PopupActionBtn label="Track Clicks" onClick={() => alert("Tracking enabled")} />
                    </div>

                    <details className="border p-2 rounded">
                      <summary className="font-medium cursor-pointer">
                        Add Components
                      </summary>
                      <div className="mt-2 text-sm">
                        <h3 className="font-semibold mt-2">Urgency</h3>
                        <ComponentRow label="Countdown Timer" />
                        <ComponentRow label="Stock Indicator" />

                        <h3 className="font-semibold mt-2">Social Proof</h3>
                        <ComponentRow label="Trust Badges" />
                        <ComponentRow label="Recent Activity" />
                      </div>
                    </details>

                    <div className="flex justify-between mt-4">
                      <button
                        onClick={onDeleteElement}
                        className="px-3 py-2 bg-red-100 text-red-600 rounded"
                      >
                        Delete Element
                      </button>
                      <button
                        onClick={() => setPopup({ visible: false })}
                        className="px-3 py-2 bg-gray-200 rounded"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="w-80 flex flex-col overflow-y-auto space-y-4">

            <div className="bg-white border rounded p-4">
              <h3 className="text-lg font-semibold text-center mb-3">AI Suggestions</h3>
              <SidebarCard text="Try improving CTA text in Variant 1" />
              <SidebarCard text="Add urgency timer to Variant 2" />
              <SidebarCard text="Increase contrast in hero section" />
            </div>

            <div className="bg-white border rounded p-4">
              <h3 className="text-lg font-semibold text-center mb-3">Recent Edits</h3>
              <ul className="text-sm space-y-2">
                <li>• CTA updated</li>
                <li>• Variant 1 text edited</li>
                <li>• Header color changed</li>
              </ul>
            </div>

          </div>
        </div>
      </main>

      <CenteredBottomToolbar
        onUndo={() => alert("Undo")}
        onRedo={() => alert("Redo")}
        onHelp={() => alert("Help")}
        onPreview={() => window.open(testData.url, "_blank")}
        onGoals={() => alert("Goals")}
        onSaveDraft={() => alert("Draft Saved")}
        onDeleteDraft={() => alert("Draft Deleted")}
        onLaunchTest={() => alert("Launching Test...")}
      />

      <Footer />

      {/* TEXT MODAL */}
      {showTextModal && (
        <Modal title="Edit Text" onClose={() => setShowTextModal(false)}>
          <textarea
            className="w-full border p-2 rounded h-32"
            value={editTextValue}
            onChange={(e) => setEditTextValue(e.target.value)}
          />
          <div className="text-right mt-3 space-x-2">
            <button className="px-3 py-1 border rounded" onClick={() => setShowTextModal(false)}>
              Cancel
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={commitText}>
              Save
            </button>
          </div>
        </Modal>
      )}

      {/* COLOR MODAL */}
      {showColorModal && (
        <Modal title="Change Color" onClose={() => setShowColorModal(false)}>
          <input
            type="color"
            value={editColorValue}
            onChange={(e) => setEditColorValue(e.target.value)}
            className="w-16 h-10 border rounded"
          />
          <div className="text-right mt-3 space-x-2">
            <button className="px-3 py-1 border rounded" onClick={() => setShowColorModal(false)}>
              Cancel
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={commitColor}>
              Save
            </button>
          </div>
        </Modal>
      )}

    </div>
  );
}
