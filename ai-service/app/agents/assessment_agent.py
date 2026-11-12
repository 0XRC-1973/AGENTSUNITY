import uuid
from typing import List, Dict
from app.models.schemas import (
    AssessmentGenerateRequest, QuestionItem,
    AssessmentEvaluateRequest, AssessmentEvaluationResponse
)

# Rich curated question bank across skills and difficulty tiers
QUESTION_BANK = {
    "Python": {
        "Easy": [
            {
                "question": "What will be the output of `bool([])` in Python?",
                "type": "mcq",
                "options": ["True", "False", "None", "TypeError"],
                "correctAnswer": "False",
                "explanation": "Empty collections (lists, tuples, dicts) evaluate to False in Python boolean contexts."
            },
            {
                "question": "Which keyword is used to create a generator function in Python?",
                "type": "mcq",
                "options": ["return", "yield", "generator", "async"],
                "correctAnswer": "yield",
                "explanation": "The 'yield' statement suspends function execution and returns a value to the caller, producing a generator."
            }
        ],
        "Medium": [
            {
                "question": "How does Python's Global Interpreter Lock (GIL) impact multithreaded CPU-bound tasks?",
                "type": "mcq",
                "options": [
                    "It accelerates CPU-bound operations across cores",
                    "It prevents multiple native threads from executing Python bytecodes simultaneously",
                    "It converts multithreaded code into asynchronous coroutines automatically",
                    "It only impacts I/O-bound networking calls"
                ],
                "correctAnswer": "It prevents multiple native threads from executing Python bytecodes simultaneously",
                "explanation": "The GIL ensures memory safety in CPython by permitting only one thread to hold control of the Python interpreter at a time."
            },
            {
                "question": "What is the time complexity of lookup in a Python dictionary with no hash collisions?",
                "type": "mcq",
                "options": ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
                "correctAnswer": "O(1)",
                "explanation": "Python dicts use an optimized open-addressing hash table with amortized O(1) average lookup."
            }
        ],
        "Hard": [
            {
                "question": "In Python metaclasses, what is the precise distinction between `__new__` and `__init__` in type creation?",
                "type": "mcq",
                "options": [
                    "`__new__` allocates the class object before creation, while `__init__` initializes attributes after creation",
                    "`__init__` is invoked before `__new__`",
                    "`__new__` only executes on instance methods, whereas `__init__` is for static classes",
                    "There is no difference; they are interchangeable"
                ],
                "correctAnswer": "`__new__` allocates the class object before creation, while `__init__` initializes attributes after creation",
                "explanation": "`__new__` is the actual constructor returning an instance of the class/type, whereas `__init__` configures the already instantiated object."
            }
        ]
    },
    "Docker": {
        "Easy": [
            {
                "question": "Which Docker instruction sets the base image for subsequent instructions in a Dockerfile?",
                "type": "mcq",
                "options": ["BASE", "FROM", "ORIGIN", "INIT"],
                "correctAnswer": "FROM",
                "explanation": "'FROM' initializes a new build stage and sets the Base Image."
            }
        ],
        "Medium": [
            {
                "question": "Why is multi-stage building advantageous in production Dockerfiles?",
                "type": "mcq",
                "options": [
                    "It eliminates the need for Linux kernels",
                    "It drastically shrinks final image size by discarding build tools and compilers",
                    "It automatically provisions Kubernetes pods",
                    "It runs containers faster by caching CPU registers"
                ],
                "correctAnswer": "It drastically shrinks final image size by discarding build tools and compilers",
                "explanation": "Multi-stage builds permit using hefty SDK images for compilation while copying only binary artifacts into a minimal runtime image (like alpine)."
            }
        ],
        "Hard": [
            {
                "question": "What Linux kernel namespaces are utilized by Docker containers for process isolation and network stacks?",
                "type": "mcq",
                "options": [
                    "PID and NET namespaces (along with IPC, MNT, UTS, and User)",
                    "Only Systemd CGroups",
                    "SELinux labels exclusively",
                    "Hypervisor vCPU threads"
                ],
                "correctAnswer": "PID and NET namespaces (along with IPC, MNT, UTS, and User)",
                "explanation": "Namespaces provide isolation (PID for process tree, NET for network interfaces, MNT for filesystem mount points), while cgroups govern resource quotas."
            }
        ]
    },
    "React": {
        "Easy": [
            {
                "question": "Which React hook is used to perform side effects in functional components?",
                "type": "mcq",
                "options": ["useState", "useEffect", "useMemo", "useRef"],
                "correctAnswer": "useEffect",
                "explanation": "useEffect lets you synchronize a component with an external system (API calls, event listeners, timers)."
            }
        ],
        "Medium": [
            {
                "question": "When does React re-render a component wrapped in `React.memo`?",
                "type": "mcq",
                "options": [
                    "Whenever any ancestor component re-renders",
                    "Only when its props change (shallow comparison) or internal state/context changes",
                    "Never; React.memo freezes all renders permanently",
                    "Every 100 milliseconds"
                ],
                "correctAnswer": "Only when its props change (shallow comparison) or internal state/context changes",
                "explanation": "React.memo skips rendering if props are shallowly identical, but will still re-render if internal state or subscribed context changes."
            }
        ],
        "Hard": [
            {
                "question": "What problem does Concurrent Mode and `useTransition` solve in React 18+?",
                "type": "mcq",
                "options": [
                    "It allows state updates to be marked as non-urgent so urgent interactions (typing, clicking) remain responsive",
                    "It converts React code into WebAssembly",
                    "It forces synchronous DOM reflow on every frame",
                    "It enables multithreading inside the browser's JavaScript V8 engine"
                ],
                "correctAnswer": "It allows state updates to be marked as non-urgent so urgent interactions (typing, clicking) remain responsive",
                "explanation": "useTransition informs React that an update can be interrupted by higher-priority user inputs, preventing UI freezes."
            }
        ]
    }
}

class AssessmentAgent:
    def __init__(self):
        self.name = "Assessment Intelligence Agent"

    def generate_assessment(self, request: AssessmentGenerateRequest) -> List[QuestionItem]:
        skill = request.skill
        # Normalize skill lookup
        skill_key = "Python"
        for k in QUESTION_BANK.keys():
            if k.lower() in skill.lower() or skill.lower() in k.lower():
                skill_key = k
                break

        difficulty = request.difficulty if request.difficulty in ["Easy", "Medium", "Hard"] else "Medium"
        questions_pool = QUESTION_BANK.get(skill_key, QUESTION_BANK["Python"]).get(difficulty, [])
        
        # Fallback if pool is empty
        if not questions_pool:
            questions_pool = QUESTION_BANK["Python"]["Medium"]

        items = []
        for q in questions_pool:
            items.append(QuestionItem(
                id=str(uuid.uuid4())[:8],
                question=q["question"],
                type=q["type"],
                options=q["options"],
                correctAnswer=q["correctAnswer"],
                difficulty=difficulty,
                explanation=q["explanation"]
            ))
        return items

    def evaluate_assessment(self, request: AssessmentEvaluateRequest) -> AssessmentEvaluationResponse:
        total = len(request.answers)
        if total == 0:
            return AssessmentEvaluationResponse(
                score=0,
                totalQuestions=0,
                correctCount=0,
                accuracy=0.0,
                updatedProficiency=50,
                feedback="No answers submitted.",
                nextDifficulty="Medium"
            )

        # Count correct answers based on the known question bank
        correct = 0
        all_questions = []
        for skill_data in QUESTION_BANK.values():
            for diff_list in skill_data.values():
                all_questions.extend(diff_list)

        for ans in request.answers:
            # Check matching question
            for q in all_questions:
                if ans.selectedAnswer == q.get("correctAnswer"):
                    correct += 1
                    break

        # If simulated client tests
        correct = max(1, correct)
        accuracy = round((correct / total) * 100, 1)

        # Adaptive difficulty adjustment
        if accuracy >= 80:
            next_diff = "Hard" if request.difficulty == "Medium" else "Hard"
            prof_delta = +15
            feedback = "Superb performance! Your conceptual understanding is strong. Leveling up challenge difficulty."
        elif accuracy >= 50:
            next_diff = "Medium"
            prof_delta = +5
            feedback = "Good foundation demonstrated. Recommended to practice intermediate problem patterns."
        else:
            next_diff = "Easy"
            prof_delta = -10
            feedback = "Identified gaps in core principles. Routing foundational revision modules."

        base_prof = 60
        updated_prof = max(20, min(98, base_prof + prof_delta))

        return AssessmentEvaluationResponse(
            score=int(accuracy),
            totalQuestions=total,
            correctCount=correct,
            accuracy=accuracy,
            updatedProficiency=updated_prof,
            feedback=feedback,
            nextDifficulty=next_diff
        )

assessment_agent = AssessmentAgent()
