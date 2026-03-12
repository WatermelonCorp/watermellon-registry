import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export default function Badge03() {
  return (
    <Badge asChild variant="outline">
      <Link to="https://aliimam.in" target="_blank">
        aliimam.in
      </Link>
    </Badge>
  );
}
