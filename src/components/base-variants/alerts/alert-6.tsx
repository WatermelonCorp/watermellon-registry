
import { TbFileAlert } from "react-icons/tb";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Alert6 = () => {
  return (
    <Alert className="flex items-center gap-3">
      <Avatar className="rounded-md">
        <AvatarFallback className="bg-destructive dark:bg-destructive/60 rounded-md text-white">
          <TbFileAlert className="size-4" />
        </AvatarFallback>
      </Avatar>
      <AlertTitle>This file may harm your system!</AlertTitle>
    </Alert>
  );
};

export default Alert6;
