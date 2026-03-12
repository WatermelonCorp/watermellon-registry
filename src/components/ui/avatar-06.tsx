import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

export default function Avatar06() {
  const members = [
    { src: "/ali.jpg", fallback: "AI" },
    { src: "/ali.jpg", fallback: "AI" },
    { src: "/ali.jpg", fallback: "AI" },
  ];

  return (
    <div className="flex items-center rounded-full -space-x-2 border bg-background p-1">
      {members.map((member, i) => (
        <Avatar key={i} className="border-2 border-background">
          <AvatarImage src={member.src} alt={member.fallback} />
          <AvatarFallback>{member.fallback}</AvatarFallback>
        </Avatar>
      ))}
      <p className="px-4 text-xs text-muted-foreground">
        Designed by <span className="font-bold text-foreground">20K+</span>{" "}
        designers.
      </p>
    </div>
  );
}
