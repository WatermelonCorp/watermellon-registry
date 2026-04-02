;

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { FaCheckCircle } from "react-icons/fa";
const Alert19 = () => {
  return (
    <Alert className="border-green-600 text-green-600 dark:border-green-400 dark:text-green-400 bg-green-600/10 dark:bg-green-400/10">
      <FaCheckCircle />
      <AlertTitle>Order placed successfully</AlertTitle>
      <AlertDescription className="text-green-600/80 dark:text-green-400/80">
        Your order has been confirmed and is being processed.
      </AlertDescription>
    </Alert>
  );
};

export default Alert19;
