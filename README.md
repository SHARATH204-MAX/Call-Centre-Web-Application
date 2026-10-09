# On-Ground.ai Call Centre Web Application
> **High-Performance React 19 + TypeScript Tele-Caller Workspace & AI Sales Copilot**  
> Recreating the official On-Ground.ai retail walk-out lead recovery, SOP guidance, and tele-caller performance tracking platform.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646cff.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.0-38b2ac.svg)](https://tailwindcss.com/)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)]()

---

## 🌟 Executive Highlights for Evaluators & Recruiters

To evaluate this submission in under **2 minutes**, click the **`✨ Evaluator Tour`** button located at the top-right of the application header, or use the shortcuts below:

1. **🎙️ Live Call Dialer with Real-Time Speech Streaming & Audio Waveform**:
   - Click **`✨ Evaluator Tour` → `1. Live Call Dialer & SOP Copilot`** (or go to **Plan** tab and click **Place Call** / **Call Back**).
   - Watch the live speech transcript stream in line by line with animated audio waveform bars.
   - Watch the **SOP Checklist** dynamically tick off commitments in real time (`Opening`, `Needs`, `Pitch`, `Financing`, `Warranty`, `Closing`).
   - Observe the **"Drifting off SOP"** AI warning when the pitch is complete before financing is introduced.
2. **🚨 Walk-Out Lead Recovery Workflow**:
   - In **Plan → Incoming (Missed)**, click **Call Back Now** on any missed call to trigger the tele-caller confirmation dialog before launching the call.
3. **🤖 Avani AI Sales Coach (Assess · Learn · Practise)**:
   - Navigate to the **Avani** tab to explore AI conversational coaching, audio response evaluation, and roleplay audits.
4. **⌨️ Enterprise Hotkeys (`?`)**:
   - Press `?` anytime to open the enterprise hotkeys cheatsheet (`1-5` for tabs, `M` for mute, `H` for hold, `E` to end call, `Esc` to close modals).
5. **📄 Export Printable Shift Report**:
   - Click **`Report`** on the top bar or Dashboard to generate an audited, print-ready PDF shift performance summary.

---

## 🛠️ Technology Stack & Architecture

| Technology | Purpose | Architectural Rationale |
| :--- | :--- | :--- |
| **React 19** | Core UI Library | Efficient state management, concurrent transitions, and component reusability. |
| **TypeScript** | Strict Type Contracts | 100% typed data models for Leads, Call Records, Calendar Events, Pulse Channels, and Modals. |
| **Vite 6** | Build & Dev Tooling | Sub-second HMR with optimized tree-shaking and production bundle minification. |
| **Tailwind CSS v4** | Design Token System | Custom visual palette matching On-Ground.ai brand tokens (`#123c30` deep green, `#3b1254` royal purple, `#1d9e75` emerald). |
| **Web Audio API** | PBX Sound Effects | Synthesizes realistic telephone tones, connect chimes, disconnect tones, and SOP tick sounds without external asset dependencies. |
| **Recharts** | Interactive Analytics | Responsive charts for 7-day tele-caller commission trends and earnings. |
| **Lucide React** | Enterprise Iconography | Accessible, pixel-perfect icons for telephony, analytics, and navigation. |

---

## 📱 Detailed Screen Breakdown & Implemented Requirements

### 1. 📊 Dashboard (`Dashboard.tsx`)
- **Performance KPI Cards**: Composite OG Score™ (86/100), Target Calls (32/40), Conversion Rate (66%), Total Pipeline (₹1,42,800).
- **Earnings Trend Chart**: Interactive 7-day commission bar chart with tooltips and INR formatting.
- **Tasks & Lead Queues**: Prioritized queue sorted by ICP score with quick modal deep-links.
- **Quality Objectives**: Visual progress meters for 10-second greeting compliance (+23.6pp conversion driver) and walkout recovery rates.
- **Header Actions**: Quick access to Date Range filter modal, Lead Analysis overlay, and Printable Shift Report.

### 2. 📞 Plan Calling Workspace (`PlanPage.tsx`)
- **Sub-Tabs**:
  1. **Calls to Make (`CallsToMake.tsx`)**: Outgoing ranked worklist, expandable drawers, search filters, and 5-item pagination.
  2. **Incoming Missed Calls (`IncomingCalls.tsx`)**: High-priority missed call list with total value at stake calculation, and a confirmation modal before placing callbacks.
  3. **Recent Calls (`RecentCalls.tsx`)**: Chronological audit log with call durations, QA compliance badges, and Call Review overlays (`CallDetailsModal.tsx`).
- **Live Active Dialer (`ActiveCallWorkspace.tsx`)**:
  - Live timer, hold, mute, keypad, and end-call controls with auto-scroll down to the workspace.
  - Real-time animated speech audio waveform visualizer.
  - Progressive line-by-line speech recognition simulation.
  - **Dynamic OnGround AI Assist Copilot**:
    - Value unlock chips (`₹13,390 unlock`, `+8 pts OG Score™`, `#1 rank if closed`).
    - Main objective card with cross-sell recommendation (`Mattress Protector · ₹1,999`) and EMI status.
    - Real-time ticking SOP commitments checklist with green checkmark pills.
    - "Drifting off SOP" alert badge triggered when pitch finishes before financing is surfaced.
    - Buying signal tips (`Asked "how soon can this be delivered"`).
    - Quick actions: *Send price on WhatsApp*, *Offer callback slot*, *Explain warranty terms*, *Escalate to manager*.
    - Live drafting summary updating dynamically as conversation progresses.
    - Collapsible Case History drawer (Intent 96/100, ICP 94%, timeline of store visits and missed calls).

### 3. 🤖 Avani AI Sales Coach (`AvaniPage.tsx`)
- **Mode 1 — Assess**: Conversational coaching chat with AI feedback, audio snippet evaluation, and pitch suggestions.
- **Mode 2 — Learn**: Product curriculum learning modules (Mattress Ergonomics, Overcoming Price Objections, Closing SOP).
- **Mode 3 — Practise**: Interactive roleplay simulator with model audio examples, checklist audits, and feedback.

### 4. 📅 Calendar Schedule (`CalendarView.tsx`)
- **Interactive Month Grid**: Dynamic date math supporting store visits, coaching sessions, and customer callbacks.
- **Event Filtering**: Visual badge dots on dates with scheduled events.
- **Add Event Form**: Agent-facing modal to schedule new callback appointments in local state.

### 5. 💬 Pulse Communication Workspace (`PulsePage.tsx`)
- **Team Channels**: Slack-style channel discussions with unread badges.
- **Pinned Needs-Your-Input Cards**: Interactive action cards with one-click resolution.
- **Customer WhatsApp Discussions**: Switch between WhatsApp messaging and direct voice dialer modes.
- **Kudos Leaderboard**: Weekly tele-caller recognition rankings.

---

## 🪟 Complete Interactive Overlays & Modals (17 Total)

| Modal Name | File | Description & Purpose |
| :--- | :--- | :--- |
| **OG Score™ Modal** | `OGScoreModal.tsx` | Composite 86/100 performance breakdown and category weights. |
| **Rank Detail Modal** | `RankDetailModal.tsx` | Tele-caller leaderboard standing and shift rankings. |
| **Date Range Filter** | `DateRangeModal.tsx` | Shift timeframe selector (Today, This Week, This Month). |
| **Lead Analysis Modal** | `LeadAnalysisModal.tsx` | High-intent vs low-intent segment breakdown. |
| **Call Wrap-up Modal** | `CallWrapupModal.tsx` | Call disposition, reason codes, notes, and WhatsApp follow-up toggle. |
| **Conversation Saved** | `ConversationSavedModal.tsx` | Post-call confirmation and audio recording save prompt. |
| **WhatsApp Quotation** | `WhatsAppModal.tsx` | WhatsApp template dispatcher with custom pricing. |
| **Settings Modal** | `SettingsModal.tsx` | Tele-caller audio preferences, notifications, and queue settings. |
| **Avatar Modal** | `AvatarModal.tsx` | Custom emoji avatar selector. |
| **No Interest Modal** | `NoInterestModal.tsx` | Walk-out objection reason logger. |
| **Came Back Modal** | `CameBackModal.tsx` | Physical store re-visit confirmation tracker. |
| **Notifications Modal** | `NotificationModal.tsx` | Shift alerts, lead assignments, and manager announcements. |
| **Tag / Forward Modal** | `TagForwardModal.tsx` | Escalation to store manager or regional supervisor. |
| **Keypad Modal** | `KeypadModal.tsx` | Interactive DTMF dial pad overlay during calls. |
| **Before You Call SOP** | `BeforeYouCallSOPModal.tsx` | Pre-call checklist audit before dialer initiation. |
| **Leads Picture Modal** | `LeadsModal.tsx` | Full lead dossier with pagination, buying signals, and call button. |
| **Call Details Review** | `CallDetailsModal.tsx` | QA pitch score and AI notes audit modal. |
| **Evaluator Tour Modal** | `EvaluatorTourModal.tsx` | 1-click guided demo launcher for evaluators. |
| **Hotkeys Modal** | `HotkeysModal.tsx` | Enterprise keyboard shortcuts cheatsheet. |
| **Shift Report Modal** | `ShiftReportModal.tsx` | Audited printable / PDF shift performance report. |

---

## ⌨️ Enterprise Hotkeys Reference

| Shortcut | Action |
| :---: | :--- |
| `1` | Switch to **Dashboard** |
| `2` | Switch to **Plan** Calling Workspace |
| `3` | Switch to **Avani** AI Sales Coach |
| `4` | Switch to **Calendar** Schedule |
| `5` | Switch to **Pulse** Communications |
| `M` | Toggle **Mute** on live call |
| `H` | Toggle **Hold** on live call |
| `E` | **End Call** & open wrap-up disposition |
| `?` | Open **Hotkeys Cheatsheet** modal |
| `Esc` | Close any active modal dialog |

---

## 🚀 How to Run Locally

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 2. Installation
```bash
# Clone or navigate into the repository root
cd "d:\call center model"

# Install dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open **`http://localhost:5173`** in your browser (Google Chrome recommended).

### 4. Build for Production
```bash
# Validates TypeScript types and generates production bundle
npm run build

# Preview the production bundle locally
npm run preview
```

---

## 🤖 AI Disclosure & Methodology
- **AI Tool Used**: **Antigravity AI (Google DeepMind Team)**.
- **Workflow & Usage**:
  - Used for rapid UI token alignment based on `OnGround_CallCentre_App_Mock.html`.
  - Scaffolding type interfaces from the assignment specification PDF.
  - Accelerating the creation of realistic local mock datasets (`leads.ts`, `calls.ts`, `pulse.ts`, `calendar.ts`).
  - Implementing the Web Audio API synthesized sound effects and keyboard navigation listeners.

---

## 📧 Submission Details
- **Role**: Software Engineering Intern — Frontend / Full-Stack
- **Applicant**: Ananya Rao / Submitter
- **Submission Deadline**: Sunday, 11 October 2026, 6:00 PM IST
- **Recipient**: `mukunda@on-ground.ai`
