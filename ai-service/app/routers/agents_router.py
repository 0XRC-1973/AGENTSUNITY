import time
from fastapi import APIRouter, HTTPException
from app.models.schemas import (
    ResumeAnalysisRequest, ResumeAnalysisResponse,
    JobMatchRequest, JobMatchResponse,
    AssessmentGenerateRequest, QuestionItem,
    AssessmentEvaluateRequest, AssessmentEvaluationResponse,
    InterviewQuestionRequest, InterviewQuestionResponse,
    InterviewEvaluateRequest, InterviewEvaluationResponse,
    CareerRoadmapRequest, CareerRoadmapResponse,
    FeedbackLoopRequest, FeedbackLoopResponse
)
from app.agents.orchestrator import orchestrator
from app.agents.resume_agent import resume_agent
from app.agents.job_matching_agent import job_matching_agent
from app.agents.assessment_agent import assessment_agent
from app.agents.interview_agent import interview_agent
from app.agents.learning_agent import learning_agent
from app.agents.career_agent import career_agent

router = APIRouter(prefix="/agents", tags=["Autonomous AI Agents"])

@router.post("/resume/analyze", response_model=ResumeAnalysisResponse)
async def analyze_resume(request: ResumeAnalysisRequest):
    start = time.time()
    try:
        res = resume_agent.analyze(request.resumeText, request.targetRole or "Full Stack AI Engineer")
        orchestrator.log_execution("ResumeAgent", "analyze_resume", (time.time() - start) * 1000)
        return res
    except Exception as e:
        orchestrator.log_execution("ResumeAgent", "analyze_resume", (time.time() - start) * 1000, "ERROR")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/jobs/match", response_model=JobMatchResponse)
async def match_job(request: JobMatchRequest):
    start = time.time()
    try:
        res = job_matching_agent.match(request)
        orchestrator.log_execution("JobMatchingAgent", "match_job", (time.time() - start) * 1000)
        return res
    except Exception as e:
        orchestrator.log_execution("JobMatchingAgent", "match_job", (time.time() - start) * 1000, "ERROR")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/assessment/generate")
async def generate_assessment(request: AssessmentGenerateRequest):
    start = time.time()
    try:
        res = assessment_agent.generate_assessment(request)
        orchestrator.log_execution("AssessmentAgent", "generate_assessment", (time.time() - start) * 1000)
        return res
    except Exception as e:
        orchestrator.log_execution("AssessmentAgent", "generate_assessment", (time.time() - start) * 1000, "ERROR")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/assessment/evaluate", response_model=AssessmentEvaluationResponse)
async def evaluate_assessment(request: AssessmentEvaluateRequest):
    start = time.time()
    try:
        res = assessment_agent.evaluate_assessment(request)
        orchestrator.log_execution("AssessmentAgent", "evaluate_assessment", (time.time() - start) * 1000)
        return res
    except Exception as e:
        orchestrator.log_execution("AssessmentAgent", "evaluate_assessment", (time.time() - start) * 1000, "ERROR")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/interview/question", response_model=InterviewQuestionResponse)
async def get_interview_question(request: InterviewQuestionRequest):
    start = time.time()
    try:
        res = interview_agent.get_next_question(request)
        orchestrator.log_execution("InterviewAgent", "get_interview_question", (time.time() - start) * 1000)
        return res
    except Exception as e:
        orchestrator.log_execution("InterviewAgent", "get_interview_question", (time.time() - start) * 1000, "ERROR")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/interview/evaluate", response_model=InterviewEvaluationResponse)
async def evaluate_interview_turn(request: InterviewEvaluateRequest):
    start = time.time()
    try:
        res = interview_agent.evaluate_response(request)
        orchestrator.log_execution("InterviewAgent", "evaluate_interview_turn", (time.time() - start) * 1000)
        return res
    except Exception as e:
        orchestrator.log_execution("InterviewAgent", "evaluate_interview_turn", (time.time() - start) * 1000, "ERROR")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/learning/roadmap", response_model=CareerRoadmapResponse)
async def generate_roadmap(request: CareerRoadmapRequest):
    start = time.time()
    try:
        res = learning_agent.generate_roadmap(request)
        orchestrator.log_execution("LearningAgent", "generate_roadmap", (time.time() - start) * 1000)
        return res
    except Exception as e:
        orchestrator.log_execution("LearningAgent", "generate_roadmap", (time.time() - start) * 1000, "ERROR")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/career/feedback-loop", response_model=FeedbackLoopResponse)
async def run_feedback_loop(request: FeedbackLoopRequest):
    start = time.time()
    try:
        res = career_agent.execute_feedback_loop(request)
        orchestrator.log_execution("CareerAgent", "execute_feedback_loop", (time.time() - start) * 1000)
        return res
    except Exception as e:
        orchestrator.log_execution("CareerAgent", "execute_feedback_loop", (time.time() - start) * 1000, "ERROR")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/orchestrator/telemetry")
async def get_orchestrator_telemetry():
    return orchestrator.get_system_health()
