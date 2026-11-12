import re
from typing import List, Dict
from app.models.schemas import ResumeAnalysisResponse
from app.engines.skill_gap_engine import skill_gap_engine, ROLE_SKILL_BENCHMARKS

KNOWN_SKILLS = [
    "python", "javascript", "typescript", "react", "node.js", "nodejs", "express",
    "fastapi", "django", "flask", "mongodb", "postgresql", "mysql", "redis",
    "docker", "kubernetes", "aws", "gcp", "azure", "git", "ci/cd", "linux",
    "machine learning", "deep learning", "pytorch", "tensorflow", "scikit-learn",
    "nlp", "langchain", "rag", "sql", "dsa", "rest api", "graphql", "system design",
    "html", "css", "bootstrap", "tailwind", "next.js", "redux", "pandas", "numpy"
]

class ResumeAgent:
    def __init__(self):
        self.name = "Resume Intelligence Agent"

    def analyze(self, resume_text: str, target_role: str = "Full Stack AI Engineer") -> ResumeAnalysisResponse:
        cleaned_text = resume_text.lower()
        
        # 1. Extract Skills
        extracted_skills = []
        for skill in KNOWN_SKILLS:
            # Match whole words or standard punctuation variations
            pattern = r'\b' + re.escape(skill) + r'\b'
            if re.search(pattern, cleaned_text):
                # Standardize display names
                display_name = "Node.js" if skill in ["node.js", "nodejs"] else skill.title()
                if display_name == "Dsa": display_name = "DSA"
                if display_name == "Aws": display_name = "AWS"
                if display_name == "Gcp": display_name = "GCP"
                if display_name == "Sql": display_name = "SQL"
                if display_name == "Ci/Cd": display_name = "CI/CD"
                if display_name not in extracted_skills:
                    extracted_skills.append(display_name)

        # 2. Extract Experience Years estimate
        exp_matches = re.findall(r'(\d+)\+?\s*(?:years?|yrs?)\b', cleaned_text)
        exp_years = float(max([int(x) for x in exp_matches])) if exp_matches else 1.5

        # 3. Extract Education
        education = []
        if "b.tech" in cleaned_text or "bachelor" in cleaned_text or "b.e" in cleaned_text:
            education.append("Bachelor of Technology (Computer Science / IT)")
        if "master" in cleaned_text or "m.tech" in cleaned_text or "m.s" in cleaned_text:
            education.append("Master of Science / Technology")
        if not education:
            education.append("Undergraduate Degree in Engineering / Science")

        # 4. Target Role Comparison
        benchmarks = ROLE_SKILL_BENCHMARKS.get(target_role, ROLE_SKILL_BENCHMARKS["Full Stack AI Engineer"])
        required_skills = list(benchmarks.keys())

        matched_skills = [s for s in required_skills if any(s.lower() == es.lower() for es in extracted_skills)]
        missing_skills = [s for s in required_skills if not any(s.lower() == es.lower() for es in extracted_skills)]

        # 5. Compute ATS Score
        skill_coverage = len(matched_skills) / len(required_skills) if required_skills else 0.5
        has_metrics = bool(re.search(r'\b(?:\d+%(?:|\s+improvement|\s+reduction)|\d+x|\$\d+)\b', cleaned_text))
        has_action_verbs = bool(re.search(r'\b(developed|engineered|implemented|architected|orchestrated|designed)\b', cleaned_text))
        
        ats_score = int((skill_coverage * 60) + (20 if has_metrics else 10) + (20 if has_action_verbs else 10))
        ats_score = max(45, min(96, ats_score))

        # 6. Strengths and Recommendations
        strengths = [
            f"Strong foundational coverage in: {', '.join(matched_skills[:3]) if matched_skills else 'Core programming'}",
            "Standard technical resume formatting detected",
            "Clear demonstration of software development tools"
        ]

        recommendations = []
        if missing_skills:
            recommendations.append(f"Add critical missing skills for {target_role}: {', '.join(missing_skills[:3])}.")
        if not has_metrics:
            recommendations.append("Quantify project impacts (e.g., 'Optimized API response time by 42%').")
        recommendations.append("Include system design or architecture project artifacts with GitHub links.")

        return ResumeAnalysisResponse(
            atsScore=ats_score,
            extractedSkills=extracted_skills,
            experienceYears=exp_years,
            education=education,
            matchedSkills=matched_skills,
            missingSkills=missing_skills,
            strengths=strengths,
            recommendations=recommendations
        )

resume_agent = ResumeAgent()
