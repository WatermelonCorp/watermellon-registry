import  {GoAlertFill} from "react-icons/go";

import { Alert, AlertTitle } from "@/components/ui/alert";

const Alert15 = () => {
  return (
    <Alert variant="destructive" className="border-destructive bg-destructive/5">
      <GoAlertFill className="size-4" />
      <AlertTitle>We couldn’t process your payment.</AlertTitle>
    </Alert>
  );
};

export default Alert15;
