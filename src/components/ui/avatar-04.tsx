import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Avatar04() {
  const sizes = ["size-6", "size-8", "size-10", "size-12"];

  return (
    <div className="flex items-center gap-4">
      {sizes.map((size, i) => (
        <Avatar key={i} className={size}>
          <AvatarImage src="/ali.jpg" alt="Ali Imam" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}
