import { Textarea } from "@/components/ui/textarea";

const Textarea19 = () => {
  return (
    <div className="w-full max-w-sm space-y-2">
      <Textarea
        className="min-h-10 rounded-none py-2.5 shadow-sm"
        placeholder="Quick note"
      />
      <Textarea
        placeholder="Write something..."
        className="rounded-lg shadow-sm"
      />
      <Textarea
        className="min-h-20 rounded-xl py-2 shadow-sm"
        placeholder="Detailed input"
      />
    </div>
  );
};

export default Textarea19;
