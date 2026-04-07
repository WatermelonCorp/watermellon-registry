import { Textarea } from "@/components/ui/textarea";

const Textarea1 = () => {
  return (
    <Textarea
      placeholder="Write something..."
      className="focus-visible:ring-primary focus-visible:border-primary/50 w-full max-w-sm rounded-sm shadow-sm focus-visible:ring-2"
    />
  );
};

export default Textarea1;
