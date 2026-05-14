import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";
import { RiHome5Fill } from "react-icons/ri";

export interface ErrorOneAction {
  label: string;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface ErrorOneProps {
  /** The HTTP error code to display prominently, e.g. "404" */
  code?: string;
  /** Bold headline beneath the error code */
  title?: string;
  /** Supporting description copy */
  description?: string;
  /** Primary call-to-action */
  action?: ErrorOneAction;
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function GradientCode({ code }: { code: string }) {
  return (
    <svg
      viewBox="0 0 800 300"
      className="w-full max-w-[20rem] select-none sm:max-w-md"
      aria-hidden="true"
    >
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-primary/20 stroke-primary font-black tracking-tighter"
        style={{ fontSize: "20rem" }}
        strokeWidth="2"
        strokeDasharray="40 20"
      >
        {code}
      </text>
    </svg>
  );
}

function PillButton({ label, icon, href, onClick }: ErrorOneAction) {
  const cls =
    "h-10 rounded-full px-6 text-sm font-semibold rounded transition-opacity hover:opacity-90 mt-4 shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.7),inset_0_-2px_4px_0_rgba(0,0,0,0.2)] sm:w-auto dark:shadow-[inset_0_-2px_4px_0_rgba(0,0,0,0.2),inset_0_2px_4px_0_rgba(255,255,255,0.5)]";

  const content = (
    <>
      <span>{label}</span>
      {icon}
    </>
  );

  if (href) {
    return (
      <Button asChild className={cls}>
        <a href={href}>{content}</a>
      </Button>
    );
  }

  return (
    <Button className={cls} onClick={onClick} type="button">
      {content}
    </Button>
  );
}

export function ErrorOne({
  code = "404",
  title = "No, no, that's right.",
  description = "This is a 404 page. And this page exists, no matter what anyone says.",
  action = defaultErrorOneAction,
}: ErrorOneProps) {
  return (
    <main className="theme-injected bg-background text-foreground relative flex min-h-screen items-center justify-center px-6 py-16">
      <div
        className="dakr:opacity-20 mask-radia-at-center mask-radial-from-muted pointer-events-none absolute inset-0 z-0 mask-radial-to-transparent opacity-10"
        style={{
          backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 19px, var(--primary) 19px, var(--primary) 20px, transparent 20px, transparent 39px, var(--primary) 39px, var(--primary) 40px),
        repeating-linear-gradient(90deg, transparent, transparent 19px, var(--primary) 19px, var(--primary) 20px, transparent 20px, transparent 39px, var(--primary) 39px, var(--primary) 40px),
        radial-gradient(circle at 20px 20px, var(--primary) 2px, transparent 2px),
        radial-gradient(circle at 40px 40px, var(--primary) 2px, transparent 2px)
      `,
          backgroundSize: "40px 40px, 40px 40px, 40px 40px, 40px 40px",
        }}
      />

      <section
        aria-labelledby="error-one-title"
        className="z-10 mx-auto flex w-full max-w-lg flex-col items-center text-center"
      >
        <GradientCode code={code} />

        <div className="flex flex-col items-center gap-2">
          <h1
            id="error-one-title"
            className="text-xl leading-snug font-bold tracking-tight sm:text-2xl"
          >
            {title}
          </h1>
          <p className="text-muted-foreground mx-auto max-w-xs text-sm leading-relaxed sm:max-w-sm sm:text-base">
            {description}
          </p>
        </div>
        <PillButton {...action} />
      </section>
    </main>
  );
}

export const defaultErrorOneAction: ErrorOneAction = {
  label: "Go Back Home",
  href: "/",
  icon: <RiHome5Fill className="ml-1.5 text-base" aria-hidden="true" />,
};

export default ErrorOne;
