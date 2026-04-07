import { Textarea } from "@/components/ui/textarea";

const Textarea10 = () => {
  return (
    <div className="w-full max-w-sm space-y-2">
      <Textarea
        className="min-h-10 rounded-sm py-1.5 shadow-sm"
        placeholder="Compact input"
      />
      <Textarea
        placeholder="Standard input "
        className="rounded-sm shadow-sm"
      />
      <Textarea
        className="min-h-20 rounded-sm py-2.5 shadow-sm"
        placeholder="Expanded input"
      />
    </div>
  );
};

export default Textarea10;
