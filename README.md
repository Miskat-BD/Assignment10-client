# StartupForge — Startup Team Builder Platform

StartupForge is a centralized hub designed to bridge the gap between visionary startup founders and talented collaborators. Startup founders can publish innovative ideas, define role requirements, and build dedicated teams. Simultaneously, professionals (developers, designers, marketers) can explore filtered opportunities, track applications, and join exciting early-stage ventures.

## 🚀 Live Links & Repositories

- **Live Deployment:** https://startup-forge-client-mu.vercel.app

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS, HeroUI / NextUI, Framer Motion
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Better Auth (Credential Login + Google OAuth) with Role-Based Access Control (RBAC)
- **Security:** JWT (stored in HTTPOnly Cookies), Environment Variables
- **Payments:** Stripe Checkout API
- **Image Hosting:** ImgBB API

---

## ✨ Key Features & Functionalities

### 🛡️ 1. Authentication & RBAC (Better Auth & JWT)
- Full Authentication system using **Better Auth** supporting standard email/password registration and Google Social Login.
- Password constraints strictly enforced (Min 6 characters, uppercase, lowercase, and a number).
- Custom database hooks injected into Google OAuth to automatically initialize social users with a default `collaborator` role, `free` plan, and `unblock` status.
- Strict **Role-Based Access Control (RBAC)** guarding separate Dashboards for Founders, Collaborators, and Admins.
- Secure session persistence using JWT tokens stored inside secure **HTTPOnly Cookies**.

### 💼 2. Founder Dashboard
- **Overview:** Displays dynamic statistics including Total Opportunities posted, Total Applications received, and Accepted Members.
- **My Startup:** Allows founders to create and manage their company profile (Logo uploaded via ImgBB, Industry, Funding Stage).
- **Add & Manage Opportunities:** Publish job postings requiring specific titles, skills, work types (Remote/Hybrid), and commitment levels.
- **Application Tracking:** Review incoming applications from collaborators to instantly Accept or Reject them.

### 👥 3. Collaborator Dashboard
- **Explore:** Clean and interactive cards to browse through active startups and available positions.
- **Apply to Teams:** Submit custom portfolio links and motivational letters directly to founders.
- **My Applications:** Track application review status (`Pending`, `Accepted`, `Rejected`) in real-time.
- **Profile Management:** Update personal information, technical skills array, and bio.

### 💳 4. Premium Subscription (Stripe Integration)
- Implemented a anti-spam threshold mechanism where Founders are limited to posting a maximum of 3 opportunities on the Free Plan.
- Integrated **Stripe Checkout** to unlock unlimited postings via a Premium Subscription package.
- Auto-saves successful payments into a secure `payments` database collection and generates custom checkout success screens.

### 🔑 5. Admin Panel (Moderation Hub)
- Overall platform insights tracking Total Users, Total Startups, Total Opportunities, and Total Platform Revenue.
- Complete User Moderation (Block/Unblock feature to restrict platform entry).
- Startup Verification (Approve or Remove startup listings).
- Transparent real-time Ledger checking all Stripe transactional histories.

### 🔍 6. Complex Queries & Performance Opts
- **Advanced Searching:** Custom search bar to find opportunities using MongoDB `$regex` expressions matching titles or skill components.
- **Multi-select Filtering:** Refine jobs by Work Type and Industry categories simultaneously using MongoDB `$in` operators.
- **Server-side Pagination:** Seamlessly distributes large chunks of opportunities records across dynamic pages using server-calculated `.skip()` and `.limit()` parameters.

---
