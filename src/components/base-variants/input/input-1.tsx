import { Input } from '@/components/ui/input';

const Input1 = () => {
  return (
    <Input
      type="search"
      placeholder="Search components..."
      className="focus-visible:border-primary focus-visible:ring-primary/20 max-w-xs rounded-xl transition-all focus-visible:ring-3"
    />
  );
};

export default Input1;
