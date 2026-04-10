import {
  FaFont,
  FaBold,
  FaItalic,
  FaUnderline,
  FaHighlighter,
} from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const listItems = [
  {
    icon: FaFont,
    title: "Font Style",
    desc: "Change typography",
  },
  {
    icon: FaBold,
    title: "Bold Text",
    desc: "Make text stand out",
  },
  {
    icon: FaItalic,
    title: "Italic Text",
    desc: "Add emphasis",
  },
  {
    icon: FaUnderline,
    title: "Underline",
    desc: "Highlight importance",
  },
  {
    icon: FaHighlighter,
    title: "Highlight",
    desc: "Mark key content",
  },
];

const DropdownMenu3 = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="flex items-center justify-center rounded-sm shadow-xs"
        >
          <FaFont className="text-sm" />
          <span className="sr-only">Text tools</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="grid w-64 gap-1 p-1">
        <div className="px-1 py-1">
          <p className="text-muted-foreground text-sm font-medium">
            Text Tools
          </p>
        </div>

        {listItems.map((item, index) => (
          <DropdownMenuItem
            key={index}
            className="hover:bg-accent/50! flex items-center gap-3 rounded-lg p-1"
          >
            <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-md">
              <item.icon className="text-sm" />
            </div>

            <div className="flex flex-col">
              <span className="text-sm">{item.title}</span>
              <span className="text-muted-foreground text-xs">{item.desc}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenu3;
