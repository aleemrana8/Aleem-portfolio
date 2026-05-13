'use client';

import { useQuery } from '@tanstack/react-query';
import { adminApi } from '@/lib/axios';

export default function AdminDashboard() {
  const { data: projects } = useQuery({ queryKey: ['admin-projects'], queryFn: adminApi.getProjects });
  const { data: blog } = useQuery({ queryKey: ['admin-blog'], queryFn: adminApi.getBlogPosts });
  const { data: messages } = useQuery({ queryKey: ['admin-messages'], queryFn: adminApi.getMessages });
  const { data: experiences } = useQuery({ queryKey: ['admin-experiences'], queryFn: adminApi.getExperiences });
  const { data: testimonials } = useQuery({ queryKey: ['admin-testimonials'], queryFn: adminApi.getTestimonials });
  const { data: skills } = useQuery({ queryKey: ['admin-skills'], queryFn: adminApi.getSkills });

  const stats = [
    { label: 'Projects', count: Array.isArray(projects) ? projects.length : 0 },
    { label: 'Blog Posts', count: Array.isArray(blog) ? blog.length : blog?.posts?.length ?? 0 },
    { label: 'Messages', count: Array.isArray(messages) ? messages.length : 0 },
    { label: 'Experiences', count: Array.isArray(experiences) ? experiences.length : 0 },
    { label: 'Testimonials', count: Array.isArray(testimonials) ? testimonials.length : 0 },
    { label: 'Skill Groups', count: Array.isArray(skills) ? skills.length : 0 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-lightest mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="p-6 bg-navy-light rounded-lg border border-navy-light">
            <p className="text-slate text-sm">{stat.label}</p>
            <p className="text-3xl font-bold text-accent mt-1">{stat.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
