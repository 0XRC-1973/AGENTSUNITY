import time
from typing import Dict, Any, List
from app.agents.resume_agent import resume_agent
from app.agents.job_matching_agent import job_matching_agent
from app.agents.assessment_agent import assessment_agent
from app.agents.interview_agent import interview_agent
from app.agents.learning_agent import learning_agent
from app.agents.career_agent import career_agent

class AgentOrchestrator:
    def __init__(self):
        self.registered_agents = {
            "ResumeAgent": resume_agent,
            "JobMatchingAgent": job_matching_agent,
            "AssessmentAgent": assessment_agent,
            "InterviewAgent": interview_agent,
            "LearningAgent": learning_agent,
            "CareerAgent": career_agent
        }
        self.telemetry_logs: List[Dict[str, Any]] = []

    def log_execution(self, agent_name: str, action: str, duration_ms: float, status: str = "SUCCESS"):
        log_entry = {
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "agent": agent_name,
            "action": action,
            "durationMs": round(duration_ms, 2),
            "status": status
        }
        self.telemetry_logs.append(log_entry)
        # Keep last 100 logs
        if len(self.telemetry_logs) > 100:
            self.telemetry_logs.pop(0)

    def get_system_health(self) -> Dict[str, Any]:
        return {
            "orchestratorStatus": "ONLINE",
            "activeAgents": list(self.registered_agents.keys()),
            "totalExecutions": len(self.telemetry_logs),
            "recentTelemetry": self.telemetry_logs[-5:]
        }

orchestrator = AgentOrchestrator()
