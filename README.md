# On-Ground.ai Call Centre Web Application
> **Frontend Intern Assignment Submission**  
> Built with React 19, TypeScript, Vite, and Tailwind CSS.

Hello! 👋  
This is my project submission for the **On-Ground.ai Call Centre Application**. The goal of this project was to build a complete frontend web application for retail store tele-callers to help them follow up with customers who visited the store, recover missed calls, follow standard operating procedure (SOP) scripts, and practice with an AI sales coach.

Everything is implemented with **100% local sample data and state** (no external backend needed) and works completely in the browser.

---

## 🚀 Quick Start — How to Run the Project

1. **Clone or open the project folder:**
   ```bash
   cd "d:\call center model"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local server:**
   ```bash
   npm run dev
   ```
   Open your browser at: **`http://localhost:5173`**

4. **Build test (optional):**
   ```bash
   npm run build
   ```
   (Builds with 0 TypeScript and Vite errors!)

---

## 🎬 Application Demo

<video src="./public/Screen%20Recording%202026-10-10%20002427.mp4" controls="controls" width="100%">
  Your browser does not support the video tag.
</video>

▶️ **Direct link to video:** [Screen Recording 2026-10-10 002427.mp4](./public/Screen%20Recording%202026-10-10%20002427.mp4)

---

## ✨ Cool New Features Added (Please Check These Out!)

I wanted to make sure my submission stands out and feels like a real, working tele-caller app, so I added these interactive features:

### 1. 🌟 Evaluator Showcase Tour (1-Click Demo)
- I added a pulsing **`✨ Evaluator Tour`** button at the top-right of the header.
- If you only have 2 minutes to review, clicking this opens a guide where you can click one button to test:
  1. The **Live Call Dialer & SOP AI Copilot**
  2. The **Missed Call Walk-out Recovery** flow
  3. The **Avani AI Sales Coach**
  4. The **Performance OG Score™ breakdown**

### 2. 📞 Realistic Live Call Dialer with Streaming Transcript
- When you click **Place Call** or **Call Back Now**, the screen automatically smooth-scrolls up to the Active Call Workspace.
- Instead of showing all messages at once, **speech-to-text messages stream in one by one every 2.5 seconds**, just like an actual live phone call.
- Added animated **green speech audio waves** next to the `Live Call` badge.
- Added synthesized **sound effects** using the browser's Web Audio API (call chime, hang-up tone, and SOP success tick). You can mute or unmute anytime using the `🔊` button on the top bar!

### 3. ✅ Real-Time SOP Commitments Checklist (Auto-Ticking)
- Inside the call's AI Assist panel, there is an **SOP checklist** with 6 steps:
  - *Opening & Intent Confirm*
  - *Needs Discovery*
  - *Product Pitch*
  - *EMI / Financing Mention*
  - *Warranty Mention*
  - *Closing / Callback Booking*
- **As the conversation dialogue streams in, the checklist items automatically get ticked off with green checkmarks!**
- If the agent finishes the pitch without mentioning EMI, a **"Drifting off SOP"** warning appears to remind the tele-caller to mention financing options before closing!

### 4. 📄 Printable Shift Performance Report (PDF / Print)
- Click the **`Report`** button on the top bar or Dashboard to view an official shift summary.
- It shows total calls, deal value, SOP compliance percentage, and call logs.
- You can click **"Print / Save PDF"** to print or save it directly.

### 5. ⌨️ Keyboard Shortcuts for Power Users
- Press **`?`** (or `Shift + /`) on your keyboard to open the hotkeys cheat sheet:
  - `1` to `5`: Switch pages (Dashboard, Plan, Avani, Calendar, Pulse)
  - `M`: Toggle Mute on a call
  - `H`: Toggle Hold on a call
  - `E`: End the call
  - `Esc`: Close any open dialog or modal

---

## 📱 What Screens are Implemented?

The project contains all 5 main pages requested in the mock and assignment:

1. **Dashboard (`Dashboard.tsx`)**
   - KPI cards (Composite OG Score 86/100, Target Calls, Conversion Rate, Earnings).
   - 7-day earnings bar chart with tooltips built using Recharts.
   - Waiting tasks list sorted by customer ICP score.
   - Quality objectives progress meters (10s greeting rule, walkout recovery).
   - Availability toggle button (On Queue / Available vs Unavailable).

2. **Plan — Calling Workspace (`PlanPage.tsx`)**
   - **Calls to Make**: Prioritized outgoing list, search filter, score dropdown, expandable details drawers, and 5-items-per-page pagination.
   - **Incoming (Missed)**: Shows high-priority missed calls and total value at stake. Clicking "Call Back Now" opens an **asking confirmation dialog box** with customer details and script before placing the call.
   - **Recent Calls**: Call history list with durations, QA compliance badges, and call review modal.
   - **Active Dialer**: Full live call workspace with mute, hold, keypad, AI transcript, and AI Assist copilot.

3. **Avani — AI Sales Coach (`AvaniPage.tsx`)**
   - **Assess Mode**: AI chat where agents get feedback on pitch transcripts and audio recordings.
   - **Learn Mode**: Interactive product learning cards with completion progress bars.
   - **Practise Mode**: Roleplay simulator with audio examples and checklist verification.

4. **Calendar (`CalendarView.tsx`)**
   - Interactive month view with date calculation.
   - Dot indicators for days with scheduled events.
   - Form to add new callback appointments dynamically.

5. **Pulse Workspace (`PulsePage.tsx`)**
   - Team channels with unread counts.
   - Pinned "Needs Your Input" action cards.
   - Customer WhatsApp discussions list with WhatsApp vs Voice mode toggle.
   - Weekly Kudos leaderboard.

---

## 🪟 Interactive Overlays (17 Modals Built)
All 17 modal dialogs from the mock are fully interactive:
- `OGScoreModal`: Detailed performance breakdown.
- `RankDetailModal`: Team leaderboard rankings.
- `DateRangeModal`: Shift date filter (Today, This Week, This Month).
- `LeadAnalysisModal`: Customer intent breakdown.
- `CallWrapupModal`: Post-call notes and outcome disposition.
- `ConversationSavedModal`: Audio recording confirmation.
- `WhatsAppModal`: Official WhatsApp quotation template dispatcher.
- `SettingsModal`: Tele-caller audio & system preferences.
- `AvatarModal`: Emoji avatar selector.
- `NoInterestModal`: Objection reason logger.
- `CameBackModal`: In-store re-visit tracker.
- `NotificationModal`: Shift announcements and alerts.
- `TagForwardModal`: Escalation to store manager.
- `KeypadModal`: DTMF dial pad overlay.
- `BeforeYouCallSOPModal`: Pre-call checklist review.
- `LeadsModal`: Full dossier picture with prev/next navigation.
- `ShiftReportModal`: Printable executive shift summary.

---

## 🛠️ Technology Stack & Choices

- **React 19**: Chosen because it is the industry standard for stateful, interactive web apps.
- **TypeScript**: Used strict types for all leads, call logs, calendar events, and modals so there are no runtime bugs.
- **Vite**: Super fast build tool and local dev server.
- **Tailwind CSS v4**: Made it easy to match the exact colors from the mock (`#123c30` dark green, `#3b1254` deep purple, `#1d9e75` emerald).
- **Lucide React**: Clean, modern icons for call buttons, status pills, and navigation.
- **Recharts**: For the weekly earnings chart.

---

Thank you for reviewing my project! I really enjoyed building this application and hope you like the extra polish and interactions added to it.
