from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any

# --- Resume Agent Schemas ---
class ResumeAnalysisRequest(BaseModel):
    resumeText: str
    targetRole: Optional[str] = "Full Stack AI Engineer"

class ResumeAnalysisResponse(BaseModel):
    atsScore: int
    extractedSkills: List[str]
    experienceYears: float
    education: List[str]
    matchedSkills: List[str]
    missingSkills: List[str]
    strengths: List[str]
    recommendations: List[str]

# --- Job Matching Agent Schemas ---
class JobRequirement(BaseModel):
    title: str
    description: str
    requiredSkills: List[str]
    niceToHave: Optional[List[str]] = []
    minExperience: Optional[int] = 0

class JobMatchRequest(BaseModel):
    candidateSkills: Dict[str, int]  # e.g. {"Python": 91, "React": 61, "DSA": 54}
    candidateExperience: Optional[float] = 1.0
    job: JobRequirement

class SkillBreakdownItem(BaseModel):
    skill: str
    candidateLevel: int
    requiredLevel: int
    status: str  # "MATCHED", "WEAK", "MISSING"

class JobMatchResponse(BaseModel):
    overallMatch: int
    skillScore: int
    semanticScore: int
    matchedSkills: List[str]
    missingSkills: List[str]
    weakSkills: List[str]
    breakdown: List[SkillBreakdownItem]
    aiRecommendation: str

# --- Assessment Agent Schemas ---
class AssessmentGenerateRequest(BaseModel):
    skill: str
    difficulty: str = "Medium"  # Easy, Medium, Hard
    count: int = 5

class QuestionItem(BaseModel):
    id: str
    question: str
    type: str  # "mcq" or "coding"
    options: Optional[List[str]] = None
    correctAnswer: Optional[str] = None
    difficulty: str
    explanation: Optional[str] = None
    codeSnippet: Optional[str] = None

class AssessmentAnswerItem(BaseModel):
    questionId: str
    selectedAnswer: str

class AssessmentEvaluateRequest(BaseModel):
    skill: str
    difficulty: str
    answers: List[AssessmentAnswerItem]

class AssessmentEvaluationResponse(BaseModel):
    score: int
    totalQuestions: int
    correctCount: int
    accuracy: float
    updatedProficiency: int
    feedback: str
    nextDifficulty: str

# --- Interview Agent Schemas ---
class InterviewTurn(BaseModel):
    question: str
    answer: str
    accuracy: Optional[int] = None
    depth: Optional[int] = None
    communication: Optional[int] = None

class InterviewQuestionRequest(BaseModel):
    targetRole: str
    stage: int = 1  # 1 to 5
    previousTurns: Optional[List[InterviewTurn]] = []

class InterviewQuestionResponse(BaseModel):
    questionId: str
    question: str
    category: str
    difficulty: str
    expectedTopics: List[str]

class InterviewEvaluateRequest(BaseModel):
    targetRole: str
    question: str
    answer: str

class InterviewEvaluationResponse(BaseModel):
    technicalAccuracy: int
    communication: int
    confidence: int
    depth: int
    overallScore: int
    feedback: str
    followUpQuestion: Optional[str] = None

# --- Learning & Career Agent Schemas ---
class RoadmapWeek(BaseModel):
    week: int
    title: str
    topics: List[str]
    tasks: List[str]
    project: str
    estimatedHours: int

class CareerRoadmapRequest(BaseModel):
    targetRole: str
    currentSkills: Dict[str, int]
    targetGaps: Optional[List[str]] = None

class CareerRoadmapResponse(BaseModel):
    targetRole: str
    currentReadiness: int
    projectedReadiness: int
    skillGaps: List[str]
    weeks: List[RoadmapWeek]
    careerAdvice: str

# --- Orchestrator & Feedback Loop ---
class FeedbackLoopRequest(BaseModel):
    candidateId: Optional[str] = "student_01"
    targetRole: str
    currentSkills: Dict[str, int]
    jobMatchScore: int
    missingSkills: List[str]

class FeedbackLoopResponse(BaseModel):
    status: str
    message: str
    prioritizedGaps: List[str]
    remediationWeeks: List[RoadmapWeek]
    initialMatch: int
    projectedMatchAfterRemediation: int
