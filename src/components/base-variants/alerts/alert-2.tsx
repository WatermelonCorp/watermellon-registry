import { MdError } from "react-icons/md";

import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const Alert2 = () => {
  return (
    <Alert className="flex items-start justify-between gap-3 sm:items-center">
      <Avatar className="shrink-0 rounded-full">
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="Vansh Patel"
          className="rounded-full"
        />
        <AvatarFallback className="text-xs">VP</AvatarFallback>
      </Avatar>

      <div className="flex min-w-0 flex-1 flex-col justify-center leading-[1rem]">
        <AlertTitle>Vansh has replied on the mesasge.</AlertTitle>
        <AlertDescription className="leading-[1rem]">
          5 unread messages waiting for you.
        </AlertDescription>
      </div>

      <MdError className="shrink-0" />
    </Alert>
  );
};

export default Alert2;
