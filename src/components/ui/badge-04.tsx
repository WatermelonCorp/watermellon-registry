import { Badge } from "@/components/ui/badge";

export default function Badge04() {
  const tags = ["Design", "Next.js", "Branding", "UI/UX"];
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary">
          {tag}
        </Badge>
      ))}
    </div>
  );
}
