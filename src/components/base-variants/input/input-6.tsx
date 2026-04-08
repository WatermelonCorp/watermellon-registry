import { Input } from '@/components/ui/input';

const Input6 = () => {
  return (
    <div className="w-full max-w-xs space-y-4">
      <Input
        type="text"
        placeholder="Compact size"
        className="focus-visible:border-primary focus-visible:ring-primary/20 h-8 rounded-lg text-xs transition-all placeholder:text-[10px] focus-visible:ring-3"
      />
      <Input
        type="text"
        placeholder="Standard size"
        className="focus-visible:border-primary focus-visible:ring-primary/20 h-10 rounded-xl transition-all focus-visible:ring-3"
      />
      <Input
        type="text"
        placeholder="Spacious size"
        className="focus-visible:border-primary focus-visible:ring-primary/20 h-12 rounded-2xl px-4 text-lg transition-all focus-visible:ring-3"
      />
    </div>
  );
};

export default Input6;
