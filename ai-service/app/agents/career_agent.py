from typing import Dict, List
from app.models.schemas import FeedbackLoopRequest, FeedbackLoopResponse, CareerRoadmapRequest
from app.agents.learning_agent import learning_agent

class CareerAgent:
    def __init__(self):
        self.name = "Autonomous Career Intelligence & Feedback Agent"

    def execute_feedback_loop(self, request: FeedbackLoopRequest) -> FeedbackLoopResponse:
        """
        Closed-Loop USP:
        When a student's job match or assessment reveals competency gaps,
        the Career Agent coordinates with the Learning Agent to generate
        a remediation curriculum and projects the updated job match score.
        """
        missing_skills = request.missingSkills
        current_skills = request.currentSkills
        initial_match = request.jobMatchScore
        target_role = request.targetRole

        # Order gaps by strategic market priority
        priority_order = ["Docker", "AWS", "System Design", "Kubernetes", "Redis", "DSA"]
        prioritized_gaps = []
        
        for p in priority_order:
            for ms in missing_skills:
                if p.lower() in ms.lower() and ms not in prioritized_gaps:
                    prioritized_gaps.append(ms)

        # Append any remaining gaps
        for ms in missing_skills:
            if ms not in prioritized_gaps:
                prioritized_gaps.append(ms)

        # Request tailored remediation roadmap from Learning Agent
        roadmap_req = CareerRoadmapRequest(
            targetRole=target_role,
            currentSkills=current_skills,
            targetGaps=prioritized_gaps[:4]
        )
        learning_plan = learning_agent.generate_roadmap(roadmap_req)

        # Calculate projected match improvement:
        # e.g., 72% -> +14% (Week 1 & 2) -> +9% (Week 3 & 4) = 95%
        projected_match = min(96, initial_match + (len(learning_plan.weeks) * 6))

        message = (
            f"Closed-Loop Activated: Candidate initially matched at {initial_match}%. "
            f"Career Agent identified {len(prioritized_gaps)} critical competency gaps ({', '.join(prioritized_gaps[:3])}). "
            f"Autonomous {len(learning_plan.weeks)}-week sprint generated. "
            f"Projected match upon sprint completion: {projected_match}%."
        )

        return FeedbackLoopResponse(
            status="REMEDIATION_PLAN_ACTIVE",
            message=message,
            prioritizedGaps=prioritized_gaps,
            remediationWeeks=learning_plan.weeks,
            initialMatch=initial_match,
            projectedMatchAfterRemediation=projected_match
        )

career_agent = CareerAgent()
