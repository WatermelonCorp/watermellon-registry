import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { VerifiedBadge } from "@aliimam/logos";
import { Badge } from "@/components/ui/badge";

export default function Avatar05() {
  return (
    <div className="flex gap-6">
      <div className="relative inline-block">
        <Avatar className="size-10">
          <AvatarImage src="/ali.jpg" alt="Ali Imam" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <span className="absolute top-0 right-0 block size-3 rounded-full border-2 border-background bg-green-500" />
      </div>

      <div className="relative inline-block">
        <Avatar className="size-10">
          <AvatarImage src="/ali.jpg" alt="Ali Imam" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <span className="absolute top-0 right-0 block size-3 rounded-full border-2 border-background bg-red-500" />
      </div>

      <div className="relative inline-block">
        <Avatar className="size-10">
          <AvatarImage src="/ali.jpg" alt="Ali Imam" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <VerifiedBadge
          size={18}
          className="absolute -top-1 bg-background rounded-full -right-1 block"
        />
      </div>

      <div className="relative inline-block">
        <Avatar className="size-10">
          <AvatarImage src="/ali.jpg" alt="Ali Imam" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <Badge className="absolute -top-1.5 left-full min-w-5.5 -translate-x-3.5 border-background px-1">
          3
        </Badge> 
      </div>
    </div>
  );
}
