import  {MdError} from "react-icons/md";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const Alert13 = () => {
  return (
    <Alert className="flex items-center justify-between [&>svg]:translate-y-0">
      <MdError className="size-4" />
      <AlertTitle className="flex-1">You have a new message!</AlertTitle>
      <Button variant="ghost" className=" cursor-pointer rounded-md px-2">
        Open
      </Button>
    </Alert>
  );
};

export default Alert13;
