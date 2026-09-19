<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Жар Эквестрии — Adult Narrative Adventure</title>
<style>
  /* fonts: system fallback for artifact preview */
  :root {
    --bg: #0c0612;
    --panel: rgba(36, 20, 48, 0.82);
    --panel-solid: #1e1230;
    --glass: rgba(255,255,255,0.04);
    --stroke: rgba(199, 125, 255, 0.22);
    --stroke-hot: rgba(255, 107, 203, 0.35);
    --accent: #c77dff;
    --accent2: #ff6bcb;
    --accent3: #9b4dff;
    --text: #faf4ff;
    --muted: #a894b8;
    --good: #5dffa8;
    --bad: #ff6b8a;
    --warn: #ffd56b;
    --energy: #7ec8ff;
    --spark: #ffd56b;
    --rep: #d4a5ff;
    --radius: 16px;
    --shadow: 0 12px 40px rgba(0,0,0,0.45);
    --font: 'Outfit', system-ui, sans-serif;
    --font-display: 'Cormorant Garamond', Georgia, serif;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: var(--font);
    color: var(--text);
    min-height: 100vh;
    overflow-x: hidden;
    background:
      radial-gradient(ellipse 80% 50% at 10% -10%, rgba(155, 77, 255, 0.35), transparent 55%),
      radial-gradient(ellipse 60% 40% at 90% 10%, rgba(255, 107, 203, 0.18), transparent 50%),
      radial-gradient(ellipse 50% 40% at 50% 100%, rgba(80, 40, 120, 0.25), transparent 50%),
      linear-gradient(180deg, #110818 0%, #0c0612 40%, #140a1c 100%);
    background-attachment: fixed;
  }
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
    opacity: 0.5;
  }

  #app {
    position: relative;
    z-index: 1;
    max-width: 1000px;
    margin: 0 auto;
    padding: 16px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  /* ===== HEADER ===== */
  header {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    gap: 12px;
    flex-wrap: wrap;
    padding: 12px 16px;
    border-radius: var(--radius);
    background: linear-gradient(135deg, rgba(40, 22, 58, 0.9), rgba(24, 12, 36, 0.95));
    border: 1px solid var(--stroke);
    box-shadow: var(--shadow), inset 0 1px 0 rgba(255,255,255,0.06);
    backdrop-filter: blur(12px);
  }
  .res { display: flex; gap: 10px; flex-wrap: wrap; }
  .res-pill {
    cursor: help;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 7px 14px 7px 8px;
    min-width: 118px;
    border-radius: 999px;
    background: rgba(0,0,0,0.35);
    border: 1px solid rgba(255,255,255,0.08);
    transition: border-color 0.2s, transform 0.15s, box-shadow 0.2s;
  }
  .res-pill:hover {
    border-color: rgba(199,125,255,0.45);
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(155, 77, 255, 0.2);
  }
  .res-icon {
    width: 30px; height: 30px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.95rem;
    flex-shrink: 0;
  }
  .res-icon.energy { background: rgba(126,200,255,0.2); box-shadow: 0 0 12px rgba(126,200,255,0.25); }
  .res-icon.sparks { background: rgba(255,213,107,0.2); box-shadow: 0 0 12px rgba(255,213,107,0.25); }
  .res-icon.rep { background: rgba(199,125,255,0.2); box-shadow: 0 0 12px rgba(199,125,255,0.25); }
  .res-meta { display: flex; flex-direction: column; line-height: 1.15; }
  .res-meta .label {
    font-size: 0.65rem;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-weight: 500;
  }
  .res-meta .val { font-size: 1.08rem; font-weight: 700; letter-spacing: -0.02em; }
  .res-meta .val.energy { color: var(--energy); }
  .res-meta .val.sparks { color: var(--spark); }
  .res-meta .val.rep { color: var(--rep); }

  .time-loc {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    gap: 5px;
    text-align: right;
  }
  .time-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--accent2);
    background: linear-gradient(135deg, rgba(255,107,203,0.15), rgba(155,77,255,0.12));
    border: 1px solid rgba(255,107,203,0.35);
    box-shadow: 0 0 20px rgba(255,107,203,0.12);
  }
  .loc-line { font-size: 0.8rem; color: var(--muted); }

  /* ===== MAIN ===== */
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 20px 22px;
    border-radius: var(--radius);
    background: linear-gradient(165deg, rgba(36, 22, 52, 0.88) 0%, rgba(18, 10, 28, 0.94) 100%);
    border: 1px solid var(--stroke);
    box-shadow: var(--shadow), inset 0 1px 0 rgba(255,255,255,0.05);
    backdrop-filter: blur(16px);
  }

  .screen { display: none; flex-direction: column; gap: 14px; }
  .screen.active {
    display: flex;
    animation: rise 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }
  @keyframes rise {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: none; }
  }

  h1 {
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 2.75rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.15;
    background: linear-gradient(105deg, #ff8ad4 0%, #e070ff 40%, #a78bfa 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: 0 0 40px rgba(255, 107, 203, 0.3);
  }
  h2 {
    font-family: var(--font-display);
    font-size: 1.55rem;
    font-weight: 600;
    color: #ff9ad8;
    letter-spacing: -0.01em;
  }
  h3 {
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--accent);
  }
  p, .desc {
    line-height: 1.65;
    color: var(--text);
    font-size: 0.98rem;
  }
  .small { font-size: 0.84rem; color: var(--muted); line-height: 1.5; }

  /* ===== BUTTONS ===== */
  .choices { display: flex; flex-direction: column; gap: 9px; margin-top: 4px; }
  button {
    appearance: none;
    font-family: var(--font);
    background: linear-gradient(145deg, #3a2558 0%, #261538 100%);
    border: 1px solid rgba(199,125,255,0.32);
    color: var(--text);
    padding: 13px 16px;
    border-radius: 12px;
    cursor: pointer;
    font-size: 0.96rem;
    font-weight: 500;
    text-align: left;
    transition: transform 0.15s, box-shadow 0.2s, border-color 0.2s, background 0.2s;
    box-shadow: 0 2px 0 rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.15);
  }
  button:hover:not(:disabled) {
    background: linear-gradient(145deg, #4d3270 0%, #34204c 100%);
    border-color: rgba(199,125,255,0.65);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(155, 77, 255, 0.28);
  }
  button:active:not(:disabled) { transform: translateY(0); }
  button:disabled {
    opacity: 0.38;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  button.primary {
    background: linear-gradient(135deg, #f0a0ff 0%, #c44dff 45%, #8b3dff 100%);
    color: #1a0a24;
    font-weight: 700;
    text-align: center;
    border-color: transparent;
    box-shadow: 0 4px 24px rgba(155, 77, 255, 0.45), inset 0 1px 0 rgba(255,255,255,0.35);
  }
  button.primary:hover:not(:disabled) {
    background: linear-gradient(135deg, #ffb8ff 0%, #d060ff 45%, #9b50ff 100%);
    box-shadow: 0 8px 32px rgba(155, 77, 255, 0.55);
  }
  button.special {
    border-color: rgba(255,107,203,0.55);
    background: linear-gradient(145deg, #4a2048 0%, #2a1230 100%);
    box-shadow: 0 0 0 1px rgba(255,107,203,0.12), 0 2px 0 rgba(0,0,0,0.25);
  }
  button.special:hover:not(:disabled) {
    box-shadow: 0 0 24px rgba(255,107,203,0.35), 0 8px 20px rgba(0,0,0,0.25);
    border-color: var(--accent2);
  }
  button.danger { border-color: rgba(255,107,138,0.55); }
  button.ghost {
    background: transparent;
    border-color: rgba(255,255,255,0.12);
    text-align: center;
  }
  button.ghost:hover:not(:disabled) {
    background: rgba(255,255,255,0.05);
    border-color: rgba(255,255,255,0.22);
  }
  button.compact {
    padding: 9px 14px;
    font-size: 0.88rem;
    text-align: center;
  }
  .btn-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .btn-row button { flex: 1; min-width: 110px; text-align: center; }

  /* ===== TABS ===== */
  .tabs {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    padding: 5px;
    border-radius: 14px;
    background: rgba(0,0,0,0.35);
    border: 1px solid rgba(255,255,255,0.05);
  }
  .tab {
    padding: 9px 14px;
    border-radius: 10px;
    background: transparent;
    cursor: pointer;
    border: 1px solid transparent;
    color: var(--muted);
    font-size: 0.88rem;
    font-weight: 500;
    font-family: var(--font);
    transition: all 0.18s;
  }
  .tab:hover { color: var(--text); background: rgba(255,255,255,0.05); }
  .tab.active {
    color: var(--text);
    background: linear-gradient(135deg, #453068, #2e1c48);
    border-color: rgba(199,125,255,0.4);
    box-shadow: 0 2px 12px rgba(155,77,255,0.25);
  }

  /* ===== CARDS ===== */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 14px;
  }
  .char-card {
    background: linear-gradient(160deg, rgba(48, 28, 68, 0.7) 0%, rgba(22, 12, 34, 0.9) 100%);
    border: 1px solid rgba(199,125,255,0.18);
    border-radius: 16px;
    padding: 16px;
    transition: border-color 0.2s, box-shadow 0.25s, transform 0.2s;
  }
  .char-card:hover {
    border-color: rgba(199,125,255,0.5);
    box-shadow: 0 12px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(199,125,255,0.15);
    transform: translateY(-3px);
  }
  .char-card h3 { margin-bottom: 2px; }
  .bar-wrap {
    margin: 7px 0;
    font-size: 0.78rem;
    color: var(--muted);
  }
  .bar-wrap b { color: var(--text); font-weight: 600; }
  .bar {
    height: 8px;
    margin-top: 4px;
    border-radius: 6px;
    overflow: hidden;
    background: rgba(0,0,0,0.45);
    border: 1px solid rgba(255,255,255,0.04);
  }
  .bar-fill {
    height: 100%;
    border-radius: 5px;
    transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    box-shadow: 0 0 10px currentColor;
  }
  .aff { background: linear-gradient(90deg, #2ee89a, #7dffb3); color: #7dffb3; }
  .lust { background: linear-gradient(90deg, #ff3d9a, #ff8ad4); color: #ff6bcb; }
  .trust { background: linear-gradient(90deg, #3db8ff, #8ad4ff); color: #6bcbff; }

  /* ===== LOG ===== */
  .log {
    max-height: 280px;
    overflow-y: auto;
    padding: 14px 16px;
    border-radius: 14px;
    background: rgba(0,0,0,0.4);
    border: 1px solid rgba(255,255,255,0.06);
    font-size: 0.95rem;
    line-height: 1.55;
  }
  .log p { margin-bottom: 8px; }
  .log .sys { color: var(--muted); font-style: italic; font-size: 0.9rem; }
  .log .good { color: var(--good); }
  .log .bad { color: var(--bad); }
  .log::-webkit-scrollbar { width: 6px; }
  .log::-webkit-scrollbar-thumb {
    background: rgba(199,125,255,0.35);
    border-radius: 3px;
  }

  /* ===== SCENE ===== */
  .scene-ui {
    text-align: center;
    padding: 20px 18px;
    border-radius: 18px;
    background:
      radial-gradient(ellipse at 50% 0%, rgba(255,107,203,0.12), transparent 55%),
      rgba(0,0,0,0.4);
    border: 1px solid var(--stroke-hot);
    box-shadow: inset 0 0 40px rgba(255,107,203,0.06);
  }
  .rhythm-zone {
    position: relative;
    height: 52px;
    margin: 16px 0;
    border-radius: 12px;
    overflow: hidden;
    background: rgba(0,0,0,0.5);
    border: 1px solid rgba(255,255,255,0.06);
  }
  .green-zone {
    position: absolute;
    left: 35%; width: 30%; height: 100%;
    background: linear-gradient(180deg, rgba(93,255,168,0.15), rgba(93,255,168,0.35));
    border-left: 2px solid var(--good);
    border-right: 2px solid var(--good);
    box-shadow: 0 0 20px rgba(93,255,168,0.2);
  }
  .cursor {
    position: absolute;
    top: 0; width: 9px; height: 100%;
    border-radius: 3px;
    background: linear-gradient(180deg, #ff9ad8, #ff4da6);
    transform: translateX(-50%);
    box-shadow: 0 0 14px rgba(255,107,203,0.8), 0 0 28px rgba(255,77,154,0.4);
  }
  .partner-bar {
    height: 14px;
    margin: 10px 0;
    border-radius: 10px;
    overflow: hidden;
    background: rgba(0,0,0,0.5);
    border: 1px solid rgba(255,255,255,0.06);
  }
  .partner-fill {
    height: 100%;
    width: 0%;
    border-radius: 9px;
    background: linear-gradient(90deg, #ff3d9a, #c77dff, #ff8ad4);
    background-size: 200% 100%;
    animation: shimmer 2.5s linear infinite;
    transition: width 0.12s;
    box-shadow: 0 0 12px rgba(255,107,203,0.5);
  }
  @keyframes shimmer {
    0% { background-position: 100% 0; }
    100% { background-position: -100% 0; }
  }
  .hint {
    color: var(--warn);
    font-style: italic;
    min-height: 1.5em;
    font-size: 1.02rem;
    text-shadow: 0 0 20px rgba(255,213,107,0.3);
  }
  .pattern-keys {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 14px 0;
    flex-wrap: wrap;
  }
  .key {
    width: 50px; height: 50px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.15rem; font-weight: 700;
    background: rgba(0,0,0,0.4);
    border: 2px solid var(--accent);
    transition: transform 0.12s, background 0.12s;
  }
  .key.ok {
    border-color: var(--good);
    background: rgba(93,255,168,0.25);
    transform: scale(1.08);
    box-shadow: 0 0 16px rgba(93,255,168,0.35);
  }
  .key.fail {
    border-color: var(--bad);
    background: rgba(255,107,138,0.25);
  }

  input[type="range"] {
    width: 100%;
    height: 6px;
    accent-color: var(--accent2);
    cursor: pointer;
  }

  .story-box {
    padding: 12px 16px;
    border-radius: 0 12px 12px 0;
    background: rgba(255,107,203,0.08);
    border-left: 3px solid var(--accent2);
    font-size: 0.92rem;
    line-height: 1.5;
  }
  .flag-badge {
    display: inline-block;
    margin: 3px;
    padding: 4px 11px;
    border-radius: 999px;
    font-size: 0.76rem;
    background: rgba(155,77,255,0.22);
    border: 1px solid rgba(199,125,255,0.3);
  }

  /* ===== SAVE / SELF ===== */
  .save-panel {
    padding: 18px;
    border-radius: 16px;
    background: rgba(0,0,0,0.28);
    border: 1px solid rgba(199,125,255,0.18);
  }
  .save-panel h3 { margin-bottom: 8px; }
  .save-panel .btn-row { margin-top: 12px; }
  .save-status {
    display: none;
    margin-top: 12px;
    padding: 10px 14px;
    border-radius: 10px;
    font-size: 0.9rem;
    background: rgba(93,255,168,0.1);
    border: 1px solid rgba(93,255,168,0.28);
    color: var(--good);
  }
  .save-status.show { display: block; }
  .save-status.err {
    background: rgba(255,107,138,0.1);
    border-color: rgba(255,107,138,0.3);
    color: var(--bad);
  }

  /* ===== MODAL / TOAST ===== */
  .modal {
    position: fixed; inset: 0;
    z-index: 100;
    display: none;
    align-items: center;
    justify-content: center;
    padding: 16px;
    background: rgba(6, 2, 12, 0.82);
    backdrop-filter: blur(8px);
  }
  .modal.show { display: flex; animation: rise 0.25s ease; }
  .modal-box {
    width: 100%;
    max-width: 520px;
    max-height: 85vh;
    overflow-y: auto;
    padding: 24px;
    border-radius: 20px;
    background: linear-gradient(165deg, #2e1c44, #1a1028);
    border: 1px solid rgba(199,125,255,0.35);
    box-shadow: 0 24px 60px rgba(0,0,0,0.55), 0 0 40px rgba(155,77,255,0.12);
  }
  #toast {
    position: fixed;
    bottom: 28px; left: 50%;
    z-index: 200;
    max-width: 90%;
    padding: 12px 22px;
    border-radius: 14px;
    text-align: center;
    font-size: 0.95rem;
    font-weight: 500;
    pointer-events: none;
    opacity: 0;
    transform: translateX(-50%) translateY(24px);
    transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.3s;
    background: linear-gradient(135deg, #322048, #1e1230);
    border: 1px solid var(--accent);
    box-shadow: 0 12px 32px rgba(0,0,0,0.45);
  }
  #toast.show {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  #toast.good { border-color: var(--good); }
  #toast.bad { border-color: var(--bad); }

  .prep-item {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 6px 0;
    padding: 11px 13px;
    border-radius: 12px;
    cursor: pointer;
    background: rgba(0,0,0,0.28);
    border: 1px solid transparent;
    transition: border-color 0.15s, background 0.15s;
  }
  .prep-item:hover, .prep-item.selected {
    border-color: var(--accent2);
    background: rgba(255,107,203,0.08);
  }
  .prep-item input { accent-color: var(--accent2); }

  /* ===== PORTRAITS ===== */
  .portrait {
    width: 72px; height: 72px;
    border-radius: 50%;
    flex-shrink: 0;
    overflow: hidden;
    border: 3px solid rgba(255,255,255,0.12);
    box-shadow: 0 6px 20px rgba(0,0,0,0.4);
    transition: box-shadow 0.25s, border-color 0.25s;
  }
  .portrait svg { width: 100%; height: 100%; display: block; }
  .portrait.sm { width: 48px; height: 48px; border-width: 2px; }
  .portrait.lg { width: 100px; height: 100px; border-width: 3px; }
  .portrait.twilight { border-color: #9b59d0; }
  .portrait.fluttershy { border-color: #f5c542; }
  .portrait.rainbow { border-color: #3da9fc; }
  .portrait.rarity { border-color: #e8d5ff; }
  .portrait.trixie { border-color: #7ec8ff; }
  .portrait.applejack { border-color: #fcb86a; }
  .portrait.pinkie { border-color: #ff4da6; }
  .portrait.derpy { border-color: #a8c8e8; }
  .portrait.warm { box-shadow: 0 0 16px rgba(255, 107, 157, 0.4); }
  .portrait.heat {
    border-color: #ff6bcb !important;
    box-shadow: 0 0 22px rgba(255, 107, 203, 0.6);
  }
  .char-card-head { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
  .char-card-head h3 { margin: 0; }
  .dlg-head, .scene-head {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .scene-head { justify-content: center; margin-bottom: 6px; }
  .portrait-pulse { animation: portraitPulse 2.4s ease-in-out infinite; }
  @keyframes portraitPulse {
    0%, 100% { box-shadow: 0 6px 20px rgba(0,0,0,0.4); }
    50% { box-shadow: 0 6px 28px rgba(255, 107, 203, 0.55); }
  }

  /* Title screen flourish */
  #screen-title .desc {
    max-width: 36em;
    color: #e8dcf0;
  }
  #screen-title .choices { max-width: 420px; }

  @media (max-width: 560px) {
    #app { padding: 10px; }
    main { padding: 14px; }
    .res-pill { min-width: auto; }
    h1 { font-size: 1.75rem; }
  }

  /* ===== NOTEBOOK & DOSSIER ===== */
  .notes-header {
    margin-bottom: 14px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(199,125,255,0.2);
  }
  .notes-header h3 {
    font-family: var(--font-display);
    font-size: 1.4rem;
    color: #ff9ad8;
  }
  .notes-empty {
    text-align: center;
    padding: 36px 20px;
  }
  .notes-empty-icon { font-size: 2.5rem; margin-bottom: 8px; opacity: 0.85; }
  .notes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 12px;
  }
  .notes-card {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 14px;
    text-align: left;
    border-radius: 16px;
    background: linear-gradient(155deg, rgba(52, 30, 72, 0.85), rgba(20, 10, 32, 0.95));
    border: 1px solid rgba(199,125,255,0.22);
    box-shadow: 0 6px 20px rgba(0,0,0,0.25);
    cursor: pointer;
    transition: transform 0.18s, border-color 0.18s, box-shadow 0.2s;
  }
  .notes-card:hover {
    transform: translateY(-3px);
    border-color: rgba(255,107,203,0.5);
    box-shadow: 0 12px 28px rgba(155,77,255,0.25);
  }
  .notes-card-top {
    display: flex;
    gap: 12px;
    align-items: center;
  }
  .notes-card-name {
    font-weight: 600;
    font-size: 1.05rem;
    color: var(--text);
  }
  .notes-card-sub {
    font-size: 0.78rem;
    color: var(--muted);
    margin-top: 2px;
  }
  .notes-card-badges {
    display: flex;
    gap: 6px;
    margin-top: 6px;
    flex-wrap: wrap;
  }
  .nb {
    font-size: 0.72rem;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 999px;
    background: rgba(199,125,255,0.2);
    border: 1px solid rgba(199,125,255,0.3);
    color: #e0c4ff;
  }
  .nb.hot {
    background: rgba(255,107,203,0.2);
    border-color: rgba(255,107,203,0.4);
    color: #ffb0dc;
  }
  .notes-mini-bars {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .notes-mini-bars .bar { height: 5px; }

  .modal-box.dossier-modal {
    max-width: 560px;
    padding: 0;
    overflow: hidden;
    border-color: rgba(255,107,203,0.35);
    background: linear-gradient(165deg, #2a1838 0%, #140c20 100%);
  }
  .modal-box.dossier-modal #modalTitle { display: none; }
  .modal-box.dossier-modal #modalBody { padding: 0; }
  .modal-box.dossier-modal > button {
    margin: 0 16px 16px;
    width: calc(100% - 32px);
  }

  .dossier { padding: 0 0 8px; }
  .dossier-hero {
    display: flex;
    gap: 18px;
    align-items: center;
    padding: 22px 22px 18px;
    background:
      radial-gradient(ellipse at 0% 0%, rgba(255,107,203,0.18), transparent 55%),
      radial-gradient(ellipse at 100% 50%, rgba(155,77,255,0.12), transparent 50%),
      linear-gradient(180deg, rgba(50,28,70,0.6), transparent);
    border-bottom: 1px solid rgba(199,125,255,0.18);
  }
  .dossier-portrait .portrait {
    width: 96px;
    height: 96px;
    border-width: 3px;
    box-shadow: 0 8px 28px rgba(0,0,0,0.45), 0 0 24px rgba(255,107,203,0.2);
  }
  .dossier-label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--accent2);
    font-weight: 600;
    margin-bottom: 4px;
  }
  .dossier-name {
    font-family: var(--font-display);
    font-size: 1.65rem;
    font-weight: 700;
    color: #fff;
    line-height: 1.15;
    margin: 0 0 4px;
    background: none;
    -webkit-text-fill-color: unset;
  }
  .dossier-meta {
    font-size: 0.88rem;
    color: #d4c0e8;
    margin: 0;
  }
  .dossier-where {
    font-size: 0.8rem;
    color: var(--muted);
    margin: 4px 0 0;
  }
  .dossier-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 10px;
  }
  .dossier-tag {
    font-size: 0.75rem;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 999px;
    background: rgba(0,0,0,0.35);
    border: 1px solid rgba(255,255,255,0.1);
    color: #d8cce8;
  }
  .dossier-tag.accent {
    border-color: rgba(199,125,255,0.45);
    color: #e0c4ff;
    background: rgba(155,77,255,0.2);
  }
  .dossier-tag.hot {
    border-color: rgba(255,107,203,0.5);
    color: #ffb0dc;
    background: rgba(255,107,203,0.18);
  }

  .dossier-stats {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 16px 22px;
  }
  .dossier-stat-top {
    display: flex;
    justify-content: space-between;
    font-size: 0.82rem;
    color: var(--muted);
    margin-bottom: 4px;
  }
  .dossier-stat-top b { color: var(--text); font-size: 0.95rem; }

  .dossier-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    padding: 0 22px 16px;
  }
  .dossier-chip {
    text-align: center;
    padding: 10px 6px;
    border-radius: 12px;
    background: rgba(0,0,0,0.35);
    border: 1px solid rgba(255,255,255,0.06);
  }
  .dossier-chip-label {
    display: block;
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--muted);
    margin-bottom: 4px;
  }
  .dossier-chip-val {
    font-weight: 700;
    font-size: 0.95rem;
    color: var(--accent);
  }

  .dossier-section {
    margin: 0 22px 14px;
    padding: 14px 16px;
    border-radius: 14px;
    background: rgba(0,0,0,0.28);
    border: 1px solid rgba(199,125,255,0.12);
  }
  .dossier-section.notes {
    border-color: rgba(255,107,203,0.2);
    background: rgba(255,107,203,0.06);
  }
  .dossier-section-title {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--accent2);
    font-weight: 600;
    margin-bottom: 8px;
  }
  .dossier-text {
    font-size: 0.95rem;
    line-height: 1.6;
    color: #f0e6f8;
  }

  @media (max-width: 520px) {
    .dossier-hero { flex-direction: column; text-align: center; }
    .dossier-tags { justify-content: center; }
    .dossier-row { grid-template-columns: 1fr; }
  }


  /* ===== SELF PANEL ===== */
  .self-panel {
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid rgba(199,125,255,0.22);
    background: linear-gradient(165deg, rgba(40, 24, 58, 0.9), rgba(16, 8, 28, 0.95));
    box-shadow: 0 12px 36px rgba(0,0,0,0.35);
  }
  .self-hero {
    display: flex;
    gap: 16px;
    align-items: center;
    padding: 20px 20px 16px;
    background:
      radial-gradient(ellipse at 0% 0%, rgba(126,200,255,0.15), transparent 50%),
      radial-gradient(ellipse at 100% 0%, rgba(155,77,255,0.2), transparent 55%),
      linear-gradient(180deg, rgba(50,32,72,0.5), transparent);
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .self-avatar {
    width: 72px; height: 72px;
    border-radius: 50%;
    flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.8rem;
    background: linear-gradient(145deg, #5a3a88, #2a1848);
    border: 3px solid rgba(199,125,255,0.45);
    box-shadow: 0 0 24px rgba(155,77,255,0.35), inset 0 0 20px rgba(255,255,255,0.06);
  }
  .self-label {
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--energy);
    font-weight: 600;
  }
  .self-name {
    font-family: var(--font-display);
    font-size: 1.7rem;
    margin: 2px 0 4px;
    color: #fff;
    background: none;
    -webkit-text-fill-color: unset;
  }
  .self-sub { font-size: 0.84rem; color: var(--muted); margin: 0; }
  .self-tags {
    display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px;
  }
  .self-tag {
    font-size: 0.74rem; font-weight: 600;
    padding: 3px 10px; border-radius: 999px;
    background: rgba(0,0,0,0.35);
    border: 1px solid rgba(255,255,255,0.1);
    color: #d8cce8;
  }
  .self-tag.hot {
    border-color: rgba(255,107,203,0.45);
    background: rgba(255,107,203,0.15);
    color: #ffb0dc;
  }

  .self-meters { padding: 16px 20px 8px; display: flex; flex-direction: column; gap: 14px; }
  .self-meter-top {
    display: flex; justify-content: space-between; align-items: baseline;
    font-size: 0.85rem; color: var(--muted); margin-bottom: 6px;
  }
  .self-meter-top b { font-size: 1.15rem; color: var(--text); }
  .self-meter-top b.heat-spok { color: var(--good); }
  .self-meter-top b.heat-mid { color: var(--warn); }
  .self-meter-top b.heat-high { color: var(--accent2); }
  .self-meter-top b.heat-crit { color: var(--bad); text-shadow: 0 0 12px rgba(255,107,138,0.5); }
  .bar.tall { height: 11px; border-radius: 8px; }
  .self-hint { font-size: 0.8rem; color: var(--muted); margin-top: 6px; line-height: 1.4; }

  .self-chips {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    padding: 8px 20px 16px;
  }
  .self-chip {
    padding: 12px 10px;
    border-radius: 14px;
    background: rgba(0,0,0,0.32);
    border: 1px solid rgba(255,255,255,0.06);
    text-align: center;
  }
  .self-chip-l {
    display: block;
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--muted);
    margin-bottom: 4px;
  }
  .self-chip-v {
    display: block;
    font-weight: 700;
    font-size: 1.2rem;
    margin-bottom: 8px;
    color: var(--text);
  }
  .self-chip .bar { height: 5px; }

  .self-path {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
    padding: 0 20px 16px;
  }
  .self-path-item {
    text-align: center;
    padding: 10px 4px;
    border-radius: 12px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.05);
  }
  .self-path-item span {
    display: block;
    font-size: 0.65rem;
    color: var(--muted);
    margin-bottom: 4px;
  }
  .self-path-item b { font-size: 1.05rem; color: var(--accent); }
  .self-path-item.soft b { color: var(--good); }
  .self-path-item.dark b { color: var(--bad); }

  .self-action {    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
    padding: 16px 20px;
    border-top: 1px solid rgba(255,107,203,0.2);
    background: rgba(255,107,203,0.06);
  }
  .self-action-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .self-action-text b { color: #ffb0dc; }
  .self-action button {
    min-width: 140px;
    text-align: center;
    padding: 12px 18px;
  }

  @media (max-width: 560px) {
    .self-hero { flex-direction: column; text-align: center; }
    .self-tags { justify-content: center; }
    .self-chips, .self-path { grid-template-columns: 1fr 1fr; }
    .self-action { flex-direction: column; align-items: stretch; }
  }


  /* ===== CHARACTER CREATE ===== */
  .create-wrap { max-width: 560px; margin: 0 auto; }
  .create-label {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--accent2);
    font-weight: 600;
    margin-bottom: 6px;
  }
  .create-desc { margin: 8px 0 20px; color: #e0d4ec; }
  .create-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 20px;
  }
  .create-field span {
    font-size: 0.8rem;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .create-field input {
    font-family: var(--font);
    font-size: 1.15rem;
    font-weight: 600;
    padding: 14px 16px;
    border-radius: 12px;
    border: 1px solid rgba(199,125,255,0.35);
    background: rgba(0,0,0,0.4);
    color: var(--text);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .create-field input:focus {
    border-color: var(--accent2);
    box-shadow: 0 0 0 3px rgba(255,107,203,0.15);
  }
  .create-field input::placeholder { color: #6a5a7a; font-weight: 500; }
  .create-species-label {
    font-size: 0.8rem;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 10px;
  }
  .create-species {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    margin-bottom: 22px;
  }
  @media (min-width: 540px) {
    .create-species { grid-template-columns: repeat(3, 1fr); }
  }
  .species-card {
    text-align: center;
    padding: 16px 12px;
    border-radius: 16px;
    background: rgba(0,0,0,0.35);
    border: 2px solid rgba(255,255,255,0.08);
    cursor: pointer;
    transition: border-color 0.2s, transform 0.15s, box-shadow 0.2s, background 0.2s;
  }
  .species-card:hover {
    border-color: rgba(199,125,255,0.45);
    transform: translateY(-2px);
  }
  .species-card.active {
    border-color: var(--accent2);
    background: linear-gradient(160deg, rgba(255,107,203,0.15), rgba(155,77,255,0.12));
    box-shadow: 0 0 24px rgba(255,107,203,0.2);
  }
  .species-icon { font-size: 1.8rem; margin-bottom: 6px; }
  .species-name {
    font-weight: 700;
    font-size: 1rem;
    margin-bottom: 6px;
    color: #fff;
  }
  .species-desc {
    font-size: 0.78rem;
    color: var(--muted);
    line-height: 1.4;
  }
  .create-actions { margin-top: 8px; }
  .create-actions .primary { flex: 2; }

</style>
</head>
<body>
<div id="app">
  <header>
    <div class="res">
      <div class="res-pill" title="Энергия — тратится на действия, переходы и сцены. Восстанавливается отдыхом.">
        <div class="res-icon energy">⚡</div>
        <div class="res-meta"><span class="label">Энергия</span><span class="val energy" id="energy">100</span></div>
      </div>
      <div class="res-pill" title="Искры — редкая магия. Находятся при исследовании.">
        <div class="res-icon sparks">✨</div>
        <div class="res-meta"><span class="label">Искры</span><span class="val sparks" id="sparks">5</span></div>
      </div>
      <div class="res-pill" title="Репутация — как тебя видят в Эквестрии. Растёт от помощи.">
        <div class="res-icon rep">👑</div>
        <div class="res-meta"><span class="label">Репутация</span><span class="val rep" id="rep">10</span></div>
      </div>
</div>
    <div class="time-loc">
      <div class="time-badge"><span id="dayNight">День</span></div>
      <div class="loc-line"><span id="location">Понивилль</span> · день <span id="dayNum">1</span></div>
    </div>
  </header>

  <main>
    <!-- TITLE -->
    <div id="screen-title" class="screen active">
      <h1>Жар Эквестрии</h1>
      <p class="desc">
        Магия дружбы сбоит. Пони охватил «жар» — голод близости, который трудно игнорировать.<br>
        Ты — чужак. Разберись, что происходит, сблизься с кем-то — и реши, чем всё кончится.
      </p>
      <div class="choices">
        <button type="button" class="primary" id="btnStart" onclick="try{showCreate()}catch(e){console.error(e);alert(e.message)}">Начать путь</button>
        <button onclick="showLoad()">Загрузить сохранение</button>
        <button onclick="showHelp()">Как играть</button>
        <button onclick="showStoryStatus()" id="btnStory" style="display:none">Статус сюжета</button>
      </div>
    </div>

    <!-- CREATE -->
    <div id="screen-create" class="screen">
      <div class="create-wrap">
        <div class="create-label">Новый странник</div>
        <h1>Кто ты</h1>
        <p class="desc create-desc">Имя и природа. От вида зависит, как тебя встречают — и чем ты отвечаешь жару.</p>
        <label class="create-field">
          <span>Имя</span>
          <input type="text" id="createName" maxlength="20" placeholder="Странник" autocomplete="off" />
        </label>
        <div class="create-species-label">Вид</div>
        <div class="create-species" id="createSpecies">
          <button type="button" class="species-card active" data-species="earth" onclick="pickSpecies('earth')">
            <div class="species-icon">🐴</div>
            <div class="species-name">Земнопони</div>
            <div class="species-desc">Сила, упрямство, связь с землёй. Контроль чуть выше.</div>
          </button>
          <button type="button" class="species-card" data-species="pegasus" onclick="pickSpecies('pegasus')">
            <div class="species-icon">🪽</div>
            <div class="species-name">Пегас</div>
            <div class="species-desc">Скорость, небо, импульс. Фокус на реакцию.</div>
          </button>
          <button type="button" class="species-card" data-species="unicorn" onclick="pickSpecies('unicorn')">
            <div class="species-icon">🦄</div>
            <div class="species-name">Единорог</div>
            <div class="species-desc">Магия, анализ, воля. Лучше держит свой жар.</div>
          </button>
        </div>
        <div class="btn-row create-actions">
          <button class="ghost" onclick="showScreen('screen-title')">Назад</button>
          <button class="primary" onclick="confirmCreate()">В Эквестрию</button>
        </div>
      </div>
    </div>

    <!-- PROLOGUE -->
    <div id="screen-prologue" class="screen">
      <h2>Пролог</h2>
      <div id="prolText" class="log"></div>
      <div class="choices" id="prolChoices"></div>
    </div>

    <!-- HUB -->
    <div id="screen-hub" class="screen">
      <h2 id="hubTitle">Понивилль — День</h2>
      <div id="hubDesc" class="desc"></div>
      <div id="hubStoryHint" class="story-box" style="display:none"></div>
      <div class="choices" id="hubChoices"></div>
      <div class="tabs">
        <div class="tab active" data-tab="loc" onclick="switchHubTab('loc')">Локации</div>
        <div class="tab" data-tab="chars" onclick="switchHubTab('chars')">Персонажи</div>
        <div class="tab" data-tab="inv" onclick="switchHubTab('inv')">Инвентарь</div>
        <div class="tab" data-tab="story" onclick="switchHubTab('story')">Сюжет</div>
        <div class="tab" data-tab="notes" onclick="switchHubTab('notes')">Блокнот</div>
        <div class="tab" data-tab="self" onclick="switchHubTab('self')">Я</div>
        <div class="tab" data-tab="save" onclick="switchHubTab('save')">Сохранения</div>
      </div>
      <div id="hubContent"></div>
    </div>

    <!-- DIALOGUE -->
    <div id="screen-dialogue" class="screen">
      <h2 id="dlgName"></h2>
      <div id="dlgText" class="log"></div>
      <div class="choices" id="dlgChoices"></div>
      <button class="ghost compact" onclick="endDialogue()" style="margin-top:8px">Завершить разговор</button>
    </div>

    <!-- INTIMATE -->
    <div id="screen-scene" class="screen">
      <h2 id="sceneTitle">Близость</h2>
      <div id="sceneDesc" class="desc"></div>
      <div class="scene-ui">
        <div>Удовольствие партнёра</div>
        <div class="partner-bar"><div class="partner-fill" id="partnerFill"></div></div>
        <div class="hint" id="sceneHint">Следи за зелёной зоной и сигналами</div>
        <div class="rhythm-zone" id="rhythmZone">
          <div class="green-zone"></div>
          <div class="cursor" id="rhythmCursor" style="left:10%"></div>
        </div>
        <div class="pattern-keys" id="patternKeys" style="display:none"></div>
        <p class="small">Удерживай ритм в зелёной зоне. Стрелки/WASD — паттерны. Пробел — импульс. Меняй режим под сигналы.</p>
        <div style="margin-top:8px">
          <label>Сила / ритм: <span id="forceVal">50</span>%</label>
          <input type="range" id="forceSlider" min="0" max="100" value="50">
        </div>
        <div style="display:flex;gap:8px;justify-content:center;margin-top:12px;flex-wrap:wrap">
          <button onclick="sceneAction('soft')">Мягче</button>
          <button onclick="sceneAction('hard')">Сильнее</button>
          <button onclick="sceneAction('change')">Сменить позу</button>
          <button onclick="sceneAction('finish')" id="btnFinish" disabled>Завершить</button>
        </div>
      </div>
      <div class="log" id="sceneLog" style="max-height:110px"></div>
    </div>

    <!-- SOLO QTE -->
    <div id="screen-solo" class="screen">
      <h2>Разрядка</h2>
      <div class="desc" id="soloDesc">Жар требует выхода. Попади в ритм — или потеряешь контроль.</div>
      <div class="scene-ui">
        <div>Сброс напряжения</div>
        <div class="partner-bar"><div class="partner-fill" id="soloFill"></div></div>
        <div class="hint" id="soloHint">Жми подсвеченную клавишу вовремя</div>
        <div class="pattern-keys" id="soloKeys"></div>
        <p class="small">A · S · D · F или стрелки. Серия попаданий сбрасывает жар.</p>
        <div class="btn-row" style="margin-top:12px">
          <button class="ghost compact" onclick="abortSolo()">Прервать (−энергия)</button>
        </div>
      </div>
      <div class="log" id="soloLog" style="max-height:100px"></div>
    </div>

    <!-- RESULT -->
    <div id="screen-result" class="screen">
      <h2 id="resultTitle"></h2>
      <div id="resultText" class="desc"></div>
      <button class="primary" onclick="returnToHub()">Продолжить</button>
    </div>
  </main>

</div>

<div id="modal" class="modal">
  <div class="modal-box">
    <h3 id="modalTitle"></h3>
    <div id="modalBody"></div>
    <button class="primary" style="margin-top:12px;width:100%" onclick="closeModal()">Закрыть</button>
  </div>
</div>
<input type="file" id="importFile" accept=".json,application/json" style="display:none" onchange="importSaveFile(event)">
<div id="toast"></div>





<script>
/* ===== dossiers-data.js ===== */
/**
 * Досье персонажей — блокнот игрока.
 * Правь тексты здесь, не в game.js.
 */

const DOSSIERS = {
  twilight: {
    fullName: 'Твайлайт Спаркл',
    species: 'Единорог (аликорн по статусу)',
    role: 'Библиотекарь, исследователь жара',
    where: 'Понивилль, библиотека; ночью — Кантерлот',
    nature: 'Считает, контролирует, боится хаоса. Если доверится — сама попросит «проверить гипотезу» на себе.',
    notes: 'Не любит пустые комплименты. Любит, когда приносишь факты. Рог выдаёт волнение раньше, чем морда.',
  },
  fluttershy: {
    fullName: 'Флаттершай',
    species: 'Пегаска',
    role: 'Уход за зверями',
    where: 'Понивилль, опушка',
    nature: 'Тихая, пока не задет кто-то её. Тогда — сталь. В близости сначала осторожна, потом сама просит не жалеть.',
    notes: 'Громкий тон отпугивает. Молчание рядом работает лучше тысячи слов.',
  },
  rainbow: {
    fullName: 'Рэйнбоу Дэш',
    species: 'Пегаска',
    role: 'Погода, скорость, вызов',
    where: 'Эверфри / небо над Понивиллем',
    nature: 'Не терпит слабаков и тянучки. Близость для неё — ещё один вид гонки. Может вести сама, если позволить.',
    notes: 'Уважает тех, кто не сбавляет. Лесть без дела — мимо.',
  },
  rarity: {
    fullName: 'Рэрити',
    species: 'Единорог',
    role: 'Ателье, вкус, связи в Кантерлоте',
    where: 'Кантерлот',
    nature: 'Снаружи — бархат и яд. Внутри — хочет, чтобы с ней были красиво и серьёзно. Грубость без согласия — конец.',
    notes: 'Комплимент по делу открывает дверь. Пустая лесть — закрывает.',
  },
  trixie: {
    fullName: 'Трикси Луламун',
    species: 'Единорог',
    role: 'Бродячий шоу',
    where: 'Кантерлот (фургон)',
    nature: 'Маска «Великой и Могучей» почти не снимается. Под ней — обычная потребность быть увиденной по-настоящему.',
    notes: 'Хвали номер — клюёт. Сравни с Твайлайт — заводится. Спроси без маски — редкий тихий ответ.',
  },
  applejack: {
    fullName: 'Эпплджек',
    species: 'Земнопони',
    role: 'Ферма, яблоки, слово',
    where: 'Понивилль / окрестности',
    nature: 'Прямо в лоб. Не играет. Если сказала «да» — значит да. В постели без театра.',
    notes: 'Помощь на ферме ценит выше цветов. Ложь чует сразу.',
  },
  pinkie: {
    fullName: 'Пинки Пай',
    species: 'Земнопони',
    role: 'Вечеринки, шум, внезапная глубина',
    where: 'Понивилль',
    nature: 'Кажется, что только конфетти. Иногда на секунду становится очень тихой — и говорит то, что другие прячут.',
    notes: 'Не игнорируй приглашения. Одиночество у неё есть, просто замаскировано.',
  },
  derpy: {
    fullName: 'Дерпи / Дитзи',
    species: 'Пегаска',
    role: 'Почта',
    where: 'Понивилль',
    nature: 'Путает адреса, не путает тепло. Не просит жалости. Радуется, когда с ней без насмешки.',
    notes: 'Сказать «милая» без издёвки — сильно. Помочь с сумкой — ещё сильнее.',
  },
  // Бордель
  minty: {
    fullName: 'Минти',
    species: 'Пегаска',
    role: 'Алый Фонарь',
    where: 'Бордель',
    nature: 'Скромная с порога, игривая если не давить. Крылья дрожат от смущения, не от страха.',
    notes: 'Платная ночь. Не путать с отношениями в городе — если только сама не попросит иначе.',
  },
  razor: {
    fullName: 'Рэйзор',
    species: 'Единорог',
    role: 'Алый Фонарь',
    where: 'Бордель',
    nature: 'Пацанка. Ведёт. Грива фиолет с зелёным — её марка. Не любит, когда спорят без причин.',
    notes: 'Её правила в комнате. Срыв ритма — она это замечает.',
  },
  nocturne: {
    fullName: 'Ноктюрн',
    species: 'Единорог',
    role: 'Алый Фонарь',
    where: 'Бордель',
    nature: 'Мало слов. Чёрный ошейник — выбор, не поза. После — часто просто лежит рядом.',
    notes: 'Не пытайся разговорить силком. Тишина — часть сделки.',
  },
  ember: {
    fullName: 'Эмбер',
    species: 'Земнопони',
    role: 'Алый Фонарь',
    where: 'Бордель',
    nature: 'Крепкая, тёплая, без сказок. Пахнет дымом. Держит так, что не уйдёшь, пока не отпустит.',
    notes: 'Ценит силу и честность. Слащавость бесит.',
  },
  zephyr: {
    fullName: 'Зефир',
    species: 'Пегаска',
    role: 'Алый Фонарь',
    where: 'Бордель',
    nature: 'Дешевле других и сама об этом шутит. Быстро, весело, иногда визгливо.',
    notes: 'Не жди глубоких разговоров. Жди темпа.',
  },
  crystal: {
    fullName: 'Кристалин',
    species: 'Единорог',
    role: 'Алый Фонарь',
    where: 'Бордель',
    nature: 'Дорого. Холодно с лица. Внутри — чёткие приказы. Бывшая дворцовая порода.',
    notes: 'Не торгуйся. Слушай. Чаевые — по желанию, но она это видит.',
  },
  honey: {
    fullName: 'Хани',
    species: 'Земнопони',
    role: 'Алый Фонарь',
    where: 'Бордель',
    nature: 'Мягкая, обнимает всем телом. Стесняется стонов и всё равно не молчит.',
    notes: 'После любит просто полежать. Не сбегай сразу.',
  },
  storm: {
    fullName: 'Шторм',
    species: 'Пегаска',
    role: 'Алый Фонарь',
    where: 'Бордель',
    nature: 'Шрам на боку. Грубо снаружи. Иногда — неожиданно бережно, если не давить на прошлое.',
    notes: 'Не спрашивай про дозор, пока сама не заговорит.',
  },
};

function getDossier(id) {
  return DOSSIERS[id] || null;
}


/* ===== events-data.js ===== */
/**
 * События, активности, мировой жар — разнообразие геймплея.
 * Подключать до game.js
 */

const WORLD = {
  heat: 15, // мировой жар 0–100: растёт сам, меняет тон игры
};

const ACTIVITIES = {
  ponyville: [
    {
      id: 'help_market',
      name: 'Помочь на рынке',
      cost: 8,
      once: true,
      desc: 'Ящики, споры, чужой жар. Можно заработать или вляпаться.',
      run: 'actMarket',
    },
    {
      id: 'listen_rumors',
      name: 'Слухи у колодца',
      cost: 4,
      once: true,
      desc: 'Кто с кем, кто сорвался. Информация — тоже ресурс.',
      run: 'actRumors',
    },
  ],
  canterlot: [
    {
      id: 'court_watch',
      name: 'Наблюдать за двором',
      cost: 6,
      once: true,
      desc: 'Маски, шёпот, сделки. Репутация или компромат.',
      run: 'actCourt',
    },
    {
      id: 'buy_favor',
      name: 'Купить услугу',
      cost: 0,
      sparks: 2,
      once: true,
      desc: '2 искры — имя, адрес, слабость. Или развод.',
      run: 'actFavor',
    },
  ],
  everfree: [
    {
      id: 'track',
      name: 'Выследить тень',
      cost: 12,
      once: true,
      desc: 'QTE-тропа. Риск, награда, улики для Твайлайт.',
      run: 'actTrack',
    },
    {
      id: 'camp',
      name: 'Ночёвка у костра',
      cost: 6,
      once: true,
      desc: 'Восстановить силы… или привлечь лишнее.',
      run: 'actCamp',
    },
  ],
  private: [
    {
      id: 'journal',
      name: 'Записать мысли',
      cost: 3,
      once: true,
      desc: '−жар у себя, +фокус. Раз в день.',
      run: 'actJournal',
    },
    {
      id: 'train_control',
      name: 'Тренировка контроля',
      cost: 10,
      once: true,
      desc: 'Мини-QTE. Успех — контроль ↑, провал — жар ↑.',
      run: 'actTrain',
    },
  ],
  brothel: [
    {
      id: 'talk_madam',
      name: 'Поговорить с хозяйкой',
      cost: 3,
      once: true,
      desc: 'Цены, правила, кто сегодня «особенный».',
      run: 'actMadam',
    },
  ],
};

/** Случайные события при смене дня/ночи */
const DAY_EVENTS = [
  {
    id: 'jealous_look',
    title: 'Чужой взгляд',
    weight: 2,
    need: () => Object.values(STATE.chars).filter(c => c.aff >= 40).length >= 2,
    text: 'Кто-то из тех, с кем ты близок, видел тебя с другой. Воздух режет.',
    choices: [
      {
        label: 'Оправдаться',
        fn: () => {
          const list = Object.entries(STATE.chars).filter(([, c]) => c.aff >= 40);
          if (list.length) {
            const [id, c] = list[Math.floor(Math.random() * list.length)];
            changeStat(id, 'trust', -8);
            changeStat(id, 'aff', -4);
            toast(c.name + ': доверие падает', 'bad');
          }
          addMemory('Ревность: оправдывался');
        },
      },
      {
        label: 'Не отрицать',
        fn: () => {
          STATE.flags.dark_path = (STATE.flags.dark_path || 0) + 1;
          WORLD.heat = Math.min(100, WORLD.heat + 5);
          toast('Мировой жар +5');
          addMemory('Ревность: не стал отрицать');
        },
      },
      {
        label: 'Уйти молча (−энергия)',
        fn: () => {
          STATE.energy = Math.max(0, STATE.energy - 5);
          toast('Ушёл. Неловко.', 'bad');
        },
      },
    ],
  },
  {
    id: 'heat_wave',
    title: 'Волна жара',
    weight: 3,
    need: () => true,
    text: 'По городу проходит дрожь. Пони ищут друг друга руками. Твой жар тоже растёт.',
    choices: [
      {
        label: 'Сдерживать себя',
        fn: () => {
          if ((STATE.player.control || 50) >= 50) {
            addArousal(5);
            STATE.player.control = Math.min(100, STATE.player.control + 2);
            toast('Удержал. Контроль +2');
          } else {
            addArousal(15);
            toast('Сорвался внутри', 'bad');
          }
          WORLD.heat = Math.min(100, WORLD.heat + 4);
        },
      },
      {
        label: 'Поддаться (+жар, −энергия)',
        fn: () => {
          addArousal(20);
          STATE.energy = Math.max(0, STATE.energy - 8);
          WORLD.heat = Math.min(100, WORLD.heat + 8);
          toast('Волна прошла через тебя');
        },
      },
    ],
  },
  {
    id: 'letter',
    title: 'Письмо без имени',
    weight: 2,
    need: () => STATE.day >= 2,
    text: 'Находят конверт. «Знаю, что ты чужой. Жар — не болезнь. Не доверяй тем, кто хочет его измерить.»',
    choices: [
      {
        label: 'Показать Твайлайт',
        fn: () => {
          if (STATE.chars.twilight) {
            changeStat('twilight', 'trust', 5);
            changeStat('twilight', 'aff', 3);
            STATE.flags.twilight_research = (STATE.flags.twilight_research || 0) + 0; // no free research
            setFlag('letter_to_twilight');
            toast('Твайлайт задумалась');
          }
          addMemory('Отдал письмо Твайлайт');
        },
      },
      {
        label: 'Сжечь',
        fn: () => {
          setFlag('letter_burned');
          WORLD.heat = Math.min(100, WORLD.heat + 3);
          toast('Пепел. Тише.');
        },
      },
      {
        label: 'Оставить себе',
        fn: () => {
          setFlag('letter_kept');
          STATE.player.focus = Math.min(100, (STATE.player.focus || 50) + 5);
          toast('Фокус +5');
        },
      },
    ],
  },
  {
    id: 'guard',
    title: 'Стража',
    weight: 2,
    need: () => STATE.location === 'canterlot' || STATE.rep < 15,
    text: 'Стражники принюхиваются к чужакам. «Документы? Цель визита?»',
    choices: [
      {
        label: 'Соврать гладко',
        fn: () => {
          if ((STATE.player.focus || 50) >= 45) {
            STATE.rep += 1;
            toast('Проглотили. Репутация +1');
          } else {
            STATE.rep = Math.max(0, STATE.rep - 3);
            STATE.energy = Math.max(0, STATE.energy - 5);
            toast('Палевно. Репутация −3', 'bad');
          }
        },
      },
      {
        label: 'Подкупить (2✨)',
        fn: () => {
          if (STATE.sparks >= 2) {
            STATE.sparks -= 2;
            toast('Стража отвернулась');
          } else {
            STATE.rep = Math.max(0, STATE.rep - 2);
            toast('Нечем платить', 'bad');
          }
        },
      },
      {
        label: 'Уйти',
        fn: () => {
          STATE.energy = Math.max(0, STATE.energy - 3);
          toast('Обошёл квартал');
        },
      },
    ],
  },
  {
    id: 'gift_find',
    title: 'Находка',
    weight: 2,
    need: () => true,
    text: 'В траве — чужой амулет. Тёплый. Жар внутри отзывается.',
    choices: [
      {
        label: 'Взять (+1✨, +жар)',
        fn: () => {
          STATE.sparks += 1;
          addArousal(8);
          WORLD.heat = Math.min(100, WORLD.heat + 2);
          toast('+1 искра');
        },
      },
      {
        label: 'Оставить',
        fn: () => {
          STATE.player.control = Math.min(100, (STATE.player.control || 50) + 3);
          toast('Контроль +3');
        },
      },
    ],
  },
  {
    id: 'pinkie_party',
    title: 'Внезапная вечеринка',
    weight: 1,
    need: () => STATE.chars.pinkie && STATE.chars.pinkie.met,
    text: 'Пинки выскакивает из-за угла. «Вечеринка через 5 минут! Ты обязан!»',
    choices: [
      {
        label: 'Пойти (−10⚡, +отношения)',
        fn: () => {
          if (STATE.energy < 10) {
            toast('Нет сил', 'bad');
            return;
          }
          STATE.energy -= 10;
          changeStat('pinkie', 'aff', 10);
          changeStat('pinkie', 'lust', 6);
          Object.keys(STATE.chars).forEach(id => {
            if (STATE.chars[id].met && id !== 'pinkie') changeStat(id, 'aff', 2);
          });
          toast('Шумно. Но приятно.');
          addMemory('Вечеринка Пинки');
        },
      },
      {
        label: 'Отказаться',
        fn: () => {
          changeStat('pinkie', 'aff', -6);
          toast('Пинки надулась', 'bad');
        },
      },
    ],
  },
  {
    id: 'world_crack',
    title: 'Трещина в магии',
    weight: 2,
    need: () => WORLD.heat >= 40,
    text: 'Небо на секунду дёргается. Кто-то кричит вдалеке. Жар мира давит на виски.',
    choices: [
      {
        label: 'Идти на крик',
        fn: () => {
          STATE.energy = Math.max(0, STATE.energy - 10);
          STATE.sparks += 2;
          WORLD.heat = Math.min(100, WORLD.heat + 6);
          setFlag('saw_heat_victim');
          toast('+2 искры. Тяжело.');
          addMemory('Видел, как жар ломает пони');
        },
      },
      {
        label: 'Закрыть глаза',
        fn: () => {
          STATE.flags.soft_path = (STATE.flags.soft_path || 0) + 1;
          addArousal(5);
          toast('Ты не вмешался');
        },
      },
    ],
  },
];

function pickDayEvent() {
  const pool = DAY_EVENTS.filter(e => {
    try { return !e.need || e.need(); } catch (err) { return false; }
  });
  if (!pool.length) return null;
  // weighted
  let total = pool.reduce((s, e) => s + (e.weight || 1), 0);
  let r = Math.random() * total;
  for (const e of pool) {
    r -= e.weight || 1;
    if (r <= 0) return e;
  }
  return pool[0];
}


/* ===== scenes-data.js ===== */
/**
 * Уникальный контент интимных сцен по персонажам.
 * Подключается до game.js
 */
const SCENE_DATA = {
  twilight: {
    first: 'Рог вспыхивает и гаснет. Дыхание сбито. «Записывать не буду. Просто… не сбивай мне голову. И руки держи там, где я скажу.»',
    deep: 'Уже без протокола. Прижимается, смотрит в упор. «Хватит теории. Возьми. Сейчас.»',
    moans: [
      '«Ах… вот так…»',
      '«Глубже… нет, подожди — да. Так.»',
      '«Не… не останавливайся…»',
      '«Ммх — данные… к чёрту данные…»',
      '«Ещё… я близко…»',
      '«Контроль… почти… ах!»'
    ],
    soft: ['«Тише… слишком резко…»', '«Медленнее. Чувствую каждую…»', '«Вот… идеально…»'],
    hard: ['«Сильнее — не ломай только…»', '«Жёстче. Я выдержу.»', '«Да! Не сбавляй!»'],
    climax: 'Дрожит, рог вспыхивает. «Я… я — ах!» Цепляется и не отпускает, пока не отпускает её.',
    after_good: 'Дышит в плечо. «Повторный замер… обязателен. Позже.»',
    after_ok: '«Приемлемо. Но можно точнее.» Уже снова думает.',
    pose_change: 'Переворачивает вас сама, рог чертит искру. «Другой угол. Для… полноты опыта.»'
  },
  fluttershy: {
    first: 'Дрожит, но не отступает. «Если слишком… скажу. А если хорошо… тоже скажу. Только… не смотри так пристально. Или смотри.»',
    deep: 'Сама тянет ближе. Голос твёрже. «Не нежничай. Я не сломаюсь. Не с тобой.»',
    moans: [
      '«Нн… да…»',
      '«Вот… там…»',
      '«Ах — не убирай…»',
      '«Я… в порядке… правда…»',
      '«Сильнее… можно…»',
      '«Почти… не останавливайся…»'
    ],
    soft: ['«Тише… обними…»', '«Медленно… я чувствую тебя…»', '«Мм… хорошо…»'],
    hard: ['«Можно… крепче…»', '«Не бойся… я хочу…»', '«Да… вот так… жёстче…»'],
    climax: 'Впивается копытами, тихий срыв в стон. «Я… с тобой…» Долго не отпускает.',
    after_good: 'Шепчет в шею: «Побудь. Ещё минуту. Или две.»',
    after_ok: '«Спасибо… что не торопил.» Румянец до ушей.',
    pose_change: 'Сама устраивается удобнее, уши дрожат. «Так… лучше. Ближе.»'
  },
  rainbow: {
    first: 'Прижимает к стене крылом. «Хватит прелюдий. Покажи скорость — или я возьму сама.»',
    deep: hasDom => hasDom
      ? 'Сверху, ухмылка. «Правила мои. Дыши, если успеешь.»'
      : '«На равных. Кто первый сорвётся — проиграл. Не я.»',
    moans: [
      '«Да! Быстрее!»',
      '«Ещё — не тормози!»',
      '«Ах, чёрт… вот так!»',
      '«Сильнее, давай!»',
      '«Не смей сбавлять…»',
      '«Почти — давай же!»'
    ],
    soft: ['«Эй, не нежничай…»', '«Ладно… чуть тише. На секунду.»', '«Мм. Неплохо.»'],
    hard: ['«Жёстче!»', '«Ломай темп — в хорошем смысле!»', '«Да! Ещё!»'],
    climax: 'Крылья распахиваются, срывается в громкий стон. «Чёрт… ты…»',
    after_good: '«Неплохо. В следующий раз я веду с первой секунды.»',
    after_ok: 'Фыркает. «На троечку. Но зачёт.»',
    pose_change: 'Перекатывает вас одним движением. «Новая позиция. Не отставай.»'
  },
  rarity: {
    first: 'Устраивается, как на приём. «Красиво. Ритмично. Если начнёшь халтурить — выгоню. Шучу. …Почти.»',
    deep: 'Грива растрёпана, взгляд тяжёлый. «Маску сняла. Не разочаруй. Бери.»',
    moans: [
      '«Мм… да…»',
      '«Вот… именно…»',
      '«Ах — осторожнее с гривой… ладно, к чёрту гриву…»',
      '«Глубже… красиво…»',
      '«Ещё… не порть момент…»',
      '«Я… близко… darling…»'
    ],
    soft: ['«Изящнее…»', '«Медленнее. Наслаждаюсь.»', '«Да… так…»'],
    hard: ['«Жёстче — но с вкусом.»', '«Не сдерживайся. Я разрешаю.»', '«Ещё. Сильнее.»'],
    climax: 'Выгибается с тихим, долгим «ах…». Копыта впиваются в плечи.',
    after_good: 'Поправляет гриву дрожащими копытами. «Уровень принят. Не снижай.»',
    after_ok: '«Достойно. Но я видела и лучше.» Улыбка всё же тёплая.',
    pose_change: 'Разворачивается с грацией. «Новый ракурс. Для эстетики… и не только.»'
  },
  trixie: {
    first: 'Шляпа летит в угол. «Зритель один. Шоу — только для тебя. Аплодируй телом.»',
    deep: '«Хватит оваций. Великая требует действий. Глубже. Сейчас.»',
    moans: [
      '«Да! Для публики…»',
      '«Ах — браво…»',
      '«Ещё номер… не останавливайся…»',
      '«Сильнее! Трикси выдержит!»',
      '«Ммх — вот это фокус…»',
      '«Почти… занавес…»'
    ],
    soft: ['«Чуть тише… драматургия…»', '«Медленный акт… мм…»', '«Да… держи паузу…»'],
    hard: ['«Жёсткий номер!»', '«Без жалости!»', '«Ещё! Антракт потом!»'],
    climax: 'Срывается с пафосом и стоном. «Трикси… не… ах!»',
    after_good: '«Достойно Великой. Почти. Билет на бис — бесплатно.»',
    after_ok: '«Средний зал. Но не свистели.»',
    pose_change: 'Перекатывается театрально. «Смена декораций. Действуй.»'
  },
  applejack: {
    first: 'Шляпа на гвоздь. «Без финтифлюшек. Честно. Если что не так — скажу в лоб.»',
    deep: '«Уже не работа и не долг. Хочу. Не тормози.»',
    moans: [
      '«Ах… да…»',
      '«Крепче…»',
      '«Вот… так…»',
      '«Не нежничай…»',
      '«Ещё… хорошо…»',
      '«Чёрт… почти…»'
    ],
    soft: ['«Помягче на секунду…»', '«Медленно… чувствую…»', '«Мм. Честно хорошо.»'],
    hard: ['«Крепче!»', '«Не сдерживайся.»', '«Да! Ещё!»'],
    climax: 'Впивается, низкий стон. «Я… с тобой…»',
    after_good: '«Честно вышло. Это я ценю.»',
    after_ok: '«Нормально. В другой раз — увереннее.»',
    pose_change: 'Переворачивает без церемоний. «Так удобнее. Продолжай.»'
  },
  pinkie: {
    first: 'Прыгает от нетерпения, потом прижимается. «Вечеринка вдвоём! Без тортов — но с тобой. Быстрее!»',
    deep: 'Глаза горят. «Не останавливайся, пока конфетти в голове не закончатся!»',
    moans: [
      '«Ууии… да!»',
      '«Ещё! Ещё!»',
      '«Ах — весело… и… ах!»',
      '«Быстрее!»',
      '«Не останавливайся!»',
      '«Почти-почти-почти!»'
    ],
    soft: ['«Ой… чуть тише…»', '«Медленный танец… мм…»', '«Приятно…»'],
    hard: ['«Быстрее!»', '«Как на прыжках!»', '«Да-да-да!»'],
    climax: 'Смех срывается в стон. «Лучшая… вечеринка…»',
    after_good: '«Лучшая вечеринка за сегодня! И вчера! И…»',
    after_ok: '«Было классно. В следующий раз с шариками. Шучу. …Или нет.»',
    pose_change: 'Кувырок, новый ракурс. «Смена игры!»'
  },
  derpy: {
    first: 'Глаза в разные стороны, улыбка честная. «Ой! Я… не ту дверь? Или ту? Если ту — я рада. Если не ту… тоже вроде рада.»',
    deep: '«Ты всё ещё здесь. Значит, не убежал. Можно ближе? Иногда давлю крылом — скажи, если что.»',
    moans: [
      '«Ой…»',
      '«Ах — извини, крыло…»',
      '«Вот… так? Так?»',
      '«Мм… хорошо…»',
      '«Я… не разобью ничего?»',
      '«Ещё… если можно…»',
      '«Ой-ой… почти…»',
      '«Не уходи… пожалуйста…»'
    ],
    soft: ['«Тише… я пугаюсь громкого…»', '«Медленно… уютно…»', '«Мм. Ты тёплый.»'],
    hard: ['«Можно… чуть смелее…»', '«Я выдержу… наверное…»', '«Ещё… ой!»'],
    climax: 'Крылья в стороны, счастливый сбитый стон. «Я… вижу звёзды. Обеими. Сразу.»',
    after_good: '«Спасибо, что не смеялся. Можно обнимемся ещё?»',
    after_ok: '«Было… мило. Я почти ничего не уронила.»',
    pose_change: 'Путает сторону, потом находит. «А! Теперь правильно.»'
  }
};

function getScenePack(id) {
  return SCENE_DATA[id] || SCENE_DATA.twilight;
}

function sceneLine(id, key, fallback) {
  const p = getScenePack(id);
  let v = p[key];
  if (typeof v === 'function') v = v(typeof hasFlag === 'function' && hasFlag('dominance_accepted'));
  return v || fallback || '';
}

function sceneMoan(id, mode) {
  const p = getScenePack(id);
  let list = p.moans || ['«…»'];
  if (mode === 'soft' && p.soft) list = p.soft;
  if (mode === 'hard' && p.hard) list = p.hard;
  return list[Math.floor(Math.random() * list.length)];
}


/* ===== brothel-data.js ===== */
/**
 * Бордель «Алый Фонарь» — анкеты, цены, уникальные сцены.
 * Подключать после scenes-data.js, до game.js
 */

const BROTHEL = {
  name: 'Алый Фонарь',
  unlockRep: 8,
  entryCost: 0,
  filter: 'all', // all | pegasus | unicorn | earth
};

/** Анкеты. type: pegasus | unicorn | earth */
const BROTHEL_GIRLS = [
  {
    id: 'minty',
    name: 'Минти',
    type: 'pegasus',
    typeRu: 'Пегаска',
    coat: 'мятная',
    mane: 'светло-зелёная',
    price: 3,
    tagline: 'Скромная, но игривая. Крылья дрожат, когда смущается.',
    bio: 'Говорит тихо, смеётся в кулак. Любит, когда её хвалят. Не любит грубость с порога — но если довериться, сама прижимается ближе.',
    kinks: 'нежность, похвала, лёгкий темп → потом смелее',
    color: '#7dffa8',
  },
  {
    id: 'razor',
    name: 'Рэйзор',
    type: 'unicorn',
    typeRu: 'Единорог',    coat: 'серо-стальная',
    mane: 'фиолетовая с зелёными кончиками',
    price: 4,
    tagline: 'Пацанка. Берёт инициативу. Рог — не только для магии.',
    bio: 'Курит словами, смотрит сверху вниз. Если соглашаешься на её правила — будет жёстко и честно. Спорит, пока не прижмёт к стене.',
    kinks: 'доминантность, темп, контроль',
    color: '#a855f7',
  },
  {
    id: 'nocturne',
    name: 'Ноктюрн',
    type: 'unicorn',
    typeRu: 'Единорог',
    coat: 'угольно-серая',
    mane: 'чёрная с фиолетовым отливом',
    price: 3,
    tagline: 'Готика. Мало слов. Много взгляда. Внутри — мягче, чем кажется.',
    bio: 'Отвечает коротко, почти шёпотом. Чёрный кружевной ошейник — её выбор. Не любит шум; любит, когда всё медленно и близко.',
    kinks: 'тишина, медленный жар, объятия после',
    color: '#6b5b95',
  },
  {
    id: 'ember',
    name: 'Эмбер',
    type: 'earth',
    typeRu: 'Земнопони',
    coat: 'терракотовая',
    mane: 'рыжая, короткая',
    price: 3,
    tagline: 'Тёплая, крепкая, без лишних слов. Пахнет дымом и яблоками.',
    bio: 'Работала в кузне, пока жар не привёл сюда. Держит крепко. Смеётся низко. Не терпит фальши.',
    kinks: 'сила, честность, жёсткий темп',
    color: '#e07a3d',
  },
  {
    id: 'zephyr',
    name: 'Зефир',
    type: 'pegasus',
    typeRu: 'Пегаска',
    coat: 'светло-голубая',
    mane: 'белая с голубыми прядями',
    price: 2,
    tagline: 'Лёгкая, болтливая, флиртует на лету. Крылья не угомонятся.',
    bio: 'Дешевле других — и сама говорит об этом с улыбкой. Любит скорость и шутки. Если поймать ритм — будет визжать от восторга.',
    kinks: 'скорость, смех, позы с крыльями',
    color: '#7ec8ff',
  },
  {
    id: 'crystal',
    name: 'Кристалин',
    type: 'unicorn',
    typeRu: 'Единорог',
    coat: 'перламутровая',
    mane: 'серебристая',
    price: 5,
    tagline: 'Дорого. Холодно снаружи. Внутри — приказы шёпотом.',
    bio: 'Бывшая придворная. Платишь за тишину и качество. Не торгуется. Если взяла — ведёт сама, пока не скажет «достаточно».',
    kinks: 'контроль, эстетика, медленное подчинение',
    color: '#e8d5ff',
  },
  {
    id: 'honey',
    name: 'Хани',
    type: 'earth',
    typeRu: 'Земнопони',
    coat: 'медовая',
    mane: 'карамельная, пышная',
    price: 3,
    tagline: 'Сладкая, мягкая, обнимает всем телом. Пахнет выпечкой.',
    bio: 'Пекла на кухне, пока гости не стали просить её саму. Любит кормить — и быть «съеденной». Стесняется стонов, но не может сдержаться.',
    kinks: 'ласки, объятия, неспешный жар',
    color: '#f0c14a',
  },
  {
    id: 'storm',
    name: 'Шторм',
    type: 'pegasus',
    typeRu: 'Пегаска',
    coat: 'тёмно-синяя',
    mane: 'серо-белая, растрёпанная',
    price: 4,
    tagline: 'Грубая снаружи. Шрам на боку. В постели — внезапно бережная… или нет.',
    bio: 'Летала в дозоре. Ушла. Здесь не спрашивают прошлое. Если уважаешь — откроет крылья. Если нет — выставит за дверь.',
    kinks: 'напряжение, борьба за темп, редкая нежность',
    color: '#4a6fa5',
  },
];

/** Детальные сцены борделя → мержатся в SCENE_DATA */
const BROTHEL_SCENES = {
  minty: {
    first: 'Мятная шкурка горячая. Крылья полусложены. «Я… если что не так, скажи. А если так — тоже скажи. Можно… ближе.»',
    deep: 'Уже без шёпота. «Не убирай копыта. Мне… нравится, когда держишь.»',
    moans: [
      '«Ах… мягче… нет, так…»',
      '«Мм… крылья… щекотно…»',
      '«Ещё… чуть-чуть…»',
      '«Я… не могу тихо…»',
      '«Да… вот здесь…»',
      '«Почти… не смотри так… или смотри…»',
      '«Ах — Минти… то есть я…»',
      '«Ещё, пожалуйста…»'
    ],
    soft: ['«Тише… обними…»', '«Медленно… хорошо…»', '«Мм. Идеально…»'],
    hard: ['«Можно… смелее…»', '«Не бойся… я хочу…»', '«Сильнее… да…»'],
    climax: 'Крылья распахиваются, тихий срыв в стон. «Я… с тобой… ах!»',
    after_good: 'Прячет морду в твоей шее. «Останься на минуту. Можно?»',
    after_ok: '«Спасибо… что не торопил.» Улыбка в пол-морды.',
    pose_change: 'Сама устраивает крыло под тобой. «Так… удобнее. И ближе.»'
  },
  razor: {
    first: 'Фиолетовая грива падает на глаза, зелёные кончики липнут к поту. «Правила простые: я веду. Ты слушаешь. Или выходишь.»',
    deep: 'Рог у твоего горла — без угрозы, с ухмылкой. «Уже не спрашиваешь. Хорошо.»',
    moans: [
      '«Вот так. Подчиняйся.»',
      '«Глубже. Я сказала.»',
      '«Ах — неплохо… для тебя.»',
      '«Ещё. Не сбавляй.»',
      '«Рог… держи ритм…»',
      '«Да! Под этой гривой — только стоны.»',
      '«Почти… не смей кончать раньше.»',
      '«Ещё номер. Мой номер.»'
    ],
    soft: ['«…Ладно. Чуть тише. На секунду.»', '«Не нежничай слишком.»', '«Мм. Зачёт.»'],
    hard: ['«Жёстче. Сейчас.»', '«Я не фарфоровая.»', '«Сильнее — или я сама.»'],
    climax: 'Сжимает бёдрами, рог вспыхивает. «Чёрт… ты… ах!»',
    after_good: '«Не провалился. Редко кто.» Кивок. Почти уважение.',
    after_ok: '«На троечку. В следующий раз слушай лучше.»',
    pose_change: 'Переворачивает одним движением. «Новая поза. Моя. Дыши.»'
  },
  nocturne: {
    first: 'Чёрный ошейник щёлкает. Голос едва слышен. «Не говори много. Просто… будь.»',
    deep: 'Глаза в полумраке. «Можно жёстче. Я кивну, если нет.»',
    moans: [
      '«…нн…»',
      '«Ах…»',
      '«Ещё…»',
      '«Ммх…»',
      '«Не уходи…»',
      '«Тише… ближе…»',
      '«Я… почти…»',
      '«…да…»'
    ],
    soft: ['«…медленно…»', '«Обними…»', '«Мм…»'],
    hard: ['«…можно…»', '«Сильнее…»', '«Не останавливайся…»'],
    climax: 'Долгий дрожащий выдох, копыта в спине. Ни слова — только жар.',
    after_good: 'Кладет голову на грудь. Молчит. Не отпускает.',
    after_ok: 'Кивок. «…спасибо.» Уже снова маска.',
    pose_change: 'Тихо разворачивается. «…так.»'
  },
  ember: {
    first: 'Терракотовая шкура горячее воздуха. «Без сказок. Хочешь — бери. Я не сломаюсь.»',
    deep: '«Уже не работа. Хочу сама. Крепче.»',
    moans: [
      '«Ах, да…»',
      '«Крепче…»',
      '«Вот… так…»',
      '«Не сдерживайся…»',
      '«Ещё… хорошо…»',
      '«Чёрт… глубже…»',
      '«Я… близко…»',
      '«Не останавливайся…»'
    ],
    soft: ['«Помягче на миг…»', '«Медленно… чувствую…»', '«Мм. Честно.»'],
    hard: ['«Крепче!»', '«Жёстче, ну!»', '«Да!»'],
    climax: 'Низкий стон, мышцы каменные. «Я… с тобой…»',
    after_good: 'Хлопает по плечу. «Хороший заход. Приходи.»',
    after_ok: '«Норм. В другой раз — увереннее.»',
    pose_change: 'Переворачивает без церемоний. «Так лучше. Давай.»'
  },
  zephyr: {
    first: 'Крылья уже в воздухе от возбуждения. «Ого, ты реально заплатил! Погнали — я не кусаюсь. …Почти.»',
    deep: '«Меньше слов, больше темпа! Уии—»',
    moans: [
      '«Уии… да!»',
      '«Быстрее!»',
      '«Ах — щекотно и… ах!»',
      '«Ещё! Ещё!»',
      '«Крылья… не мешают?»',
      '«Почти-почти!»',
      '«Весело… и жарко…»',
      '«Не тормози!»'
    ],
    soft: ['«Ой, чуть тише…»', '«Медленный полёт… мм…»', '«Приятно…»'],
    hard: ['«Быстрее!»', '«Как в пике!»', '«Да-да-да!»'],
    climax: 'Визг + смех + стон. «Лучший… чаепитие… в смысле… ах!»',
    after_good: '«Ты крутой! Скидку бы дала, но хозяйка убьёт.»',
    after_ok: '«Было норм! В следующий раз возьму дороже. Шучу.»',
    pose_change: 'Кувырок в воздухе, новая поза. «Смена ветра!»'
  },
  crystal: {
    first: 'Перламутр и холодный взгляд. «Ты заплатил. Значит, слушаешь. Руки — где скажу. Рот — по делу.»',
    deep: '«Хороший мальчик. Продолжай. Не ускоряйся, пока не разрешу.»',
    moans: [
      '«Мм… именно…»',
      '«Тише… я считаю…»',
      '«Глубже. Медленно.»',
      '«Ах — не смей сбиваться…»',
      '«Ещё… на грани…»',
      '«Держи… ритм…»',
      '«Я… близко. Жди сигнала.»',
      '«Сейчас… ах…»'
    ],
    soft: ['«Изящно…»', '«Медленнее. Наслаждаюсь.»', '«Да… так…»'],
    hard: ['«Жёстче — но красиво.»', '«Разрешаю сильнее.»', '«Не сдерживайся.»'],
    climax: 'Дрожь под контролем, срыв в тихий стон. «…достаточно. Хорошо.»',
    after_good: '«Уровень принят. Чаевые — по желанию. Я… довольна.»',
    after_ok: '«Приемлемо. В следующий раз — внимательнее к сигналам.»',
    pose_change: 'Жестом рога разворачивает. «Новый угол. Эстетика.»'
  },
  honey: {
    first: 'Медовая шкура, мягкий живот. «Ой… ты тёплый. Можно я… обниму? А там уже… всё остальное.»',
    deep: '«Не уходи далеко. Хочу чувствовать всего.»',
    moans: [
      '«Мм… сладко…»',
      '«Ах… нежно…»',
      '«Ещё… обними…»',
      '«Я… громкая… извини… ах!»',
      '«Вот… здесь…»',
      '«Почти… не отпускай…»',
      '«Ещё, ещё…»',
      '«Хани… то есть я… ах…»'
    ],
    soft: ['«Тише… обнимай…»', '«Медленно… таю…»', '«Мм. Вкусно…»'],
    hard: ['«Можно… крепче…»', '«Не стесняйся…»', '«Сильнее… да…»'],
    climax: 'Сжимает всего тебя, сладкий стон. «Я… вся…»',
    after_good: '«Останься. Я принесу воды. И… себя ещё раз, если хватит сил.»',
    after_ok: '«Спасибо, милый. Приходи, когда проголодаешься.»',
    pose_change: 'Устраивает тебя удобнее. «Так мягче. И глубже.»'
  },
  storm: {
    first: 'Шрам на боку блестит. «Платил — значит, на равных. Кто сдастся первым — тот и слабак.»',
    deep: 'Дыхание тяжёлое. «Ладно… можно и нежнее. Но не весь раз.»',
    moans: [
      '«Ах… чёрт…»',
      '«Крепче…»',
      '«Не отводи взгляд…»',
      '«Ещё… да…»',
      '«Крылья… в сторону…»',
      '«Почти… держись…»',
      '«Слабак бы уже… ах!»',
      '«Ещё шторм…»'
    ],
    soft: ['«…тихо. На минуту.»', '«Медленно. Редко так.»', '«Мм. Не плохо.»'],
    hard: ['«Жёстче!»', '«Не жалей!»', '«Давай!»'],
    climax: 'Срыв, крылья бьют воздух. «Ты… не слабак…»',
    after_good: '«Зачёт. Шрам не для жалости — для тех, кто выдержал.»',
    after_ok: '«Сойдёт. В дозоре видела и хуже.»',
    pose_change: 'Перекатывает грубо. «Новый фронт. Не отставай.»'
  },
};

// Регистрация в STATE.chars и SCENE_DATA при загрузке
function registerBrothelContent() {
  if (typeof SCENE_DATA !== 'undefined') {
    Object.assign(SCENE_DATA, BROTHEL_SCENES);
  }
  if (typeof STATE !== 'undefined' && STATE.chars) {
    BROTHEL_GIRLS.forEach(g => {
      if (!STATE.chars[g.id]) {
        STATE.chars[g.id] = {
          name: g.name,
          aff: 20,
          lust: 40,
          trust: 35,
          met: false,
          unlocked: false, // only via brothel
          stage: 1,
          brothel: true,
        };
      }
    });
  }
}

function getBrothelFiltered() {
  const f = BROTHEL.filter || 'all';
  return BROTHEL_GIRLS.filter(g => f === 'all' || g.type === f);
}

function bookBrothelGirl(id) {
  const g = BROTHEL_GIRLS.find(x => x.id === id);
  if (!g) return toast('Нет такой', 'bad');
  if (STATE.sparks < g.price) return toast('Не хватает искр (' + g.price + ')', 'bad');
  if (STATE.energy < 15) return toast('Мало энергии', 'bad');
  STATE.sparks -= g.price;
  STATE.energy -= 15;
  const c = STATE.chars[g.id];
  if (c) {
    c.unlocked = true;
    c.met = true;
    c.lust = Math.max(c.lust, 50);
    c.trust = Math.max(c.trust, 40);
    c.aff = Math.max(c.aff, 25);
  }
  addMemory('Взял ночь с ' + g.name + ' в Алом Фонаре');
  updateHeader();
  toast(g.name + ' ждёт в комнате…');
  // slight arousal bump before scene
  if (typeof addArousal === 'function') addArousal(8);
  setTimeout(() => {
    if (typeof startIntimate === 'function') startIntimate(g.id);
  }, 400);
}


/* ===== game.js ===== */
// ==================== CORE STATE ====================
const STATE = {
  day: 1,
  isNight: false,
  location: 'ponyville',
  energy: 100,
  sparks: 5,
  rep: 10,
  inventory: ['цветок', 'старая книга'],
  flags: {
    prologue_done: false,
    heard_about_heat: false,
    twilight_research: 0,
    fluttershy_open: 0,
    rainbow_challenge: 0,
    rarity_met: false,
    saw_everfree_shadow: false,
    night_first: false,
    heat_source_hint: false,
    helped_library: false,
    promised_twilight: false,
    promised_fluttershy: false,
    dominance_accepted: false,
    soft_path: 0,
    dark_path: 0,
    climax_seen: false,
    ending_ready: false,
  },
  memory: [],
  discussed: {},       // id -> { optionKey: day }
  prepItems: [],       // chosen before intimate scene
  chars: {
    twilight:   { name: 'Твайлайт Спаркл', aff: 15, lust: 8,  trust: 25, met: false, unlocked: true, stage: 0 },
    fluttershy: { name: 'Флаттершай',      aff: 12, lust: 5,  trust: 20, met: false, unlocked: true, stage: 0 },
    rainbow:    { name: 'Рэйнбоу Дэш',     aff: 8,  lust: 12, trust: 12, met: false, unlocked: true, stage: 0 },
    rarity:     { name: 'Рэрити',          aff: 5,  lust: 8,  trust: 8,  met: false, unlocked: false, stage: 0 },
    trixie:     { name: 'Трикси',          aff: 5,  lust: 14, trust: 8,  met: false, unlocked: false, stage: 0 },
    applejack:  { name: 'Эпплджек',        aff: 10, lust: 6,  trust: 18, met: false, unlocked: true, stage: 0 },
    pinkie:     { name: 'Пинки Пай',       aff: 12, lust: 10, trust: 15, met: false, unlocked: true, stage: 0 },
    derpy:      { name: 'Дерпи',           aff: 14, lust: 8,  trust: 22, met: false, unlocked: true, stage: 0 },
  },
  player: {
    name: 'Странник',
    species: 'earth', // earth | pegasus | unicorn
    style: 'neutral',
    arousal: 12,
    control: 55,
    focus: 50,
    soloToday: 0,
  },
  scene: null,
  currentDlg: null,
  pendingIntimate: null,
  talkActs: 0,          // actions in current dialogue
  exploredDay: {},      // locationKey -> day when explored
  activityDone: {},    // activityId_day -> true
};

const ITEM_EFFECTS = {
  'цветок': { label: 'Цветок', prep: 'Нежный жест. +доверие в сцене', trust: 4, lust: 0 },
  'записи о жаре': { label: 'Записи о жаре', prep: 'Общий интерес. +привязанность', aff: 5, lust: 2 },
  'шёлковая лента': { label: 'Шёлковая лента', prep: 'Эстетика и контроль. +желание', lust: 6, trust: 2 },
  'зелье спокойствия': { label: 'Зелье спокойствия', prep: 'Снимает страх. Легче держать ритм', trust: 5, stamina: 15 },
  'перо Рэйнбоу': { label: 'Перо Рэйнбоу', prep: 'Азарт и вызов. Стартовое желание выше', lust: 8 },
};

const LOCATIONS = {
  ponyville: {
    name: 'Понивилль',
    day: 'Улицы тёплые. У пони румянец. Библиотека Твайлайт приоткрыта.',
    night: 'Тише. Взгляды прямее. Окна долго не гаснут.'
  },
  canterlot: {
    name: 'Кантерлот',
    day: 'Столица нервничает. Стража растеряна. Бутики Рэрити открыты.',
    night: 'Шёпот за дверями. Духи и тяжёлый воздух.'
  },
  everfree: {
    name: 'Эверфри',
    day: 'Лес опасен — и манит. Тропы будто живые.',
    night: 'Звуки ближе. Контроль легко потерять. Иногда — чужая тень.'
  },
  private: {
    name: 'Приватные покои',
    day: 'Тихо. Можно отдохнуть или кого-то позвать.',
    night: 'Здесь можно не притворяться.'
  },
  brothel: {
    name: 'Алый Фонарь',
    day: 'Днём тихо: уборка, запах духов, приглушённый смех из-за двери.',
    night: 'Фонари красные. Анкеты на столе. За искры — час без вопросов.'
  },
};

const CHAR_LOCS = {
  day: {
    ponyville: ['twilight', 'fluttershy', 'applejack', 'pinkie', 'derpy'],
    canterlot: ['rarity', 'trixie'],
    everfree: ['rainbow'],
    private: [],
    brothel: [],
  },
  night: {
    ponyville: ['fluttershy', 'pinkie', 'applejack', 'derpy'],
    canterlot: ['rarity', 'twilight', 'trixie'],
    everfree: ['rainbow'],
    private: ['twilight', 'fluttershy', 'rainbow', 'rarity', 'trixie', 'applejack', 'pinkie', 'derpy'],
    brothel: [],
  }
};

// ==================== UTILS ====================
function $(id) { return document.getElementById(id); }
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = $(id);
  if (!el) {
    console.error('screen not found:', id);
    toast('Экран не найден: ' + id, 'bad');
    return false;
  }
  el.classList.add('active');
  return true;
}
function updateHeader() {
  $('energy').textContent = Math.max(0, Math.floor(STATE.energy));
  $('sparks').textContent = STATE.sparks;
  $('rep').textContent = STATE.rep;
  $('dayNight').textContent = STATE.isNight ? 'Ночь' : 'День';
  $('location').textContent = LOCATIONS[STATE.location].name;
  $('dayNum').textContent = STATE.day;
  const wh = typeof WORLD !== 'undefined' ? Math.floor(WORLD.heat) : 0;
  const locEl = $('location');
  if (locEl && locEl.parentElement) {
    let tag = locEl.parentElement.querySelector('.world-heat');
    if (!tag) {
      tag = document.createElement('div');
      tag.className = 'loc-line world-heat';
      locEl.parentElement.appendChild(tag);
    }
    tag.textContent = 'Мир. жар ' + wh + (wh >= 60 ? ' · опасно' : '');
    tag.style.color = wh >= 60 ? 'var(--bad)' : wh >= 35 ? 'var(--warn)' : 'var(--muted)';
  }
}

function addArousal(n) {
  STATE.player.arousal = clamp((STATE.player.arousal || 0) + n, 0, 100);
  updateHeader();
  if (STATE.player.arousal >= 90) toast('Жар почти на пределе', 'bad');
  else if (n >= 8) toast('Жар растёт…');
}

function relieveArousal(n) {
  STATE.player.arousal = clamp((STATE.player.arousal || 0) - n, 0, 100);
  updateHeader();
}
function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function addMemory(txt) {
  STATE.memory.push(txt);
  if (STATE.memory.length > 40) STATE.memory.shift();
}
function hasFlag(f) { return !!STATE.flags[f]; }
function setFlag(f, v = true) { STATE.flags[f] = v; }
function addFlagNum(f, n = 1) { STATE.flags[f] = (STATE.flags[f] || 0) + n; }
function getChar(id) { return STATE.chars[id]; }
function spendEnergy(n) {
  if (STATE.energy < n) return false;
  STATE.energy -= n;
  return true;
}
function toast(msg, type = '') {
  const el = $('toast');
  el.textContent = msg;
  el.className = 'show' + (type ? ' ' + type : '');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { el.className = ''; }, 2600);
}

/** Mood from lust: 0 calm, 1 warm, 2 heat */
function portraitMood(id) {
  const lust = (STATE.chars[id] && STATE.chars[id].lust) || 0;
  if (lust >= 55) return 2;
  if (lust >= 28) return 1;
  return 0;
}

/** Stylized pony portraits — expression shifts with Lust */
function portraitHTML(id, size = '') {
  const mood = portraitMood(id);
  const uid = id + '-' + mood + '-' + (size || 'm');

  const blushOp = [0.25, 0.55, 0.85][mood];
  const blushRx = [3.5, 5, 6.5][mood];
  const eyeOpen = [6, 5.5, 4.8][mood];
  const pupil = [3, 3.2, 3.6][mood];
  const smile = [
    'M35 54 Q40 57 45 54',
    'M34 53 Q40 58 46 53',
    'M33 52 Q40 60 47 52'
  ][mood];
  const smileW = [1.3, 1.5, 1.8][mood];

  const faces = {
    twilight: () => {
      const face = ['#c9a0e8', '#d0a8f0', '#d8b0f5'][mood];
      const glow = mood === 2 ? '<circle cx="40" cy="18" r="6" fill="#e8d5ff" opacity="0.55"/>' : '';
      const halfLid = mood === 2 ? `
        <path d="M27 39 Q32 42 37 39" fill="#b888d8" opacity="0.55"/>
        <path d="M43 39 Q48 42 53 39" fill="#b888d8" opacity="0.55"/>` : '';
      return `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="tg-${uid}" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stop-color="#d4a5ff"/>
            <stop offset="100%" stop-color="#6b3fa0"/>
          </radialGradient>
        </defs>
        <circle cx="40" cy="40" r="40" fill="url(#tg-${uid})"/>
        <path d="M12 38 Q8 18 22 12 Q30 6 40 10 Q52 4 62 14 Q72 22 68 40" fill="#4a2080" opacity="0.9"/>
        <path d="M18 36 Q20 16 32 14 Q40 8 48 14 Q58 12 64 28" fill="#9b59d0"/>
        <ellipse cx="40" cy="44" rx="22" ry="20" fill="${face}"/>
        ${glow}
        <path d="M40 8 L36 28 L44 28 Z" fill="#e8d5ff"/>
        <path d="M40 8 L38 22 L42 22 Z" fill="#b388ff" opacity="0.7"/>
        <ellipse cx="32" cy="42" rx="5" ry="${eyeOpen}" fill="#fff"/>
        <ellipse cx="48" cy="42" rx="5" ry="${eyeOpen}" fill="#fff"/>
        <circle cx="33" cy="43" r="${pupil}" fill="#2d1b4e"/>
        <circle cx="49" cy="43" r="${pupil}" fill="#2d1b4e"/>
        <circle cx="34" cy="41.5" r="1.1" fill="#fff"/>
        <circle cx="50" cy="41.5" r="1.1" fill="#fff"/>
        ${halfLid}
        <ellipse cx="26" cy="50" rx="${blushRx}" ry="3" fill="#ff6b9d" opacity="${blushOp}"/>
        <ellipse cx="54" cy="50" rx="${blushRx}" ry="3" fill="#ff6b9d" opacity="${blushOp}"/>
        <path d="${smile}" stroke="#6b3fa0" stroke-width="${smileW}" fill="none" stroke-linecap="round"/>
      </svg>`;
    },
    fluttershy: () => {
      const face = ['#ffe566', '#ffe87a', '#ffec90'][mood];
      const gazeY = [45, 45.5, 46.5][mood];
      const halfLid = mood >= 1 ? `
        <path d="M26 40 Q32 43 38 40" fill="#f0d040" opacity="${0.35 + mood * 0.15}"/>
        <path d="M42 40 Q48 43 54 40" fill="#f0d040" opacity="${0.35 + mood * 0.15}"/>` : '';
      return `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="fg-${uid}" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stop-color="#ffe566"/>
            <stop offset="100%" stop-color="#e6b800"/>
          </radialGradient>
        </defs>
        <circle cx="40" cy="40" r="40" fill="url(#fg-${uid})"/>
        <path d="M14 42 Q10 22 24 14 Q36 6 44 12 Q56 6 66 18 Q72 30 68 44" fill="#f5a0c8"/>
        <path d="M20 40 Q22 20 34 16 Q42 10 50 16 Q60 14 64 30" fill="#ffb7d5"/>
        <ellipse cx="40" cy="46" rx="22" ry="19" fill="${face}"/>
        <ellipse cx="32" cy="44" rx="5.5" ry="${eyeOpen + 0.3}" fill="#fff"/>
        <ellipse cx="48" cy="44" rx="5.5" ry="${eyeOpen + 0.3}" fill="#fff"/>
        <ellipse cx="32.5" cy="${gazeY}" rx="3" ry="3.3" fill="#3d6b2f"/>
        <ellipse cx="48.5" cy="${gazeY}" rx="3" ry="3.3" fill="#3d6b2f"/>
        <circle cx="33.5" cy="${gazeY - 1.2}" r="1.1" fill="#fff"/>
        <circle cx="49.5" cy="${gazeY - 1.2}" r="1.1" fill="#fff"/>
        ${halfLid}
        <ellipse cx="25" cy="52" rx="${blushRx + 0.5}" ry="3.2" fill="#ff6b9d" opacity="${blushOp}"/>
        <ellipse cx="55" cy="52" rx="${blushRx + 0.5}" ry="3.2" fill="#ff6b9d" opacity="${blushOp}"/>
        <path d="${smile}" stroke="#c49a00" stroke-width="${smileW}" fill="none" stroke-linecap="round"/>
      </svg>`;
    },
    rainbow: () => {
      const face = ['#7ec8ff', '#8ad0ff', '#9ad8ff'][mood];
      const grin = [
        'M33 55 Q40 60 47 55',
        'M32 54 Q40 62 48 54',
        'M31 53 Q40 64 49 53'
      ][mood];
      const wingOp = [0.45, 0.65, 0.9][mood];
      return `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="rg-${uid}" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stop-color="#7ec8ff"/>
            <stop offset="100%" stop-color="#2b7bbf"/>
          </radialGradient>
          <linearGradient id="maneR-${uid}" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#ff3b3b"/>
            <stop offset="20%" stop-color="#ff9f1c"/>
            <stop offset="40%" stop-color="#ffd60a"/>
            <stop offset="60%" stop-color="#2ec4b6"/>
            <stop offset="80%" stop-color="#3a86ff"/>
            <stop offset="100%" stop-color="#9b5de5"/>
          </linearGradient>
        </defs>
        <circle cx="40" cy="40" r="40" fill="url(#rg-${uid})"/>
        <path d="M10 36 Q6 14 22 8 Q34 2 42 10 Q54 2 68 12 Q78 24 72 42" fill="url(#maneR-${uid})"/>
        <ellipse cx="40" cy="46" rx="21" ry="18" fill="${face}"/>
        <ellipse cx="32" cy="44" rx="5.5" ry="${eyeOpen + 0.4}" fill="#fff"/>
        <ellipse cx="48" cy="44" rx="5.5" ry="${eyeOpen + 0.4}" fill="#fff"/>
        <circle cx="33" cy="45" r="${pupil + 0.2}" fill="#1a3a5c"/>
        <circle cx="49" cy="45" r="${pupil + 0.2}" fill="#1a3a5c"/>
        <circle cx="34" cy="43.5" r="1.2" fill="#fff"/>
        <circle cx="50" cy="43.5" r="1.2" fill="#fff"/>
        <ellipse cx="26" cy="52" rx="${blushRx}" ry="2.8" fill="#ff6b9d" opacity="${blushOp * 0.85}"/>
        <ellipse cx="54" cy="52" rx="${blushRx}" ry="2.8" fill="#ff6b9d" opacity="${blushOp * 0.85}"/>
        <path d="${grin}" stroke="#1a3a5c" stroke-width="${smileW + 0.2}" fill="none" stroke-linecap="round"/>
        <path d="M8 48 Q0 40 6 32" stroke="#fff" stroke-width="2.2" fill="none" opacity="${wingOp}"/>
        <path d="M72 48 Q80 40 74 32" stroke="#fff" stroke-width="2.2" fill="none" opacity="${wingOp}"/>
      </svg>`;
    },
    rarity: () => {
      const face = ['#f5f0fa', '#f8f2fc', '#faf5ff'][mood];
      const lash = mood === 2
        ? '<path d="M27 37 L31 33 M28 40 L24 36 M53 37 L49 33 M52 40 L56 36" stroke="#5c3d8a" stroke-width="1.2"/>'
        : `<path d="M27 38 L30 35 M28 40 L25 37" stroke="#5c3d8a" stroke-width="1.1"/>
           <path d="M53 38 L50 35 M52 40 L55 37" stroke="#5c3d8a" stroke-width="1.1"/>`;
      const gem = mood === 2
        ? '<circle cx="40" cy="28" r="3.2" fill="#ff6bcb"/><path d="M40 23 L40 33 M35 28 L45 28" stroke="#fff" stroke-width="1"/>'
        : '<circle cx="40" cy="28" r="2.5" fill="#b388ff"/><path d="M40 24 L40 32 M36 28 L44 28" stroke="#fff" stroke-width="0.8"/>';
      return `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="rrg-${uid}" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="100%" stop-color="#d8d0e8"/>
          </radialGradient>
        </defs>
        <circle cx="40" cy="40" r="40" fill="url(#rrg-${uid})"/>
        <path d="M12 40 Q8 16 24 10 Q36 2 44 12 Q58 2 70 16 Q76 30 70 44" fill="#5c4a7a"/>
        <path d="M18 38 Q16 18 30 12 Q40 6 50 14 Q62 10 66 28" fill="#7b6b9b"/>
        <path d="M22 36 Q24 20 36 16 Q44 12 52 18" fill="#c9b6e4" opacity="0.85"/>
        <ellipse cx="40" cy="46" rx="21" ry="18" fill="${face}"/>
        <ellipse cx="32" cy="44" rx="5" ry="${eyeOpen}" fill="#fff"/>
        <ellipse cx="48" cy="44" rx="5" ry="${eyeOpen}" fill="#fff"/>
        <ellipse cx="32.5" cy="45" rx="2.8" ry="3.2" fill="#5c3d8a"/>
        <ellipse cx="48.5" cy="45" rx="2.8" ry="3.2" fill="#5c3d8a"/>
        <circle cx="33.5" cy="43.5" r="1" fill="#fff"/>
        <circle cx="49.5" cy="43.5" r="1" fill="#fff"/>
        ${lash}
        ${gem}
        <ellipse cx="26" cy="52" rx="${blushRx}" ry="3" fill="#ff6b9d" opacity="${blushOp}"/>
        <ellipse cx="54" cy="52" rx="${blushRx}" ry="3" fill="#ff6b9d" opacity="${blushOp}"/>
        <path d="${smile}" stroke="#8a7a9a" stroke-width="${smileW}" fill="none" stroke-linecap="round"/>
      </svg>`;
    },
    trixie: () => {
      const face = ['#9ad0ff', '#a8d8ff', '#b8e0ff'][mood];
      return `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs><radialGradient id="tx-${uid}" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stop-color="#b8e0ff"/><stop offset="100%" stop-color="#5a9fd4"/>
        </radialGradient></defs>
        <circle cx="40" cy="40" r="40" fill="url(#tx-${uid})"/>
        <path d="M10 38 Q6 12 28 8 Q40 2 52 10 Q72 8 74 36" fill="#6b2d9b"/>
        <path d="M16 36 Q18 14 36 12 Q48 6 60 16" fill="#c77dff"/>
        <ellipse cx="40" cy="46" rx="21" ry="18" fill="${face}"/>
        <path d="M40 10 L36 26 L44 26 Z" fill="#e8d5ff"/>
        <ellipse cx="32" cy="44" rx="5" ry="${eyeOpen}" fill="#fff"/>
        <ellipse cx="48" cy="44" rx="5" ry="${eyeOpen}" fill="#fff"/>
        <circle cx="33" cy="45" r="${pupil}" fill="#2a1a4a"/>
        <circle cx="49" cy="45" r="${pupil}" fill="#2a1a4a"/>
        <circle cx="34" cy="43.5" r="1.1" fill="#fff"/>
        <circle cx="50" cy="43.5" r="1.1" fill="#fff"/>
        <ellipse cx="26" cy="52" rx="${blushRx}" ry="3" fill="#ff6b9d" opacity="${blushOp}"/>
        <ellipse cx="54" cy="52" rx="${blushRx}" ry="3" fill="#ff6b9d" opacity="${blushOp}"/>
        <path d="${smile}" stroke="#3a5a80" stroke-width="${smileW}" fill="none" stroke-linecap="round"/>
      </svg>`;
    },
    applejack: () => {
      const face = ['#fcb86a', '#ffc878', '#ffd090'][mood];
      return `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs><radialGradient id="aj-${uid}" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stop-color="#ffc878"/><stop offset="100%" stop-color="#d4893a"/>
        </radialGradient></defs>
        <circle cx="40" cy="40" r="40" fill="url(#aj-${uid})"/>
        <path d="M12 40 Q10 16 28 10 Q40 4 54 12 Q70 14 72 40" fill="#8b4518"/>
        <path d="M18 38 Q20 18 34 14 Q46 8 58 18" fill="#c4682a"/>
        <ellipse cx="40" cy="46" rx="21" ry="18" fill="${face}"/>
        <ellipse cx="32" cy="44" rx="5" ry="${eyeOpen}" fill="#fff"/>
        <ellipse cx="48" cy="44" rx="5" ry="${eyeOpen}" fill="#fff"/>
        <circle cx="33" cy="45" r="${pupil}" fill="#3d2817"/>
        <circle cx="49" cy="45" r="${pupil}" fill="#3d2817"/>
        <circle cx="34" cy="43.5" r="1.1" fill="#fff"/>
        <circle cx="50" cy="43.5" r="1.1" fill="#fff"/>
        <ellipse cx="26" cy="52" rx="${blushRx}" ry="3" fill="#ff6b9d" opacity="${blushOp}"/>
        <ellipse cx="54" cy="52" rx="${blushRx}" ry="3" fill="#ff6b9d" opacity="${blushOp}"/>
        <path d="${smile}" stroke="#8b4518" stroke-width="${smileW}" fill="none" stroke-linecap="round"/>
        <path d="M22 28 Q28 22 34 28" stroke="#5c3310" stroke-width="2" fill="none"/>
      </svg>`;
    },
    pinkie: () => {
      const face = ['#ffb6c8', '#ffc0d0', '#ffcad8'][mood];
      return `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs><radialGradient id="pk-${uid}" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stop-color="#ffc0d0"/><stop offset="100%" stop-color="#e8789a"/>
        </radialGradient></defs>
        <circle cx="40" cy="40" r="40" fill="url(#pk-${uid})"/>
        <path d="M8 42 Q4 10 30 6 Q40 0 52 8 Q78 6 76 40" fill="#e91e8c"/>
        <path d="M14 40 Q16 12 36 10 Q48 2 64 14" fill="#ff4da6"/>
        <ellipse cx="40" cy="46" rx="21" ry="18" fill="${face}"/>
        <ellipse cx="32" cy="44" rx="5.5" ry="${eyeOpen + 0.3}" fill="#fff"/>
        <ellipse cx="48" cy="44" rx="5.5" ry="${eyeOpen + 0.3}" fill="#fff"/>
        <circle cx="33" cy="45" r="${pupil + 0.2}" fill="#2a1040"/>
        <circle cx="49" cy="45" r="${pupil + 0.2}" fill="#2a1040"/>
        <circle cx="34" cy="43.5" r="1.2" fill="#fff"/>
        <circle cx="50" cy="43.5" r="1.2" fill="#fff"/>
        <ellipse cx="25" cy="52" rx="${blushRx + 0.5}" ry="3" fill="#ff6b9d" opacity="${blushOp}"/>
        <ellipse cx="55" cy="52" rx="${blushRx + 0.5}" ry="3" fill="#ff6b9d" opacity="${blushOp}"/>
        <path d="M32 55 Q40 64 48 55" stroke="#c04070" stroke-width="${smileW + 0.3}" fill="none" stroke-linecap="round"/>
      </svg>`;
    },
    derpy: () => {
      const face = ['#c8d8e8', '#d0e0f0', '#d8e8f8'][mood];
      // asymmetric eyes - signature Derpy
      return `
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs><radialGradient id="dp-${uid}" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stop-color="#d0e8ff"/><stop offset="100%" stop-color="#7aa0c8"/>
        </radialGradient></defs>
        <circle cx="40" cy="40" r="40" fill="url(#dp-${uid})"/>
        <path d="M10 40 Q8 14 28 8 Q42 2 56 12 Q72 10 74 38" fill="#d8d0a0"/>
        <path d="M16 38 Q18 16 34 12 Q48 6 62 18" fill="#f0e8b0"/>
        <ellipse cx="40" cy="46" rx="21" ry="18" fill="${face}"/>
        <ellipse cx="30" cy="42" rx="6" ry="7" fill="#fff"/>
        <ellipse cx="50" cy="48" rx="5.5" ry="6" fill="#fff"/>
        <circle cx="31" cy="44" r="3" fill="#3a5a80"/>
        <circle cx="52" cy="49" r="2.6" fill="#3a5a80"/>
        <circle cx="32" cy="42.5" r="1" fill="#fff"/>
        <circle cx="53" cy="47.5" r="0.9" fill="#fff"/>
        <ellipse cx="26" cy="52" rx="${blushRx}" ry="3" fill="#ff6b9d" opacity="${blushOp}"/>
        <ellipse cx="54" cy="54" rx="${blushRx}" ry="3" fill="#ff6b9d" opacity="${blushOp}"/>
        <path d="M33 56 Q40 62 47 56" stroke="#5a7a9a" stroke-width="${smileW}" fill="none" stroke-linecap="round"/>
        <path d="M8 50 Q2 42 8 34" stroke="#d8d0a0" stroke-width="2" fill="none" opacity="0.7"/>
        <path d="M72 50 Q78 42 72 34" stroke="#d8d0a0" stroke-width="2" fill="none" opacity="0.7"/>
      </svg>`;
    }
  };

  const gen = faces[id] || (() => {
    const g = (typeof BROTHEL_GIRLS !== 'undefined' && BROTHEL_GIRLS.find(x => x.id === id));
    const col = g ? g.color : '#c77dff';
    const icon = g ? (g.type === 'pegasus' ? 'P' : g.type === 'unicorn' ? 'U' : 'E') : '?';
    return () => `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="40" fill="${col}"/>
      <ellipse cx="40" cy="46" rx="20" ry="17" fill="#ffe8f0"/>
      <circle cx="32" cy="44" r="4" fill="#222"/><circle cx="48" cy="44" r="4" fill="#222"/>
      <text x="40" y="72" text-anchor="middle" fill="#222" font-size="10">${icon}</text>
    </svg>`;
  })();
  const svg = gen();
  const sizeClass = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : '';
  const heatClass = mood === 2 ? ' heat' : mood === 1 ? ' warm' : '';
  const extra = size === 'lg' ? ' portrait-pulse' : '';
  const title = ((STATE.chars[id] || {}).name || id) + (mood === 2 ? ' · жар' : mood === 1 ? ' · тепло' : '');
  return `<div class="portrait ${id} ${sizeClass}${heatClass}${extra}" title="${title}">${svg}</div>`;
}

function wasDiscussed(charId, key) {
  const d = STATE.discussed[charId];
  return d && d[key] === STATE.day;
}
function markDiscussed(charId, key) {
  if (!STATE.discussed[charId]) STATE.discussed[charId] = {};
  STATE.discussed[charId][key] = STATE.day;
}
function noteTalkAct() {
  STATE.talkActs = (STATE.talkActs || 0) + 1;
}
function talkTired() {
  return (STATE.talkActs || 0) >= 3;
}
function changeStat(charId, stat, delta) {
  const c = getChar(charId);
  if (!c) return;
  const old = c[stat];
  c[stat] = clamp(old + delta, 0, 100);
  if (delta !== 0) {
    const names = { aff: 'Привязанность', lust: 'Желание', trust: 'Доверие' };
    const sign = delta > 0 ? '+' : '';
    toast(`${c.name}: ${names[stat] || stat} ${sign}${delta}`, delta > 0 ? 'good' : 'bad');
  }
}

// ==================== PROLOGUE ====================

let createSpecies = 'earth';

function showCreate() {
  createSpecies = (STATE.player && STATE.player.species) || 'earth';
  if (!$('screen-create')) {
    console.warn('screen-create missing, skip to prologue');
    startPrologue();
    return;
  }
  showScreen('screen-create');
  const input = $('createName');
  if (input) {
    input.value = STATE.player.name && STATE.player.name !== 'Странник' ? STATE.player.name : '';
    setTimeout(() => { try { input.focus(); } catch (e) {} }, 200);
  }
  document.querySelectorAll('.species-card').forEach(c => {
    c.classList.toggle('active', c.dataset.species === createSpecies);
  });
}

function pickSpecies(sp) {
  createSpecies = sp;
  document.querySelectorAll('.species-card').forEach(c => {
    c.classList.toggle('active', c.dataset.species === sp);
  });
}

function confirmCreate() {
  const input = $('createName');
  let name = (input && input.value || '').trim();
  if (!name) name = 'Странник';
  if (name.length > 20) name = name.slice(0, 20);
  STATE.player.name = name;
  STATE.player.species = createSpecies || 'earth';
  // species bonuses
  STATE.player.control = 55;
  STATE.player.focus = 50;
  if (STATE.player.species === 'earth') {
    STATE.player.control = 62;
    STATE.player.style = 'steady';
  } else if (STATE.player.species === 'pegasus') {
    STATE.player.focus = 60;
    STATE.player.style = 'swift';
  } else if (STATE.player.species === 'unicorn') {
    STATE.player.control = 58;
    STATE.player.focus = 58;
    STATE.player.style = 'arcane';
  }
  addMemory('Пришёл в Эквестрию как ' + name + ' (' + speciesLabel(STATE.player.species) + ')');
  startPrologue();
}

function speciesLabel(sp) {
  return { earth: 'земнопони', pegasus: 'пегас', unicorn: 'единорог' }[sp] || sp;
}

function startPrologue() {
  if (hasFlag('prologue_done')) {
    startGame();
    return;
  }
  showScreen('screen-prologue');
  const log = $('prolText');
  log.innerHTML = '';
  const choices = $('prolChoices');
  choices.innerHTML = '';

  appendLog(log, 'Глаза открываются. Небо знакомое — воздух нет. Густой, тяжёлый.');
  appendLog(log, 'Рядом — разбитый портал. Искры ещё тлеют. Ты здесь чужой.');
  appendLog(log, 'Из-за холма — голос. Взволнованный, почти паникующий.');

  addChoice(choices, 'Подойти к голосу', () => {
    appendLog(log, 'Твайлайт Спаркл — над странным кристаллом. Рог мигает.');
    appendLog(log, '«Ещё портал?! Данные не сходятся... Ты не отсюда?»');
    choices.innerHTML = '';
    addChoice(choices, '«Я не знаю, как сюда попал. Что происходит?»', () => {
      setFlag('heard_about_heat');
      appendLog(log, '«Магия дружбы сбоит. Пони чувствуют жар — желание, близость. Не любовь. Голод.»');
      appendLog(log, '«Ищу источник. Пока впустую. Останешься — помоги. Или не мешай.»');
      choices.innerHTML = '';
      addChoice(choices, '«Я помогу разобраться.» (путь исследования)', () => {
        STATE.player.style = 'curious';
        getChar('twilight').aff += 8;
        getChar('twilight').trust += 6;
        setFlag('promised_twilight');
        addMemory('Пообещал помочь Твайлайт с исследованием жара');
        finishPrologue(log, choices);
      });
      addChoice(choices, '«Звучит опасно. Но интересно.» (нейтрально)', () => {
        STATE.player.style = 'neutral';
        getChar('twilight').aff += 3;
        addMemory('Отнёсся к жару с осторожным интересом');
        finishPrologue(log, choices);
      });
      addChoice(choices, '«Жар, говоришь?..» (с лёгкой усмешкой)', () => {
        STATE.player.style = 'bold';
        getChar('twilight').lust += 5;
        getChar('twilight').trust -= 2;
        STATE.flags.dark_path += 1;
        addMemory('Проявил интерес к жару слишком прямо');
        finishPrologue(log, choices);
      });
    });
    addChoice(choices, 'Сначала осмотреться, не отвечая сразу', () => {
      appendLog(log, 'Ты молчишь, смотришь на кристалл. Твайлайт хмурится, но ждёт.');
      appendLog(log, '«Хоть не напал. Уже лучше некоторых.»');
      setFlag('heard_about_heat');
      getChar('twilight').trust += 4;
      addMemory('Осторожно осмотрел портал и кристалл');
      choices.innerHTML = '';
      finishPrologue(log, choices);
    });
  });
}

function finishPrologue(log, choices) {
  appendLog(log, '«Понивилль — вниз по склону. Ищи меня в библиотеке. И осторожнее с обещаниями.»');
  appendLog(log, 'Она уходит. Кристалл ещё пульсирует.');
  setFlag('prologue_done');
  getChar('twilight').met = true;
  choices.innerHTML = '';
  addChoice(choices, 'Спуститься в Понивилль', () => {
    startGame();
  }, true);
}

function addChoice(container, text, fn, primary = false) {
  const b = document.createElement('button');
  b.textContent = text;
  if (primary) b.className = 'primary';
  b.onclick = fn;
  container.appendChild(b);
}

function appendLog(el, txt, cls = '') {
  const p = document.createElement('p');
  p.textContent = txt;
  if (cls) p.className = cls;
  el.appendChild(p);
  el.scrollTop = el.scrollHeight;
}

// ==================== HUB ====================
function startGame() {
  showScreen('screen-hub');
  renderHub();
  updateHeader();
  $('btnStory').style.display = 'inline-block';
}

function renderHub() {
  const loc = LOCATIONS[STATE.location];
  $('hubTitle').textContent = loc.name + ' — ' + (STATE.isNight ? 'Ночь' : 'День');
  $('hubDesc').textContent = STATE.isNight ? loc.night : loc.day;

  // Story hint
  const hint = $('hubStoryHint');
  const h = getStoryHint();
  if (h) {
    hint.style.display = 'block';
    hint.textContent = h;
  } else {
    hint.style.display = 'none';
  }

  const choices = $('hubChoices');
  choices.innerHTML = '';

  // Brothel catalog + activities
  if (STATE.location === 'brothel') {
    renderBrothelCatalog(choices);
  }
  renderLocationActivities(choices);


  if (!STATE.isNight) {
    const b = document.createElement('button');
    b.textContent = 'Исследовать окрестности (−5 ⚡)';
    b.onclick = () => {
      const key = STATE.location + '_' + STATE.day + '_' + (STATE.isNight ? 'n' : 'd');
      if (STATE.exploredDay[key]) return toast('Здесь уже всё осмотрел', 'bad');
      if (!spendEnergy(5)) return toast('Мало энергии', 'bad');
      STATE.exploredDay[key] = true;
      exploreLocation();
      updateHeader();
      renderHub();
    };
    choices.appendChild(b);
  } else {
    const b = document.createElement('button');
    b.textContent = 'Отдохнуть до утра (+25 ⚡, +1 день)';
    b.onclick = () => {
      STATE.energy = clamp(STATE.energy + 25, 0, 100);
      STATE.isNight = false;
      STATE.day++;
      Object.values(STATE.chars).forEach(c => {
        if (c.lust > 60) c.lust = clamp(c.lust - 3, 0, 100);
      });
      updateHeader();
      renderHub();
    };
    choices.appendChild(b);
  }

  // Ending availability
  if (hasFlag('ending_ready') && STATE.day >= 5) {
    const closest = Object.entries(STATE.chars)
      .filter(([, c]) => c.unlocked && c.met)
      .sort((a, b) => (b[1].aff + b[1].trust) - (a[1].aff + a[1].trust))[0];
    if (closest && closest[1].aff >= 55) {      const endBtn = document.createElement('button');
      endBtn.className = 'special';
      endBtn.textContent = '★ Завершить путь (концовка)';
      endBtn.onclick = () => showEnding();
      choices.appendChild(endBtn);
    }
  }

  // Special location actions
  if (STATE.location === 'ponyville' && !STATE.isNight && hasFlag('heard_about_heat') && STATE.flags.twilight_research < 1) {
    const b = document.createElement('button');
    b.textContent = 'Заглянуть в библиотеку Твайлайт (−4 ⚡)';
    b.onclick = () => {
      if (!spendEnergy(4)) return;
      setFlag('helped_library');
      addFlagNum('twilight_research', 1);
      getChar('twilight').aff += 6;
      getChar('twilight').trust += 5;
      addMemory('Помог в библиотеке с исследованием жара');
      alert('Ты помог разобрать записи. Твайлайт благодарна. Исследование продвинулось.');
      updateHeader();
      renderHub();
    };
    choices.appendChild(b);
  }

  if (STATE.location === 'everfree' && !hasFlag('saw_everfree_shadow')) {
    const b = document.createElement('button');
    b.textContent = 'Идти глубже в лес (−10 ⚡, риск)';
    b.onclick = () => {
      if (!spendEnergy(10)) return;
      setFlag('saw_everfree_shadow');
      setFlag('heat_source_hint');
      STATE.sparks += 1;
      addMemory('Увидел странную тень в Эверфри');
      alert('В глубине леса мелькнула фигура. Не пони. Или уже не совсем. Кристалл на руке вспыхнул. Ты получил намёк на источник жара.');
      updateHeader();
      renderHub();
    };
    choices.appendChild(b);
  }

  switchHubTab(document.querySelector('.tab.active')?.dataset.tab || 'loc');
}

function getStoryHint() {
  if (!hasFlag('prologue_done')) return null;
  if (STATE.flags.twilight_research >= 3 && hasFlag('heat_source_hint') && !hasFlag('climax_seen'))
    return 'Исследование готово. Найди Твайлайт.';
  if (hasFlag('climax_seen') && !hasFlag('ending_ready'))
    return 'Источник ближе. Отношения решат финал.';
  if (STATE.flags.twilight_research === 0 && hasFlag('heard_about_heat'))
    return 'Твайлайт нужна помощь. Библиотека в Понивилле.';
  if (STATE.flags.twilight_research === 1)
    return 'Исследование начато. Собирай данные, говори с Твайлайт.';
  if (STATE.flags.twilight_research >= 2 && !hasFlag('heat_source_hint'))
    return 'Нужны данные. Загляни в Эверфри.';
  if (hasFlag('heat_source_hint') && STATE.flags.twilight_research < 3)
    return 'Тень в Эверфри — расскажи Твайлайт.';
  if (STATE.flags.fluttershy_open >= 2 && STATE.flags.rainbow_challenge >= 2)
    return 'Несколько путей открыты. Выбор за тобой.';
  return null;
}

function exploreLocation() {
  const rolls = [
    () => { STATE.sparks += 1; addMemory('Нашёл искру магии'); alert('Ты нашёл слабую искру магии (+1 ✨)'); },
    () => { STATE.rep += 1; addMemory('Помог случайному пони'); alert('Ты помог прохожему. Репутация +1'); },
    () => {
      if (STATE.location === 'ponyville') {
        getChar('fluttershy').aff += 3;
        addMemory('Случайно встретил Флаттершай и поговорил мягко');
        alert('Флаттершай мелькнула среди цветов. Короткий разговор. Она чуть спокойнее.');
      } else {
        alert('Ничего особенного. Но воздух всё такой же тяжёлый.');
      }
    },
    () => {
      if (Math.random() > 0.7) {
        STATE.energy = clamp(STATE.energy - 5, 0, 100);
        alert('Странный приступ жара. Ты теряешь немного энергии.');
      } else {
        alert('Тишина. Только ветер и далёкие голоса.');
      }
    }
  ];
  rolls[Math.floor(Math.random() * rolls.length)]();
}


function renderBrothelCatalog(choices) {
  if (typeof BROTHEL_GIRLS === 'undefined') {
    choices.innerHTML = '<p class="small">Данные борделя не загружены.</p>';
    return;
  }
  const bar = document.createElement('div');
  bar.className = 'btn-row';
  bar.style.marginBottom = '10px';
  [['all','Все'],['pegasus','Пегасы'],['unicorn','Единороги'],['earth','Земные']].forEach(([k, lab]) => {
    const b = document.createElement('button');
    b.className = 'compact' + ((BROTHEL.filter || 'all') === k ? ' primary' : '');
    b.textContent = lab;
    b.onclick = () => { BROTHEL.filter = k; renderHub(); };
    bar.appendChild(b);
  });
  choices.appendChild(bar);

  const list = getBrothelFiltered();
  const grid = document.createElement('div');
  grid.className = 'stats-grid';
  list.forEach(g => {
    const card = document.createElement('div');
    card.className = 'char-card';
    card.innerHTML = `
      <div class="char-card-head">
        <div class="portrait" style="width:56px;height:56px;border-radius:50%;border:3px solid ${g.color};background:linear-gradient(145deg,${g.color}55,#1a1024);display:flex;align-items:center;justify-content:center;font-size:1.4rem;">${g.type === 'pegasus' ? '🪽' : g.type === 'unicorn' ? '🦄' : '🐴'}</div>
        <div>
          <h3>${g.name}</h3>
          <div class="small">${g.typeRu} · ${g.price} ✨</div>
        </div>
      </div>
      <p class="small">${g.tagline}</p>
      <p class="small" style="opacity:0.85">${g.bio}</p>
      <p class="small">Склонности: ${g.kinks}</p>
    `;
    const btn = document.createElement('button');
    btn.className = 'special';
    btn.style.marginTop = '8px';
    btn.textContent = `Снять (−${g.price} ✨, −15 ⚡)`;
    btn.disabled = STATE.sparks < g.price || STATE.energy < 15;
    btn.onclick = () => bookBrothelGirl(g.id);
    card.appendChild(btn);
    grid.appendChild(card);
  });
  choices.appendChild(grid);
}



function openDossier(id) {
  const c = getChar(id);
  if (!c || !c.met) return toast('Ещё не встречались', 'bad');
  const d = typeof getDossier === 'function' ? getDossier(id) : null;
  const times = c.timesIntimate || 0;
  const close = Math.round(((c.aff || 0) + (c.trust || 0) + (c.lust || 0)) / 3);
  const timesWord = times === 1 ? 'раз' : times >= 2 && times <= 4 ? 'раза' : 'раз';
  const stageLabel = c.stage >= 2 ? 'Близко' : c.stage >= 1 ? 'Знакомы' : 'Начало';

  let body = `<div class="dossier">
    <div class="dossier-hero">
      <div class="dossier-portrait">${portraitHTML(id, 'lg')}</div>
      <div class="dossier-hero-text">
        <div class="dossier-label">Досье</div>
        <h2 class="dossier-name">${d ? d.fullName : c.name}</h2>
        <p class="dossier-meta">${d ? d.species : '—'} · ${d ? d.role : '—'}</p>
        <p class="dossier-where">${d ? d.where : ''}</p>
        <div class="dossier-tags">
          <span class="dossier-tag">${stageLabel}</span>
          <span class="dossier-tag accent">Близость ~${close}%</span>
          ${times > 0 ? `<span class="dossier-tag hot">${times} ${timesWord}</span>` : '<span class="dossier-tag">Ещё без близости</span>'}
        </div>
      </div>
    </div>

    <div class="dossier-stats">
      <div class="dossier-stat">
        <div class="dossier-stat-top"><span>Привязанность</span><b>${Math.floor(c.aff)}</b></div>
        <div class="bar"><div class="bar-fill aff" style="width:${c.aff}%"></div></div>
      </div>
      <div class="dossier-stat">
        <div class="dossier-stat-top"><span>Желание</span><b>${Math.floor(c.lust)}</b></div>
        <div class="bar"><div class="bar-fill lust" style="width:${c.lust}%"></div></div>
      </div>
      <div class="dossier-stat">
        <div class="dossier-stat-top"><span>Доверие</span><b>${Math.floor(c.trust)}</b></div>
        <div class="bar"><div class="bar-fill trust" style="width:${c.trust}%"></div></div>
      </div>
    </div>

    <div class="dossier-row">
      <div class="dossier-chip">
        <span class="dossier-chip-label">Близость</span>
        <span class="dossier-chip-val">${times} ${timesWord}</span>
      </div>
      <div class="dossier-chip">
        <span class="dossier-chip-label">Последний раз</span>
        <span class="dossier-chip-val">${c.lastIntimateDay ? 'День ' + c.lastIntimateDay : '—'}</span>
      </div>
      <div class="dossier-chip">
        <span class="dossier-chip-label">Стадия</span>
        <span class="dossier-chip-val">${c.stage || 0}</span>
      </div>
    </div>`;

  if (d) {
    body += `
    <div class="dossier-section">
      <div class="dossier-section-title">Характер</div>
      <p class="dossier-text">${d.nature}</p>
    </div>
    <div class="dossier-section notes">
      <div class="dossier-section-title">Заметки</div>
      <p class="dossier-text">${d.notes}</p>
    </div>`;
  } else {
    body += `<p class="small" style="margin-top:12px">Досье пока пустое.</p>`;
  }
  body += `</div>`;

  $('modalTitle').textContent = '';
  $('modalBody').innerHTML = body;
  $('modal').classList.add('show');
  const box = document.querySelector('.modal-box');
  if (box) box.classList.add('dossier-modal');
}

function switchHubTab(tab) {
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  const content = $('hubContent');
  content.innerHTML = '';

  if (tab === 'loc') {
    Object.keys(LOCATIONS).forEach(l => {
      if (l === STATE.location) return;
      const cost = l === 'everfree' ? 12 : l === 'brothel' ? 10 : 8;
      const btn = document.createElement('button');
      btn.textContent = `Перейти: ${LOCATIONS[l].name} (−${cost} ⚡)`;
      btn.disabled = STATE.energy < cost;
      btn.onclick = () => {
        if (l === 'brothel' && STATE.rep < (BROTHEL && BROTHEL.unlockRep || 8)) {
          return toast('Нужна репутация ≥ ' + (BROTHEL.unlockRep || 8), 'bad');
        }
        if (!spendEnergy(cost)) return;
        STATE.location = l;
        if (l === 'canterlot') {
          if (!getChar('rarity').unlocked) {
            getChar('rarity').unlocked = true;
            toast('Кантерлот: Рэрити доступна');
          }
          if (!getChar('trixie').unlocked) {
            getChar('trixie').unlocked = true;
            toast('На площади — фургон Трикси');
          }
        }
        if (l === 'brothel') toast('Алый Фонарь. Анкеты на стойке.');
        updateHeader();
        renderHub();
      };
      content.appendChild(btn);
    });
  } else if (tab === 'chars') {
    const period = STATE.isNight ? 'night' : 'day';
    const available = CHAR_LOCS[period][STATE.location] || [];
    const grid = document.createElement('div');
    grid.className = 'stats-grid';
    Object.entries(STATE.chars).forEach(([id, c]) => {
      if (!c.unlocked) return;
      const card = document.createElement('div');
      card.className = 'char-card';
      const here = available.includes(id);
      card.innerHTML = `
        <div class="char-card-head">
          ${portraitHTML(id)}
          <div>
            <h3>${c.name} ${here ? '📍' : ''}</h3>
            <div class="small">${c.stage > 0 ? '★'.repeat(Math.min(c.stage, 3)) + ' близость' : 'знакомы'}</div>
          </div>
        </div>
        <div class="bar-wrap">Привязанность <b>${c.aff}</b><div class="bar"><div class="bar-fill aff" style="width:${c.aff}%"></div></div></div>
        <div class="bar-wrap">Желание <b>${c.lust}</b><div class="bar"><div class="bar-fill lust" style="width:${c.lust}%"></div></div></div>
        <div class="bar-wrap">Доверие <b>${c.trust}</b><div class="bar"><div class="bar-fill trust" style="width:${c.trust}%"></div></div></div>
      `;
      if (here) {
        const talk = document.createElement('button');
        const canInt = canIntimate(id);
        talk.textContent = STATE.isNight && canInt ? '★ Подойти ближе...' : 'Поговорить';
        if (canInt && STATE.isNight) talk.className = 'special';
        talk.style.marginTop = '8px';
        talk.onclick = () => startDialogue(id);
        card.appendChild(talk);
      } else {
        const note = document.createElement('p');
        note.className = 'small';
        note.textContent = 'Сейчас не здесь';
        card.appendChild(note);
      }
      grid.appendChild(card);
    });
    content.appendChild(grid);
  } else if (tab === 'inv') {
    if (!STATE.inventory.length) {
      content.innerHTML = '<p>Инвентарь пуст.</p>';
    } else {
      let html = '<p><b>Инвентарь</b></p>';
      STATE.inventory.forEach(item => {
        const ef = ITEM_EFFECTS[item];
        html += `<div class="prep-item" style="cursor:default"><span><b>${item}</b>${ef ? ' — ' + ef.prep : ''}</span></div>`;
      });
      html += '<p class="small" style="margin-top:8px">Перед близостью можно выбрать до двух предметов.</p>';
      content.innerHTML = html;
    }
    if (STATE.inventory.includes('старая книга') && hasFlag('heard_about_heat')) {
      const b = document.createElement('button');
      b.textContent = 'Изучить старую книгу (−3 ⚡)';
      b.onclick = () => {
        if (!spendEnergy(3)) return;
        STATE.inventory = STATE.inventory.filter(x => x !== 'старая книга');
        STATE.inventory.push('записи о жаре');
        setFlag('heat_source_hint');
        addMemory('Изучил старую книгу и нашёл упоминание о древнем жаре');
        toast('В книге — упоминания древнего голода связи');
        updateHeader();
        renderHub();
      };
      content.appendChild(b);
    }
  } else if (tab === 'story') {
    content.innerHTML = renderStoryPanel();
    const row = document.createElement('div');
    row.className = 'btn-row';
    row.style.marginTop = '12px';
    const b1 = document.createElement('button');
    b1.className = 'compact';
    b1.textContent = 'Подробнее о прогрессе';
    b1.onclick = showStoryStatus;
    row.appendChild(b1);
    content.appendChild(row);
  } else if (tab === 'notes') {
    const met = Object.entries(STATE.chars).filter(([, c]) => c.met);
    if (!met.length) {
      content.innerHTML = `<div class="save-panel notes-empty">
        <div class="notes-empty-icon">📓</div>
        <h3>Блокнот пуст</h3>
        <p class="small">Поговори с кем-нибудь — здесь появится запись.</p>
      </div>`;
    } else {
      let html = `<div class="notes-header">
        <h3>Блокнот</h3>
        <p class="small">Встречено: ${met.length}. Жми карточку — полное досье.</p>
      </div>
      <div class="notes-grid">`;
      met.forEach(([id, c]) => {
        const d = typeof getDossier === 'function' ? getDossier(id) : null;
        const times = c.timesIntimate || 0;
        const close = Math.round(((c.aff || 0) + (c.trust || 0) + (c.lust || 0)) / 3);
        html += `<button type="button" class="notes-card" onclick="openDossier('${id}')">
          <div class="notes-card-top">
            ${portraitHTML(id)}
            <div class="notes-card-info">
              <div class="notes-card-name">${c.name}</div>
              <div class="notes-card-sub">${d ? d.species : '—'}</div>
              <div class="notes-card-badges">
                <span class="nb">${close}%</span>
                ${times > 0 ? `<span class="nb hot">${times}×</span>` : ''}
              </div>
            </div>
          </div>
          <div class="notes-mini-bars">
            <div class="bar"><div class="bar-fill aff" style="width:${c.aff}%"></div></div>
            <div class="bar"><div class="bar-fill lust" style="width:${c.lust}%"></div></div>
            <div class="bar"><div class="bar-fill trust" style="width:${c.trust}%"></div></div>
          </div>
        </button>`;
      });
      html += `</div>`;
      content.innerHTML = html;
    }
  } else if (tab === 'self') {
    const p = STATE.player;
    const ar = Math.floor(p.arousal || 0);
    const wh = typeof WORLD !== 'undefined' ? Math.floor(WORLD.heat) : 0;
    const ctrl = Math.floor(p.control || 50);
    const foc = Math.floor(p.focus || 50);
    const metN = Object.values(STATE.chars).filter(c => c.met).length;
    const intN = Object.values(STATE.chars).reduce((s, c) => s + (c.timesIntimate || 0), 0);
    const soft = STATE.flags.soft_path || 0;
    const dark = STATE.flags.dark_path || 0;
    const soloLeft = Math.max(0, 2 - (p.soloToday || 0));
    let heatState = 'spok';
    let heatText = 'Спокоен. Голова ясная.';
    if (ar >= 85) { heatState = 'crit'; heatText = 'Критический жар. Нужна разрядка или близость.'; }
    else if (ar >= 70) { heatState = 'high'; heatText = 'Ритм в сценах плывёт. Пора сбросить.'; }
    else if (ar >= 30) { heatState = 'mid'; heatText = 'Тянет к близости. Реплики смелее.'; }
    let worldText = 'Мир пока держится.';
    if (wh >= 60) worldText = 'Опасно. События жёстче, магия трещит.';
    else if (wh >= 35) worldText = 'Давление растёт. Волны жара чаще.';

    content.innerHTML = `
      <div class="self-panel">
        <div class="self-hero">
          <div class="self-avatar">${p.species === 'pegasus' ? '🪽' : p.species === 'unicorn' ? '🦄' : '🐴'}</div>
          <div>
            <div class="self-label">${typeof speciesLabel === 'function' ? speciesLabel(p.species || 'earth') : 'Странник'}</div>
            <h2 class="self-name">${p.name}</h2>
            <p class="self-sub">День ${STATE.day} · ${STATE.isNight ? 'Ночь' : 'День'} · ${LOCATIONS[STATE.location].name}</p>
            <div class="self-tags">
              <span class="self-tag">${typeof speciesLabel === 'function' ? speciesLabel(p.species || 'earth') : ''}</span>
              <span class="self-tag">Стиль: ${p.style}</span>
              <span class="self-tag">Встречено: ${metN}</span>
              <span class="self-tag hot">Близость: ${intN}×</span>
            </div>
          </div>
        </div>

        <div class="self-meters">
          <div class="self-meter">
            <div class="self-meter-top"><span>Твой жар</span><b class="heat-${heatState}">${ar}</b></div>
            <div class="bar tall"><div class="bar-fill lust" style="width:${ar}%"></div></div>
            <p class="self-hint">${heatText}</p>
          </div>
          <div class="self-meter">
            <div class="self-meter-top"><span>Мировой жар</span><b>${wh}</b></div>
            <div class="bar tall"><div class="bar-fill" style="width:${wh}%;background:linear-gradient(90deg,#7c3aed,#ff6bcb)"></div></div>
            <p class="self-hint">${worldText}</p>
          </div>
        </div>

        <div class="self-chips">
          <div class="self-chip">
            <span class="self-chip-l">Контроль</span>
            <span class="self-chip-v">${ctrl}</span>
            <div class="bar"><div class="bar-fill trust" style="width:${ctrl}%"></div></div>
          </div>
          <div class="self-chip">
            <span class="self-chip-l">Фокус</span>
            <span class="self-chip-v">${foc}</span>
            <div class="bar"><div class="bar-fill aff" style="width:${foc}%"></div></div>
          </div>
          <div class="self-chip">
            <span class="self-chip-l">Энергия</span>
            <span class="self-chip-v">${Math.floor(STATE.energy)}</span>
            <div class="bar"><div class="bar-fill" style="width:${STATE.energy}%;background:linear-gradient(90deg,#3db8ff,#7ec8ff)"></div></div>
          </div>
        </div>

        <div class="self-path">
          <div class="self-path-item soft"><span>Мягкий путь</span><b>${soft}</b></div>
          <div class="self-path-item dark"><span>Жёсткий путь</span><b>${dark}</b></div>
          <div class="self-path-item"><span>Искры</span><b>${STATE.sparks}</b></div>
          <div class="self-path-item"><span>Репутация</span><b>${STATE.rep}</b></div>
        </div>

        <div class="self-action">
          <div class="self-action-text">
            <b>Разрядка</b>
            <span class="small">QTE · сегодня ещё ${soloLeft} из 2 · −8 ⚡</span>
          </div>
          <button class="special" onclick="startSolo()" ${ar < 15 || soloLeft <= 0 ? 'disabled' : ''}>
            ${ar < 15 ? 'Ещё рано' : soloLeft <= 0 ? 'Лимит на сегодня' : 'Сбросить жар'}
          </button>
        </div>
      </div>
    `;
  } else if (tab === 'save') {
    content.innerHTML = `
      <div class="save-panel">
        <h3>Сохранение</h3>
        <p class="small">Прогресс пишется в память браузера. Экспорт — файл на компьютер, если нужно перенести или сделать запасную копию.</p>
        <div class="btn-row">
          <button class="primary compact" onclick="saveGame()">Сохранить</button>
          <button class="compact" onclick="loadFromStorage()">Загрузить</button>
        </div>
        <div class="btn-row">
          <button class="compact" onclick="exportSave()">Экспорт в файл</button>
          <button class="compact" onclick="document.getElementById('importFile').click()">Импорт из файла</button>
        </div>
        <div id="saveStatus" class="save-status"></div>
      </div>
      <div class="save-panel" style="margin-top:12px">
        <h3>Время суток</h3>
        <p class="small">Смена дня и ночи стоит 1 энергии. Ночью доступны личные встречи.</p>
        <div class="btn-row">
          <button class="compact special" onclick="toggleNight()">Сменить: сейчас ${STATE.isNight ? 'ночь' : 'день'}</button>
        </div>
      </div>
      <div class="save-panel" style="margin-top:12px">
        <h3>Справка</h3>
        <div class="btn-row">
          <button class="ghost compact" onclick="showHelp()">Как играть</button>
          <button class="ghost compact" onclick="showStoryStatus()">Статус сюжета</button>
        </div>
      </div>
    `;
  }
}

function renderStoryPanel() {
  let html = '<div class="story-box"><b>Текущий прогресс</b></div>';
  html += `<p>День ${STATE.day}. Стиль игрока: <b>${STATE.player.style}</b></p>`;
  html += '<p>Флаги:</p><div>';
  const labels = {
    heard_about_heat: 'Узнал о жаре',
    twilight_research: `Исследование Твайлайт: ${STATE.flags.twilight_research}/3`,
    fluttershy_open: `Открытость Флаттершай: ${STATE.flags.fluttershy_open}/3`,
    rainbow_challenge: `Вызов Рэйнбоу: ${STATE.flags.rainbow_challenge}/3`,
    heat_source_hint: 'Намёк на источник',
    saw_everfree_shadow: 'Тень в Эверфри',
    helped_library: 'Помог в библиотеке',
    promised_twilight: 'Обещание Твайлайт',
    dominance_accepted: 'Принял доминирование',
  };
  Object.entries(labels).forEach(([k, lab]) => {
    if (STATE.flags[k]) html += `<span class="flag-badge">${lab}</span>`;
  });
  html += '</div>';
  html += `<p class="small" style="margin-top:8px">Мягкий путь: ${STATE.flags.soft_path || 0} · Тёмный путь: ${STATE.flags.dark_path || 0}</p>`;
  if (STATE.memory.length) {
    html += '<p style="margin-top:8px"><b>Недавние решения:</b></p><ul style="padding-left:18px;font-size:0.9rem">';
    STATE.memory.slice(-6).reverse().forEach(m => { html += `<li>${m}</li>`; });
    html += '</ul>';
  }
  return html;
}

function canIntimate(id) {
  const c = getChar(id);
  const needLust = id === 'fluttershy' ? 35 : id === 'twilight' ? 40 : 45;
  const needTrust = id === 'rainbow' ? 30 : 35;
  return c.lust >= needLust && c.trust >= needTrust && c.aff >= 25 && STATE.energy >= 20;
}

function offerIntimate(id) {
  STATE.pendingIntimate = id;
  // Preparation if player has usable items
  const usable = STATE.inventory.filter(i => ITEM_EFFECTS[i]);
  if (usable.length === 0) {
    if (!spendEnergy(20)) return toast('Мало энергии', 'bad');
    startIntimate(id);
    return;
  }
  $('modalTitle').textContent = 'Подготовка';
  let html = '<p class="small">Можно взять с собой до двух предметов. Они изменят тон сцены.</p>';
  usable.forEach((item, idx) => {
    const ef = ITEM_EFFECTS[item];
    html += `<label class="prep-item"><input type="checkbox" value="${item}" data-prep> <span><b>${ef.label}</b> — ${ef.prep}</span></label>`;
  });
  html += '<button class="primary" style="width:100%;margin-top:12px" id="prepGo">Продолжить</button>';
  $('modalBody').innerHTML = html;
  $('modal').classList.add('show');
  $('prepGo').onclick = () => {
    const checked = [...document.querySelectorAll('[data-prep]:checked')].map(x => x.value).slice(0, 2);
    STATE.prepItems = checked;
    closeModal();
    if (!spendEnergy(20)) return toast('Мало энергии', 'bad');
    startIntimate(id);
  };
}

// ==================== DIALOGUE SYSTEM ====================
function startDialogue(id) {
  const c = getChar(id);
  c.met = true;
  STATE.currentDlg = id;
  STATE.talkActs = 0;
  showScreen('screen-dialogue');
  $('dlgName').innerHTML = `<div class="dlg-head">${portraitHTML(id)}${c.name}</div>`;
  const log = $('dlgText');
  log.innerHTML = '';
  const choices = $('dlgChoices');
  choices.innerHTML = '';

  // Opening based on stage + flags + memory
  const open = getOpening(id);
  appendLog(log, open);

  // Memory callback
  if (STATE.memory.length && Math.random() > 0.45) {
    const relevant = STATE.memory.filter(m => m.toLowerCase().includes(c.name.split(' ')[0].toLowerCase()) || m.includes('жар') || m.includes('обещал'));
    if (relevant.length) {
      const mem = relevant[relevant.length - 1];
      appendLog(log, `(вскользь: «${mem}»)`, 'sys');
    }
  }

  buildDialogueChoices(id);
}

function getOpening(id) {
  const c = getChar(id);
  const night = STATE.isNight;

  if (id === 'twilight') {
    if (STATE.flags.twilight_research >= 2 && hasFlag('heat_source_hint')) {
      return 'Резко поднимает голову. «Эверфри. Чувствую магию. Говори.»';
    }
    if (c.stage >= 2) {
      return night
        ? 'Закрывает книгу. «Расчёты на сегодня кончены. Можешь остаться.»'
        : '«Данные всё ещё вразнос. С тобой хотя бы не одной.»';
    }
    if (hasFlag('promised_twilight')) {
      return '«Обещал помочь — и пришёл. Есть гипотезы. И проблемы.»';
    }
    return night
      ? 'Свет рога. «Ночь — плохое время для опытов. Или самое честное.»'
      : 'Отрывается от свитков. «А. Ты. Как раз считала распространение жара.»';
  }

  if (id === 'fluttershy') {
    if (c.stage >= 2) {
      return night
        ? 'Почти не вздрагивает. «Я… ждала.»'
        : 'Улыбка увереннее. «Звери беспокойные. Я тоже.»';
    }
    if (STATE.flags.fluttershy_open >= 1) {
      return '«Снова ты… Это хорошо. Не страшно.»';
    }
    return night
      ? 'Шёпот. «Ночью всё громче. И ближе.»'
      : 'Смотрит в сторону. «П-привет… Все странные. Я тоже.»';
  }

  if (id === 'rainbow') {
    if (c.stage >= 2) {
      return night
        ? 'Ухмылка. «Без зрителей. Не подведи.»'
        : '«Вернулся. Надеюсь, не тормозить.»';
    }
    if (STATE.flags.rainbow_challenge >= 1) {
      return '«Помнишь вызов? Жду, когда покажешь уровень.»';
    }
    return night
      ? 'Крылья в стороны. «Ночью быстрее. И честнее. Не тяни.»'
      : '«Жар и тебя зацепил. Не притворяйся.»';
  }

  if (id === 'rarity') {
    if (!hasFlag('rarity_met')) {
      setFlag('rarity_met');
      return 'Оценивает с головы до копыт. «Darling, даже в жаре можно держать стиль. Ты… занятный.»';
    }
    return night
      ? '«Ночь — для красивых решений. Или ошибок.»'
      : '«Кантерлот не спит. Я тоже. Зачем пожаловал?»';
  }

  if (id === 'trixie') {
    if (c.stage >= 2) {
      return night
        ? 'Шляпа сбоку. «Публики нет. Только Великая и Могучая… и ты.»'
        : '«О, зритель. Надеюсь, готов аплодировать.»';
    }
    return night
      ? '«Ночной бенефис. Без зрителей — честнее.»'
      : 'Разворачивается с пафосом. «Великая и Могучая Трикси снизошла. Не тупи.»';
  }

  if (id === 'applejack') {
    if (c.stage >= 2) {
      return night
        ? 'Шляпа на глаза. «Ну… раз уж пришёл. Без фальши.»'
        : '«Эй. Работы полно, но минутка найдётся.»';
    }
    return night
      ? '«Ночью на ферме тихо. Говори прямо.»'
      : 'Вытирает лоб. «Жар и яблоки — плохая смесь. Но держимся.»';
  }

  if (id === 'pinkie') {
    if (c.stage >= 2) {
      return night
        ? 'Прыжок на месте. «Ты! Я знала, что придёшь! Почти.»'
        : '«Вечеринка сама себя не устроит! …Или устроит. Привет!»';
    }
    return night
      ? 'Шёпотом, но громко: «Ночные гости — лучшие гости!»'
      : '«Новый пони! Ой, не пони? Всё равно! Привет!»';
  }

  if (id === 'derpy') {
    if (c.stage >= 2) {
      return night
        ? '«О! Ты. Я специально летела медленнее, чтобы не промахнуться мимо дома.»'
        : 'Улыбка. Письма слегка помяты. «Доставка… почти вовремя. И ты тут. Удобно.»';
    }
    return night
      ? '«Ночью облака мягче. И… люди добрее. Кажется.»'
      : 'Врезается взглядом в тебя — одним глазом. «Привет! Ты не посылка. Хотя… можно обнять как посылку?»';
  }

  return '...';
}

function buildDialogueChoices(id) {
  const log = $('dlgText');
  const choices = $('dlgChoices');
  choices.innerHTML = '';
  const c = getChar(id);
  const opts = [];

  // Max 3 meaningful actions per conversation — no spam
  if (talkTired()) {
    appendLog(log, 'Разговор выдыхается. Пора отпустить — или вернуться позже.', 'sys');
    if (STATE.isNight && canIntimate(id)) {
      opts.push({
        text: '★ Остаться на ночь',
        cost: 20,
        special: true,
        show: true,
        fn: () => offerIntimate(id)
      });
    }
    opts.filter(o => o.show !== false).forEach(o => {
      const btn = document.createElement('button');
      btn.textContent = o.text + (o.cost ? ` (−${o.cost} ⚡)` : '');
      btn.disabled = STATE.energy < (o.cost || 0);
      if (o.special) btn.classList.add('special');
      btn.onclick = o.fn;
      choices.appendChild(btn);
    });
    return;
  }

  // === UNIVERSAL ===
  opts.push({
    text: 'Как ты с этим жаром?',
    cost: 2,
    show: !wasDiscussed(id, 'heat_ask'),
    fn: () => {
      if (!spendEnergy(2)) return;
      markDiscussed(id, 'heat_ask');
      noteTalkAct();
      changeStat(id, 'aff', 3);
      if (id === 'twilight') {
        appendLog(log, 'Отводит глаза. «Таблицы. Графики. Иногда помогает. Иногда — нет.»');
        changeStat(id, 'lust', 4);
      } else if (id === 'fluttershy') {
        appendLog(log, '«Я… стараюсь не… Но оно само.» Тише некуда.');
        changeStat(id, 'trust', 3); changeStat(id, 'lust', 3);
      } else if (id === 'rainbow') {
        appendLog(log, 'Фыркает. «Быстрее летаю. Сильнее бью. Хватает? Не всегда.»');
        changeStat(id, 'lust', 6);
      } else if (id === 'trixie') {
        appendLog(log, '«Жар? Для Великой — топливо. Для шоу.»');
        changeStat(id, 'lust', 7);
      } else if (id === 'applejack') {
        appendLog(log, '«Работой глушу. Не всегда выходит.»');
        changeStat(id, 'lust', 5); changeStat(id, 'trust', 2);
      } else if (id === 'pinkie') {
        appendLog(log, '«Вечеринками! …Иногда не хватает.»');
        changeStat(id, 'lust', 6);
      } else if (id === 'derpy') {
        appendLog(log, '«Ой… я просто обнимаю облака крепче. И иногда почтовые сумки.»');
        changeStat(id, 'lust', 5); changeStat(id, 'aff', 2);
      } else {
        appendLog(log, '«Darling, ткань спасает имидж. Не нервы.»');
        changeStat(id, 'lust', 4);
      }
      addMemory(`Спросил ${c.name} о жаре`);
      refreshDlg(id);
    }
  });

  opts.push({
    text: 'Могу чем-то помочь',
    cost: 4,
    show: !wasDiscussed(id, 'help_offer'),
    fn: () => {
      if (!spendEnergy(4)) return;
      markDiscussed(id, 'help_offer');
      changeStat(id, 'aff', 7);
      changeStat(id, 'trust', 5);
      STATE.rep += 1;
      appendLog(log, 'Кивок. Короткий. «Спасибо. Редко кто просто… помогает.»');
      addMemory(`Предложил помощь ${c.name}`);
      refreshDlg(id);
    }
  });

  opts.push({
    text: 'Стоп — и я остановлюсь. Обещаю',
    cost: 0,
    show: c.trust < 70 && !wasDiscussed(id, 'boundaries'),
    fn: () => {
      markDiscussed(id, 'boundaries');
      changeStat(id, 'trust', 10);
      if (id === 'fluttershy') {
        setFlag('promised_fluttershy');
        addFlagNum('fluttershy_open', 1);
      }
      if (id === 'twilight') setFlag('promised_twilight');
      appendLog(log, 'Выдыхает. «Хорошо, что сказал. Вслух.»', 'good');
      addMemory(`Пообещал уважать границы ${c.name}`);
      STATE.flags.soft_path = (STATE.flags.soft_path || 0) + 1;
      refreshDlg(id);
    }
  });

  // === FLIRT (once per day each) ===
  opts.push({
    text: 'Лёгкий флирт',
    cost: 3,
    show: !wasDiscussed(id, 'flirt_soft'),
    fn: () => {
      if (!spendEnergy(3)) return;
      markDiscussed(id, 'flirt_soft');
      if (c.trust < 18) {
        changeStat(id, 'trust', -6);
        changeStat(id, 'lust', -3);
        appendLog(log, 'Шаг назад. «Не сейчас.»', 'bad');
      } else {
        changeStat(id, 'lust', 9);
        changeStat(id, 'aff', 3);
        appendLog(log, 'Румянец. Взгляд не сразу убегает.');
      }
      addMemory(`Мягко флиртовал с ${c.name}`);
      addArousal(6);
      refreshDlg(id);
    }
  });

  opts.push({
    text: 'Сказать прямо, чего хочешь',
    cost: 4,
    show: !wasDiscussed(id, 'flirt_hard') && (c.lust >= 20 || c.trust >= 25 || STATE.player.style === 'bold'),
    fn: () => {
      if (!spendEnergy(4)) return;
      markDiscussed(id, 'flirt_hard');
      if (c.trust < 30) {
        changeStat(id, 'trust', -10);
        appendLog(log, 'Стенка. «Нет. Не в таком тоне.»', 'bad');
        STATE.flags.dark_path = (STATE.flags.dark_path || 0) + 1;
      } else {
        changeStat(id, 'lust', 14);
        changeStat(id, 'aff', 2);
        appendLog(log, 'Резкий выдох. «Прямолинейно. Действует.»');
        if (id === 'rainbow') addFlagNum('rainbow_challenge', 1);
      }
      addMemory(`Прямо флиртовал с ${c.name}`);
      addArousal(10);
      refreshDlg(id);
    }
  });

  // === CHARACTER SPECIFIC ARCS ===

  // TWILIGHT RESEARCH ARC
  if (id === 'twilight') {
    if (hasFlag('heat_source_hint') && STATE.flags.twilight_research < 3) {
      opts.push({
        text: 'Про тень в Эверфри',
        cost: 3,
        show: !wasDiscussed(id, 'everfree_report'),
        fn: () => {
          if (!spendEnergy(3)) return;
          markDiscussed(id, 'everfree_report');
          addFlagNum('twilight_research', 1);
          c.aff += 10;
          c.trust += 8;
          c.lust += 5;
          c.stage = Math.max(c.stage, 1);
          appendLog(log, 'Бледнеет — и оживает. «Ключ. Древний голод. Не дружба — жрать связь.»');
          appendLog(log, 'Хватает за плечо. «Спасибо. Теперь есть куда копать.»', 'good');
          addMemory('Рассказал Твайлайт о находках в Эверфри');
          if (STATE.flags.twilight_research >= 3) {
            appendLog(log, 'Голос ниже. «Почти всё. Осталось… проверить на себе.»');
            c.stage = 2;
          }
          refreshDlg(id);
        }
      });
    }
    if (STATE.flags.twilight_research >= 1) {
      opts.push({
        text: 'Предложить «эксперимент» вдвоём',
        cost: 6,
        show: c.trust >= 35 && !wasDiscussed(id, 'experiment'),
        fn: () => {
          if (!spendEnergy(6)) return;
          markDiscussed(id, 'experiment');
          c.aff += 8;
          c.lust += 10;
          c.trust += 4;
          addFlagNum('twilight_research', 1);
          appendLog(log, '«Контролируемые условия. Согласна. Протокол — мой.»');
          addMemory('Предложил Твайлайт совместный эксперимент');
          if (c.lust >= 45 && STATE.isNight) {
            appendLog(log, 'Тише: «Может… ночью.»');
          }
          refreshDlg(id);
        }
      });
    }
    if (c.stage >= 1 && c.trust >= 40) {
      opts.push({
        text: 'Боишься потерять контроль?',
        cost: 2,
        show: !wasDiscussed(id, 'control_fear'),
        fn: () => {
          if (!spendEnergy(2)) return;
          markDiscussed(id, 'control_fear');
          c.trust += 6;
          c.lust += 5;
          appendLog(log, 'Пауза. «Боюсь. Больше — не понять. Иногда проще сдаться.»');
          addMemory('Говорил с Твайлайт о страхе потери контроля');
          refreshDlg(id);
        }
      });
    }
  }

  // FLUTTERSHY OPENNESS ARC
  if (id === 'fluttershy') {
    opts.push({
      text: 'Просто посидеть рядом. Тихо',
      cost: 2,
      show: !wasDiscussed(id, 'sit_quiet'),
      fn: () => {
        if (!spendEnergy(2)) return;
        markDiscussed(id, 'sit_quiet');
        c.aff += 9;
        c.trust += 7;
        addFlagNum('fluttershy_open', 1);
        appendLog(log, 'Садится ближе. «Ты не торопишь. Редко кто так.»', 'good');
        addMemory('Был очень нежен с Флаттершай');
        STATE.flags.soft_path = (STATE.flags.soft_path || 0) + 1;
        if (STATE.flags.fluttershy_open >= 2) c.stage = Math.max(c.stage, 1);
        if (STATE.flags.fluttershy_open >= 3) c.stage = 2;
        refreshDlg(id);
      }
    });
    if (STATE.flags.fluttershy_open >= 1) {
      opts.push({
        text: 'Ты сильнее, чем кажешься',
        cost: 3,
        show: !wasDiscussed(id, 'hidden_str'),
        fn: () => {
          if (!spendEnergy(3)) return;
          markDiscussed(id, 'hidden_str');
          c.aff += 5;
          c.trust += 8;
          c.lust += 6;
          appendLog(log, 'Поднимает глаза — там сталь. «Умею быть жёсткой. Ради своих. И… если доверяю.»');
          addFlagNum('fluttershy_open', 1);
          addMemory('Узнал о скрытой силе Флаттершай');
          refreshDlg(id);
        }
      });
    }
    if (c.stage >= 1 && STATE.isNight) {
      opts.push({
        text: 'Ты мне небезразлична',
        cost: 3,
        show: !wasDiscussed(id, 'confess_fs'),
        fn: () => {
          if (!spendEnergy(3)) return;
          markDiscussed(id, 'confess_fs');
          c.aff += 12;
          c.lust += 8;
          c.trust += 5;
          appendLog(log, 'Щёки горят. «Я тоже. Давно. Боялась.»');
          addMemory('Признался Флаттершай в симпатии');
          refreshDlg(id);
        }
      });
    }
  }

  // RAINBOW CHALLENGE / DOMINANCE ARC
  if (id === 'rainbow') {
    opts.push({
      text: 'Вызов. Кто быстрее и жёстче',
      cost: 5,
      show: !wasDiscussed(id, 'challenge') || STATE.flags.rainbow_challenge < 3,
      fn: () => {
        if (!spendEnergy(5)) return;
        markDiscussed(id, 'challenge');
        changeStat(id, 'lust', 11);
        changeStat(id, 'aff', 5);
        addFlagNum('rainbow_challenge', 1);
        appendLog(log, 'Азарт в глазах. «Вот так. Проиграешь — мои правила. Выиграешь — посмотрим.»');
        addMemory('Вызвал Рэйнбоу на спор');
        if (STATE.flags.rainbow_challenge >= 2) c.stage = Math.max(c.stage, 1);
        if (STATE.flags.rainbow_challenge >= 3) {
          c.stage = 2;
          if (!STATE.inventory.includes('перо Рэйнбоу')) {
            STATE.inventory.push('перо Рэйнбоу');
            toast('Рэйнбоу бросила тебе перо — на память о вызове');
          }
        }
        refreshDlg(id);
      }
    });
    if (STATE.flags.rainbow_challenge >= 1) {
      opts.push({
        text: 'Ок. Ты задаёшь темп',
        cost: 3,
        show: !wasDiscussed(id, 'dom_yes'),
        fn: () => {
          if (!spendEnergy(3)) return;
          markDiscussed(id, 'dom_yes');
          setFlag('dominance_accepted');
          c.lust += 10;
          c.trust += 6;
          c.aff += 4;
          STATE.flags.dark_path = (STATE.flags.dark_path || 0) + 1;
          appendLog(log, 'Шире ухмылка. «Ок. Потом не ной.»');
          addMemory('Принял доминирующий темп Рэйнбоу');
          refreshDlg(id);
        }      });
      opts.push({
        text: 'Контроль — общий',
        cost: 3,
        show: !wasDiscussed(id, 'dom_eq'),
        fn: () => {
          if (!spendEnergy(3)) return;
          markDiscussed(id, 'dom_eq');
          c.trust += 8;
          c.aff += 6;
          c.lust += 5;
          STATE.flags.soft_path = (STATE.flags.soft_path || 0) + 1;
          appendLog(log, 'Прищур. Кивок. «Неожиданно. Ладно. Пойдёт.»');
          addMemory('Настоял на равном контроле с Рэйнбоу');
          refreshDlg(id);
        }
      });
    }
  }

  // RARITY
  if (id === 'rarity') {
    opts.push({
      text: 'Комплимент — со вкусом',
      cost: 3,
      show: !wasDiscussed(id, 'compliment'),
      fn: () => {
        if (!spendEnergy(3)) return;
        markDiscussed(id, 'compliment');
        changeStat(id, 'aff', 8);
        changeStat(id, 'lust', 6);
        changeStat(id, 'trust', 3);
        appendLog(log, '«Darling, язык подвешен. Ещё чуть-чуть — и я добрею.»');
        addMemory('Сделал комплимент Рэрити');
        if (c.aff >= 30 && !STATE.inventory.includes('шёлковая лента')) {
          STATE.inventory.push('шёлковая лента');
          toast('Рэрити подарила шёлковую ленту');
        }
        refreshDlg(id);
      }
    });
    if (c.aff >= 25) {
      opts.push({
        text: 'Что для тебя власть?',
        cost: 4,
        show: !wasDiscussed(id, 'power'),
        fn: () => {
          if (!spendEnergy(4)) return;
          markDiscussed(id, 'power');
          changeStat(id, 'trust', 7);
          changeStat(id, 'lust', 5);
          appendLog(log, 'Серьёзнее обычного. «Власть — когда хотят и боятся сразу. Жар упрощает. И портит.»');
          addMemory('Говорил с Рэрити о власти');
          refreshDlg(id);
        }
      });
    }
  }

  // TRIXIE
  if (id === 'trixie') {
    opts.push({
      text: 'Похвалить номер',
      cost: 3,
      show: !wasDiscussed(id, 'show'),
      fn: () => {
        if (!spendEnergy(3)) return;
        markDiscussed(id, 'show');
        changeStat(id, 'aff', 6);
        changeStat(id, 'lust', 8);
        changeStat(id, 'trust', 2);
        appendLog(log, 'Гордо вскидывает морду. «Разумеется. Великая и Могучая не ошибается.»');
        addMemory('Похвалил шоу Трикси');
        c.stage = Math.max(c.stage, 1);
        refreshDlg(id);
      }
    });
    opts.push({
      text: 'Подколоть насчёт Твайлайт',
      cost: 3,
      show: !wasDiscussed(id, 'rival'),
      fn: () => {
        if (!spendEnergy(3)) return;
        markDiscussed(id, 'rival');
        changeStat(id, 'lust', 10);
        changeStat(id, 'aff', 4);
        appendLog(log, 'Цокает. «Она? Пусть сидит в книгах. Я — на сцене. И… иногда не только.»');
        addMemory('Подколол Трикси про Твайлайт');
        refreshDlg(id);
      }
    });
    if (c.trust >= 25) {
      opts.push({
        text: 'Спросить, что за маской',
        cost: 4,
        show: !wasDiscussed(id, 'mask'),
        fn: () => {
          if (!spendEnergy(4)) return;
          markDiscussed(id, 'mask');
          changeStat(id, 'trust', 10);
          changeStat(id, 'aff', 6);
          appendLog(log, 'Тише. «Маска удобная. Без неё… тоже можно. Редко.»');
          c.stage = Math.max(c.stage, 1);
          refreshDlg(id);
        }
      });
    }
  }

  // APPLEJACK
  if (id === 'applejack') {
    opts.push({
      text: 'Помочь с яблоками',
      cost: 5,
      show: !wasDiscussed(id, 'work'),
      fn: () => {
        if (!spendEnergy(5)) return;
        markDiscussed(id, 'work');
        changeStat(id, 'aff', 10);
        changeStat(id, 'trust', 8);
        STATE.rep += 1;
        appendLog(log, 'Кивок. «Вот это по-нашему. Спасибо.»');
        addMemory('Помог Эпплджек на ферме');
        c.stage = Math.max(c.stage, 1);
        refreshDlg(id);
      }
    });
    opts.push({
      text: 'Сказать прямо про жар',
      cost: 3,
      show: !wasDiscussed(id, 'honest'),
      fn: () => {
        if (!spendEnergy(3)) return;
        markDiscussed(id, 'honest');
        changeStat(id, 'trust', 6);
        changeStat(id, 'lust', 7);
        appendLog(log, 'Смеётся коротко. «Прямота — это я люблю. Жар… да, чувствую. Не прячусь.»');
        addMemory('Говорил с Эпплджек честно о жаре');
        refreshDlg(id);
      }
    });
    if (c.aff >= 35) {
      opts.push({
        text: 'Признаться, что уважаешь её',
        cost: 2,
        show: !wasDiscussed(id, 'respect'),
        fn: () => {
          if (!spendEnergy(2)) return;
          markDiscussed(id, 'respect');
          changeStat(id, 'aff', 8);
          changeStat(id, 'lust', 5);
          changeStat(id, 'trust', 5);
          appendLog(log, 'Шляпа чуть ниже. «…Спасибо. Это многое.»');
          c.stage = Math.max(c.stage, 1);
          refreshDlg(id);
        }
      });
    }
  }

  // PINKIE
  if (id === 'pinkie') {
    opts.push({
      text: 'Спросить про вечеринку',
      cost: 2,
      show: !wasDiscussed(id, 'party'),
      fn: () => {
        if (!spendEnergy(2)) return;
        markDiscussed(id, 'party');
        changeStat(id, 'aff', 8);
        changeStat(id, 'lust', 4);
        appendLog(log, '«Всегда есть повод! Даже жар — повод. Особенно жар.»');
        addMemory('Говорил с Пинки о вечеринке');
        refreshDlg(id);
      }
    });
    opts.push({
      text: 'Подстроиться под её темп',
      cost: 3,
      show: !wasDiscussed(id, 'tempo'),
      fn: () => {
        if (!spendEnergy(3)) return;
        markDiscussed(id, 'tempo');
        changeStat(id, 'aff', 6);
        changeStat(id, 'lust', 9);
        changeStat(id, 'trust', 4);
        appendLog(log, 'Глаза шире. «Ого, ты не отстаёшь! Редко кто успевает.»');
        c.stage = Math.max(c.stage, 1);
        refreshDlg(id);
      }
    });
    if (c.trust >= 30) {
      opts.push({
        text: 'Спросить, бывает ли ей одиноко',
        cost: 3,
        show: !wasDiscussed(id, 'lonely'),
        fn: () => {
          if (!spendEnergy(3)) return;
          markDiscussed(id, 'lonely');
          changeStat(id, 'trust', 10);
          changeStat(id, 'aff', 7);
          changeStat(id, 'lust', 5);
          appendLog(log, 'На секунду тише. «Бывает. Тогда устраиваю вечеринку… или зову кого-то. Типа тебя.»');
          c.stage = Math.max(c.stage, 2);
          refreshDlg(id);
        }
      });
    }
  }

  // DERPY
  if (id === 'derpy') {
    opts.push({
      text: 'Спросить про работу почтальона',
      cost: 2,
      show: !wasDiscussed(id, 'mail'),
      fn: () => {
        if (!spendEnergy(2)) return;
        markDiscussed(id, 'mail');
        changeStat(id, 'aff', 7);
        changeStat(id, 'trust', 5);
        appendLog(log, '«Письма важны! Иногда путаю адреса… но в итоге все получают. Почти всегда.»');
        addMemory('Говорил с Дерпи о почте');
        refreshDlg(id);
      }
    });
    opts.push({
      text: 'Сказать, что она милая',
      cost: 3,
      show: !wasDiscussed(id, 'cute'),
      fn: () => {
        if (!spendEnergy(3)) return;
        markDiscussed(id, 'cute');
        changeStat(id, 'aff', 10);
        changeStat(id, 'lust', 8);
        changeStat(id, 'trust', 4);
        appendLog(log, 'Оба глаза на миг смотрят на тебя. «Правда? Обычно смеются. Ты… другой.»');
        c.stage = Math.max(c.stage, 1);
        addMemory('Сказал Дерпи, что она милая');
        refreshDlg(id);
      }
    });
    if (c.aff >= 30) {
      opts.push({
        text: 'Предложить помочь с доставкой',
        cost: 5,
        show: !wasDiscussed(id, 'help_mail'),
        fn: () => {
          if (!spendEnergy(5)) return;
          markDiscussed(id, 'help_mail');
          changeStat(id, 'aff', 8);
          changeStat(id, 'trust', 10);
          STATE.rep += 1;
          STATE.sparks += 1;
          appendLog(log, '«Правда поможешь?! Вот. Это — миссис Каппкейк. Кажется. Или Кап. …Держи крепче.»');
          toast('+1✨ за помощь');
          c.stage = Math.max(c.stage, 1);
          refreshDlg(id);
        }
      });
    }
    if (c.trust >= 35) {
      opts.push({
        text: 'Спросить, не одиноко ли в небе',
        cost: 3,
        show: !wasDiscussed(id, 'sky'),
        fn: () => {
          if (!spendEnergy(3)) return;
          markDiscussed(id, 'sky');
          changeStat(id, 'trust', 8);
          changeStat(id, 'lust', 6);
          changeStat(id, 'aff', 5);
          appendLog(log, '«Иногда. Облака не обнимаются. А ты… можешь.»');
          c.stage = Math.max(c.stage, 2);
          refreshDlg(id);
        }
      });
    }
  }

  // CLIMAX story beat with Twilight
  if (id === 'twilight' && STATE.flags.twilight_research >= 3 && hasFlag('heat_source_hint') && !hasFlag('climax_seen')) {
    opts.push({
      text: '★ Про выводы исследования',
      cost: 5,
      special: true,
      show: true,
      fn: () => {
        if (!spendEnergy(5)) return;
        setFlag('climax_seen');
        setFlag('ending_ready');
        changeStat('twilight', 'aff', 10);
        changeStat('twilight', 'trust', 8);
        changeStat('twilight', 'lust', 6);
        c.stage = Math.max(c.stage, 2);
        appendLog(log, 'Закрывает книгу.');
        appendLog(log, '«Жар — не болезнь. Древний слой связи. Дружба слабеет — остаётся голод. Не остановить полностью.»');
        appendLog(log, '«Можно жить через контроль, доверие или власть. Ты уже выбрал — поступками.»');
        if ((STATE.flags.soft_path || 0) > (STATE.flags.dark_path || 0)) {
          appendLog(log, '«Чаще выбирал нежность. Это меняет многое.»', 'good');
        } else if ((STATE.flags.dark_path || 0) > (STATE.flags.soft_path || 0)) {
          appendLog(log, '«Не боялся давить. Мир отвечает тем же.»', 'sys');
        } else {
          appendLog(log, '«Балансировал. Редко кто умеет.»');
        }
        appendLog(log, 'Исследование закрыто. Дальше решают отношения.', 'sys');
        addMemory('Завершил исследование жара с Твайлайт');
        if (!STATE.inventory.includes('зелье спокойствия')) {
          STATE.inventory.push('зелье спокойствия');
          toast('Получено: зелье спокойствия');
        }
        refreshDlg(id);
      }
    });
  }

  // INTIMATE OFFER
  if (STATE.isNight && canIntimate(id)) {
    opts.push({
      text: '★ Остаться на ночь',
      cost: 20,
      special: true,
      show: true,
      fn: () => offerIntimate(id)
    });
  } else if (STATE.isNight && c.lust >= 30 && c.trust < 30) {
    opts.push({
      text: 'Надавить. Сейчас',
      cost: 8,
      danger: true,
      show: true,
      fn: () => {
        if (!spendEnergy(8)) return;
        changeStat(id, 'trust', -12);
        changeStat(id, 'lust', -5);
        appendLog(log, 'Резко назад. «Нет. Не так. Не сейчас.»', 'bad');
        addMemory(`Слишком рано настаивал с ${c.name}`);
        STATE.flags.dark_path = (STATE.flags.dark_path || 0) + 1;
        refreshDlg(id);
      }
    });
  }

  // Render — each choice counts toward talk limit (except pure intimate offer)
  const visible = opts.filter(o => o.show !== false);
  if (!visible.length) {
    appendLog(log, 'Больше нечего сказать сегодня. Завтра — другой разговор.', 'sys');
  }
  visible.forEach(o => {
    const btn = document.createElement('button');
    btn.textContent = o.text + (o.cost ? ` (−${o.cost} ⚡)` : '');
    btn.disabled = STATE.energy < (o.cost || 0);
    if (o.special) btn.classList.add('special');
    if (o.danger) btn.classList.add('danger');
    const raw = o.fn;
    btn.onclick = () => {
      if (!o.special) noteTalkAct();
      raw();
    };
    choices.appendChild(btn);
  });
}

function refreshDlg(id) {
  updateHeader();
  // small delay so player reads the response
  setTimeout(() => {
    if (STATE.currentDlg === id && $('screen-dialogue').classList.contains('active')) {
      buildDialogueChoices(id);
    }
  }, 200);
}

function endDialogue() {
  STATE.currentDlg = null;
  // stage up check
  Object.values(STATE.chars).forEach(c => {
    if (c.aff >= 50 && c.trust >= 45 && c.stage < 1) c.stage = 1;
    if (c.aff >= 70 && c.trust >= 60 && c.lust >= 40 && c.stage < 2) c.stage = 2;
  });
  showScreen('screen-hub');
  renderHub();
  updateHeader();
}

// ==================== INTIMATE SCENE ====================
let sceneTimer = null;
let sceneData = null;

function startIntimate(id) {
  const c = getChar(id);
  sceneData = {
    id,
    partner: 0,
    stamina: 100,
    force: 50,
    mode: 'normal',
    success: 0,
    fails: 0,
    time: 0,
    pattern: null,
    patternIdx: 0,
    variant: c.stage >= 2 ? 'deep' : 'first',
    prepBonus: { trust: 0, lust: 0, aff: 0 },
  };

  // Apply preparation items
  const prepNotes = [];
  (STATE.prepItems || []).forEach(item => {
    const ef = ITEM_EFFECTS[item];
    if (!ef) return;
    if (ef.trust) { changeStat(id, 'trust', ef.trust); sceneData.prepBonus.trust += ef.trust; }
    if (ef.lust) { changeStat(id, 'lust', ef.lust); sceneData.prepBonus.lust += ef.lust; sceneData.partner += ef.lust * 0.4; }
    if (ef.aff) changeStat(id, 'aff', ef.aff);
    if (ef.stamina) sceneData.stamina += ef.stamina;
    prepNotes.push(ef.label);
    // consume one-time useful items optionally
    if (item === 'зелье спокойствия' || item === 'цветок') {
      STATE.inventory = STATE.inventory.filter(x => x !== item);
    }
  });
  STATE.prepItems = [];

  showScreen('screen-scene');
  $('sceneTitle').innerHTML = `<div class="scene-head">${portraitHTML(id, 'lg')}<span>${c.name}</span></div>`;
  const pack = getScenePack(id);
  let descText = sceneData.variant === 'deep' ? (typeof pack.deep === 'function' ? pack.deep(hasFlag('dominance_accepted')) : pack.deep) : pack.first;
  if (prepNotes.length) descText += ' С собой: ' + prepNotes.join(', ') + '.';
  $('sceneDesc').textContent = descText;

  $('sceneLog').innerHTML = '';
  $('partnerFill').style.width = sceneData.partner + '%';
  $('btnFinish').disabled = true;
  $('forceSlider').value = 50;
  $('forceVal').textContent = '50';

  if (sceneTimer) clearInterval(sceneTimer);
  sceneTimer = setInterval(sceneTick, 100);
  document.addEventListener('keydown', sceneKey);
  $('forceSlider').oninput = (e) => {
    sceneData.force = +e.target.value;
    $('forceVal').textContent = sceneData.force;
  };
}

function sceneTick() {
  if (!sceneData) return;
  sceneData.time += 0.1;

  const base = 50 + Math.sin(sceneData.time * 1.7) * 22;
  const offset = (sceneData.force - 50) * 0.45;
  const heatDrift = (STATE.player.arousal || 0) >= 70 ? Math.sin(sceneData.time * 4.5) * 7 : 0;
  let pos = clamp(base + offset + (sceneData.mode === 'hard' ? 9 : sceneData.mode === 'soft' ? -9 : 0) + heatDrift, 5, 95);
  pos += Math.sin(sceneData.time * 3.1) * 5;
  pos = clamp(pos, 5, 95);
  $('rhythmCursor').style.left = pos + '%';

  const inGreen = pos >= 35 && pos <= 65;
  let gain = 0;
  if (inGreen) {
    gain = 0.38 + (sceneData.mode === 'hard' ? 0.12 : 0);
    sceneData.success++;
  } else {
    gain = -0.18;
    sceneData.fails++;
    sceneData.stamina -= 0.45;
  }

  // Signals
  if (Math.random() < 0.045) {
    const sig = sceneMoan(sceneData.id, sceneData.mode);
    $('sceneHint').textContent = sig;
    if (Math.random() < 0.45) appendSceneLog(sig);
    if (sceneData.mode === 'hard') gain += 0.12;
    if (sceneData.mode === 'soft') gain += 0.08;
    // reaction to matching mode
    if (/сильнее|жёстче|быстрее|крепче|ещё|давай|номер/i.test(sig) && sceneData.mode !== 'hard') gain -= 0.15;
    if (/тише|медленн|изящн|нежнич/i.test(sig) && sceneData.mode !== 'soft') gain -= 0.15;
  }

  sceneData.partner = clamp(sceneData.partner + gain, 0, 100);
  $('partnerFill').style.width = sceneData.partner + '%';
  sceneData.stamina -= 0.12;

  if (sceneData.stamina <= 0) {
    endScene(false, 'Ты потерял контроль слишком рано. Партнёр разочарован и отстранился.');
    return;
  }
  if (sceneData.partner >= 92) {
    $('btnFinish').disabled = false;
    $('sceneHint').textContent = 'Она на грани... можно завершить.';
  }
  if (!sceneData.pattern && Math.random() < 0.018 && sceneData.partner > 25 && sceneData.partner < 88) {
    startPattern();
  }
}

function startPattern() {
  const keys = ['←', '→', '↑', '↓', 'A', 'D'];
  const seq = [];
  for (let i = 0; i < 3 + Math.floor(Math.random() * 2); i++) seq.push(keys[Math.floor(Math.random() * keys.length)]);
  sceneData.pattern = seq;
  sceneData.patternIdx = 0;
  const el = $('patternKeys');
  el.style.display = 'flex';
  el.innerHTML = seq.map((k, i) => `<div class="key" id="pk${i}">${k}</div>`).join('');
  $('sceneHint').textContent = 'Повтори последовательность!';
  setTimeout(() => {
    if (sceneData && sceneData.pattern) {
      sceneData.partner = clamp(sceneData.partner - 9, 0, 100);
      sceneData.pattern = null;
      el.style.display = 'none';
      $('sceneHint').textContent = 'Последовательность упущена...';
    }
  }, 4200);
}

function sceneKey(e) {
  if (!sceneData) return;
  const map = { ArrowLeft: '←', ArrowRight: '→', ArrowUp: '↑', ArrowDown: '↓', a: 'A', d: 'D', A: 'A', D: 'D', w: '↑', s: '↓', W: '↑', S: '↓' };
  if (sceneData.pattern) {
    const expected = sceneData.pattern[sceneData.patternIdx];
    const got = map[e.key];
    if (got === expected) {
      $(`pk${sceneData.patternIdx}`)?.classList.add('ok');
      sceneData.patternIdx++;
      if (sceneData.patternIdx >= sceneData.pattern.length) {
        sceneData.partner = clamp(sceneData.partner + 13, 0, 100);
        sceneData.pattern = null;
        $('patternKeys').style.display = 'none';
        $('sceneHint').textContent = 'Отлично!';
        appendSceneLog('Последовательность выполнена.');
      }
    } else if (got) {
      $(`pk${sceneData.patternIdx}`)?.classList.add('fail');
      sceneData.partner = clamp(sceneData.partner - 7, 0, 100);
      sceneData.pattern = null;
      $('patternKeys').style.display = 'none';
      $('sceneHint').textContent = 'Ошибка.';
    }
  }
  if (e.code === 'Space') {
    sceneData.force = clamp(sceneData.force + 6, 0, 100);
    $('forceSlider').value = sceneData.force;
    $('forceVal').textContent = sceneData.force;
  }
}

function sceneAction(type) {
  if (!sceneData) return;
  const pack = getScenePack(sceneData.id);
  if (type === 'soft') {
    sceneData.mode = 'soft';
    appendSceneLog(pack.soft ? pack.soft[0] : 'Тише…');
  } else if (type === 'hard') {
    sceneData.mode = 'hard';
    appendSceneLog(pack.hard ? pack.hard[0] : 'Сильнее…');
  } else if (type === 'change') {
    sceneData.mode = 'normal';
    sceneData.partner = clamp(sceneData.partner + 6, 0, 100);
    appendSceneLog(pack.pose_change || 'Смена позы.');
  } else if (type === 'finish' && sceneData.partner >= 90) {
    endScene(true, null);
  }
}

function appendSceneLog(t) {
  const p = document.createElement('p');
  p.textContent = t;
  $('sceneLog').appendChild(p);
  $('sceneLog').scrollTop = $('sceneLog').scrollHeight;
}

function endScene(success, failMsg) {
  clearInterval(sceneTimer);
  sceneTimer = null;
  document.removeEventListener('keydown', sceneKey);
  const id = sceneData.id;
  const c = getChar(id);
  const partner = sceneData.partner;
  const ratio = sceneData.success / (sceneData.success + sceneData.fails + 1);

  showScreen('screen-result');
  if (success || partner >= 85) {
    $('resultTitle').textContent = 'Близость завершена';
    let text = '';
    if (ratio > 0.72) {
      const pack = getScenePack(id);
      text = pack.climax + '\n\n' + pack.after_good;
      c.aff = clamp(c.aff + 14, 0, 100);
      c.lust = clamp(c.lust - 25, 0, 100);
      c.trust = clamp(c.trust + 12, 0, 100);
      STATE.rep += 2;
      c.stage = Math.max(c.stage, 2);
      relieveArousal(45 + Math.floor(ratio * 20));
      text += '\n\nПривязанность и доверие ↑. Жар спал.';
    } else {
      const pack = getScenePack(id);
      text = (pack.after_ok || 'Сбивался. Но до финала дошли.') + '\n\nЖар немного спал.';
      c.aff += 6; c.lust -= 12; c.trust += 4;
      relieveArousal(25);
    }

    $('resultText').textContent = text;
    c.timesIntimate = (c.timesIntimate || 0) + 1;
    c.lastIntimateDay = STATE.day;
    addMemory(`Успешная близость с ${c.name}`);
  } else {
    $('resultTitle').textContent = 'Неудача';
    $('resultText').textContent = failMsg || 'Слишком много ошибок. Она отстранилась.';
    c.trust = clamp(c.trust - 14, 0, 100);
    c.lust = clamp(c.lust - 8, 0, 100);
    c.aff = clamp(c.aff - 6, 0, 100);
    addMemory(`Провалил сцену с ${c.name}`);
  }
  sceneData = null;
  updateHeader();
}

function returnToHub() {
  showScreen('screen-hub');
  renderHub();
}


// ==================== ACTIVITIES & EVENTS ====================
function activityKey(id) {
  return id + '_' + STATE.day + '_' + (STATE.isNight ? 'n' : 'd');
}
function activityUsed(id) {
  return !!(STATE.activityDone && STATE.activityDone[activityKey(id)]);
}
function markActivity(id) {
  if (!STATE.activityDone) STATE.activityDone = {};
  STATE.activityDone[activityKey(id)] = true;
}

function renderLocationActivities(choices) {
  if (typeof ACTIVITIES === 'undefined') return;
  const list = ACTIVITIES[STATE.location] || [];
  if (!list.length) return;
  const title = document.createElement('p');
  title.className = 'small';
  title.style.marginTop = '6px';
  title.textContent = 'Занятия здесь:';
  choices.appendChild(title);
  list.forEach(a => {
    const used = activityUsed(a.id);
    const b = document.createElement('button');
    const sparkCost = a.sparks || 0;
    let costLabel = a.cost ? `−${a.cost}⚡` : '';
    if (sparkCost) costLabel += (costLabel ? ', ' : '') + `−${sparkCost}✨`;
    b.textContent = (used ? '✓ ' : '') + a.name + (costLabel ? ` (${costLabel})` : '');
    b.disabled = used || STATE.energy < (a.cost || 0) || STATE.sparks < sparkCost;
    b.title = a.desc || '';
    b.onclick = () => runActivity(a);
    choices.appendChild(b);
  });
}

function runActivity(a) {
  if (activityUsed(a.id)) return toast('Уже делал', 'bad');
  if (STATE.energy < (a.cost || 0)) return toast('Мало энергии', 'bad');
  if (STATE.sparks < (a.sparks || 0)) return toast('Мало искр', 'bad');
  STATE.energy -= (a.cost || 0);
  STATE.sparks -= (a.sparks || 0);
  markActivity(a.id);
  const fn = window[a.run];
  if (typeof fn === 'function') fn(a);
  else toast(a.name);
  updateHeader();
  renderHub();
}

function actMarket() {
  const roll = Math.random();
  if (roll < 0.4) {
    STATE.sparks += 2;
    STATE.rep += 1;
    toast('Помог. +2✨, репутация +1');
    addMemory('Рынок: честная работа');
  } else if (roll < 0.7) {
    STATE.sparks += 1;
    addArousal(6);
    toast('+1✨. Кто-то слишком близко стоял…');
  } else {
    STATE.rep = Math.max(0, STATE.rep - 2);
    STATE.energy = Math.max(0, STATE.energy - 4);
    toast('Ссора из-за ящика. Репутация −2', 'bad');
  }
  if (typeof WORLD !== 'undefined') WORLD.heat = Math.min(100, WORLD.heat + 2);
}

function actRumors() {
  const rumors = [
    '«В Эверфри опять видели тень.»',
    '«Твайлайт не спит ночами.»',
    '«В Алом Фонаре новая мятная.»',
    '«Стража ищет чужака с портала.»',
  ];
  setFlag('heard_about_heat');
  if (Math.random() < 0.35) setFlag('heat_source_hint');
  toast(rumors[Math.floor(Math.random() * rumors.length)]);
  STATE.player.focus = Math.min(100, (STATE.player.focus || 50) + 3);
  addMemory('Слухи у колодца');
}

function actCourt() {
  if ((STATE.player.focus || 50) >= 55) {
    STATE.rep += 2;
    STATE.sparks += 1;
    toast('Подслушал полезное. +2 реп, +1✨');
  } else {
    STATE.rep = Math.max(0, STATE.rep - 1);
    toast('Заметили. Неловко.', 'bad');
  }
}

function actFavor() {
  if (Math.random() < 0.55) {
    setFlag('heat_source_hint');
    toast('Имя. Место. «Смотри в Эверфри.»');
    addMemory('Купил наводку');
  } else {
    toast('Развод. Деньги ушли.', 'bad');
  }
}

function actTrack() {
  // mini skill: use focus
  showEventModal({
    title: 'Тропа в Эверфри',
    text: 'Ветки хрустят. Нужно выбрать путь.',
    choices: [
      {
        label: 'Осторожно (фокус)',
        fn: () => {
          if ((STATE.player.focus || 50) >= 50) {
            setFlag('heat_source_hint');
            setFlag('saw_everfree_shadow');
            STATE.sparks += 2;
            if (STATE.flags.twilight_research < 3) {
              /* hint only */
            }
            toast('Тень мелькнула. +2✨. Улика.');
            addMemory('Выследил тень в Эверфри');
          } else {
            STATE.energy = Math.max(0, STATE.energy - 8);
            addArousal(10);
            toast('Сбился. Жар давит.', 'bad');
          }
          closeEventModal();
          updateHeader(); renderHub();
        },
      },
      {
        label: 'Прямо на шум',
        fn: () => {
          STATE.energy = Math.max(0, STATE.energy - 12);
          WORLD.heat = Math.min(100, WORLD.heat + 8);
          addArousal(12);
          if (Math.random() < 0.5) {
            setFlag('saw_everfree_shadow');
            toast('Нашёл. Ценой сил.');
          } else toast('Пусто. Только жар.', 'bad');
          closeEventModal();
          updateHeader(); renderHub();
        },
      },
      {
        label: 'Назад',
        fn: () => {
          toast('Отступил');
          closeEventModal();
        },
      },
    ],
  });
}

function actCamp() {
  STATE.energy = Math.min(100, STATE.energy + 25);
  if (Math.random() < 0.4) {
    addArousal(12);
    WORLD.heat = Math.min(100, WORLD.heat + 5);
    toast('+25⚡. Во сне — чужие касания.', 'bad');
  } else {
    toast('+25⚡. Тихая ночь.');
  }
}

function actJournal() {
  relieveArousal(12);
  STATE.player.focus = Math.min(100, (STATE.player.focus || 50) + 4);
  toast('Жар −12. Фокус +4');
}

function actTrain() {
  showEventModal({
    title: 'Контроль',
    text: 'Дыши. Считай. Не поддавайся жару.',
    choices: [
      {
        label: 'Сосредоточиться',
        fn: () => {
          const ok = Math.random() < 0.45 + ((STATE.player.focus || 50) / 200);
          if (ok) {
            STATE.player.control = Math.min(100, (STATE.player.control || 50) + 8);
            relieveArousal(8);
            toast('Контроль +8');
          } else {
            addArousal(12);
            STATE.player.control = Math.max(0, (STATE.player.control || 50) - 4);
            toast('Сорвался', 'bad');
          }
          closeEventModal();
          updateHeader(); renderHub();
        },
      },
      {
        label: 'Отложить',
        fn: () => { closeEventModal(); },
      },
    ],
  });
}

function actMadam() {
  toast('«Правила: платишь — берёшь. Без скандалов. Рэйзор сегодня в настроении.»');
  addMemory('Говорил с хозяйкой Алого Фонаря');
  if (STATE.sparks >= 1 && Math.random() < 0.3) {
    STATE.sparks += 0;
  }
}

function showEventModal(ev) {
  $('modalTitle').textContent = ev.title;
  let html = `<p>${ev.text}</p><div class="choices" style="margin-top:12px">`;
  // store choices on window for buttons
  window._eventChoices = ev.choices || [];
  (ev.choices || []).forEach((c, i) => {
    html += `<button onclick="window._eventChoices[${i}].fn()">${c.label}</button>`;
  });
  html += '</div>';
  $('modalBody').innerHTML = html;
  $('modal').classList.add('show');
}

function closeEventModal() {
  $('modal').classList.remove('show');
}

function tryTriggerDayEvent() {
  if (typeof pickDayEvent !== 'function') return;
  if (Math.random() > 0.55) return; // not every transition
  const ev = pickDayEvent();
  if (!ev) return;
  showEventModal({
    title: ev.title,
    text: ev.text,
    choices: (ev.choices || []).map(c => ({
      label: c.label,
      fn: () => {
        try { c.fn(); } catch (e) { console.warn(e); }
        closeEventModal();
        updateHeader();
        renderHub();
      },
    })),
  });
}


// ==================== SOLO QTE ====================
let soloTimer = null;
let soloData = null;

function startSolo() {
  if ((STATE.player.arousal || 0) < 15) return toast('Ещё рано', 'bad');
  if ((STATE.player.soloToday || 0) >= 2) return toast('Хватит на сегодня', 'bad');
  if (!spendEnergy(8)) return toast('Мало энергии', 'bad');
  soloData = {
    progress: 0,
    hits: 0,
    misses: 0,
    current: null,
    deadline: 0,
    keys: ['A', 'S', 'D', 'F'],
    map: { a: 'A', s: 'S', d: 'D', f: 'F', A: 'A', S: 'S', D: 'D', F: 'F',
           ArrowLeft: 'A', ArrowDown: 'S', ArrowUp: 'D', ArrowRight: 'F' },
  };
  showScreen('screen-solo');
  $('soloDesc').textContent = STATE.player.arousal >= 80
    ? 'Жар жжёт. Серия точных ударов — или сорвёшься.'
    : 'Соберись. Попади в клавиши — сбросишь напряжение.';
  $('soloFill').style.width = '0%';
  $('soloLog').innerHTML = '';
  $('soloHint').textContent = 'Готовься…';
  document.addEventListener('keydown', soloKey);
  nextSoloNote();
  if (soloTimer) clearInterval(soloTimer);
  soloTimer = setInterval(soloTick, 50);
}

function nextSoloNote() {
  if (!soloData) return;
  const k = soloData.keys[Math.floor(Math.random() * soloData.keys.length)];
  soloData.current = k;
  const window = STATE.player.arousal >= 75 ? 1100 : 1400;
  soloData.deadline = performance.now() + window;
  const el = $('soloKeys');
  el.innerHTML = soloData.keys.map(x =>
    `<div class="key ${x === k ? 'ok' : ''}" style="${x === k ? 'transform:scale(1.15);border-color:var(--accent2)' : 'opacity:0.35'}">${x}</div>`
  ).join('');
  $('soloHint').textContent = '→ ' + k;
}

function soloTick() {
  if (!soloData || !soloData.current) return;
  if (performance.now() > soloData.deadline) {
    soloData.misses++;
    soloData.progress = clamp(soloData.progress - 6, 0, 100);
    $('soloFill').style.width = soloData.progress + '%';
    appendSoloLog('Мимо.');
    if (soloData.misses >= 5) {
      endSolo(false);
      return;
    }
    nextSoloNote();
  }
}

function soloKey(e) {
  if (!soloData || !soloData.current) return;
  const got = soloData.map[e.key];
  if (!got) return;
  e.preventDefault();
  if (got === soloData.current) {
    soloData.hits++;
    soloData.progress = clamp(soloData.progress + 12 + (STATE.player.focus > 60 ? 3 : 0), 0, 100);
    $('soloFill').style.width = soloData.progress + '%';
    appendSoloLog('В точку.');
    if (soloData.progress >= 100) {
      endSolo(true);
      return;
    }
    nextSoloNote();
  } else {
    soloData.misses++;
    soloData.progress = clamp(soloData.progress - 8, 0, 100);
    $('soloFill').style.width = soloData.progress + '%';
    appendSoloLog('Не та клавиша.');
    if (soloData.misses >= 5) endSolo(false);
  }
}

function appendSoloLog(t) {
  const p = document.createElement('p');
  p.textContent = t;
  $('soloLog').appendChild(p);
  $('soloLog').scrollTop = $('soloLog').scrollHeight;
}

function endSolo(ok) {
  clearInterval(soloTimer);
  soloTimer = null;
  document.removeEventListener('keydown', soloKey);
  const hits = soloData ? soloData.hits : 0;
  soloData = null;
  showScreen('screen-result');
  if (ok) {
    const drop = 35 + Math.min(25, hits * 2);
    relieveArousal(drop);
    STATE.player.soloToday = (STATE.player.soloToday || 0) + 1;
    STATE.player.focus = clamp((STATE.player.focus || 50) + 2, 0, 100);
    $('resultTitle').textContent = 'Разрядка';
    $('resultText').textContent = `Попадания: ${hits}. Жар −${drop}. Голова чуть яснее.`;
    addMemory('Сбросил жар в одиночку');
  } else {
    addArousal(5);
    STATE.energy = clamp(STATE.energy - 5, 0, 100);
    $('resultTitle').textContent = 'Срыв';
    $('resultText').textContent = 'Ритм поплыл. Жар не ушёл — только хуже. Энергия −5.';
  }
  updateHeader();
}

function abortSolo() {
  clearInterval(soloTimer);
  soloTimer = null;
  document.removeEventListener('keydown', soloKey);
  soloData = null;
  STATE.energy = clamp(STATE.energy - 3, 0, 100);
  toast('Прервано', 'bad');
  showScreen('screen-hub');
  renderHub();
  updateHeader();
}

// ==================== DAY/NIGHT & META ====================function toggleNight() {
  if (!spendEnergy(1)) return toast('Нужна хотя бы 1 энергия', 'bad');
  STATE.isNight = !STATE.isNight;
  if (!STATE.isNight) {
    STATE.day++;
    STATE.player.soloToday = 0;
    addArousal(4 + Math.floor(Math.random() * 5));
    if (typeof WORLD !== 'undefined') {
      WORLD.heat = Math.min(100, WORLD.heat + 3 + Math.floor(Math.random() * 4));
    }
  } else {
    addArousal(6);
    if (typeof WORLD !== 'undefined') WORLD.heat = Math.min(100, WORLD.heat + 2);
  }
  if (STATE.isNight && !hasFlag('night_first')) {
    setFlag('night_first');
    toast('Первая ночь. Воздух гуще.');
  }
  updateHeader();
  renderHub();
  setTimeout(tryTriggerDayEvent, 350);
}

function showStoryStatus() {
  $('modalTitle').textContent = 'Статус сюжета';
  $('modalBody').innerHTML = renderStoryPanel() + `
    <hr style="margin:12px 0;border-color:#4a2d5a">
    <p class="small">Концовки зависят от того, кого ты сблизил сильнее, и от баланса решений — мягких или жёстких.
    Полное исследование жара и находки в Эверфри открывают новые ветки.</p>
  `;
  $('modal').classList.add('show');
}

function setSaveStatus(msg, err = false) {
  const el = $('saveStatus');
  if (!el) { toast(msg, err ? 'bad' : 'good'); return; }
  el.textContent = msg;
  el.className = 'save-status show' + (err ? ' err' : '');
  clearTimeout(setSaveStatus._t);
  setSaveStatus._t = setTimeout(() => { el.className = 'save-status'; }, 3200);
}

function applySaveData(data) {
  Object.keys(STATE).forEach(k => { if (data[k] !== undefined) STATE[k] = data[k]; });
  if (data.flags) STATE.flags = { ...STATE.flags, ...data.flags };
  if (data.chars) STATE.chars = data.chars;
  // merge any new character definitions missing from old saves
  const defaults = {
    derpy: { name: 'Дерпи', aff: 14, lust: 8, trust: 22, met: false, unlocked: true, stage: 0 },
    trixie: { name: 'Трикси', aff: 5, lust: 14, trust: 8, met: false, unlocked: false, stage: 0 },
    applejack: { name: 'Эпплджек', aff: 10, lust: 6, trust: 18, met: false, unlocked: true, stage: 0 },
    pinkie: { name: 'Пинки Пай', aff: 12, lust: 10, trust: 15, met: false, unlocked: true, stage: 0 },
  };
  Object.keys(defaults).forEach(id => {
    if (!STATE.chars[id]) STATE.chars[id] = defaults[id];
  });
  if (!STATE.discussed) STATE.discussed = {};
  if (!STATE.prepItems) STATE.prepItems = [];
  if (!STATE.exploredDay) STATE.exploredDay = {};
  if (!STATE.activityDone) STATE.activityDone = {};
  if (!STATE.player) STATE.player = { name: 'Странник', species: 'earth', style: 'neutral', arousal: 12, control: 55, focus: 50, soloToday: 0 };
  if (!STATE.player.species) STATE.player.species = 'earth';
  if (STATE.player.arousal == null) STATE.player.arousal = 12;
  if (STATE.player.control == null) STATE.player.control = 55;
  if (STATE.player.focus == null) STATE.player.focus = 50;
  if (typeof WORLD !== 'undefined' && data.worldHeat != null) WORLD.heat = data.worldHeat;
  if (typeof registerBrothelContent === 'function') registerBrothelContent();
  updateHeader();
  if (hasFlag('prologue_done')) startGame();
  else startPrologue();
}

function saveGame() {
  try {
    localStorage.setItem('zhark_ekestrii_save_v2', JSON.stringify({ ...STATE, worldHeat: typeof WORLD !== 'undefined' ? WORLD.heat : 15 }));
    setSaveStatus('Сохранено в браузер · день ' + STATE.day);
    toast('Игра сохранена', 'good');
  } catch (e) {
    setSaveStatus('Не удалось сохранить', true);
    toast('Ошибка сохранения', 'bad');
  }
}

function loadFromStorage() {
  const raw = localStorage.getItem('zhark_ekestrii_save_v2') || localStorage.getItem('zhark_ekestrii_save');
  if (!raw) {
    setSaveStatus('Сохранение не найдено', true);
    toast('Нет сохранения', 'bad');
    return;
  }
  try {
    applySaveData(JSON.parse(raw));
    setSaveStatus('Загружено · день ' + STATE.day);
    toast('Сохранение загружено', 'good');
  } catch (e) {
    setSaveStatus('Файл сохранения повреждён', true);
    toast('Ошибка загрузки', 'bad');
  }
}

function showLoad() { loadFromStorage(); }

function exportSave() {
  try {
    const blob = new Blob([JSON.stringify({ ...STATE, worldHeat: typeof WORLD !== 'undefined' ? WORLD.heat : 15 }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'zhark_ekestrii_den' + STATE.day + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
    setSaveStatus('Файл экспортирован');
    toast('Экспорт готов', 'good');
  } catch (e) {
    setSaveStatus('Ошибка экспорта', true);
    toast('Ошибка экспорта', 'bad');
  }
}

function importSaveFile(ev) {
  const file = ev.target.files && ev.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      applySaveData(JSON.parse(reader.result));
      setSaveStatus('Импорт успешен · день ' + STATE.day);
      toast('Файл загружен', 'good');
    } catch (e) {
      setSaveStatus('Не удалось прочитать файл', true);
      toast('Ошибка импорта', 'bad');
    }
  };
  reader.readAsText(file);
  ev.target.value = '';
}

function showEnding() {
  const ranked = Object.entries(STATE.chars)
    .filter(([, c]) => c.unlocked && c.met)
    .sort((a, b) => (b[1].aff + b[1].trust + b[1].lust * 0.3) - (a[1].aff + a[1].trust + a[1].lust * 0.3));
  const top = ranked[0];
  const soft = STATE.flags.soft_path || 0;
  const dark = STATE.flags.dark_path || 0;
  let title = 'Исход';
  let text = '';

  if (!top) {
    text = 'Почти никого по-настоящему не коснулся. Жар остался фоном. Эквестрия живёт дальше — без тебя.';
  } else {
    const [id, c] = top;
    const bond = c.aff + c.trust;
    if (soft > dark + 2 && bond >= 100) {
      title = 'Тёплая связь';
      text = `Ближе всех — ${c.name}. Доверие перевесило голод. Жар не исчез, но вы живёте с ним, а не против.\n\nЭквестрия уже не та. Зато честнее.`;
    } else if (dark > soft + 2 && bond >= 90) {
      title = 'Власть жара';
      text = `${c.name} в центре твоего пути. Голод не усмирили — направили. Кого-то это пугает. Кого-то манит.`;
    } else if (id === 'twilight' && hasFlag('climax_seen')) {
      title = 'Знание и желание';
      text = 'С Твайлайт исследование стало личным. Контроль, любопытство, близость. Жар понятнее — и чуть менее страшен.';
    } else if (id === 'fluttershy') {
      title = 'Тихая сила';
      text = 'Флаттершай открылась полностью. Нежность оказалась крепче доспехов. Вы не тонете в жаре.';
    } else if (id === 'rainbow') {
      title = 'На скорости';
      text = 'С Рэйнбоу — всё на грани. Вызов, темп, тело. Жар стал ещё одним видом полёта.';
    } else {
      title = 'Свой путь';
      text = `Ближе всех — ${c.name}. Жар никуда не делся. Зато есть с кем его делить.`;
    }
  }

  text += `\n\nДней в Эквестрии: ${STATE.day}. Мягких решений: ${soft}. Жёстких: ${dark}.`;
  if (hasFlag('climax_seen')) text += ' Исследование жара завершено.';

  showScreen('screen-result');
  $('resultTitle').textContent = title;
  $('resultText').textContent = text;
  // Replace continue with restart option
  const btn = $('screen-result').querySelector('button');
  btn.textContent = 'В начало';
  btn.onclick = () => location.reload();
}

function showHelp() {
  $('modalTitle').textContent = 'Как играть';
  $('modalBody').innerHTML = `
    <p><b>Цель:</b> строить отношения, раскрывать персонажей и проходить их истории.</p>
    <p><b>Шкалы:</b> Привязанность, Желание и Доверие — у каждого свои. Высокое желание при низком доверии ведёт к отказу.</p>
    <p><b>Ресурсы:</b> энергия тратится на действия. Искры и репутация открывают новые возможности.</p>
    <p><b>День и ночь:</b> днём — исследование и разговоры, ночью — личные встречи и близость.</p>
    <p><b>Подготовка:</b> перед близостью можно взять предметы из инвентаря — они меняют тон сцены.</p>
    <p><b>Близость:</b> удерживай ритм в зелёной зоне, реагируй на сигналы, выполняй последовательности клавиш.</p>
    <p><b>Управление:</b> мышь, стрелки / WASD, пробел.</p>
    <p>Выборы запоминаются. Одни и те же разговоры не повторяются в тот же день.</p>
  `;
  $('modal').classList.add('show');
}
function closeModal() {
  $('modal').classList.remove('show');
  const box = document.querySelector('.modal-box');
  if (box) box.classList.remove('dossier-modal');
  const t = $('modalTitle');
  if (t) t.style.display = '';
}

// expose for onclick (file:// / strict)
window.showCreate = showCreate;
window.pickSpecies = pickSpecies;
window.confirmCreate = confirmCreate;
window.startPrologue = startPrologue;
window.showScreen = showScreen;

if (typeof registerBrothelContent === 'function') registerBrothelContent();
updateHeader();

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('#screen-title button.primary');
  if (btn && !btn._bound) {
    btn._bound = true;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      try { showCreate(); } catch (err) {
        console.error(err);
        try { startPrologue(); } catch (e2) { alert('Ошибка запуска: ' + err.message); }
      }
    });
  }
});


</script>
</body>
</html>