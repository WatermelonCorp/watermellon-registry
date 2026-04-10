import { Textarea } from "@/components/ui/textarea";

const Textarea19 = () => {
  return (
    <div className="w-full max-w-sm space-y-2">
      <Textarea
        className="focus-visible:ring-primary/20 focus-visible:border-primary/50 min-h-10 rounded-sm py-1.5 shadow-sm focus-visible:ring-2"
        placeholder="Compact input"
      />
      <Textarea
        placeholder="Standard input "
        className="focus-visible:ring-primary/20 focus-visible:border-primary/50 rounded-sm shadow-sm focus-visible:ring-2"
      />
      <Textarea
        className="focus-visible:ring-primary/20 focus-visible:border-primary/50 min-h-20 rounded-sm py-2.5 shadow-sm focus-visible:ring-2"
        placeholder="Expanded input"
      />
    </div>
  );
};

export default Textarea19;
