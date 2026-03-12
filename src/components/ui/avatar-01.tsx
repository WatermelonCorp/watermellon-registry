import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { UserRound } from "@aliimam/icons";

export default function Avatar01() {
  return (
    <div className="flex gap-6">
      <Avatar>
        <AvatarImage src="/ali.jpg" alt="Ali Imam" />
        <AvatarFallback>AI</AvatarFallback>
      </Avatar>
      <Avatar className="rounded-lg">
        <AvatarImage src="/ali.jpg" alt="Ali Imam" />
        <AvatarFallback>AI</AvatarFallback>
      </Avatar>
      <Avatar className="rounded-lg">
        <AvatarFallback>
          <UserRound />
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>AI</AvatarFallback>
      </Avatar>
    </div>
  );
}
