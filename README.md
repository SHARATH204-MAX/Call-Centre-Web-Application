# On-Ground.ai Call Centre App

A high-fidelity React + TypeScript frontend application built from scratch to recreate the official **On-Ground.ai Call Centre App** for retail walk-out lead recovery, SOP guidance, and tele-caller performance tracking.

---

## 🚀 Live Demo & Preview
- **Development Server**: `npm run dev` (Runs locally at `http://localhost:5173`)
- **Production Build**: `npm run build` && `npm run preview`
- **Target OS & Browser**: Windows 11 / Latest Google Chrome on Laptop

---

## 🛠️ Technology Stack & Rationale

| Technology | Purpose | Rationale |
| :--- | :--- | :--- |
| **React 19** | UI Library | Preferred component framework for stateful, interactive web application UI. |
| **TypeScript** | Type Safety | Enforces strict interface contracts for leads, call records, channels, and metrics. |
| **Vite** | Build Tool | Lightning-fast HMR and build speeds compared to heavier frameworks like Next.js for frontend-only prototypes. |
| **Tailwind CSS v4** | Styling | Rapid styling with custom color tokens matching On-Ground.ai visual design guidelines (`#123c30` deep green, `#3b1254` purple, `#1d9e75` emerald). |
| **Lucide React** | Icons | Clean icon set for telephony actions, status indicators, and navigation controls. |
| **Recharts** | Data Visualization | Responsive 7-day earnings bar charts with tooltips and Indian Rupee currency formatting. |

---

## 📱 Implemented Features (8 Core Views + Bonus Features)

### 1. **Dashboard (`Dashboard.tsx`)**
- 📊 **KPI Stat Cards**: Calls made (32), Connected rate (66%), Follow-ups due (12), Earnings (₹12,500).
- 📈 **7-Day Earnings Bar Chart**: Built with `Recharts` showing commission breakdown per day with tooltips.
- 📋 **Tasks List (Who is Waiting)**: Filterable task queue sorted by ICP score. Clicking any task opens the Lead Intelligence modal.
- 🎯 **Quality Objectives & Progress Cards**: Visual progress bars for 10s greeting compliance (+23.6pp conversion driver) and walk-out recovery rate.

### 2. **Plan — Calls to Make (`CallsToMake.tsx`)**
- 🥇 **Ranked Outgoing Queue**: Leads sorted by ICP score in descending order.
- 🔽 **Expandable Rows**: View contact info, buying signals, SOP next actions, and preferred store.
- 📄 **Pagination**: Custom pagination hook displaying 5 records per page with previous/next controls.
- 🔍 **Filter Controls**: Search by customer name/phone and filter by minimum score threshold.

### 3. **Plan — Incoming Calls (`IncomingCalls.tsx`)**
- 🚨 **Missed Inbound Queue**: High-priority missed calls with total value at stake calculation (₹1,13,000).
- 📞 **Interactive Call Back Action**: Clicking "Call Back Now" opens a simulated tele-caller script modal and updates local component state to "Callback Placed".

### 4. **Plan — Recent Calls (`RecentCalls.tsx`)**
- 🕒 **Call History Log**: Calls ordered by timestamp (newest first) with type tags (Outgoing, Incoming, Missed) and digital duration formatting (`4m 05s`).
- 🔍 **Call Review Modal (`CallDetailsModal.tsx`)**: Displays pitch coach QA score, AI-transcribed notes, and SOP compliance step.

### 5. **Calendar View (`CalendarView.tsx`)**
- 📅 **Dynamic Month Grid**: Built with custom date math in `useCalendar.ts` accounting for starting weekday and days in month.
- 🔴 **Event Indicators**: Date cells display badge dots for scheduled callbacks, reviews, and store syncs.
- 🎯 **Controls**: Includes `Today` reset button, previous/next month navigation, and interactive date selection showing scheduled events list.
- ➕ **Add Event**: Form allowing agents to schedule new follow-ups dynamically in local state.

### 6. **Pulse Home (`PulseHome.tsx`)**
- 🤖 **AvaniBot Section**: AI Tele-caller Supervisor & Pitch Coach banner.
- 🃏 **Role & Task Agent Cards**: Quick launch cards for Pitch Coach, Store Sync, and QA Audit channels.
- 💬 **Unified Channel List**: Slack-style channels list with unread message counts.
- 🏆 **Kudos Section**: Weekly tele-caller commission leaderboard.

### 7. **Pulse Channel (`PulseChannel.tsx`)**
- ⬅️ **Navigation**: Back button returning to Pulse Home.
- 📌 **Pinned "Needs Your Input" Card**: Interactive pinned card with action buttons ("Accept & Call Akash Now", "Re-assign") and quick reply form.
- 💬 **Chat Bubbles**: Distinct alignment (others left, agent right) with timestamps, role tags, and avatars.
- ✉️ **Live Message Sending**: Input box appending new messages to local state with automated simulated bot responses.

### 8. **Leads Intelligence Modal (`LeadsModal.tsx`)**
- 🎯 **ICP Fit & Intent Scores**: Dual score cards with progress indicators.
- 🔽 **Collapsible Buying Signals**: Toggleable buying signals accordion (`+` / `-`).
- ↔️ **Modal Pagination**: `< Previous` and `Next >` navigation stepping through all leads with page counter (e.g. `1 of 8`).
- 📞 **Action Handler**: "Start Call" button initiating simulated call state.

---

## 🎁 Bonus Features Completed
- ✅ **Message Sending & Bot Replies**: Full message composition and automated AI response simulation in Pulse channels.
- ✅ **Needs Your Input Resolution**: Interactive action buttons and reply input updating local pinned card state.
- ✅ **Simulated Callback Actions**: Full callback dialogue and status state updates on incoming missed call rows.
- ✅ **Responsive Layout**: Mobile-friendly sidebar drawer and responsive grid layouts for phone & tablet screens.
- ✅ **Recharts Integration**: Custom styled bar chart with currency formatting.

---

## 📂 Folder Structure

```
d:\call center model/
├── public/
├── src/
│   ├── components/
│   │   ├── calendar/
│   │   │   └── CalendarView.tsx
│   │   ├── calls/
│   │   │   ├── CallDetailsModal.tsx
│   │   │   ├── CallsToMake.tsx
│   │   │   ├── IncomingCalls.tsx
│   │   │   └── RecentCalls.tsx
│   │   ├── dashboard/
│   │   │   ├── EarningsChart.tsx
│   │   │   ├── ProgressCards.tsx
│   │   │   ├── StatCard.tsx
│   │   │   └── TasksList.tsx
│   │   ├── layout/
│   │   │   ├── AppShell.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Topbar.tsx
│   │   ├── leads/
│   │   │   ├── LeadDetails.tsx
│   │   │   ├── LeadRow.tsx
│   │   │   ├── LeadsModal.tsx
│   │   │   └── Pagination.tsx
│   │   ├── pulse/
│   │   │   ├── ChannelList.tsx
│   │   │   ├── ChatMessage.tsx
│   │   │   ├── NeedsYourInput.tsx
│   │   │   ├── PulseChannel.tsx
│   │   │   └── PulseHome.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── EmptyState.tsx
│   │       └── Modal.tsx
│   ├── data/
│   │   ├── calendar.ts
│   │   ├── calls.ts
│   │   ├── dashboard.ts
│   │   ├── leads.ts
│   │   └── messages.ts
│   ├── hooks/
│   │   ├── useCalendar.ts
│   │   └── usePagination.ts
│   ├── pages/
│   │   └── Dashboard.tsx
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── dateUtils.ts
│   │   └── formatCurrency.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 💡 Local Mock Data Architecture
All data is populated locally via static TypeScript modules (`src/data/*.ts`):
- `leads.ts`: Contains 8 detailed shopper profiles with ICP fit scores, buying signals, store names, and SOP actions.
- `calls.ts`: Contains call logs with durations, call types, QA scores, and AI notes.
- `calendar.ts`: Contains scheduled callback events across October 2026.
- `messages.ts`: Pre-populated team announcement messages, pitch coaching tips, and pinned SOP cards.
- `dashboard.ts`: Weekly earnings data for Recharts, KPI statistics, and quality objective targets.

---

## 🛠️ How to Run Locally

1. **Clone or Navigate to Project Directory**:
   ```bash
   cd "d:\call center model"
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for Production**:
   ```bash
   npm run build
   ```

5. **Preview Production Build**:
   ```bash
   npm run preview
   ```

---

## 🤖 AI Tools Used
- **Antigravity AI (Google DeepMind Team)**: Used for rapid architecture scaffolding, type definitions, component modularization, and verifying pixel-level alignment with `OnGround_CallCentre_App_Mock.html` and `OnGround_Intern_Assignment_CallCentre_App.pdf`.

---

## 📧 Submission Info
- **Applicant Name**: Ananya Rao / Submitter
- **Submission Deadline**: Sunday, 11 October 2026, 6:00 PM IST
- **Recipient**: `mukunda@on-ground.ai`
