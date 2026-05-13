'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/lib/axios';

export default function MessagesPage() {
  const queryClient = useQueryClient();
  const { data: messages = [], isLoading } = useQuery({ queryKey: ['admin-messages'], queryFn: adminApi.getMessages });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.deleteMessage(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-messages'] }),
  });

  if (isLoading) return <p className="text-slate">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-lightest mb-6">Messages</h1>
      {messages.length === 0 ? (
        <p className="text-slate">No messages yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-light text-left">
                <th className="py-3 px-4 text-slate">Name</th>
                <th className="py-3 px-4 text-slate">Email</th>
                <th className="py-3 px-4 text-slate">Message</th>
                <th className="py-3 px-4 text-slate">Date</th>
                <th className="py-3 px-4 text-slate">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg: Record<string, string>) => (
                <tr key={msg.id} className="border-b border-navy-light hover:bg-navy-light/50">
                  <td className="py-3 px-4 text-slate-lightest">{msg.name}</td>
                  <td className="py-3 px-4 text-slate-light">{msg.email}</td>
                  <td className="py-3 px-4 text-slate-light max-w-xs truncate">{msg.message}</td>
                  <td className="py-3 px-4 text-slate-light">{new Date(msg.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => deleteMutation.mutate(msg.id)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
