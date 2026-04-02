import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { MdError } from "react-icons/md";

const Alert21 = () => {
  return (
    <Alert className="bg-primary/5 border-none">
      <MdError className="size-4" />
      <AlertTitle>Supported file formats</AlertTitle>
      <AlertDescription>
        You can upload files in PDF, DOCX, JPG, or PNG format for a smooth
        experience.
      </AlertDescription>
    </Alert>
  );
};

export default Alert21;
