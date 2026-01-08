import { Info } from "@aliimam/icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Alert01() {
  return (
    <Alert className="border-blue-500/30 bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200">
      <Info size={18} />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can use this alert to give users neutral or informational messages.
      </AlertDescription>
    </Alert>
  );
}
