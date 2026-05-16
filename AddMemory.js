// ════════════════════════════════════════
//  AddMemory.js — Memory entry form
//  Uses React useState for controlled inputs
// ════════════════════════════════════════

import React, { useState } from 'react';
import './AddMemory.css';

const MOODS = ['😊', '🙏', '😌', '😢', '😴', '🎉'];

function AddMemory({ onAdd }) {
  // ── Local form state ──────────────────
  const [type,  setType]  = useState('high');
  const [title, setTitle] = useState('');
  const [text,  setText]  = useState('');
  const [date,  setDate]  = useState(today());
  const [mood,  setMood]  = useState('');

  // ── Submit handler ────────────────────
  const handleSubmit = () => {
    if (!text.trim()) return;

    const newMemory = {
      id:    Date.now(),
      type,
      title: title.trim() || 'Untitled',
      text:  text.trim(),
      date,
      mood,
    };

    onAdd(newMemory);

    // Reset form
    setTitle('');
    setText('');
    setDate(today());
    setMood('');
  };

  return (
    <section className="add-memory-section" id="add-memory">
      <div className="section-head">
        <p className="section-label">✦ The Ritual</p>
        <h2 className="section-title">
          Drop a memory<br />
          <em>into the jar</em>
        </h2>
      </div>

      <div className="add-card">
        {/* Type toggle */}
        <div className="type-toggle">
          <button
            className={`toggle-btn ${type === 'high' ? 'active high' : ''}`}
            onClick={() => setType('high')}
          >
            <span className="dot amber"></span>
            High — Something Good
          </button>
          <button
            className={`toggle-btn ${type === 'low' ? 'active low' : ''}`}
            onClick={() => setType('low')}
          >
            <span className="dot blue"></span>
            Low — Something Hard
          </button>
        </div>

        {/* Title input */}
        <div className="form-group">
          <label className="form-label">Title / Tag</label>
          <input
            className="form-input"
            type="text"
            placeholder="e.g. Morning coffee, Late-night laugh…"
            maxLength={60}
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        {/* Memory textarea */}
        <div className="form-group">
          <label className="form-label">
            Your Memory
            <span className="char-count">{text.length} / 300</span>
          </label>
          <textarea
            className="form-input"
            rows={4}
            maxLength={300}
            placeholder="Write what happened, how it felt, why it mattered…"
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </div>

        {/* Date + Mood row */}
        <div className="date-mood-row">
          <div className="form-group">
            <label className="form-label">Date</label>
            <input
              className="form-input"
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Mood</label>
            <div className="mood-picker">
              {MOODS.map(emoji => (
                <span
                  key={emoji}
                  className={`mood-emoji ${mood === emoji ? 'selected' : ''}`}
                  onClick={() => setMood(mood === emoji ? '' : emoji)}
                  role="button"
                  aria-label={emoji}
                >
                  {emoji}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="submit-row">
          <span className="privacy-note">All memories live in your browser.</span>
          <button className="submit-btn" onClick={handleSubmit}>
            Seal it in ✦
          </button>
        </div>
      </div>
    </section>
  );
}

function today() {
  return new Date().toISOString().split('T')[0];
}

export default AddMemory;
