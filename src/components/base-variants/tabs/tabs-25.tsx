import { IconDotsVertical, IconMail } from '@tabler/icons-react';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const teams = [
  {
    name: 'Engineering',
    value: 'engineering',
    members: [
      { name: 'Alice Chen', role: 'Frontend Lead', status: 'Online' },
      { name: 'Bob Smith', role: 'Backend Developer', status: 'Busy' },
      { name: 'Charlie Davis', role: 'DevOps Engineer', status: 'Offline' },
    ],
  },
  {
    name: 'Design',
    value: 'design',
    members: [
      { name: 'Diana Prince', role: 'Product Designer', status: 'Online' },
      { name: 'Evan Wright', role: 'UX Researcher', status: 'Online' },
    ],
  },
  {
    name: 'Marketing',
    value: 'marketing',
    members: [
      {
        name: 'Fiona Gallagher',
        role: 'Content Strategist',
        status: 'Offline',
      },
      { name: 'George Miller', role: 'Growth Hacker', status: 'Busy' },
      { name: 'Hannah Lee', role: 'Social Media Manager', status: 'Online' },
    ],
  },
];

const Tabs25 = () => {
  return (
    <Tabs defaultValue="engineering" className="flex flex-col gap-2">
      <TabsList className="bg-background flex h-auto w-fit gap-2 rounded-none p-0">
        {teams.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="text-muted-foreground hover:border-border hover:bg-muted hover:text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:bg-primary rounded-xl border border-transparent px-3 py-1 font-medium shadow-none transition-all duration-300 data-[state=active]:border-transparent data-[state=active]:shadow-md dark:data-[state=active]:border-transparent"
          >
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="mt-2 w-full">
        {teams.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="animate-in fade-in slide-in-from-bottom-2 m-0 duration-300"
          >
            <div className="flex flex-col">
              {tab.members.map((member, idx) => (
                <div
                  key={idx}
                  className="group border-border/40 hover:bg-muted/20 flex items-center justify-between border-b py-3.5 transition-colors last:border-0"
                >
                  <div className="flex items-center gap-4 px-2">
                    <div className="bg-muted text-muted-foreground relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold shadow-sm">
                      {member.name.charAt(0)}
                      <span
                        className={`border-background absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 ${
                          member.status === 'Online'
                            ? 'bg-emerald-500'
                            : member.status === 'Busy'
                              ? 'bg-amber-500'
                              : 'bg-zinc-400'
                        }`}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-foreground text-sm font-semibold">
                        {member.name}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {member.role}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 pr-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <button className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-md p-2 transition-colors">
                      <IconMail size={16} />
                    </button>
                    <button className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-md p-2 transition-colors">
                      <IconDotsVertical size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};

export default Tabs25;
