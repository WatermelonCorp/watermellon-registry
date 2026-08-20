export type Customer = {
  name: string;
  email: string;
  phone: string;
  avatar: string;
};

export type Notification = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
};

export type JobStatus = "pre-construction" | "active" | "complete" | "closed";

export type Job = {
  id: string;
  title: string;
  status: JobStatus;
  customer: {
    name: string;
    avatar: string;
  };
  location: string;
  time: string;
};

export type EstimateLineItem = {
  id: string;
  name: string;
  csiCode?: string;
  description?: string;
  quantity: number;
  unit: string;
  unitCost: number;
  marginPercent: number;
};

export type EstimateSection = {
  id: string;
  name: string;
  items: EstimateLineItem[];
};

export type JobEstimate = {
  jobId: string;
  sections: EstimateSection[];
};

const diceBearAvatar = (seed: string) =>
  `https://api.dicebear.com/10.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;

export const currentUser = {
  name: "Vansh Patel",
  email: "vanshpatel@gmail.com",
  avatar: diceBearAvatar("Vansh Patel"),
};

export const notifications: Notification[] = [
  {
    id: "new-customer",
    title: "New customer added",
    description: "Sofia Martinez joined your customer list.",
    timestamp: "2m ago",
  },
  {
    id: "job-status",
    title: "Job status updated",
    description: "Product Designer moved to the next stage.",
    timestamp: "1h ago",
  },
];

export const customers: Customer[] = [
  {
    name: "Vansh Patel",
    email: "vanshpatel@gmail.com",
    phone: "+1 970-2403456",
    avatar: diceBearAvatar("Vansh Patel"),
  },
  {
    name: "Sofia Martinez",
    email: "sofiamartinez@example.com",
    phone: "+1 202-5550189",
    avatar: diceBearAvatar("Sofia Martinez"),
  },
  {
    name: "Zara Khan",
    email: "zarak@example.com",
    phone: "+1 305-5550191",
    avatar: diceBearAvatar("Zara Khan"),
  },
  {
    name: "Ethan Patel",
    email: "ethanp@example.com",
    phone: "+1 503-5550192",
    avatar: diceBearAvatar("Ethan Patel"),
  },
  {
    name: "Liam Johnson",
    email: "liamj@example.com",
    phone: "+1 415-5550190",
    avatar: diceBearAvatar("Liam Johnson"),
  },
];

export const jobs: Job[] = [
  {
    id: "kitchen-remodel-1",
    title: "Kitchen Remodel",
    status: "pre-construction",
    customer: {
      name: "Vansh P.",
      avatar: diceBearAvatar("Vansh Patel"),
    },
    location: "No 14, Bro, Allan avenue, Lekki county",
    time: "Just Now",
  },
  {
    id: "kitchen-remodel-2",
    title: "Kitchen Remodel",
    status: "pre-construction",
    customer: {
      name: "Vansh P.",
      avatar: diceBearAvatar("Vansh Patel"),
    },
    location: "No 14, Bro, Allan avenue, Lekki county",
    time: "Just Now",
  },
  {
    id: "kitchen-remodel-3",
    title: "Kitchen Remodel",
    status: "pre-construction",
    customer: {
      name: "Vansh P.",
      avatar: diceBearAvatar("Vansh Patel"),
    },
    location: "No 14, Bro, Allan avenue, Lekki county",
    time: "Just Now",
  },
  {
    id: "kitchen-remodel-4",
    title: "Kitchen Remodel",
    status: "active",
    customer: {
      name: "Vansh P.",
      avatar: diceBearAvatar("Vansh Patel"),
    },
    location: "No 14, Bro, Allan avenue, Lekki county",
    time: "Just Now",
  },
];

export const jobEstimates: JobEstimate[] = [
  {
    jobId: "kitchen-remodel-1",
    sections: [
      {
        id: "base",
        name: "Base",
        items: [
          {
            id: "tiles",
            name: "Tiles",
            quantity: 1,
            unit: "LS",
            unitCost: 10,
            marginPercent: 20,
          },
          {
            id: "cement",
            name: "Cement",
            quantity: 1,
            unit: "LS",
            unitCost: 7,
            marginPercent: 10,
          },
        ],
      },
      {
        id: "furniture",
        name: "Furniture",
        items: [
          {
            id: "wood",
            name: "Wood",
            quantity: 1,
            unit: "LS",
            unitCost: 10,
            marginPercent: 20,
          },
        ],
      },
    ],
  },
];
