const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const api = {
  getProfile: () => fetchAPI<any>("/profile"),
  getExperiences: () => fetchAPI<any[]>("/experience"),
  getProjects: () => fetchAPI<any[]>("/projects"),
  getFeaturedProjects: () => fetchAPI<any[]>("/projects/featured"),
  getProject: (slug: string) => fetchAPI<any>(`/projects/${slug}`),
  getSkills: () => fetchAPI<any[]>("/skills"),
  getBlogPosts: () => fetchAPI<any[]>("/blog"),
  getBlogPost: (slug: string) => fetchAPI<any>(`/blog/${slug}`),
  getSettings: () => fetchAPI<any>("/settings"),
  submitContact: (data: { name: string; email: string; subject?: string; message: string }) =>
    fetchAPI<any>("/contact", { method: "POST", body: JSON.stringify(data) }),
};
