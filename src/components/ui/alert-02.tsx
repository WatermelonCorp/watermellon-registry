import { TriangleAlert } from "@aliimam/icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Alert02() {
  return (
    <Alert className="border-yellow-500/40 bg-yellow-50 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-200">
      <TriangleAlert size={18}/>
      <AlertTitle>Warning: Unsaved changes</AlertTitle>
      <AlertDescription>
        Make sure to save your progress before leaving this page.
      </AlertDescription>
    </Alert>
  );
}
