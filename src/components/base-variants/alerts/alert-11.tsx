import { FaUserCheck } from "react-icons/fa";

import { Alert, AlertTitle } from "@/components/ui/alert";

const Alert11 = () => {
  return (
    <Alert className="rounded-md border-l-10 border-green-600 bg-green-600/10 text-green-600 dark:border-green-400 dark:bg-green-400/10 dark:text-green-400">
      <FaUserCheck className="size-4" />
      <AlertTitle>Welcome aboard! Your request is approved.</AlertTitle>
    </Alert>
  );
};

export default Alert11;
