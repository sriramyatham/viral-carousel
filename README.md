# Viral AI Carousel — Landing Page & Prompt Vault

> High-retention 7-slide Instagram carousel blueprint built with the Kallaway dark editorial aesthetic. Features automated Google Sheets lead capture, interactive media player, and 1-click prompt copy.

---

## 🚀 Live Demo & Deployment to GitHub Pages

This project is pre-configured with **GitHub Actions** (`.github/workflows/deploy.yml`) for instant zero-configuration deployment to **GitHub Pages**.

### Steps to Deploy to GitHub (in 2 minutes):

1. **Create a new repository on GitHub**:
   - Go to [github.com/new](https://github.com/new)
   - Name your repo (e.g. `viral-carousel-blueprint`)
   - Keep it Public (or Private with GitHub Pro)

2. **Push this folder to your repository**:
   ```bash
   cd viral-carousel-web
   git init
   git add .
   git commit -m "feat: complete viral carousel landing page with Google Sheets lead capture"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/viral-carousel-blueprint.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - In your GitHub repo, go to **Settings** > **Pages**
   - Under **Build and deployment > Source**, select: **GitHub Actions**
   - The workflow will automatically build and publish your site!
   - Your live link will be: `https://YOUR_USERNAME.github.io/viral-carousel-blueprint/`

---

## 📊 Google Sheets Setup (Save Leads in 60 Seconds)

Collect visitor names and emails directly into a live Google Sheet without running any backend servers.

### 1. Create your Sheet:
1. Open [Google Sheets](https://sheets.new).
2. Name it: `Viral Carousel Leads`.
3. In row 1, type these column headers:
   - **A1**: `Timestamp`
   - **B1**: `Name`
   - **C1**: `Email`
   - **D1**: `Source`
   - **E1**: `Status`

### 2. Add the Webhook Script:
1. In your Google Sheet, click **Extensions** > **Apps Script**.
2. Delete any existing code, and copy-paste the entire contents of [`google-apps-script.js`](./google-apps-script.js).
3. Click the **Save** icon (disk).

### 3. Deploy as a Web App:
1. Click the blue **Deploy** button (top right) > **New deployment**.
2. Click the gear icon next to *Select type* and choose **Web app**.
3. Fill in:
   - **Description**: `Viral Carousel Lead Capture`
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: **`Anyone`** *(Essential so visitors can submit)*
4. Click **Deploy**, then click **Authorize access** and allow permissions.
5. Copy the **Web app URL** (e.g. `https://script.google.com/macros/s/AKfycb.../exec`).

### 4. Connect to Your Website:
You can connect your Google Sheet in either of two ways:
- **Option A (No code)**: Open your live website, scroll to the footer, click `⚙ Configure Google Sheets Webhook`, and paste your URL.
- **Option B (Permanent in code)**: Open `index.html` line 462, and paste your URL into `GOOGLE_SHEET_WEBHOOK_URL`:
  ```javascript
  let GOOGLE_SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycb.../exec';
  ```

---

## 📁 Project Structure

```text
viral-carousel-web/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Actions Pages deployment
├── assets/
│   ├── slide-01.mp4           # 15s Deekay motion hook video
│   ├── slide-02.mp4           # 58s Screen recording workflow video
│   ├── slide-01.png to 07.png # Full slide deck & infographic diagrams
│   └── overview-all-7-slides.png
├── google-apps-script.js      # Copy-paste Google Sheets webhook backend
├── index.html                 # Complete landing page with lead modal & prompt vault
└── README.md                  # Setup documentation
```

---

## 🔒 Lead Gate Flow

1. Visitor lands on your page and previews the first slide and overview.
2. A high-converting modal appears inviting them to unlock the 5 master prompts.
3. When they submit their Name & Email:
   - Data is sent directly to your Google Sheet in real time.
   - A backup is saved in browser storage.
   - All prompt copy buttons are instantly unlocked.
4. If a visitor clicks any prompt button before entering their email, the modal gently opens to prompt them.
