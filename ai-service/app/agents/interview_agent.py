import re
import uuid
from typing import List, Dict, Optional
from app.models.schemas import (
    InterviewQuestionRequest, InterviewQuestionResponse,
    InterviewEvaluateRequest, InterviewEvaluationResponse
)

INTERVIEW_QUESTION_POOL = {
    "Full Stack AI Engineer": [
        {
            "id": "fs_q1",
            "question": "Can you explain how Node.js manages asynchronous non-blocking I/O using the libuv event loop phases?",
            "category": "Backend Architecture",
            "difficulty": "Medium",
            "expectedTopics": ["libuv", "event loop", "timers", "poll phase", "microtask queue", "process.nextTick"]
        },
        {
            "id": "fs_q2",
            "question": "In a React application handling large streams of AI chat completions, how would you architect state management to prevent unneeded re-renders?",
            "category": "Frontend Performance",
            "difficulty": "Hard",
            "expectedTopics": ["useTransition", "virtualization", "debouncing", "custom hooks", "abort controller"]
        },
        {
            "id": "fs_q3",
            "question": "When designing a RAG (Retrieval-Augmented Generation) pipeline, how do you evaluate chunking strategies and resolve hallucination issues?",
            "category": "AI / System Design",
            "difficulty": "Hard",
            "expectedTopics": ["chunk overlap", "vector similarity", "reranking", "grounding", "hybrid search"]
        },
        {
            "id": "fs_q4",
            "question": "How do you ensure zero-downtime deployments for containerized microservices using Docker and reverse proxies?",
            "category": "DevOps / Infrastructure",
            "difficulty": "Medium",
            "expectedTopics": ["rolling updates", "blue-green", "health checks", "nginx/traefik", "graceful shutdown"]
        }
    ]
}

class InterviewAgent:
    def __init__(self):
        self.name = "Adaptive Mock Interview Agent"

    def get_next_question(self, request: InterviewQuestionRequest) -> InterviewQuestionResponse:
        role = request.targetRole
        role_questions = INTERVIEW_QUESTION_POOL.get(role, INTERVIEW_QUESTION_POOL["Full Stack AI Engineer"])
        
        # Check if previous answers mention specific technologies for contextual follow-up
        if request.previousTurns:
            last_turn = request.previousTurns[-1]
            last_ans = last_turn.answer.lower()
            
            # Dynamic contextual generation based on candidate keywords
            if "mongodb" in last_ans or "nosql" in last_ans:
                return InterviewQuestionResponse(
                    questionId=str(uuid.uuid4())[:8],
                    question="You highlighted MongoDB. How do compound indexes and the WiredTiger storage engine affect write throughput and query execution plans?",
                    category="Database Deep-Dive",
                    difficulty="Hard",
                    expectedTopics=["compound indexes", "explain plan", "wiredtiger", "write concern", "sharding"]
                )
            elif "docker" in last_ans or "container" in last_ans:
                return InterviewQuestionResponse(
                    questionId=str(uuid.uuid4())[:8],
                    question="Since you mentioned containerization, how do you handle container orchestration security, secrets injection, and non-root execution?",
                    category="DevOps & Security",
                    difficulty="Medium",
                    expectedTopics=["secrets management", "least privilege", "docker build secrets", "daemonless"]
                )
            elif "redis" in last_ans or "cache" in last_ans:
                return InterviewQuestionResponse(
                    questionId=str(uuid.uuid4())[:8],
                    question="You mentioned caching. How do you address cache stampede (thundering herd) and ensure cache invalidation consistency?",
                    category="System Design",
                    difficulty="Hard",
                    expectedTopics=["probabilistic early expiration", "mutex lock", "TTL", "write-through"]
                )

        stage_idx = min(len(role_questions) - 1, max(0, request.stage - 1))
        selected = role_questions[stage_idx]
        return InterviewQuestionResponse(
            questionId=selected["id"],
            question=selected["question"],
            category=selected["category"],
            difficulty=selected["difficulty"],
            expectedTopics=selected["expectedTopics"]
        )

    def evaluate_response(self, request: InterviewEvaluateRequest) -> InterviewEvaluationResponse:
        ans = request.answer.strip()
        ans_lower = ans.lower()
        word_count = len(ans.split())

        # 1. Technical Accuracy metric
        tech_keywords = [
            "thread", "asynchronous", "event loop", "worker", "libuv", "callback", "promise",
            "index", "query", "state", "cache", "latency", "render", "cluster", "pipeline",
            "embedding", "vector", "normalization", "microservice", "docker", "scalability"
        ]
        matched_kw_count = sum(1 for kw in tech_keywords if kw in ans_lower)
        
        # Accuracy scored based on keyword presence and technical substance
        tech_accuracy = min(96, max(40, 50 + (matched_kw_count * 8)))

        # 2. Communication metric (length, structure, punctuation)
        has_structure = bool("because" in ans_lower or "for example" in ans_lower or "firstly" in ans_lower or "secondly" in ans_lower)
        communication = min(95, max(45, (60 if word_count >= 30 else 45) + (15 if has_structure else 5)))

        # 3. Confidence metric
        hesitation_words = ["maybe", "i guess", "not sure", "probably", "um", "kind of"]
        hesitations = sum(1 for hw in hesitation_words if hw in ans_lower)
        confidence = max(50, min(95, 88 - (hesitations * 12)))

        # 4. Depth metric
        depth = min(98, max(40, 45 + min(word_count // 2, 40) + (matched_kw_count * 4)))

        overall = int((tech_accuracy * 0.4) + (depth * 0.25) + (communication * 0.2) + (confidence * 0.15))

        # Dynamic Follow-Up Prompt
        if "mongodb" in ans_lower or "database" in ans_lower:
            follow_up = "Follow-up: How would you architect read replicas vs write nodes if query latency spikes during peak load?"
        elif "react" in ans_lower or "frontend" in ans_lower:
            follow_up = "Follow-up: How would you profile this performance bottleneck using Chrome DevTools Performance tab?"
        else:
            follow_up = "Follow-up: What are the failure failure modes or edge cases in this architectural approach?"

        feedback = (
            f"Strong analytical response ({tech_accuracy}% technical accuracy). "
            f"You effectively touched upon core engineering mechanisms. "
            f"To reach 90+ overall depth, elaborate further on production edge-cases and measurable latency benchmarks."
        )

        return InterviewEvaluationResponse(
            technicalAccuracy=tech_accuracy,
            communication=communication,
            confidence=confidence,
            depth=depth,
            overallScore=overall,
            feedback=feedback,
            followUpQuestion=follow_up
        )

interview_agent = InterviewAgent()
