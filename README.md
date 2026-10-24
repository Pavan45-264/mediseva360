# MediQueue — Groww-Faithful Healthcare & Token Queue Platform

> **Healthcare simplified, Groww style.** A pixel-faithful clone of the Groww investing app's design language, layout, navigation, typography, and UX patterns applied to hospitals, appointments, live OPD tokens, and healthcare payments instead of stocks.

---

## 🌟 1. Design System & Theme Tokens

MediQueue adopts Groww's signature clean, white-first design philosophy with an optional dark mode toggle:

### Light Theme Tokens (Groww Default)
- **Page Background:** `#FFFFFF`
- **Subtle Gray Background & Chips:** `#F5F6F8`
- **Card Border & Dividers:** `#E8E8EC`
- **Heading Text:** `#44475B`
- **Secondary / Caption Text:** `#7C7E8C`
- **Brand Green (Primary Buttons, Positive Trends, "Paid"):** `#00D09C`
- **Darker Text Green:** `#00B386`
- **Brand Blue-Violet (Links, Active Chips):** `#5367FF`
- **Emergency / Negative Red:** `#EB5B3C`
- **High Priority Amber:** `#FFA24C`
- **Moderate Priority Yellow:** `#F5C451`
- **Tints:** Green `#E6F9F4`, Blue `#EEF0FF`, Red `#FDEEEA`

### Dark Theme Tokens (Profile Switch)
- **Background:** `#121212`
- **Card Background:** `#1B1B1B`
- **Divider:** `#2C2C2C`
- **Heading Text:** `#FFFFFF`
- **Secondary Text:** `#9A9A9A`

---

## 🗺️ 2. Groww UI Wording Map

| Groww Investment Term | MediQueue Healthcare Equivalent |
|---|---|
| **Explore** | **Explore** |
| **Stocks** | **Hospitals** |
| **Mutual Funds** | **Doctors** |
| **Watchlist** | **Saved Hospitals** |
| **Holdings** | **My Visits** |
| **Orders** | **Appointments** |
| **Positions** | **Today's Token** |
| **Groww Balance** | **Wallet / Hospital Balance** |
| **Add money** | **Add money** |
| **Withdraw** | **Refund to bank** |
| **Buy / Invest now** | **Book now** |
| **Sell** | **Cancel** |
| **Top gainers / Most traded** | **Top rated / Most booked** |
| **Stocks in news** | **Health news / Hospital updates** |
| **Products & Tools** | **Services & Tools** |
| **Search "What are you looking for today?"** | **Search "What are you looking for today?" (hospitals, doctors, specialities)** |
| **1D, 1W, 1M, 1Y chart chips** | **Today, 7D, 1M, 1Y live OPD wait chips** |
| **Your investments** | **Your health** |
| **Reports** | **Reports & Prescriptions** |

---

## 📱 3. Core Screens & Architecture

### A. Patient Experience
1. **Explore Screen:**
   - Universal search with debounced autocomplete.
   - Round-icon shortcut row ("Services & Tools"): Book Appointment, Live Token, Nearby Hospitals, Emergency (108), Reports, Pay Bills.
   - **Your Live Token Card:** Big token badge (`A-24`), "Now serving: `A-19`", estimated wait time (`~15 mins`), animated queue progress bar, and an interactive **"Simulate Next Token"** button for examiners to test queue movement in real-time.
   - **Nearby Hospitals:** Horizontal scrolling cards with distance (`1.4 km`), rating (`★ 4.8`), average wait delta (`▲ 3m` / `▼ 5m`).
   - **Top Rated Doctors / Most Booked:** Filter chips for Cardiology, General Medicine, Pediatrics, Orthopedics, Oncology, etc.
   - **Upcoming Appointment Ticket:** Digital pass preview with date, time, and room number.
   - **Emergency Strip:** One-tap `Call 108` ambulance dispatcher banner.

2. **Hospitals Screen (Groww Stocks equivalent):**
   - Category chips: *All Hospitals, Near Me (GPS), Book Online (Live), Top Rated, Govt (ABDM), Super Speciality*.
   - Distance radius chips: *2 km, 5 km, 10 km, 25 km, 50 km, All India*.
   - **Haversine Distance Calculator:** Sorts facilities by nearest GPS distance.
   - **List & Map View Toggle:** Interactive map with custom green/grey medical pins.
   - **Onboarded vs Listed-Only Facilities:** Onboarded hospitals support live token and payment; listed-only hospitals show contact/navigation and a functional **"Invite hospital"** button.

3. **Hospital Detail Page (Groww Stock Page equivalent):**
   - Hospital name, Super Speciality tag, ABDM Verified badge, rating, reviews.
   - **Interactive Live-Wait Chart (Recharts):** Replaces stock price chart with Today, 7D, 1M, 1Y timeframe chips and hoverable wait-time tooltips.
   - Department live queue boards (Cardiology, General OPD, Pediatrics, Orthopedics).
   - Sticky bottom green button: **Book now (₹450)**.

4. **Booking Flow (Groww Order Stepper):**
   - Step 1: Department & Clinician selection + Date/Slot picking.
   - Step 2: Patient details & Clinical Triage self-assessment (Emergency / High / Moderate / Routine).
   - Step 3: Order Summary (Consultation fee, ₹0 platform charges, GST exemption) + Payment Method (UPI, Wallet, Card, Counter).
   - Step 4: Instant confirmation screen with animated green checkmark, QR code ticket, and sync to live token.

5. **Profile Screen (Groww Account Page):**
   - User profile with ABDM Ayushman Bharat Health Account (ABHA ID).
   - **Wallet / Hospital Balance Card:** Big balance (`₹ 1,450.00`), with functional `+ Add money` (preset ₹100, ₹500, ₹1000 chips) and `Refund to bank` modals.
   - Light/Dark theme toggle & English / Telugu / Hindi language switcher.
   - Menu rows: Appointments, My Visits, Payments & UPI Transactions, Saved Hospitals, Family Members, DPDP Act 2023 Security.

### B. Hospital Staff Portal
- **Staff Home:**
  - *"Good morning, Dr. R. Sharma"*
  - **Today's Collection Card:** Big ₹ amount (`₹ 48,650`), green delta (`▲ ₹ 6,200 (+14.6%)`), split into UPI, Cash, and Card breakdown.
  - Horizontally scrolling stat cards: Tokens (142), Waiting (6), In Consultation (1), Completed (133), Emergency (2).
  - Active patient in room card.
  - Sticky green **"Call next"** button with audio chime to advance the queue.
- **Queue Management:**
  - Live patient queue table with Triage badges (Emergency red, High amber, Moderate yellow, Low green).
  - Filter pills: All, Emergency, High, Moderate, Low, Waiting, In Consultation, Completed.
  - Action buttons: Call Patient, Complete Consultation, Register Walk-In.
  - Clinical operational aid disclaimer.

---

## 🔒 4. Compliance & Security (DPDP Act 2023 & ABDM)

- **DPDP Act 2023 Readiness:** Zero storage of sensitive patient vitals on public client caches; explicit user consent management.
- **ABDM Integration:** Milestone M1 (ABHA creation/linking), M2 (Health Facility Registry lookup), and M3 (Health Information Exchange).
- **Payment Security:** No card numbers or UPI PINs stored; verified simulated gateway flow.

---

## 🛠️ 5. Technology Stack

- **Frontend:** React 18, TypeScript / JSX, Vite 5 PWA.
- **Styling:** Tailwind CSS with custom Groww color variables.
- **Icons:** Lucide Icons (thin line icons matching Groww).
- **Charts:** Recharts (responsive AreaChart for live OPD wait telemetry).
- **Maps:** Leaflet & OpenStreetMap layer.
- **Internationalization (i18n):** English, Telugu (తెలుగు), and Hindi (हिन्दी).
