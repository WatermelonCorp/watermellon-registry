import { useId } from 'react';

import { Input } from '@/components/ui/input';

const Input24 = () => {
  const id = useId();

  return (
    <div className="group relative w-full max-w-xs">
      <label
        htmlFor={id}
        className="origin-start text-muted-foreground group-focus-within:text-primary has-[+input:not(:placeholder-shown)]:text-primary absolute top-1/2 block -translate-y-1/2 cursor-text px-3 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-[10px] group-focus-within:font-bold has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-[10px] has-[+input:not(:placeholder-shown)]:font-bold"
      >
        <span className="bg-background inline-flex px-1 tracking-tight uppercase">
          Direct Message
        </span>
      </label>
      <Input
        id={id}
        type="text"
        placeholder=" "
        className="focus-visible:border-primary focus-visible:ring-primary/20 h-12 rounded-xl bg-transparent text-sm transition-all focus-visible:ring-3 dark:bg-transparent"
      />
    </div>
  );
};

export default Input24;
