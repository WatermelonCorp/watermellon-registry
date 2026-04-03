import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Badge24 = () => {
  return (
    <div className="relative w-fit">
      <Avatar className="size-10">
        <AvatarImage
          src="https://github.com/vanshpatel.png"
          alt="Vansh Patel"
        />
        <AvatarFallback>VP</AvatarFallback>
      </Avatar>
      <span className="border-background absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 bg-green-600 dark:bg-green-400">
        <span className="sr-only">Online</span>
      </span>
    </div>
  );
};

export default Badge24;
