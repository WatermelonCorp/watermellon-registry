import { MdError } from "react-icons/md";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Alert2 = () => {
  return (
    <Alert className="flex items-center justify-between">
      <Avatar className="rounded-full">
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="Hallie Richards"
          className="rounded-full"
        />
        <AvatarFallback className="text-xs">VP</AvatarFallback>
      </Avatar>
      <div className="flex-1 flex-col justify-center gap-1 leading-tight">
        <AlertTitle className="flex-1">
          Vansh has replied on the mesasge.
        </AlertTitle>
        <AlertDescription>5 unread messages waiting for you.</AlertDescription>
      </div>
      <MdError />
    </Alert>
  );
};

export default Alert2;
