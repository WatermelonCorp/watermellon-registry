import { useId } from 'react';

const Input25 = () => {
  const id = useId();

  return (
    <div className="border-input bg-background focus-within:border-primary focus-within:ring-primary/20 relative w-full max-w-xs rounded-xl border transition-all outline-none focus-within:ring-3 has-disabled:opacity-50 has-aria-invalid:border-rose-500">
      <label
        htmlFor={id}
        className="text-muted-foreground group-focus-within:text-primary block px-3 pt-2 text-[10px] font-bold tracking-wider uppercase transition-colors"
      >
        Account Reference
      </label>
      <input
        id={id}
        type="text"
        placeholder="e.g. ACC-2026-XP"
        className="text-foreground placeholder:text-muted-foreground flex h-9 w-full bg-transparent px-3 pb-2 text-sm focus-visible:outline-none"
      />
    </div>
  );
};

export default Input25;
