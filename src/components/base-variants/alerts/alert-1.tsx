import { MdError } from "react-icons/md";

import { Alert, AlertTitle } from "@/components/ui/alert";

const Alert1 = () => {
  return (
    <Alert>
      <MdError />
      <AlertTitle className="flex-1">You have a new message!</AlertTitle>
    </Alert>
  );
};

export default Alert1;
