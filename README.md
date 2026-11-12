# 🚀 AGENTS UNITY
### Autonomous AI Learning + Recruitment Intelligence Platform
**Tagline:** *Learn. Practice. Prove. Get Hired.*

---

## 🌟 1. Project Overview & The Unique Selling Proposition (USP)

Traditional EdTech and job portals operate in silos:
$$\text{Course} \longrightarrow \text{Certificate} \longrightarrow \text{Disconnected Job Search}$$

**AGENTS UNITY** unites learning and recruitment into an autonomous, closed-loop intelligence cycle:
```
                    ┌──────────────────┐
                    │     STUDENT      │
                    └────────┬─────────┘
                             ↓
                     Skill Assessment
                             ↓
                    Personalized Roadmap
                             ↓
                       AI Learning
                             ↓
                    Practice & Projects
                             ↓
                     AI Evaluation
                             ↓
                     Skill Profile
                             ↓
                       Job Matching
                             ↓
                    AI Mock Interview
                             ↓
                    Interview Analysis
                             ↓
                     Job Readiness
                             ↓
                     JOB APPLICATION
                             ↓
                       Interview
                             ↓
                       FEEDBACK
                             │
                             └──────────────→ Learning Roadmap
```

### 🏆 The Viva-Grade USP Definition:
> *"An autonomous AI career ecosystem that continuously evaluates a student's skills, identifies competency gaps, generates personalized learning paths, assesses job readiness, matches candidates with suitable opportunities, conducts adaptive interviews, and uses recruitment feedback to dynamically update the learner's career roadmap."*

---

## 🤖 2. Multi-Agent Architecture

Rather than relying on a single conversational model, AGENTS UNITY deploys **6 Specialized Autonomous Agents** governed by a **Central Orchestrator**:

```
                    ┌────────────────────┐
                    │  AI ORCHESTRATOR   │
                    └─────────┬──────────┘
                              │
       ┌──────────┬───────────┼───────────┬──────────┐
       ↓          ↓           ↓           ↓          ↓
  Learning     Resume      Job Match   Interview   Career
   Agent       Agent         Agent       Agent      Agent
       │          │           │           │          │
       ↓          ↓           ↓           ↓          ↓
   Practice    Parser      Matching    Evaluation  Planning
    Agent                   Agent        Agent
       │
       ↓
  Assessment
    Agent
```

1. **🎓 Learning Agent (`/agents/learning/roadmap`)**: Formulates personalized weekly roadmaps, assigns milestone hours, and breaks down projects into actionable tasks.
2. **📝 Assessment Agent (`/agents/assessment/generate`, `/agents/assessment/evaluate`)**: Generates adaptive technical challenges across **Easy $\to$ Medium $\to$ Hard** tiers based on live candidate accuracy.
3. **📄 Resume Agent (`/agents/resume/analyze`)**: Performs deep PDF text extraction, computes ATS match scores (0–100%), extracts technical entities, and highlights missing prerequisites.
4. **💼 Job Matching Agent (`/agents/jobs/match`)**: Employs hybrid weighted cosine similarity between candidate competency vectors and live job descriptions.
5. **🎤 Mock Interview Agent (`/agents/interview/question`, `/agents/interview/evaluate`)**: Conducts progressive technical interviews, scoring **Technical Accuracy, Communication, Depth, and Confidence**, while dynamically adapting follow-up questions to candidate responses.
6. **🎯 Career Strategy & Feedback Agent (`/agents/career/feedback-loop`)**: Executes the core closed-loop feedback: takes a 72% match with missing skills (Docker, AWS, System Design), synthesizes a 4-week accelerated sprint, and elevates readiness to 95%+.

---

## 🏗️ 3. Full System Architecture & Tech Stack

| Layer | Technologies | Responsibilities |
| :--- | :--- | :--- |
| **Frontend** | React 18, Bootstrap 5, Recharts, Lucide Icons, Axios, React Router | Glassmorphic Dark UI, Career Graph visualization, radar competency charts, interactive assessment & mock interview terminal |
| **API Gateway** | Node.js, Express.js, JWT, Multer, Socket.IO, Helmet, CORS | Authentication, Role-Based Access Control (`STUDENT`, `RECRUITER`, `ADMIN`), rate limiting, file uploads, agent routing |
| **AI Brain** | Python 3.12, FastAPI, Pydantic, Scikit-learn, TF-IDF, Cosine Similarity | Agent orchestration, adaptive test generation, rubric evaluation, semantic matching, feedback loop controller |
| **Relational Store** | PostgreSQL / Prisma ORM | Users, roles, jobs, applications, courses, verified skill proficiencies |
| **AI Data Layer** | MongoDB / Mongoose | Transcripts, agent telemetry logs, parsed resume JSON trees, evaluation reports |
| **DevOps** | Docker, Docker Compose | Production-grade containerization for frontend, server, ai-service, postgres, and mongodb |

---

## ⚡ 4. Quickstart & Local Setup

### Prerequisites:
- **Node.js** v18+ and **npm** v9+
- **Python** 3.10+

### Option A: Local Development (Fastest)

1. **Start the Python AI Brain**:
   ```bash
   cd ai-service
   pip install -r requirements.txt
   python main.py
   # Service running on http://localhost:8000
   ```

2. **Start the Node.js API Gateway**:
   ```bash
   cd server
   npm install
   npm run dev
   # Gateway running on http://localhost:5000
   ```

3. **Start the React Frontend**:
   ```bash
   cd client
   npm install
   npm run dev
   # Frontend running on http://localhost:3000
   ```

4. **Open in Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000).

---

### Option B: Docker Compose (All-in-One)

```bash
docker-compose up --build
```
This orchestrates:
- `client` on port `3000`
- `server` on port `5000`
- `ai-service` on port `8000`
- `postgres` on port `5432`
- `mongodb` on port `27017`

---

## 🔑 5. Pre-Seeded Demonstration Accounts

For viva, evaluation, and testing:

| Role | Email | Password | Pre-Loaded Features |
| :--- | :--- | :--- | :--- |
| **Student** | `student@careermind.ai` | `password123` | Pre-evaluated skill profile, 74% initial readiness, active resume review, and pending sprint tasks. |
| **Recruiter** | `recruiter@techhire.ai` | `password123` | Talent acquisition dashboard, active job postings, AI shortlisted candidate pool, candidate status toggles. |

---

## 🎓 6. Step-by-Step Viva / Demo Walkthrough

1. **Landing Page (`/`)**:
   - Showcase the platform vision, the interactive closed-loop diagram, and live telemetry from the 6 specialized AI agents.
   - Click **"Launch Student Cockpit"** or **"Student Demo"**.

2. **Student Dashboard / Career Cockpit (`/dashboard`)**:
   - Inspect the **Job Readiness Gauge (74%)** and **Target Role Match (87%)**.
   - Review the **Candidate Competency Radar** comparing student scores with industry benchmarks.
   - Explore the **Autonomous Career Progression Graph**: visualizes how foundational skills converge through System Design and Cloud towards the Job-Ready Tier.
   - Point out the **Gap Alert**: Docker (38%), AWS (42%), System Design (40%).

3. **Resume Studio (`/resume`)**:
   - Upload a resume or click **"Run Demo Analysis"**.
   - Show the **Resume Intelligence Agent** extracting skills, computing ATS Score (84%), and flagging critical missing skills.

4. **Adaptive Assessment Arena (`/assessments`)**:
   - Select **Python** or **Docker**, choose difficulty (**Easy / Medium / Hard**), and launch challenges.
   - Answer questions and click **"Submit Assessment"**.
   - Show how the AI Assessment Agent grades answers, provides feedback, and **dynamically levels up challenge difficulty**.

5. **Conversational Mock Interview (`/interview`)**:
   - Launch an interview for *Full Stack AI Engineer*.
   - The AI Interviewer dynamically questions the candidate.
   - Submit an answer mentioning a technical keyword (e.g. *MongoDB* or *Docker*).
   - **Showcase Agentic Behavior**: The AI listens, evaluates accuracy/communication/depth, and **generates a contextual follow-up question based on the candidate's specific answer**!

6. **Job Matching & The Closed-Loop Feedback Trigger (`/jobs`)**:
   - Browse job opportunities with live AI match scores (e.g., 76% for Full Stack AI Engineer).
   - Click **"Close Gaps with AI (Boost to 95%)"**.
   - The platform triggers the **Career & Feedback Agent**, immediately synthesizing a tailored 4-week remediation sprint.

7. **Career Roadmap & Milestone Boost (`/learning`)**:
   - View the 4-week sprint covering Docker, AWS, System Design, and the Capstone.
   - Click **"Verify & Complete"** on Week 1 (Docker).
   - Watch the candidate's Docker score elevate by +28 points and the overall Job Readiness dynamically increase!

8. **Recruiter Intelligence Portal (`/recruiter`)**:
   - Switch to the Recruiter view.
   - Show recruitment analytics: Active Jobs, Applications, AI Shortlisted.
   - Filter candidate pools by **AI Match > 85%**.
   - Update candidate status from *Review* to *Shortlisted* or *Hired*.
   - Open the **"Post New Opportunity"** modal to index new technical roles.

---

## 📜 7. License & Credits

Built as the Final Year Capstone Project by the **AGENTSUNITY Team**.  
*MIT License — Designed for academic excellence and production scalability.*
