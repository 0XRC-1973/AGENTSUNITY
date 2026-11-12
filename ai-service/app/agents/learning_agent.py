from typing import Dict, List
from app.models.schemas import CareerRoadmapRequest, CareerRoadmapResponse, RoadmapWeek
from app.engines.skill_gap_engine import skill_gap_engine

CURRICULUM_TEMPLATES = {
    "Docker": {
        "title": "Containerization & Microservices with Docker",
        "topics": ["Docker Engine", "Dockerfiles & Multi-Stage Builds", "Docker Compose Orchestration", "Volume Persistence & Networking"],
        "tasks": [
            "Containerize a React + Node.js full-stack application",
            "Optimize Dockerfile layer caching to reduce image size by 60%",
            "Deploy multi-container environment with docker-compose"
        ],
        "project": "Production-Ready Multi-Container App Deployment"
    },
    "AWS": {
        "title": "Cloud Infrastructure & Serverless Deployments (AWS)",
        "topics": ["IAM & Least Privilege Security", "EC2, Elastic IP & Security Groups", "S3 Storage & CloudFront CDN", "ECS & Fargate Containers"],
        "tasks": [
            "Provision secure S3 bucket with signed URL access",
            "Deploy containerized API on AWS ECS with auto-scaling",
            "Configure Route53 DNS and SSL Certificate via ACM"
        ],
        "project": "Cloud-Native Scalable Backend on AWS"
    },
    "System Design": {
        "title": "High-Scale Distributed System Design",
        "topics": ["Horizontal vs Vertical Scaling", "Caching Strategies with Redis", "Load Balancing & Reverse Proxies", "Database Sharding & Replication"],
        "tasks": [
            "Design rate-limiter supporting 50,000 requests/sec with Redis Token Bucket",
            "Architect distributed message queue using RabbitMQ/Kafka",
            "Create comprehensive C4 architectural diagram for an AI platform"
        ],
        "project": "Architecting a Resilient Real-Time Notification System"
    },
    "DSA": {
        "title": "Algorithms & Advanced Data Structures",
        "topics": ["Dynamic Programming", "Graph Traversal (BFS/DFS/Dijkstra)", "Tree Structures (Trie, Segment Trees)", "Sliding Window & Two Pointers"],
        "tasks": [
            "Solve 10 LeetCode Medium/Hard DP patterns",
            "Implement custom Trie for autocomplete with sub-millisecond lookups",
            "Conduct time and space complexity audits on graph algorithms"
        ],
        "project": "High-Performance In-Memory Search Engine"
    }
}

class LearningAgent:
    def __init__(self):
        self.name = "Learning Intelligence Agent"

    def generate_roadmap(self, request: CareerRoadmapRequest) -> CareerRoadmapResponse:
        target_role = request.targetRole
        current_skills = request.currentSkills
        
        # Calculate current readiness score
        current_readiness, breakdown = skill_gap_engine.compute_role_readiness(current_skills, target_role)
        
        # Determine priority gaps
        if request.targetGaps:
            gaps = request.targetGaps
        else:
            gaps = skill_gap_engine.prioritize_gaps(breakdown)

        # Build tailored weekly modules
        weeks: List[RoadmapWeek] = []
        week_num = 1

        for gap in gaps[:4]:
            # Lookup template or generate dynamic module
            template = None
            for key, val in CURRICULUM_TEMPLATES.items():
                if key.lower() in gap.lower() or gap.lower() in key.lower():
                    template = val
                    break

            if not template:
                template = {
                    "title": f"Mastery of {gap}",
                    "topics": [f"{gap} Fundamentals", f"Advanced Patterns in {gap}", f"Production Best Practices for {gap}"],
                    "tasks": [f"Study core {gap} documentation", f"Build a practical proof-of-concept with {gap}", f"Pass {gap} assessment challenge"],
                    "project": f"Production-grade {gap} Integration Module"
                }

            weeks.append(RoadmapWeek(
                week=week_num,
                title=f"Week {week_num}: {template['title']}",
                topics=template["topics"],
                tasks=template["tasks"],
                project=template["project"],
                estimatedHours=12
            ))
            week_num += 1

        # Projected readiness after completing this roadmap
        projected_readiness = min(96, current_readiness + (len(weeks) * 7))

        advice = (
            f"Your current readiness for {target_role} is {current_readiness}%. "
            f"By executing this targeted {len(weeks)}-week curriculum covering {', '.join(gaps[:3])}, "
            f"your competency score is projected to reach {projected_readiness}%, placing you in the top candidate tier."
        )

        return CareerRoadmapResponse(
            targetRole=target_role,
            currentReadiness=current_readiness,
            projectedReadiness=projected_readiness,
            skillGaps=gaps,
            weeks=weeks,
            careerAdvice=advice
        )

learning_agent = LearningAgent()
