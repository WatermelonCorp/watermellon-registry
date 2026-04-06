import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Button24 = () => {
  return (
    <Button className="rounded-lg pl-1">
      <Avatar className="size-6">
        <AvatarImage
          src="https://github.com/VanshPatel.png"
          alt="Hallie Richards"
          className="rounded-md"
        />
        <AvatarFallback className="text-foreground text-xs">VP</AvatarFallback>
      </Avatar>
      @VanshPatel
    </Button>
  );
};

export default Button24;
