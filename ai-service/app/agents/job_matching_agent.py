from typing import Dict, List
from app.models.schemas import JobMatchRequest, JobMatchResponse, SkillBreakdownItem
from app.engines.skill_gap_engine import skill_gap_engine

class JobMatchingAgent:
    def __init__(self):
        self.name = "Job Matching Agent"

    def match(self, request: JobMatchRequest) -> JobMatchResponse:
        candidate_skills = request.candidateSkills
        job = request.job
        required_skills = job.requiredSkills
        
        breakdown: List[SkillBreakdownItem] = []
        matched_skills: List[str] = []
        missing_skills: List[str] = []
        weak_skills: List[str] = []

        total_weight = len(required_skills) * 100
        earned_score = 0

        for req_skill in required_skills:
            req_level = 75  # benchmark threshold
            
            # Find candidate proficiency
            cand_level = 0
            for cs, score in candidate_skills.items():
                if cs.lower() == req_skill.lower() or cs.lower() in req_skill.lower() or req_skill.lower() in cs.lower():
                    cand_level = max(cand_level, score)

            earned_score += min(cand_level, 100)

            if cand_level >= 65:
                status = "MATCHED"
                matched_skills.append(req_skill)
            elif cand_level >= 35:
                status = "WEAK"
                weak_skills.append(req_skill)
            else:
                status = "MISSING"
                missing_skills.append(req_skill)

            breakdown.append(SkillBreakdownItem(
                skill=req_skill,
                candidateLevel=cand_level,
                requiredLevel=req_level,
                status=status
            ))

        skill_score = int((earned_score / total_weight) * 100) if total_weight > 0 else 50
        
        # Semantic similarity between candidate top skills & job description
        candidate_summary = " ".join([f"{k} with score {v}" for k, v in candidate_skills.items()])
        semantic_score = skill_gap_engine.calculate_semantic_similarity(candidate_summary, job.description)

        # Weighted overall match: 70% skill proficiency + 30% semantic context
        overall_match = int((0.70 * skill_score) + (0.30 * semantic_score))
        overall_match = max(30, min(98, overall_match))

        # AI Recommendation message for closed-loop trigger
        if missing_skills or weak_skills:
            gaps_str = ", ".join((missing_skills + weak_skills)[:3])
            ai_rec = f"You are currently {overall_match}% matched for this role. Your primary competency gaps are {gaps_str}. Initiating targeted AI remediation can elevate your match to 90%+."
        else:
            ai_rec = f"Outstanding match of {overall_match}%! Your skill portfolio satisfies the core competencies for {job.title}."

        return JobMatchResponse(
            overallMatch=overall_match,
            skillScore=skill_score,
            semanticScore=semantic_score,
            matchedSkills=matched_skills,
            missingSkills=missing_skills,
            weakSkills=weak_skills,
            breakdown=breakdown,
            aiRecommendation=ai_rec
        )

job_matching_agent = JobMatchingAgent()
