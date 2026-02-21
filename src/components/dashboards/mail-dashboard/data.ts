export type Mail = {
  id: string
  name: string
  email: string
  to: string
  subject: string
  date: string
  body: string
  teaser: string
  avatar: string
  unread: boolean
}

export const pinnedUsers = [
  {
    name: "Stephen",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop",
  },
  {
    name: "Yolanthe",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
  },
  {
    name: "Lysander",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    name: "Gerind",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  },
  {
    name: "Lina",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
  },
]

export const mails: Mail[] = [
  {
    id: "1",
    name: "Srotimi Stephen",
    email: "stephen@srotimi.design",
    to: "Yolanthe Einger",
    subject: "Action Required: Product Roadmap Discussion",
    date: "10:18",
    body: "Hi Team 👋,\n\nI hope this message finds you well. Following our productive meeting last week, I'd like to formally propose a follow-up meeting regarding the product roadmap.\n\nYour insights are invaluable, and I believe a focused session will help us align on key priorities and strategic initiatives. Please come prepared to discuss potential adjustments based on recent market trends and user feedback.\n\nLet's aim to finalize the roadmap by the end of this week to ensure we stay on track with our goals.\n\nBest regards,\nSrotimi Stephen",
    teaser: "Hi Team 👋, I hope this message finds you well. Following our productive meeting...",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop",
    unread: true,
  },
  {
    id: "2",
    name: "Emily Johnson",
    email: "emily@example.com",
    to: "Srotimi Stephen",
    subject: "Update Needed: User Feedback Analysis",
    date: "10:45",
    body: "Hi All, I've compiled the feedback from our most recent user testing session. There are some critical areas that need immediate attention before the next sprint.",
    teaser: "Hi All, I've compiled the feedback from our most recent user testing session...",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    unread: false,
  },
  {
    id: "3",
    name: "Marcus Lee",
    email: "marcus@example.com",
    to: "Srotimi Stephen",
    subject: "Follow-Up: Marketing Strategy Meeting",
    date: "11:00",
    body: "Hello Team, I'd like to revisit our marketing strategy for the upcoming Q3 launch. We need to align on the core messaging and channel prioritization.",
    teaser: "Hello Team, I'd like to revisit our marketing strategy meeting notes...",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    unread: true,
  },
  {
    id: "4",
    name: "Lina Chen",
    email: "lina@example.com",
    to: "Srotimi Stephen",
    subject: "Deadline Reminder: UI Design Submission",
    date: "11:30",
    body: "Hey Everyone, Just a reminder that the UI designs for the new dashboard modules are due this Friday. Please let me know if you hit any blockers.",
    teaser: "Hey Everyone, Just a reminder that UI design submission is due...",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    unread: false,
  },
  {
    id: "5",
    name: "David Kim",
    email: "david@example.com",
    to: "Srotimi Stephen",
    subject: "New Task: Analyze Competitor Features",
    date: "12:05",
    body: "Hi Team, I've assigned a new task to analyze competitor features in the fintech space. This will help us refine our own feature prioritization.",
    teaser: "Hi Team, I've assigned a new task to analyze competitor features...",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    unread: false,
  },
  {
    id: "6",
    name: "Sophia Patel",
    email: "sophia@example.com",
    to: "Srotimi Stephen",
    subject: "Request for Information: User Experience...",
    date: "12:30",
    body: "Hi Everyone, Can someone share the latest user experience survey results? I need them for the presentation I'm preparing for the board meeting.",
    teaser: "Hi Everyone, Can someone share the latest user experience survey...",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
    unread: false,
  },
  {
    id: "7",
    name: "James O'Connor",
    email: "james@example.com",
    to: "Srotimi Stephen",
    subject: "Planning Session: Next Sprint Goals",
    date: "13:00",
    body: "Hi Team, Let's schedule a session to outline our goals for the next sprint. I've prepared a draft of what I think we should focus on.",
    teaser: "Hi Team, Let's schedule a session to outline our goals for the next...",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    unread: false,
  },
]
