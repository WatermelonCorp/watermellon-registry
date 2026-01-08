import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

export default function Avatar03() {
  const members = [
    { src: "/ali.jpg", fallback: "AI" },
    { src: "/ali.jpg", fallback: "AI" },
    { src: "/ali.jpg", fallback: "AI" },
  ];

  return (
    <div className="flex gap-6 items-center flex-wrap"> 
      <div className="flex -space-x-2">
        {members.map((member, i) => (
          <Avatar key={i} className="border-2 border-background">
            <AvatarImage src={member.src} alt={member.fallback} />
            <AvatarFallback>{member.fallback}</AvatarFallback>
          </Avatar>
        ))}
      </div>
      <div className="flex -space-x-2">
        {members.map((member, i) => (
          <Avatar key={i} className="border-2 size-12 rounded-md border-background">
            <AvatarImage src={member.src} alt={member.fallback} />
            <AvatarFallback>{member.fallback}</AvatarFallback>
          </Avatar>
        ))}
      </div>
    </div>
  );
}
