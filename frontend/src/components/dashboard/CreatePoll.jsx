// pages/dashboard/CreatePoll.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Plus, Trash2, GripVertical, ChevronRight, ChevronLeft,
    Globe, Lock, Calendar, CheckSquare, ToggleLeft, ToggleRight,
    Eye, Send, Save, AlertCircle, Check, BarChart2, X,
} from "lucide-react";
import pollService from "../../services/pollService";

/* ── Step config ── */
const STEPS = [
    { id: 1, label: "Question", desc: "Write your poll question and options" },
    { id: 2, label: "Settings", desc: "Configure visibility and voting rules" },
    { id: 3, label: "Preview", desc: "Review before publishing" },
];

/* ── Default option ── */
const newOption = (text = "") => ({ id: Date.now() + Math.random(), text });

/* ── Character counter ── */
function CharCount({ value, max }) {
    const pct = (value.length / max) * 100;
    const color = pct > 90 ? "#ef4444" : pct > 70 ? "#f59e0b" : "#3c3836";
    return (
        <span style={{ fontSize: 11, color, fontFamily: "'DM Sans', sans-serif" }}>
            {value.length}/{max}
        </span>
    );
}

/* ── Toggle switch ── */
function Toggle({ on, onChange, label, desc }) {
    return (
        <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "14px 18px", borderRadius: 12,
            background: on ? "rgba(234,88,12,0.05)" : "rgba(255,255,255,0.02)",
            border: `1px solid ${on ? "rgba(234,88,12,0.2)" : "rgba(255,255,255,0.07)"}`,
            transition: "all 0.2s", cursor: "pointer", gap: 12,
        }} onClick={() => onChange(!on)}>
            <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 600, color: "#e8e4dc", marginBottom: 2 }}>
                    {label}
                </div>
                <div style={{ fontSize: 12, color: "#57534e" }}>{desc}</div>
            </div>
            <div style={{
                width: 42, height: 24, borderRadius: 100,
                background: on ? "#ea580c" : "rgba(255,255,255,0.08)",
                position: "relative", flex: "none", transition: "background 0.2s",
                border: `1px solid ${on ? "#ea580c" : "rgba(255,255,255,0.12)"}`,
            }}>
                <div style={{
                    position: "absolute", top: 2, left: on ? 18 : 2,
                    width: 18, height: 18, borderRadius: "50%",
                    background: on ? "#fff" : "#57534e",
                    transition: "left 0.2s, background 0.2s",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                }} />
            </div>
        </div>
    );
}

/* ── Preview mini poll ── */
function PollPreviewCard({ form }) {
    const totalVotes = 0; // preview mode
    return (
        <div style={{
            background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: 16, padding: 24, maxWidth: 440,
        }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(234,88,12,0.15)", border: "1px solid rgba(234,88,12,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <BarChart2 size={14} style={{ color: "#f97316" }} />
                </div>
                <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 700, color: "#f97316", letterSpacing: "0.08em", textTransform: "uppercase" }}>PollWave</div>
                    <div style={{ fontSize: 10, color: "#3c3836" }}>Live Poll Preview</div>
                </div>
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 100, padding: "3px 9px" }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e" }} />
                    <span style={{ fontSize: 10, color: "#22c55e", fontFamily: "'Syne', sans-serif", fontWeight: 700 }}>LIVE</span>
                </div>
            </div>

            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "#f0ece4", lineHeight: 1.4, marginBottom: form.description ? 8 : 18 }}>
                {form.title || "Your poll question will appear here"}
            </h3>
            {form.description && (
                <p style={{ fontSize: 13, color: "#57534e", lineHeight: 1.5, marginBottom: 16 }}>{form.description}</p>
            )}

            {/* Options */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {form.options.filter(o => o.text).map((opt, i) => (
                    <div key={opt.id} style={{
                        padding: "12px 14px", borderRadius: 10,
                        border: "1px solid rgba(255,255,255,0.08)",
                        background: "rgba(255,255,255,0.02)", cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 10,
                        transition: "all 0.15s",
                    }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(234,88,12,0.3)"; e.currentTarget.style.background = "rgba(234,88,12,0.05)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
                    >
                        <div style={{
                            width: 16, height: 16, borderRadius: form.allowMultiple ? 4 : "50%",
                            border: "1.5px solid rgba(255,255,255,0.2)", flexShrink: 0,
                        }} />
                        <span style={{ fontSize: 14, color: "#e8e4dc" }}>{opt.text}</span>
                    </div>
                ))}
                {form.options.filter(o => o.text).length === 0 && (
                    <div style={{ padding: "20px", textAlign: "center", borderRadius: 10, border: "1px dashed rgba(255,255,255,0.07)" }}>
                        <span style={{ fontSize: 12, color: "#3c3836" }}>Add options in Step 1 to see them here</span>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, color: "#3c3836" }}>
                    {form.visibility === "private" ? "🔒 Private poll" : "🌐 Public poll"}
                    {form.allowMultiple ? " · Multi-choice" : " · Single choice"}
                </span>
                <button style={{
                    background: "#ea580c", color: "#fff", border: "none", borderRadius: 8,
                    padding: "8px 16px", fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700,
                    cursor: "pointer",
                }}>
                    Vote Now
                </button>
            </div>
        </div>
    );
}

/* ── STEP 1: Question builder ── */
function StepQuestion({ form, setForm, errors }) {
    const addOption = () => {
        if (form.options.length >= 10) return;
        setForm(f => ({ ...f, options: [...f.options, newOption()] }));
    };

    const removeOption = (id) => {
        if (form.options.length <= 2) return;
        setForm(f => ({ ...f, options: f.options.filter(o => o.id !== id) }));
    };

    const updateOption = (id, text) => {
        setForm(f => ({ ...f, options: f.options.map(o => o.id === id ? { ...o, text } : o) }));
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Poll title */}
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <label style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#57534e" }}>
                        Poll Question <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <CharCount value={form.title} max={140} />
                </div>
                <input
                    value={form.title}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value.slice(0, 140) }))}
                    placeholder="e.g. What feature should we build next?"
                    style={{
                        width: "100%", background: "rgba(255,255,255,0.03)",
                        border: `1px solid ${errors.title ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.09)"}`,
                        borderRadius: 11, padding: "13px 16px", color: "#f0ece4",
                        fontFamily: "'DM Sans', sans-serif", fontSize: 15,
                        outline: "none", transition: "border-color 0.2s, box-shadow 0.2s",
                    }}
                    onFocus={e => { e.target.style.borderColor = "rgba(234,88,12,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(234,88,12,0.08)"; }}
                    onBlur={e => { e.target.style.borderColor = errors.title ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.09)"; e.target.style.boxShadow = "none"; }}
                />
                {errors.title && (
                    <p style={{ fontSize: 12, color: "#ef4444", marginTop: 5, display: "flex", alignItems: "center", gap: 5 }}>
                        <AlertCircle size={11} /> {errors.title}
                    </p>
                )}
            </div>

            {/* Description */}
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <label style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#57534e" }}>
                        Description <span style={{ color: "#3c3836", fontWeight: 400, textTransform: "none", fontSize: 11, letterSpacing: 0 }}>optional</span>
                    </label>
                    <CharCount value={form.description} max={280} />
                </div>
                <textarea
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value.slice(0, 280) }))}
                    placeholder="Add context to help voters decide…"
                    rows={3}
                    style={{
                        width: "100%", background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.09)",
                        borderRadius: 11, padding: "12px 16px", color: "#a8a29e",
                        fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.6,
                        outline: "none", resize: "vertical", minHeight: 80,
                        transition: "border-color 0.2s, box-shadow 0.2s",
                    }}
                    onFocus={e => { e.target.style.borderColor = "rgba(234,88,12,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(234,88,12,0.08)"; }}
                    onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.09)"; e.target.style.boxShadow = "none"; }}
                />
            </div>

            {/* Options */}
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <label style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#57534e" }}>
                        Options <span style={{ color: "#3c3836", fontWeight: 400, fontSize: 11, letterSpacing: 0, textTransform: "none" }}>({form.options.length}/10)</span>
                    </label>
                    {errors.options && (
                        <span style={{ fontSize: 12, color: "#ef4444", display: "flex", alignItems: "center", gap: 4 }}>
                            <AlertCircle size={11} />{errors.options}
                        </span>
                    )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {form.options.map((opt, i) => (
                        <div key={opt.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            {/* Drag handle (visual only) */}
                            <div style={{ color: "#2c2927", cursor: "grab", flexShrink: 0 }}>
                                <GripVertical size={14} />
                            </div>

                            {/* Option label */}
                            <div style={{
                                width: 22, height: 22, borderRadius: "50%",
                                background: "rgba(234,88,12,0.1)", border: "1px solid rgba(234,88,12,0.2)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 700,
                                color: "#f97316", flexShrink: 0,
                            }}>{i + 1}</div>

                            <input
                                value={opt.text}
                                onChange={e => updateOption(opt.id, e.target.value)}
                                placeholder={`Option ${i + 1}`}
                                style={{
                                    flex: 1, background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(255,255,255,0.08)", borderRadius: 9,
                                    padding: "10px 14px", color: "#e8e4dc",
                                    fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                                    outline: "none", transition: "border-color 0.2s",
                                }}
                                onFocus={e => e.target.style.borderColor = "rgba(234,88,12,0.4)"}
                                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                            />

                            <button
                                onClick={() => removeOption(opt.id)}
                                disabled={form.options.length <= 2}
                                style={{
                                    width: 28, height: 28, borderRadius: 7, border: "none",
                                    background: "transparent", color: "#3c3836",
                                    cursor: form.options.length <= 2 ? "not-allowed" : "pointer",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    opacity: form.options.length <= 2 ? 0.3 : 1, transition: "color 0.15s",
                                }}
                                onMouseEnter={e => { if (form.options.length > 2) e.currentTarget.style.color = "#ef4444"; }}
                                onMouseLeave={e => e.currentTarget.style.color = "#3c3836"}
                            >
                                <X size={13} />
                            </button>
                        </div>
                    ))}
                </div>

                {form.options.length < 10 && (
                    <button
                        onClick={addOption}
                        style={{
                            display: "flex", alignItems: "center", gap: 8, marginTop: 10,
                            background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(255,255,255,0.1)",
                            borderRadius: 9, padding: "10px 16px", color: "#57534e",
                            fontFamily: "'DM Sans', sans-serif", fontSize: 13, cursor: "pointer",
                            width: "100%", justifyContent: "center", transition: "all 0.2s",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(234,88,12,0.3)"; e.currentTarget.style.color = "#f97316"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#57534e"; }}
                    >
                        <Plus size={13} /> Add option
                    </button>
                )}
            </div>
        </div>
    );
}

/* ── STEP 2: Settings ── */
function StepSettings({ form, setForm }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Visibility */}
            <div>
                <label style={{ display: "block", fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#57534e", marginBottom: 10 }}>
                    Visibility
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {[
                        { value: "public", icon: Globe, label: "Public", desc: "Anyone with the link can vote" },
                        { value: "private", icon: Lock, label: "Private", desc: "Only invited members can vote" },
                    ].map(({ value, icon: Icon, label, desc }) => (
                        <div key={value}
                            onClick={() => setForm(f => ({ ...f, visibility: value }))}
                            style={{
                                padding: "14px 16px", borderRadius: 12, cursor: "pointer",
                                border: `1px solid ${form.visibility === value ? "rgba(234,88,12,0.35)" : "rgba(255,255,255,0.07)"}`,
                                background: form.visibility === value ? "rgba(234,88,12,0.07)" : "rgba(255,255,255,0.02)",
                                transition: "all 0.2s",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                <Icon size={14} style={{ color: form.visibility === value ? "#f97316" : "#57534e" }} />
                                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: form.visibility === value ? "#f0ece4" : "#78716c" }}>
                                    {label}
                                </span>
                                {form.visibility === value && <Check size={12} style={{ color: "#f97316", marginLeft: "auto" }} />}
                            </div>
                            <p style={{ fontSize: 11, color: "#3c3836" }}>{desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Toggles */}
            <Toggle
                on={form.allowMultiple}
                onChange={v => setForm(f => ({ ...f, allowMultiple: v }))}
                label="Multiple choice"
                desc="Allow voters to select more than one option"
            />
            <Toggle
                on={form.allowAnonymous}
                onChange={v => setForm(f => ({ ...f, allowAnonymous: v }))}
                label="Allow anonymous voting"
                desc="Users can vote without login or identity tracking"
            />
            <Toggle
                on={form.showResults}
                onChange={v => setForm(f => ({ ...f, showResults: v }))}
                label="Show live results"
                desc="Voters can see results after voting"
            />
            <Toggle
                on={form.allowComments}
                onChange={v => setForm(f => ({ ...f, allowComments: v }))}
                label="Allow comments"
                desc="Let voters leave a short comment with their vote"
            />

            {/* Deadline */}
            <div>
                <label style={{ display: "block", fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#57534e", marginBottom: 8 }}>
                    Close date <span style={{ color: "#3c3836", fontWeight: 400, textTransform: "none", fontSize: 11, letterSpacing: 0 }}>optional</span>
                </label>
                <div style={{ position: "relative" }}>
                    <Calendar size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#3c3836", pointerEvents: "none" }} />
                    <input
                        type="date"
                        value={form.expiresAt}
                        min={new Date().toISOString().slice(0, 10)}
                        onChange={e => setForm(f => ({ ...f, expiresAt: e.target.value }))}
                        style={{
                            width: "100%", background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.09)", borderRadius: 11,
                            padding: "12px 16px 12px 36px", color: form.expiresAt ? "#e8e4dc" : "#3c3836",
                            fontFamily: "'DM Sans', sans-serif", fontSize: 14, outline: "none",
                            colorScheme: "dark", transition: "border-color 0.2s",
                        }}
                        onFocus={e => { e.target.style.borderColor = "rgba(234,88,12,0.4)"; e.target.style.boxShadow = "0 0 0 3px rgba(234,88,12,0.08)"; }}
                        onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.09)"; e.target.style.boxShadow = "none"; }}
                    />
                </div>
            </div>
        </div>
    );
}

/* ── STEP 3: Preview + publish ── */
function StepPreview({ form }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{
                background: "rgba(234,88,12,0.06)", border: "1px solid rgba(234,88,12,0.18)",
                borderRadius: 12, padding: "12px 16px",
                display: "flex", alignItems: "center", gap: 10,
            }}>
                <Eye size={15} style={{ color: "#f97316", flexShrink: 0 }} />
                <p style={{ fontSize: 13, color: "#a8a29e" }}>
                    This is how your poll will appear to voters. Looks good? Hit <strong style={{ color: "#f0ece4" }}>Publish</strong> below.
                </p>
            </div>

            <PollPreviewCard form={form} />

            {/* Settings summary */}
            <div style={{
                background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 14, padding: 18,
            }}>
                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#3c3836", marginBottom: 14 }}>
                    Poll Settings Summary
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {[
                        { label: "Visibility", value: form.visibility === "private" ? "🔒 Private" : "🌐 Public" },
                        { label: "Choice type", value: form.allowMultiple ? "Multi-choice" : "Single choice" },
                        { label: "Anonymous", value: form.allowAnonymous ? "Yes" : "No" },
                        { label: "Show live results", value: form.showResults ? "Yes" : "No" },
                        { label: "Comments", value: form.allowComments ? "Enabled" : "Disabled" },
                        { label: "Closes", value: form.expiresAt || "No deadline" },
                    ].map(({ label, value }) => (
                        <div key={label} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <span style={{ fontSize: 11, color: "#3c3836" }}>{label}</span>
                            <span style={{ fontSize: 13, color: "#a8a29e", fontWeight: 500 }}>{value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ── MAIN PAGE ── */
const CreatePoll = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        title: "",
        description: "",
        options: [newOption(""), newOption("")],
        visibility: "public",
        allowMultiple: false,
        allowAnonymous: false,
        showResults: true,
        allowComments: false,
        expiresAt: "",
    });

    /* ── Validation ── */
    const validate = () => {
        const e = {};
        if (!form.title.trim()) e.title = "Poll question is required";
        const filled = form.options.filter(o => o.text.trim());
        if (filled.length < 2) e.options = "At least 2 options required";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleNext = () => {
        if (step === 1 && !validate()) return;
        setStep(s => Math.min(s + 1, 3));
    };

    const handleBack = () => setStep(s => Math.max(s - 1, 1));

    const handleSaveDraft = () => {
        console.log("Saved as draft:", form);
        navigate("/dashboard/polls");
    };

    const handlePublish = async () => {

        if (!validate()) {
            setStep(1);
            return;
        }

        try {
            setSubmitting(true);

            const payload = {
                title: form.title.trim(),

                description: form.description.trim(),

                visibility: form.visibility,

                isMultiChoice: form.isMultiChoice,

                allowAnonymous: form.allowAnonymous,

                showResults: form.showResults,

                allowComments: form.allowComments,

                closesAt: form.closesAt || null,

                options: form.options
                    .filter((o) => o.text.trim())
                    .map((o) => ({
                        text: o.text.trim(),
                    })),
            };

            console.log("FINAL PAYLOAD =", payload);

            const response = await pollService.createPoll(payload);

            console.log("POLL CREATED =", response);

            navigate("/dashboard/polls");

        } catch (err) {

            console.error("CREATE POLL ERROR =", err);

            console.log("ERROR RESPONSE =", err?.response?.data);

            alert(
                err?.response?.data?.message ||
                "Failed to create poll"
            );

        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500&display=swap');

        .create-page { max-width: 1100px; }

        /* step indicator */
        .step-indicator {
          display: flex; align-items: center; gap: 0; margin-bottom: 36px;
        }
        .step-node {
          display: flex; align-items: center; gap: 10;
          cursor: default;
        }
        .step-circle {
          width: 32px; height: 32px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700;
          transition: all 0.3s; flex-shrink: 0;
        }
        .step-circle.done {
          background: #ea580c; color: #fff;
          box-shadow: 0 0 0 4px rgba(234,88,12,0.15);
        }
        .step-circle.active {
          background: rgba(234,88,12,0.12);
          border: 2px solid #ea580c; color: #f97316;
          box-shadow: 0 0 0 4px rgba(234,88,12,0.08);
        }
        .step-circle.pending {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1); color: #3c3836;
        }
        .step-label-wrap { margin-left: 10px; }
        .step-name {
          font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700;
          color: #f0ece4; line-height: 1;
        }
        .step-name.pending { color: #3c3836; }
        .step-desc { font-size: 11px; color: #57534e; margin-top: 2px; }
        .step-connector {
          flex: 1; height: 1px; margin: 0 14px;
          background: rgba(255,255,255,0.07);
          position: relative; overflow: visible;
        }
        .step-connector.filled { background: rgba(234,88,12,0.3); }

        /* form card */
        .form-card {
          background: #0f0f0f;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          overflow: hidden;
        }
        .form-card-header {
          padding: 20px 28px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.01);
          display: flex; align-items: center; gap: 12;
        }
        .form-card-body { padding: 28px; }
        .form-card-footer {
          padding: 20px 28px;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex; align-items: center; justify-content: space-between; gap: 12;
          flex-wrap: wrap;
        }

        /* publish btn */
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner-sm {
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.25);
          border-top-color: #fff; border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @media (max-width: 768px) {
          .step-desc { display: none; }
          .form-card-body { padding: 20px; }
          .form-card-footer { padding: 16px 20px; }
        }
      `}</style>

            <div className="create-page">

                {/* ── Page header ── */}
                <div style={{ marginBottom: 32 }}>
                    <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#f97316", marginBottom: 6 }}>
                        Create Poll
                    </p>
                    <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "#f0ece4", letterSpacing: "-0.02em" }}>
                        Build a new poll
                    </h1>
                </div>

                {/* ── Step indicator ── */}
                <div className="step-indicator">
                    {STEPS.map((s, i) => {
                        const state = step > s.id ? "done" : step === s.id ? "active" : "pending";
                        return (
                            <React.Fragment key={s.id}>
                                <div className="step-node">
                                    <div className={`step-circle ${state}`}>
                                        {state === "done" ? <Check size={13} /> : s.id}
                                    </div>
                                    <div className="step-label-wrap">
                                        <div className={`step-name ${state === "pending" ? "pending" : ""}`}>{s.label}</div>
                                        <div className="step-desc">{s.desc}</div>
                                    </div>
                                </div>
                                {i < STEPS.length - 1 && (
                                    <div className={`step-connector ${step > s.id ? "filled" : ""}`} />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                {/* ── Two column layout on large screens ── */}
                <div style={{ display: "grid", gridTemplateColumns: step === 3 ? "1fr" : "1fr auto", gap: 24, alignItems: "start" }}>

                    {/* ── Form card ── */}
                    <div className="form-card">
                        {/* Card header */}
                        <div className="form-card-header">
                            <div style={{
                                width: 34, height: 34, borderRadius: 9,
                                background: "rgba(234,88,12,0.1)", border: "1px solid rgba(234,88,12,0.2)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                                <BarChart2 size={15} style={{ color: "#f97316" }} />
                            </div>
                            <div>
                                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "#f0ece4" }}>
                                    {STEPS[step - 1].label}
                                </div>
                                <div style={{ fontSize: 12, color: "#57534e" }}>{STEPS[step - 1].desc}</div>
                            </div>
                            <div style={{ marginLeft: "auto", fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 700, color: "#3c3836", letterSpacing: "0.06em" }}>
                                Step {step} of {STEPS.length}
                            </div>
                        </div>

                        {/* Card body */}
                        <div className="form-card-body">
                            {step === 1 && <StepQuestion form={form} setForm={setForm} errors={errors} />}
                            {step === 2 && <StepSettings form={form} setForm={setForm} />}
                            {step === 3 && <StepPreview form={form} />}
                        </div>

                        {/* Card footer */}
                        <div className="form-card-footer">
                            {/* Left: save draft */}
                            <button
                                onClick={handleSaveDraft}
                                style={{
                                    display: "flex", alignItems: "center", gap: 7,
                                    background: "transparent", border: "1px solid rgba(255,255,255,0.09)",
                                    borderRadius: 10, padding: "10px 18px", color: "#57534e",
                                    fontFamily: "'DM Sans', sans-serif", fontSize: 13, cursor: "pointer",
                                    transition: "all 0.2s",
                                }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.color = "#a8a29e"; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; e.currentTarget.style.color = "#57534e"; }}
                            >
                                <Save size={13} /> Save Draft
                            </button>

                            {/* Right: nav buttons */}
                            <div style={{ display: "flex", gap: 10 }}>
                                {step > 1 && (
                                    <button
                                        onClick={handleBack}
                                        style={{
                                            display: "flex", alignItems: "center", gap: 7,
                                            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.09)",
                                            borderRadius: 10, padding: "10px 18px", color: "#a8a29e",
                                            fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 600,
                                            cursor: "pointer", transition: "all 0.2s",
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                                    >
                                        <ChevronLeft size={14} /> Back
                                    </button>
                                )}

                                {step < 3 ? (
                                    <button
                                        onClick={handleNext}
                                        style={{
                                            display: "flex", alignItems: "center", gap: 7,
                                            background: "#ea580c", border: "none",
                                            borderRadius: 10, padding: "10px 22px", color: "#fff",
                                            fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700,
                                            cursor: "pointer", transition: "all 0.25s",
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.background = "#c2410c"; e.currentTarget.style.transform = "scale(1.03)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = "#ea580c"; e.currentTarget.style.transform = "scale(1)"; }}
                                    >
                                        Continue <ChevronRight size={14} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handlePublish}
                                        disabled={submitting}
                                        style={{
                                            display: "flex", alignItems: "center", gap: 8,
                                            background: submitting ? "#7c2d12" : "#ea580c", border: "none",
                                            borderRadius: 10, padding: "10px 24px", color: "#fff",
                                            fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700,
                                            cursor: submitting ? "not-allowed" : "pointer", transition: "all 0.25s",
                                        }}
                                        onMouseEnter={e => { if (!submitting) { e.currentTarget.style.background = "#c2410c"; e.currentTarget.style.transform = "scale(1.03)"; } }}
                                        onMouseLeave={e => { e.currentTarget.style.background = submitting ? "#7c2d12" : "#ea580c"; e.currentTarget.style.transform = "scale(1)"; }}
                                    >
                                        {submitting ? (
                                            <><div className="spinner-sm" /> Publishing…</>
                                        ) : (
                                            <><Send size={14} /> Publish Poll</>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ── Live preview panel (step 1 & 2 only) ── */}
                    {step < 3 && (
                        <div style={{ width: 320, flexShrink: 0 }}>
                            <div style={{ position: "sticky", top: 88 }}>
                                <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#3c3836", marginBottom: 12 }}>
                                    Live Preview
                                </p>
                                <PollPreviewCard form={form} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>)
};

export default CreatePoll;