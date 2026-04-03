import { FaUserXmark } from "react-icons/fa6";

import { Alert, AlertTitle } from "@/components/ui/alert";

const Alert12 = () => {
  return (
    <Alert className="border-destructive bg-destructive/10 text-destructive rounded-none border-0 border-l-10">
      <FaUserXmark className="size-4" />
      <AlertTitle>Your request to join the team was declined.</AlertTitle>
    </Alert>
  );
};

export default Alert12;
