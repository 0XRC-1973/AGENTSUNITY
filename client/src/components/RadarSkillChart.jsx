import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';

export default function RadarSkillChart({ skills = {} }) {
  const data = [
    { subject: 'Python', candidate: skills['Python'] || 91, benchmark: 85 },
    { subject: 'React', candidate: skills['React'] || 61, benchmark: 75 },
    { subject: 'Node.js', candidate: skills['Node.js'] || 72, benchmark: 75 },
    { subject: 'DSA', candidate: skills['DSA'] || 54, benchmark: 65 },
    { subject: 'SQL', candidate: skills['SQL'] || 80, benchmark: 75 },
    { subject: 'MongoDB', candidate: skills['MongoDB'] || 85, benchmark: 70 },
    { subject: 'Docker', candidate: skills['Docker'] || 38, benchmark: 70 },
    { subject: 'AWS', candidate: skills['AWS'] || 42, benchmark: 65 }
  ];

  return (
    <div style={{ width: '100%', height: 320 }}>
      <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="rgba(255, 255, 255, 0.12)" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} 
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={{ fill: '#64748b', fontSize: 10 }} 
            stroke="rgba(255, 255, 255, 0.08)"
          />
          <Radar
            name="Your Competency"
            dataKey="candidate"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.45}
          />
          <Radar
            name="Target Benchmark"
            dataKey="benchmark"
            stroke="#06b6d4"
            fill="#06b6d4"
            fillOpacity={0.15}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0f172a', 
              borderColor: 'rgba(255, 255, 255, 0.1)', 
              borderRadius: '8px', 
              color: '#fff' 
            }} 
          />
          <Legend wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
