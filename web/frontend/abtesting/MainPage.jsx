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
 * SplitspurApp.jsx
 * Option A: Fake editing overlays (works for cross-origin iframe pages)
 *
 * Drop into your React app (make sure tailwind / styles are available)
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

/* ---------------- Setup Page ---------------- */
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
            <button className="px-6 py-2 border rounded-lg">Back to Dashboard</button>
            <div className="flex gap-3">
              <button className="px-6 py-2 border rounded-lg">Save as Draft</button>
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

/* ---------------- Editor Page (Option A: overlays) ---------------- */
const EditorPage = ({ testData, handleInputChange, setCurrentPage }) => {
  const handleBack = () => setCurrentPage("setup");

  // popup state (menu that appears where user clicked)
  const [popup, setPopup] = useState({ visible: false, x: 0, y: 0, targetOverlayId: null });

  // modal state for edit text / change color
  const [modal, setModal] = useState({ type: null, visible: false, value: "", overlayId: null });

  // iframe load state
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  // refs
  const previewRef = useRef(null);
  const iframeRef = useRef(null);

  // variant state: 'control' | 'variant1'
  const [variant, setVariant] = useState("control");

  // overlays store: object keyed by variant, each is array of overlays
  // overlay: { id, x, y, text, color }
  const [overlaysByVariant, setOverlaysByVariant] = useState({
    control: [], // empty (original)
    variant1: [], // user-applied overlays
  });

  // close popup on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setPopup({ visible: false, x: 0, y: 0, targetOverlayId: null });
        setModal((m) => ({ ...m, visible: false }));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // handlers for Bottom Toolbar (demo)
  const handleUndo = () => alert("Undo (not implemented)");
  const handleRedo = () => alert("Redo (not implemented)");
  const handleHelp = () => alert("Help");
  const handlePreview = () => {
    if (testData.url) window.open(testData.url, "_blank");
    else alert("No URL");
  };
  const handleGoals = () => alert("Goals");
  const handleSaveDraft = () => alert("Saved draft");
  const handleDeleteDraft = () => {
    if (confirm("Delete all overlays in Variant 1?")) {
      setOverlaysByVariant((prev) => ({ ...prev, variant1: [] }));
    }
  };
  const handleLaunchTest = () => alert("Launch Test");

  // iframe load/error
  useEffect(() => {
    // reset state when url changes
    setIframeLoaded(false);
    setIframeError(false);
  }, [testData.url]);

  // click on preview overlay (overlay on top of iframe)
  const handlePreviewClick = (e) => {
    // If click happened on an overlay element (we let overlays stop propagation),
    // we won't end up here. This handler is for clicks on the "preview surface".
    if (!previewRef.current) return;
    const rect = previewRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // clamp a bit
    const px = Math.max(8, Math.min(x, rect.width - 40));
    const py = Math.max(8, Math.min(y, rect.height - 40));

    setPopup({ visible: true, x: px, y: py, targetOverlayId: null });
  };

  // create overlay (applies to currently selected variant)
  const createOverlay = ({ x, y, text = "New text", color = "#000000" }) => {
    const id = "ov_" + Date.now() + Math.floor(Math.random() * 999);
    setOverlaysByVariant((prev) => {
      const key = variant === "control" ? "control" : "variant1";
      const copy = { ...prev, [key]: [...prev[key], { id, x, y, text, color }] };
      return copy;
    });
    return id;
  };

  // update overlay (by id) for variant1
  const updateOverlay = (id, patch) => {
    setOverlaysByVariant((prev) => {
      const key = "variant1";
      const arr = prev[key].map((o) => (o.id === id ? { ...o, ...patch } : o));
      return { ...prev, [key]: arr };
    });
  };

  // remove overlay
  const removeOverlay = (id) => {
    setOverlaysByVariant((prev) => {
      const key = "variant1";
      return { ...prev, [key]: prev[key].filter((o) => o.id !== id) };
    });
  };

  // click an existing overlay (open popup for that overlay)
  const handleOverlayClick = (e, overlay) => {
    // prevent preview click
    e.stopPropagation();
    // open popup at overlay position
    setPopup({ visible: true, x: overlay.x + 8, y: overlay.y + 8, targetOverlayId: overlay.id });
  };

  // open edit modal
  const openEditTextModal = (overlayId = null, suggestedText = "") => {
    setPopup((p) => ({ ...p, visible: false }));
    setModal({ type: "text", visible: true, value: suggestedText || "", overlayId });
  };

  // open change color modal
  const openChangeColorModal = (overlayId = null, suggestedColor = "#000000") => {
    setPopup((p) => ({ ...p, visible: false }));
    setModal({ type: "color", visible: true, value: suggestedColor || "#000000", overlayId });
  };

  // handle modal done
  const handleModalDone = () => {
    const { type, overlayId, value } = modal;
    // If overlayId is provided -> update, else create new overlay at last popup location (or center)
    if (overlayId) {
      if (type === "text") updateOverlay(overlayId, { text: value });
      if (type === "color") updateOverlay(overlayId, { color: value });
    } else {
      // create new overlay at popup.x/y (if popup exists)
      const px = popup.x || 40;
      const py = popup.y || 40;
      if (type === "text") {
        const id = createOverlay({ x: px, y: py, text: value || "Edited text", color: "#000000" });
        // store overlay id in modal? not necessary
      }
      if (type === "color") {
        const id = createOverlay({ x: px, y: py, text: "New text", color: value || "#000000" });
        updateOverlay(id, { color: value || "#000000" });
      }
    }

    setModal({ type: null, visible: false, value: "", overlayId: null });
  };

  // handle modal cancel
  const handleModalCancel = () => {
    setModal({ type: null, visible: false, value: "", overlayId: null });
  };

  // get overlays for current variant (if variant === control, show control overlays otherwise variant1)
  const overlaysToShow = variant === "control" ? overlaysByVariant.control : overlaysByVariant.variant1;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 px-6 py-6 bg-gray-100 overflow-hidden">
        <button onClick={handleBack} className="mb-4 underline text-blue-600">
          ← Back
        </button>

        {/* Editor layout: limited height area, scroll inside editor area */}
        <div className="max-w-7xl mx-auto flex gap-6 h-[78vh]"> 
          {/* LEFT: editor/preview (this column scrolls vertically inside its own area) */}
          <div className="flex-1 flex flex-col h-full">
            {/* URL input box (fixed at top of column) */}
            <div className="bg-white rounded-lg border p-4 mb-4 flex-shrink-0">
              <label className="font-semibold">Page URL</label>
              <input
                type="text"
                className="w-full mt-2 p-3 border rounded-lg"
                value={testData.url}
                onChange={(e) => handleInputChange("url", e.target.value)}
                placeholder="https://example.com"
              />
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-4 flex-shrink-0">
              <Tab label="Control" active={variant === "control"} onClick={() => setVariant("control")} />
              <Tab label="Variant 1" active={variant === "variant1"} onClick={() => setVariant("variant1")} />
            </div>

            {/* PREVIEW: scrollable surface, overlays live here */}
            <div
              ref={previewRef}
              className="flex-1 bg-white rounded-lg border relative overflow-auto"
              onClick={handlePreviewClick}
              style={{ minHeight: 0 }} // allow flex-1 to control height
            >
              {/* iframe / status */}
              <div style={{ position: "relative", minHeight: "600px" }}>
                {!testData.url && (
                  <div className="p-6 text-gray-500">No URL Provided</div>
                )}

                {testData.url && (
                  <>
                    <iframe
                      ref={iframeRef}
                      src={testData.url}
                      title="preview"
                      onLoad={() => {
                        setIframeLoaded(true);
                        setIframeError(false);
                      }}
                      onError={() => {
                        setIframeLoaded(false);
                        setIframeError(true);
                      }}
                      style={{ width: "100%", height: "100%", minHeight: "600px", border: "none" }}
                    />
                    {!iframeLoaded && !iframeError && (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500 bg-white/50">
                        Loading...
                      </div>
                    )}
                    {iframeError && (
                      <div className="absolute inset-0 flex items-center justify-center text-red-500 bg-white/60">
                        Page failed to load.
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Overlays: shown only for variant1 (or control if you add overlays there) */}
              <div className="absolute inset-0 pointer-events-none">
                {/* pointer-events-none at container; overlays themselves enable pointer events */}
                {overlaysToShow.map((ov) => (
                  <div
                    key={ov.id}
                    onClick={(e) => handleOverlayClick(e, ov)}
                    style={{
                      left: ov.x,
                      top: ov.y,
                      position: "absolute",
                      transform: "translate(-0%, -0%)",
                      zIndex: 40,
                      pointerEvents: "auto",
                      maxWidth: 420,
                    }}
                    className="p-3 rounded-lg shadow-md"
                  >
                    <div
                      className="rounded px-3 py-2"
                      style={{ background: "rgba(255,255,255,0.9)", color: ov.color, fontWeight: 600 }}
                    >
                      {ov.text}
                    </div>
                    {/* small controls for overlay (delete) */}
                    <div className="text-xs mt-1 flex gap-2 justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeOverlay(ov.id);
                        }}
                        className="px-2 py-1 bg-red-50 text-red-600 rounded"
                      >
                        Delete
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPopup((p) => ({ visible: false, x: ov.x + 10, y: ov.y + 10, targetOverlayId: ov.id }));
                        }}
                        className="px-2 py-1 bg-blue-50 text-blue-700 rounded"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Popup menu: appears at click coords inside previewRef */}
              {popup.visible && (
                <div
                  className="absolute z-50"
                  style={{ left: popup.x, top: popup.y }}
                >
                  <div className="bg-white border rounded-md shadow-lg text-sm w-64">
                    <div className="grid grid-cols-2 divide-x">
                      <button
                        className="p-2 text-center hover:bg-gray-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          // if targetOverlayId present -> edit that overlay text else create new text overlay
                          if (popup.targetOverlayId) {
                            const ov = overlaysByVariant.variant1.find((o) => o.id === popup.targetOverlayId) || {};
                            openEditTextModal(popup.targetOverlayId, ov.text);
                          } else openEditTextModal(null, "Edited text");
                        }}
                      >
                        Edit Text
                      </button>
                      <button
                        className="p-2 text-center hover:bg-gray-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (popup.targetOverlayId) {
                            const ov = overlaysByVariant.variant1.find((o) => o.id === popup.targetOverlayId) || {};
                            openChangeColorModal(popup.targetOverlayId, ov.color);
                          } else openChangeColorModal(null, "#000000");
                        }}
                      >
                        Change Color
                      </button>

                      <button
                        className="p-2 text-center hover:bg-gray-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Resize placeholder - not implemented
                          alert("Resize (not implemented)");
                        }}
                      >
                        Resize
                      </button>
                      <button
                        className="p-2 text-center hover:bg-gray-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert("Reposition (use overlays edit button)");
                        }}
                      >
                        Reposition
                      </button>

                      <button
                        className="p-2 text-center hover:bg-gray-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Show / Hide toggle: if overlay exists, toggle text to "" (quick hack)
                          if (popup.targetOverlayId) {
                            updateOverlay(popup.targetOverlayId, { text: "" });
                          } else {
                            alert("Create overlay then hide via delete.");
                          }
                        }}
                      >
                        Show / Hide
                      </button>
                      <button className="p-2 text-center hover:bg-gray-50" onClick={(e)=>{ e.stopPropagation(); alert("Track Clicks (analytics)"); }}>
                        Track Clicks
                      </button>
                    </div>

                    <div className="border-t p-2">
                      <button
                        className="w-full text-sm text-left p-2 hover:bg-gray-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add component quick: create a default overlay
                          createOverlay({ x: popup.x, y: popup.y, text: "New component", color: "#111827" });
                          setPopup({ visible: false, x: 0, y: 0, targetOverlayId: null });
                        }}
                      >
                        + Add Component
                      </button>
                    </div>

                    <div className="border-t">
                      <button
                        className="w-full p-2 text-sm text-red-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPopup({ visible: false, x: 0, y: 0, targetOverlayId: null });
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Modals for edit text / change color */}
              {modal.visible && modal.type === "text" && (
                <Modal onClose={handleModalCancel}>
                  <div className="font-semibold mb-2">Change Text</div>
                  <textarea
                    value={modal.value}
                    onChange={(e) => setModal((m) => ({ ...m, value: e.target.value }))}
                    className="w-full h-40 border p-2"
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button onClick={handleModalCancel} className="px-4 py-2 bg-gray-200 rounded">Discard</button>
                    <button
                      onClick={() => {
                        // if overlayId present update else create at popup
                        if (modal.overlayId) {
                          updateOverlay(modal.overlayId, { text: modal.value });
                        } else {
                          createOverlay({ x: popup.x, y: popup.y, text: modal.value, color: "#000000" });
                        }
                        setModal({ type: null, visible: false, value: "", overlayId: null });
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                      Done
                    </button>
                  </div>
                </Modal>
              )}

              {modal.visible && modal.type === "color" && (
                <Modal onClose={handleModalCancel}>
                  <div className="font-semibold mb-2">Change Color</div>
                  <div className="flex gap-4 mb-2 items-center">
                    <div>New: </div>
                    <input
                      value={modal.value}
                      onChange={(e) => setModal((m) => ({ ...m, value: e.target.value }))}
                      className="border px-2 py-1"
                    />
                    <div style={{ width: 36, height: 24, background: modal.value, borderRadius: 4 }} />
                  </div>
                  <div className="flex justify-end gap-2 mt-2">
                    <button onClick={handleModalCancel} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                    <button
                      onClick={() => {
                        if (modal.overlayId) updateOverlay(modal.overlayId, { color: modal.value });
                        else createOverlay({ x: popup.x, y: popup.y, text: "New text", color: modal.value });
                        setModal({ type: null, visible: false, value: "", overlayId: null });
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                      Done
                    </button>
                  </div>
                </Modal>
              )}
            </div>
          </div>

          {/* RIGHT: sidebar (independent scroll) */}
          <div className="w-80 h-full overflow-auto">
            <SidebarLarge />
          </div>
        </div>
      </main>

      <CenteredBottomToolbar
        onUndo={handleUndo}
        onRedo={handleRedo}
        onHelp={handleHelp}
        onPreview={handlePreview}
        onGoals={handleGoals}
        onSaveDraft={handleSaveDraft}
        onDeleteDraft={handleDeleteDraft}
        onLaunchTest={handleLaunchTest}
      />

      <Footer />
    </div>
  );
};

/* ---------------- small reusable components ---------------- */

const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 z-60 flex items-center justify-center">
    <div className="absolute inset-0 bg-black/30" onClick={onClose} />
    <div className="bg-white p-4 rounded shadow-lg z-70 w-[520px]">{children}</div>
  </div>
);

const Tab = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded ${active ? "bg-yellow-100" : "bg-gray-200"}`}
  >
    {label}
  </button>
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
  const options = ["7 Days", "10 Days", "14 Days", "21 Days", "30 Days", "45 Days", "60 Days"];
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="border rounded-lg p-3 bg-white cursor-pointer" onClick={() => setOpen((v)=>!v)}>
        {value}
      </div>
      {open && (
        <div className="absolute mt-1 w-full bg-white border rounded-lg shadow max-h-40 overflow-y-auto z-20">
          {options.map((opt) => (
            <div
              key={opt}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => { onChange(opt); setOpen(false); }}
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
    <h3 className="font-semibold text-lg mb-4">AI Suggestions</h3>
    <ul className="space-y-3 text-sm text-gray-700 mb-6">
      <li>• Tests need ~14 days for significance.</li>
      <li>• AI insights personalized to your page.</li>
      <li>• Helps you pick best elements to test.</li>
    </ul>
  </div>
);

const SidebarLarge = () => (
  <div className="space-y-4 p-2">
    <div className="bg-white rounded-lg border p-4">
      <h3 className="font-semibold text-lg text-center mb-3">AI Suggestions</h3>
      <SidebarCard text="Add testimonials" />
      <SidebarCard text="Add cart icon" />
      <SidebarCard text="Fix CTA text" />
      <SidebarCard text="Add trust badges" />
    </div>
    <div className="bg-white rounded-lg border p-4">
      <h3 className="font-semibold text-lg text-center mb-3">Recent Changes</h3>
      <ul className="space-y-2 text-sm">
        <li>• CTA color set to black</li>
        <li>• Banner autoplay enabled</li>
        <li>• Hero image updated</li>
      </ul>
    </div>
  </div>
);

const SidebarCard = ({ text }) => (
  <div className="border p-3 rounded-lg bg-orange-50 mb-2">
    <p className="text-sm mb-2">{text}</p>
    <button className="w-full bg-blue-600 text-white py-1 rounded text-sm">Apply</button>
  </div>
);

/* Bottom centered toolbar */
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
        <ToolbarItem icon={<Undo2 size={18} />} text="Undo" onClick={onUndo} />
        <ToolbarItem icon={<Redo2 size={18} />} text="Redo" onClick={onRedo} />
        <ToolbarItem icon={<HelpCircle size={18} />} text="Help" onClick={onHelp} />
        <ToolbarItem icon={<Eye size={18} />} text="Preview" onClick={onPreview} />
        <ToolbarItem icon={<Sun size={18} />} text="Goals Active" onClick={onGoals} />
        <ToolbarItem icon={<Save size={18} />} text="Save Draft" onClick={onSaveDraft} />
        <ToolbarItem icon={<Trash2 size={18} />} text="Delete Draft" onClick={onDeleteDraft} />
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
  <div onClick={onClick} className="flex items-center gap-2 border px-4 py-2 rounded-md cursor-pointer hover:bg-gray-50">
    {icon}
    <span className="text-sm">{text}</span>
  </div>
);

const Footer = () => (
  <footer className="bg-white border-t px-6 py-8 mt-4">
    <p className="text-center text-gray-500 text-sm">© 2025 Splitspur – All Rights Reserved.</p>
  </footer>
);
