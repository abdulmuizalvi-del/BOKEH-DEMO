import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MOCK_PROJECTS, MOCK_MESSAGES, MOCK_NOTIFICATIONS } from "@/lib/mock-data";

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      await delay(600);
      return MOCK_PROJECTS;
    }
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: ["projects", id],
    queryFn: async () => {
      await delay(400);
      return MOCK_PROJECTS.find(p => p.id === id) || null;
    }
  });
}

export function useMessages() {
  return useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      await delay(500);
      return MOCK_MESSAGES;
    }
  });
}

export function useMessageThread(userId: string) {
  return useQuery({
    queryKey: ["messages", userId],
    queryFn: async () => {
      await delay(300);
      return MOCK_MESSAGES.find(m => m.userId === userId) || null;
    }
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, text }: { userId: string, text: string }) => {
      await delay(300);
      // In a real app this would post to an API
      return { success: true };
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["messages", variables.userId] });
    }
  });
}

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      await delay(500);
      return MOCK_NOTIFICATIONS;
    }
  });
}
