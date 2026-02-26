# ARAW.ai (Automated Registrar and Administrative Workflows)

**ARAW.ai** is an intelligent Student Virtual Assistant and Management Portal designed for Visayas State University (VSU). It streamlines the admissions process, document requests, and student fee management, providing a centralized hub for all registrar and administrative workflows.

> "The Future of VSU Admissions is Here."

## 🚀 Features

- **AI-Powered Student Assistant:** A virtual assistant powered by Google Gemini that handles admissions inquiries, document requirements, and general VSU information.
- **Automated Document Requests:** A structured, multi-step workflow for requesting academic and administrative documents with identity verification.
- **Fee Management & Payment:** Integrated monitoring of administrative fees with support for online payment options (e.g., GCash integration).
- **Student Dashboard:** A secure, centralized hub for students to track request statuses, view notifications, and interact with the AI assistant.
- **Modern UI/UX:** Built with a premium, responsive design featuring glassmorphism, smooth animations, and role-based navigation.

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI & Styling:** [Tailwind CSS 4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/), [Lucide React](https://lucide.dev/)
- **Backend/Database:** [Supabase](https://supabase.com/) (Database, Auth, SSR)
- **AI Integration:** [Google Gemini API](https://ai.google.dev/) (`@google/genai`)
- **Deployment:** [Vercel](https://vercel.com/)

## 📦 Getting Started

### Prerequisites

- Node.js (Latest LTS version)
- npm / pnpm / yarn
- A Supabase project (for database and authentication)
- A Google AI Studio API Key (for Gemini integration)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/gabiXDpapi/arawai.git
   cd arawai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   GEMINI_API_KEY=your_google_gemini_api_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 👥 Collaborators

- **Gabriel Y. Mosquera**
- **Pete Alexander N. Piangco**
- **John Andrei B. Kahano**

---

Developed as part of the 2nd Hackathon event for CS Week.
