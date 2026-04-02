
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { MdError } from "react-icons/md";

const Alert22 = () => {
  return (
    <Alert className="border-none bg-sky-600/10 text-sky-600 dark:bg-sky-400/10 dark:text-sky-400">
      <MdError className="size-4" />
      <AlertTitle>Upload guidelines</AlertTitle>
      <AlertDescription className="text-sky-600/80 dark:text-sky-400/80">
        Make sure your files are in PDF, DOCX, JPG, or PNG format and under 20MB
        in size.
      </AlertDescription>
    </Alert>
  );
};

export default Alert22;
