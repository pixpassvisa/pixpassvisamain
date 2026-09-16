# 🌐 PixPassVisa — AI-Powered Global Passport & Visa Photo Platform

> A production-grade AI platform that helps passport and visa applicants worldwide **create, check, validate, and download** government-compliant biometric photos — in seconds, from any device.

🔗 **Official Website:** [https://www.pixpassvisa.com/](https://www.pixpassvisa.com/)

---

## 📌 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Core Tools & Pages](#core-tools--pages)
- [Supported Countries & Standards](#supported-countries--standards)
- [How It Works](#how-it-works)
- [Tech Stack & Architecture](#tech-stack--architecture)
- [Privacy & Data Security](#privacy--data-security)
- [Getting Started & Local Development](#getting-started--local-development)
- [Contributing & Feedback](#contributing--feedback)

---

## Overview

**PixPassVisa** solves a universal problem: **visa and passport photo rejections cost applicants time, money, and non-refundable application fees.**

Government immigration portals (US State Dept, UK HMPO, Australia DFAT, Schengen Consulates, Canada IRCC) enforce strict biometric specifications (ICAO Doc 9303 & ISO/IEC 19794-5). A difference of a single millimeter in face height, slight shadow, or an off-color background leads to instant rejection.

PixPassVisa combines computer vision facial landmark detection, AI background removal, and an official 50+ country specification database to auto-generate and validate compliant photos directly in the browser.

---

## Key Features

- **Instant AI Background Removal:** Automatically replaces cluttered backgrounds with compliant solid white, light grey, or off-white.
- **Biometric Head Proportion & Centering:** Aligns eye levels and chin-to-crown heights to exact consular percentages (50–69% for US/2×2 in, 70–80% for UK/Schengen/India/Australia).
- **30+ Automated Compliance Checks:** Validates image dimensions, eye openness, neutral expression, lighting balance, tilt, and detects prohibited items (e.g. eyeglasses, hats).
- **Global 50+ Country Database:** Built-in specifications for US, UK, Canada, Australia, Schengen (27 EU countries), India, Germany, and more.
- **Print Template Generator:** Generates 300 DPI high-resolution 4×6 inch (up to 6 photos) and A4 sheets with clean cutting guides for home or pharmacy printing.
- **100% Ephemeral Processing:** Zero permanent image retention on remote servers for maximum privacy.

---

## Core Tools & Pages

| Tool | Route | Description |
| :--- | :--- | :--- |
| **Global Size Chart Hub** | [`/passport-photo-sizes`](https://www.pixpassvisa.com/passport-photo-sizes) | 50+ country dimensions in mm, inches, and pixels at 300 DPI. |
| **Passport Photo Checker** | [`/passport-photo-checker`](https://www.pixpassvisa.com/passport-photo-checker) | 30+ point automated biometric compliance test. |
| **Online Photo Checker** | [`/online-passport-photo-checker`](https://www.pixpassvisa.com/online-passport-photo-checker) | Browser-based validator with no sign-up or installation required. |
| **DV Lottery Photo Checker** | [`/diversity-visa-lottery-photo-checker`](https://www.pixpassvisa.com/diversity-visa-lottery-photo-checker) | US Green Card lottery 600×600 px digital photo validator. |
| **Australian Photo Checker** | [`/australian-passport-photo-checker`](https://www.pixpassvisa.com/australian-passport-photo-checker) | DFAT & APO 35×45mm, 32–36mm face height, and no-glasses check. |
| **UK Photo Checker** | [`/uk-passport-photo-checker-online-free`](https://www.pixpassvisa.com/uk-passport-photo-checker-online-free) | HMPO & GOV.UK 35×45mm cream/light grey background validator. |
| **Passport Size Photo Maker** | [`/passport-size-photo-maker`](https://www.pixpassvisa.com/passport-size-photo-maker) | Crop, resize, remove background, and create compliant photos. |
| **Print Template Generator** | [`/passport-photo-print-template-generator`](https://www.pixpassvisa.com/passport-photo-print-template-generator) | Create 4×6 and A4 printable multi-photo sheets at 300 DPI. |
| **Editorial Methodology** | [`/editorial-methodology`](https://www.pixpassvisa.com/editorial-methodology) | 5-step statutory verification process and consular sources. |

---

## Supported Countries & Standards

PixPassVisa covers over 50 countries and international document specifications:

- 🇺🇸 **United States:** US Passport, DS-160 Non-Immigrant Visa, DV Lottery (2×2 in / 51×51 mm / 600×600 px)
- 🇬🇧 **United Kingdom:** UK Passport, Standard Visitor Visa, Driving Licence (35×45 mm / cream or light grey bg)
- 🇪🇺 **Schengen Area (27 EU States):** Tourist, Business & National D-Visas (35×45 mm / 70–80% face coverage)
- 🇦🇺 **Australia:** Australian Passport (APO), ImmiAccount Visa Subclasses 600, 500, 482 (35×45 mm / 32–36mm face height)
- 🇨🇦 **Canada:** IRCC Visa (35×45 mm) & Canadian Passport (50×70 mm)
- 🇮🇳 **India:** Indian Passport, OCI Card, e-Visa (51×51 mm & 35×45 mm)
- 🇩🇪 **Germany:** Biometric Passport & National Visa (35×45 mm)
- 🌍 **International Civil Aviation Organization (ICAO):** Doc 9303 Machine Readable Travel Documents & ISO/IEC 19794-5

---

## How It Works

```
 1. Select Country & Doc Type
    (Loads exact mm, px & biometric ratios)
              ↓
 2. Upload Any Portrait / Selfie
    (Taken with smartphone or camera)
              ↓
 3. Automated AI Processing Pipeline
    ├── MediaPipe 468-point facial landmark grid
    ├── U²-Net AI solid background replacement
    ├── Biometric chin-to-crown ratio alignment
    └── 30+ rule validation check (lighting, glare, expression)
              ↓
 4. Instant Compliance Preview
    (Free diagnostic report with pass/fail indicators)
              ↓
 5. Download 300 DPI Photo or Print Template
    (Ready for online government upload or 4×6 / A4 printing)
```

---

## Tech Stack & Architecture

- **Frontend Framework:** Next.js (App Router), React, TypeScript
- **Styling:** Tailwind CSS + Vanilla CSS utilities
- **Computer Vision & Face Mesh:** Google MediaPipe (468 facial landmark detection) + OpenCV
- **AI Background Segmentation:** U²-Net (ONNX runtime) optimized for low memory footprint
- **Backend API:** Python FastAPI + Uvicorn (lightweight async inference engine)
- **Database:** MongoDB Atlas (Mongoose schema validation)
- **Deployment & Hosting:** Vercel (Edge-optimized Frontend) + Render (FastAPI Backend)
- **SEO & GEO Engine:** JSON-LD Knowledge Graph (`Organization`, `WebSite`, `SoftwareApplication`, `HowTo`, `FAQPage`), Google Featured Snippet & AI Direct Answers.

---

## Privacy & Data Security

- **Ephemeral Processing:** Uploaded images are processed in-memory (RAM) and immediately discarded.
- **Zero Image Retention:** PixPassVisa does not store, archive, or share user face biometric data or photographs with third parties or government agencies.
- **End-to-End Encryption:** All data in transit is protected using standard HTTPS / TLS 1.3 encryption.

---

## Getting Started & Local Development

### Prerequisites
- Node.js (v18 or higher)
- Python 3.10+ (for backend API)
- MongoDB URI

### 1. Frontend Setup (Next.js)
```bash
# Clone the repository
git clone https://github.com/pixpassvisa/pixpassvisamain.git
cd VisaPassport-main

# Install dependencies
npm install

# Configure environment variables (.env.local)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string

# Run local development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Backend Setup (FastAPI / AI Model)
```bash
cd passportphotoapi-main

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install requirements
pip install -r requirements.txt

# Start FastAPI server
uvicorn main:app --reload --port 8000
```

---

## Contributing & Feedback

Have a suggestion for a new country specification or found a consular update?

- Visit **[pixpassvisa.com/contact](https://www.pixpassvisa.com/contact)**
- Or submit an issue directly on GitHub.

---

*Built with precision for travelers, expats, and visa applicants worldwide. © PixPassVisa.*