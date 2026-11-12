import re
import math
from typing import Dict, List, Tuple

try:
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.metrics.pairwise import cosine_similarity
    SKLEARN_AVAILABLE = True
except ImportError:
    SKLEARN_AVAILABLE = False

# Comprehensive Domain Taxonomy
ROLE_SKILL_BENCHMARKS = {
    "Full Stack AI Engineer": {
        "Python": 85,
        "React": 75,
        "Node.js": 75,
        "FastAPI": 80,
        "MongoDB": 70,
        "PostgreSQL": 75,
        "Docker": 70,
        "AWS": 65,
        "System Design": 70,
        "DSA": 65,
        "Machine Learning": 75
    },
    "AI/ML Engineer": {
        "Python": 90,
        "PyTorch": 80,
        "TensorFlow": 75,
        "Machine Learning": 85,
        "Deep Learning": 80,
        "FastAPI": 75,
        "Docker": 70,
        "NLP": 75,
        "Vector Databases": 70
    },
    "Frontend Engineer": {
        "JavaScript": 85,
        "TypeScript": 80,
        "React": 90,
        "HTML/CSS": 90,
        "Bootstrap/Tailwind": 80,
        "Redux/Zustand": 75,
        "Next.js": 75
    },
    "Backend Engineer": {
        "Node.js": 85,
        "Python": 80,
        "PostgreSQL": 85,
        "MongoDB": 80,
        "Docker": 75,
        "System Design": 80,
        "Redis": 70,
        "AWS": 70
    }
}

class SkillGapEngine:
    def __init__(self):
        self.taxonomy = ROLE_SKILL_BENCHMARKS

    def compute_role_readiness(self, candidate_skills: Dict[str, int], target_role: str) -> Tuple[int, List[Dict]]:
        benchmarks = self.taxonomy.get(target_role, self.taxonomy["Full Stack AI Engineer"])
        
        total_weight = 0
        earned_score = 0
        breakdown = []

        for skill, required_level in benchmarks.items():
            total_weight += required_level
            candidate_level = candidate_skills.get(skill, 0)
            
            # If skill not found, case-insensitive match
            if candidate_level == 0:
                for k, v in candidate_skills.items():
                    if k.lower() == skill.lower():
                        candidate_level = v
                        break
            
            earned_score += min(candidate_level, required_level)
            
            status = "MATCHED" if candidate_level >= required_level else ("WEAK" if candidate_level >= 40 else "MISSING")
            breakdown.append({
                "skill": skill,
                "candidateLevel": candidate_level,
                "requiredLevel": required_level,
                "status": status
            })

        readiness = int((earned_score / total_weight) * 100) if total_weight > 0 else 50
        return readiness, breakdown

    def calculate_semantic_similarity(self, text_a: str, text_b: str) -> int:
        if not text_a or not text_b:
            return 50
        
        if SKLEARN_AVAILABLE:
            try:
                vectorizer = TfidfVectorizer(stop_words='english')
                tfidf_matrix = vectorizer.fit_transform([text_a, text_b])
                similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
                return int(similarity * 100)
            except Exception:
                pass

        # Pure Python fallback: Bag of Words Cosine Similarity
        words_a = re.findall(r'\w+', text_a.lower())
        words_b = re.findall(r'\w+', text_b.lower())
        
        vocab = list(set(words_a + words_b))
        if not vocab:
            return 50

        vec_a = [words_a.count(w) for w in vocab]
        vec_b = [words_b.count(w) for w in vocab]

        dot_product = sum(a * b for a, b in zip(vec_a, vec_b))
        mag_a = math.sqrt(sum(a * a for a in vec_a))
        mag_b = math.sqrt(sum(b * b for b in vec_b))

        if mag_a == 0 or mag_b == 0:
            return 50
        
        cos_sim = dot_product / (mag_a * mag_b)
        return int(cos_sim * 100)

    def prioritize_gaps(self, breakdown: List[Dict]) -> List[str]:
        # Prioritize MISSING first, then WEAK, ordered by required benchmark level
        gaps = [item for item in breakdown if item["status"] in ["MISSING", "WEAK"]]
        gaps.sort(key=lambda x: (0 if x["status"] == "MISSING" else 1, -x["requiredLevel"]))
        return [item["skill"] for item in gaps]

skill_gap_engine = SkillGapEngine()
