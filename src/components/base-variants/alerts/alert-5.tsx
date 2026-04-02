import { TbFileAlert } from "react-icons/tb";

import { Alert, AlertTitle } from "@/components/ui/alert";

const Alert5 = () => {
  return (
    <Alert className="flex items-stretch p-0 rounded-none ">
      <div className="bg-destructive/20 text-destructive rounded-none flex items-center  border-r p-2  border border-destructive/20 ">
        <TbFileAlert className="size-4" />
      </div>
      <AlertTitle className="p-3">This file may harm your system!</AlertTitle>
    </Alert>
  );
};

export default Alert5;
