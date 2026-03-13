import { Lightbulb } from "@aliimam/icons";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function Alert06() {
  return (
    <Alert className="border-indigo-400/40 bg-indigo-50 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-200">
      <Lightbulb size={18}/>
      <AlertTitle>Tips for better results</AlertTitle>
      <AlertDescription>
        <ul className="list-disc list-inside">
          <li>Use short, descriptive names for files.</li>
          <li>Regularly back up your data.</li>
          <li>Keep your app dependencies updated.</li>
        </ul>
      </AlertDescription>
    </Alert>
  );
}
