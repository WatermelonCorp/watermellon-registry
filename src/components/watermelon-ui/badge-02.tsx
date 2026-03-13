import { Badge } from "@/components/ui/badge";
import { CircleCheck, CircleAlert, Check } from "@aliimam/icons";

export default function Badge02() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">
        <CircleCheck /> Active
      </Badge>
      <Badge variant="destructive">
        <CircleAlert /> Error
      </Badge>
      <Badge className="rounded">Rounded</Badge>
      <Badge variant={"secondary"}>5</Badge>
      <Badge variant={"outline"}>
        Likes
        <span className="text-[0.625rem] font-medium text-primary-foreground/60">
          56
        </span>
      </Badge>
      <Badge
        variant={"outline"}
        className="bg-green-500 text-primary-foreground"
      >
        <Check />
        Check
      </Badge>
      <Badge variant={"outline"}>
        <span
          className="size-1.5 rounded-full bg-emerald-500"
          aria-hidden="true"
        ></span>
        Online
      </Badge>
      <Badge variant={"outline"}>
        <span
          className="size-1.5 rounded-full bg-red-500"
          aria-hidden="true"
        ></span>
        Offline
      </Badge>
    </div>
  );
}
