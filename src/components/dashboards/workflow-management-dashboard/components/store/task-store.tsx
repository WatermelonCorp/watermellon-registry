import { create } from "zustand";

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface TaskMessage {
  author: string;
  platform: string;
  timestamp: string;
  content: string;
  avatar?: string;
}

export interface TimelineEvent {
  event: string;
  date: string;
}

export interface Task {
  id: string;
  mainTitle: string;
  date: string;
  title: string;
  tags: { label: string; icon: string }[];
  subTasks: SubTask[];
  waitingOn?: TaskMessage;
  timeline: TimelineEvent[];
}

interface TaskState {
  tasks: Task[];
  selectedTaskId: string | null;
  selectTask: (id: string | null) => void;
  toggleSubTask: (taskId: string, subTaskId: string) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [
    {
      id: "AGE-2201",
      date: "Apr 25",
      mainTitle:"Onboard new features and introduce key features",
      title: "Investigate meeting recording camera visibility issue",
      tags: [
        { label: "Shopify", icon: "S" },
        { label: "Sofia", icon: "S" },
      ],
      subTasks: [
        {
          id: "st1",
          title: "Message provider for resolution ETA",
          completed: false,
        },
        { id: "st2", title: "Update Elias today", completed: false },
      ],
      waitingOn: {
        author: "Elias Torres",
        platform: "Slack",
        timestamp: "Today 03:18 PM",
        content:
          "Hey — following up again. We've tested across devices and the camera view is still missing in recordings. This is blocking us now.",
      },
      timeline: [
        {
          event: "Follow-up sent to customer with expected resolution timeline",
          date: "Dec 20",
        },
        {
          event: "Issue confirmed and escalated to meeting bot provider",
          date: "Dec 18",
        },
        {
          event: "Customer reported missing participant cameras in recordings",
          date: "Dec 15",
        },
      ],
    },
    {
      id: "AGE-2202",
      date: "Apr 25",
      mainTitle:"Details on Roadmap",
      title: "Share customer success stories and product roadmap",
      tags: [
        { label: "Stripe", icon: "S" },
        { label: "Valen", icon: "V" },
      ],
      subTasks: [
        {
          id: "st3",
          title: "Escalate internally to engineering",
          completed: false,
        },
      ],
      timeline: [],
    },
    {
      id: "AGE-2203",
      date: "Apr 26",
      mainTitle:"Quarterly Goals",
      title: "Check in on quarterly goals and progress",
      tags: [
        { label: "Vercel", icon: "V" },
        { label: "Sofia", icon: "S" },
      ],
      subTasks: [
        {
          id: "st4",
          title: "Review Q1 metrics and prepare for board meeting",
          completed: false,
        },
      ],
      timeline: [],
    },
    {
      id: "AGE-2204",
      date: "Apr 27",
      mainTitle:"Onboard new users to the agency platform",
      title: "Onboard new users to the agency platform",
      tags: [
        { label: "Figma", icon: "F" },
        { label: "Lucas", icon: "L" },
      ],
      subTasks: [
        {
          id: "st5",
          title: "Setup workspace and initial permissions",
          completed: true,
        },
        {
          id: "st6",
          title: "Send welcome kit and tutorial links",
          completed: false,
        },
      ],
      timeline: [],
    },
    
  ],
  selectedTaskId: null,

  selectTask: (id: string | null) => set({ selectedTaskId: id }),

  toggleSubTask: (taskId, subTaskId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subTasks: task.subTasks.map((st) =>
                st.id === subTaskId ? { ...st, completed: !st.completed } : st
              ),
            }
          : task
      ),
    })),
}));
