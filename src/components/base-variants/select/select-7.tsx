import { useId } from 'react';

import { Label } from '@/components/ui/label';
import { 
  NativeSelect, 
  NativeSelectOptGroup,
  NativeSelectOption 
} from '@/components/ui/native-select';

const Select7 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor={id} className="text-zinc-600 dark:text-zinc-400">
        Architecture Blueprint
      </Label>
      <NativeSelect 
        id={id} 
        className="w-full rounded-xl border-zinc-200 shadow-xs dark:border-zinc-800 dark:bg-zinc-950 transition-all focus:ring-2 focus:ring-zinc-400/20 dark:focus:ring-zinc-500/20 dark:[&_select]:[color-scheme:dark]"
      >
        <NativeSelectOptGroup label="Virtualization Layer" className="dark:bg-zinc-950 dark:text-zinc-500">
          <NativeSelectOption value="docker" className="dark:bg-zinc-950 dark:text-zinc-100">Container Engine (Docker)</NativeSelectOption>
          <NativeSelectOption value="kvm" className="dark:bg-zinc-950 dark:text-zinc-100">Kernel Virtual Machine</NativeSelectOption>
          <NativeSelectOption value="firecracker" className="dark:bg-zinc-950 dark:text-zinc-100">MicroVM (Firecracker)</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Orchestration Fabric" className="dark:bg-zinc-950 dark:text-zinc-500">
          <NativeSelectOption value="k8s" className="dark:bg-zinc-950 dark:text-zinc-100">Managed Kubernetes</NativeSelectOption>
          <NativeSelectOption value="nomad" className="dark:bg-zinc-950 dark:text-zinc-100">HashiCorp Nomad</NativeSelectOption>
          <NativeSelectOption value="swarm" className="dark:bg-zinc-950 dark:text-zinc-100">Docker Swarm Mode</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
    </div>
  );
};

export default Select7;

