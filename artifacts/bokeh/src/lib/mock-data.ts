// Centralized mock data for the application

export const MOCK_PROJECTS = [
  {
    id: "1",
    title: "Robert's Engagement",
    date: "21.01.2027",
    status: "IN_PROGRESS",
    coverUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
    tags: ["Engagement", "Deliverable"],
    imageCount: 340,
    client: "Robert & Emma"
  },
  {
    id: "2",
    title: "Juilee's Quincenera",
    date: "21.01.2027",
    status: "IN_PROGRESS",
    coverUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
    tags: ["Event"],
    imageCount: 520,
    client: "Juilee Family"
  },
  {
    id: "3",
    title: "Claudia & Jason's Wedding",
    date: "14.12.2026",
    status: "COMPLETED",
    coverUrl: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80",
    tags: ["Wedding"],
    imageCount: 1200,
    client: "Claudia & Jason"
  },
  {
    id: "4",
    title: "Ankit & Devika's Sangeet",
    date: "10.12.2026",
    status: "COMPLETED",
    coverUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
    tags: ["Wedding", "Event"],
    imageCount: 850,
    client: "Ankit & Devika"
  }
];

export const MOCK_MESSAGES = [
  {
    id: "1",
    userId: "u1",
    name: "Jessica Yunnard",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    lastMessage: "That sounds amazing! Can't wa...",
    time: "10:24 AM",
    unread: true,
    online: true,
    history: [
      { sender: "them", text: "Hello, Mur. How are you?", time: "09:00 AM" },
      { sender: "me", text: "Hello, Jessica. I'm great, thanks. How are you?", time: "09:05 AM" },
      { sender: "them", text: "I'm doing well! Just wanted to check in on the wedding project. Are the edits coming along?", time: "09:12 AM" },
      { sender: "me", text: "Yes! I finished culling yesterday — about 340 photos selected. I'll start editing today and should have a preview gallery ready by Thursday.", time: "10:15 AM" },
      { sender: "them", text: "That sounds amazing! Can't wait to see them.", time: "10:24 AM" }
    ]
  },
  {
    id: "2",
    userId: "u2",
    name: "Sam Anderson",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&q=80",
    lastMessage: "Can anyone help with it?",
    time: "Yesterday",
    unread: false,
    online: false,
    history: []
  },
  {
    id: "3",
    userId: "u3",
    name: "Janet Smith",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    lastMessage: "Hi, Can you share more example...",
    time: "Yesterday",
    unread: false,
    online: true,
    history: []
  },
  {
    id: "4",
    userId: "u4",
    name: "Kevin Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    lastMessage: "Sure! What specifics are you loo...",
    time: "Mon",
    unread: false,
    online: false,
    history: []
  },
  {
    id: "5",
    userId: "u5",
    name: "Laura Thompson",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
    lastMessage: "Sorry about the meeting...",
    time: "Sun",
    unread: true,
    online: true,
    history: []
  }
];

export const MOCK_NOTIFICATIONS = [
  {
    id: "n1",
    title: "New message received",
    description: "You have a new message by Jake Thomson",
    time: "1 hour ago",
    group: "TODAY",
    unread: true,
    type: "message"
  },
  {
    id: "n2",
    title: "Notification title",
    description: "You have a new message by Sarah Lin",
    time: "3 hour ago",
    group: "TODAY",
    unread: true,
    type: "message"
  },
  {
    id: "n3",
    title: "New project created!",
    description: "Your project was successfully created.",
    time: "Feb 12, 2026",
    group: "YESTERDAY",
    unread: false,
    type: "project"
  },
  {
    id: "n4",
    title: "Updates on contract",
    description: "Contract updates with Jake Vaner",
    time: "Feb 12, 2026",
    group: "YESTERDAY",
    unread: false,
    type: "contract"
  },
  {
    id: "n5",
    title: "New pictures added!",
    description: "Pictures were added to your professional profile.",
    time: "Jan 09, 2026",
    group: "LAST MONTH",
    unread: false,
    type: "project"
  }
];
