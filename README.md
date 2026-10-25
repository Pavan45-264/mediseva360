# 🏥 MEDI SEVA 360 — One Platform. Every Hospital. Smarter Healthcare.

> **Live Application:** [https://mediseva360.vercel.app/](https://mediseva360.vercel.app/)

A unified healthcare and hospital management platform designed for both patients and healthcare providers. MEDI SEVA 360 bridges the gap between citizens and 700+ verified hospitals across India with zero queues, real-time OPD token tracking, instant digital appointments, and emergency coordination.

---

## 🌟 Key Features

### 👤 1. Patient Portal
- **Instant OPD Token Booking:** Book appointment tokens for government and private hospitals with 1 tap.
- **Live Queue Telemetry:** See current token served, patients ahead, and estimated wait times in real time.
- **Emergency Ambulance Dispatch:** Quick emergency banner and 108 ambulance coordination.
- **Multi-Language Support:** English, Telugu (తెలుగు), and Hindi (हिन्दी).
- **HFR Verified Network:** Real hospital directory with GPS distance, department queues, and available facilities.
- **Digital Health Wallet:** Integrated balance for doctor consultations and instant receipts.

### 🏥 2. Hospital & Receptionist Portal
- **Counter Kiosk & Token Caller:** Front-desk interface to call next tokens, prioritize urgent/emergency walk-ins, and manage department queues.
- **Daily Collections Dashboard:** Live tracking of daily cash, UPI, and digital receipts.
- **Department Queue Overview:** Real-time visibility into General OPD, Cardiology, Pediatrics, Orthopedics, and more.

### 📱 3. Progressive Web App (PWA)
- Installable on iOS (Safari Add to Home Screen) and Android (Chrome PWA).
- Offline shell caching via Service Worker & Workbox.
- Push notification handling for token updates and appointment alerts.

---

## 🚀 Quick Start / Local Development

### 1. Clone the repository
```bash
git clone https://github.com/Pavan45-264/mediseva360.git
cd mediseva360
```

### 2. Run the application locally
Using any static server (or Vite):

```bash
# Using npx serve
npx serve .

# Or using npm
npm install
npm run dev
```

Open your browser at `http://localhost:3000` (or the port indicated in terminal).

---

## 🌐 Deployment

The application is deployed on Vercel:
- Production URL: [https://mediseva360.vercel.app/](https://mediseva360.vercel.app/)
- Single-page application rewrites are configured in `vercel.json` and `_redirects`.

---

## 📄 License
MIT License. Built for Smart Healthcare in India.
