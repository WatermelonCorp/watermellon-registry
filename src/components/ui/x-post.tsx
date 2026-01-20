"use client";

import * as React from "react";
import { Heart, Share } from "lucide-react";


export interface XPostProps {
  post: XPostData;
  className?: string;
  onAction?: (action: string, post: XPostData) => void;
  responseActions?: ActionsProp;
  onResponseAction?: (actionId: string) => void | Promise<void>;
  onBeforeResponseAction?: (actionId: string) => boolean | Promise<boolean>;
}

function Avatar({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={40}
      height={40}
      className="size-10 shrink-0 rounded-full object-cover"
    />
  );
}

function XLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 271"
      className={className}
      role="img"
      aria-label="X (formerly Twitter) logo"
    >
      <path
        fill="currentColor"
        d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z"
      />
    </svg>
  );
}

function VerifiedBadge({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role="img"
      aria-label="Verified account"
    >
      <path
        fill="currentColor"
        d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .495.083.965.238 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"
      />
    </svg>
  );
}

function AuthorInfo({
  name,
  handle,
  verified,
  createdAt,
}: {
  name: string;
  handle: string;
  verified?: boolean;
  createdAt?: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-1">
      <span className="truncate font-semibold">{name}</span>
      {verified && (
        <VerifiedBadge className="size-[18px] shrink-0 text-blue-500" />
      )}
      <span className="text-muted-foreground truncate">@{handle}</span>
      {createdAt && (
        <>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">
            {formatRelativeTime(createdAt)}
          </span>
        </>
      )}
    </div>
  );
}

function PostBody({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <p className="text-[15px] leading-normal text-pretty wrap-break-word whitespace-pre-wrap">
      {text}
    </p>
  );
}

function PostMedia({
  media,
  onOpen,
}: {
  media: XPostMedia;
  onOpen?: () => void;
}) {
  const aspectRatio =
    media.aspectRatio === "1:1"
      ? "1"
      : media.aspectRatio === "4:3"
        ? "4/3"
        : "16/9";

  return (
    <button
      type="button"
      className="bg-muted mt-2 w-full overflow-hidden rounded-xl"
      style={{ aspectRatio }}
      onClick={() => onOpen?.()}
    >
      {media.type === "image" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={media.url}
          alt={media.alt}
          className="size-full object-cover"
          loading="lazy"
        />
      ) : (
        <video
          src={media.url}
          controls
          playsInline
          className="size-full object-contain"
        />
      )}
    </button>
  );
}

function PostLinkPreview({ preview }: { preview: XPostLinkPreview }) {
  const domain = preview.domain ?? getDomain(preview.url);

  return (
    <a
      href={preview.url}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:bg-muted/50 mt-2 block overflow-hidden rounded-xl border transition-colors"
    >
      {preview.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview.imageUrl}
          alt=""
          className="h-48 w-full object-cover"
          loading="lazy"
        />
      )}
      <div className="p-3">
        {domain && (
          <div className="text-muted-foreground text-xs">{domain}</div>
        )}
        {preview.title && (
          <div className="font-medium text-pretty">{preview.title}</div>
        )}
        {preview.description && (
          <div className="text-muted-foreground line-clamp-2 text-sm text-pretty">
            {preview.description}
          </div>
        )}
      </div>
    </a>
  );
}

function QuotedPostCard({ post }: { post: XPostData }) {
  return (
    <div className="hover:bg-muted/30 mt-2 rounded-xl border p-3 transition-colors">
      <div className="flex min-w-0 items-center gap-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.author.avatarUrl}
          alt={`${post.author.name} avatar`}
          width={16}
          height={16}
          className="size-4 rounded-full object-cover"
        />
        <span className="truncate font-semibold">{post.author.name}</span>
        {post.author.verified && (
          <VerifiedBadge className="size-3.5 shrink-0 text-blue-500" />
        )}
        <span className="text-muted-foreground truncate">
          @{post.author.handle}
        </span>
        {post.createdAt && (
          <>
            <span className="text-muted-foreground shrink-0">·</span>
            <span className="text-muted-foreground shrink-0">
              {formatRelativeTime(post.createdAt)}
            </span>
          </>
        )}
      </div>
      {post.text && <p className="mt-1.5">{post.text}</p>}
      {post.media && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.media.url}
          alt={post.media.alt}
          className="mt-2 rounded-lg"
        />
      )}
    </div>
  );
}

function ActionButton({
  icon: Icon,
  label,
  count,
  active,
  hoverColor,
  activeColor,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  count?: number;
  active?: boolean;
  hoverColor: string;
  activeColor?: string;
  onClick: () => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className={cn(
            "h-auto gap-1.5 px-2 py-1",
            hoverColor,
            active && activeColor,
          )}
          aria-label={label}
        >
          <Icon className="size-4" />
          {count !== undefined && (
            <span className="text-sm">{formatCount(count)}</span>
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

function PostActions({
  stats,
  onAction,
}: {
  stats?: XPostData["stats"];
  onAction: (action: string) => void;
}) {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="mt-3 flex items-center gap-4">
        <ActionButton
          icon={Heart}
          label="Like"
          count={stats?.likes}
          active={stats?.isLiked}
          hoverColor="hover:text-pink-500 hover:bg-pink-500/10"
          activeColor="text-pink-500 fill-pink-500"
          onClick={() => onAction("like")}
        />
        <ActionButton
          icon={Share}
          label="Share"
          hoverColor="hover:text-blue-500 hover:bg-blue-500/10"
          onClick={() => onAction("share")}
        />
      </div>
    </TooltipProvider>
  );
}

export function XPost({
  post,
  className,
  onAction,
  responseActions,
  onResponseAction,
  onBeforeResponseAction,
}: XPostProps) {
  const normalizedFooterActions = React.useMemo(
    () => normalizeActionsConfig(responseActions),
    [responseActions],
  );

  return (
    <div
      className={cn("flex max-w-xl flex-col gap-3", className)}
      data-tool-ui-id={post.id}
      data-slot="x-post"
    >
      <article className="bg-card rounded-xl border p-3 shadow-sm">
        <div className="flex gap-3">
          <Avatar
            src={post.author.avatarUrl}
            alt={`${post.author.name} avatar`}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <AuthorInfo
                name={post.author.name}
                handle={post.author.handle}
                verified={post.author.verified}
                createdAt={post.createdAt}
              />
              <XLogo className="text-muted-foreground/40 size-4" />
            </div>
            <PostBody text={post.text} />
            {post.media && <PostMedia media={post.media} />}
            {post.quotedPost && <QuotedPostCard post={post.quotedPost} />}
            {post.linkPreview && !post.quotedPost && (
              <PostLinkPreview preview={post.linkPreview} />
            )}
            <PostActions
              stats={post.stats}
              onAction={(action) => onAction?.(action, post)}
            />
          </div>
        </div>
      </article>

      {normalizedFooterActions && (
        <div className="@container/actions">
          <ActionButtons
            actions={normalizedFooterActions.items}
            align={normalizedFooterActions.align}
            confirmTimeout={normalizedFooterActions.confirmTimeout}
            onAction={(id) => onResponseAction?.(id)}
            onBeforeAction={onBeforeResponseAction}
          />
        </div>
      )}
    </div>
  );
}
import { z } from "zod";

function formatZodPath(path: Array<string | number | symbol>): string {
  if (path.length === 0) return "root";
  return path
    .map((segment) =>
      typeof segment === "number" ? `[${segment}]` : String(segment),
    )
    .join(".");
}

/**
 * Format Zod errors into a compact `path: message` string.
 */
export function formatZodError(error: z.ZodError): string {
  const parts = error.issues.map((issue) => {
    const path = formatZodPath(issue.path);
    return `${path}: ${issue.message}`;
  });

  return Array.from(new Set(parts)).join("; ");
}

/**
 * Parse unknown input and throw a readable error.
 */
export function parseWithSchema<T>(
  schema: z.ZodType<T>,
  input: unknown,
  name: string,
): T {
  const res = schema.safeParse(input);
  if (!res.success) {
    throw new Error(`Invalid ${name} payload: ${formatZodError(res.error)}`);
  }
  return res.data;
}


export const XPostAuthorSchema = z.object({
  name: z.string(),
  handle: z.string(),
  avatarUrl: z.url(),
  verified: z.boolean().optional(),
});

export const XPostMediaSchema = z.object({
  type: z.enum(["image", "video"]),
  url: z.url(),
  alt: z.string(),
  aspectRatio: z.enum(["1:1", "4:3", "16:9", "9:16"]).optional(),
});

export const XPostLinkPreviewSchema = z.object({
  url: z.url(),
  title: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.url().optional(),
  domain: z.string().optional(),
});

export const XPostStatsSchema = z.object({
  likes: z.number().optional(),
  isLiked: z.boolean().optional(),
  isReposted: z.boolean().optional(),
  isBookmarked: z.boolean().optional(),
});

export interface XPostData {
  id: string;
  author: z.infer<typeof XPostAuthorSchema>;
  text?: string;
  media?: z.infer<typeof XPostMediaSchema>;
  linkPreview?: z.infer<typeof XPostLinkPreviewSchema>;
  quotedPost?: XPostData;
  stats?: z.infer<typeof XPostStatsSchema>;
  createdAt?: string;
}

export const SerializableXPostSchema: z.ZodType<XPostData> = z.object({
  id: z.string(),
  author: XPostAuthorSchema,
  text: z.string().optional(),
  media: XPostMediaSchema.optional(),
  linkPreview: XPostLinkPreviewSchema.optional(),
  quotedPost: z.lazy(() => SerializableXPostSchema).optional(),
  stats: XPostStatsSchema.optional(),
  createdAt: z.string().optional(),
});
export type XPostAuthor = z.infer<typeof XPostAuthorSchema>;
export type XPostMedia = z.infer<typeof XPostMediaSchema>;
export type XPostLinkPreview = z.infer<typeof XPostLinkPreviewSchema>;
export type XPostStats = z.infer<typeof XPostStatsSchema>;

export function parseSerializableXPost(input: unknown): XPostData {
  return parseWithSchema(SerializableXPostSchema, input, "XPost");
}

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";


const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
        homeCTA: "rounded-full px-6 py-3 text-lg w-fit text-start",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

import * as TooltipPrimitive from "@radix-ui/react-tooltip"


function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }


export interface ActionButtonsProps {
  actions: Action[];
  onAction: (actionId: string) => void | Promise<void>;
  onBeforeAction?: (actionId: string) => boolean | Promise<boolean>;
  confirmTimeout?: number;
  align?: "left" | "center" | "right";
  className?: string;
}

export function ActionButtons({
  actions,
  onAction,
  onBeforeAction,
  confirmTimeout = 3000,
  align = "right",
  className,
}: ActionButtonsProps) {
  const { actions: resolvedActions, runAction } = useActionButtons({
    actions,
    onAction,
    onBeforeAction,
    confirmTimeout,
  });

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        "@sm/actions:flex-row @sm/actions:flex-wrap @sm/actions:items-center @sm/actions:gap-2",
        align === "left" && "@sm/actions:justify-start",
        align === "center" && "@sm/actions:justify-center",
        align === "right" && "@sm/actions:justify-end",
        className,
      )}
    >
      {resolvedActions.map((action) => {
        const label = action.currentLabel;
        const variant = action.variant || "default";

        return (
          <Button
            key={action.id}
            variant={variant}
            onClick={() => runAction(action.id)}
            disabled={action.isDisabled}
            className={cn(
              "rounded-full px-4!",
              "justify-center",
              "min-h-11 w-full text-base",
              "@sm/actions:min-h-0 @sm/actions:w-auto @sm/actions:px-3 @sm/actions:py-2 @sm/actions:text-sm",
              action.isConfirming &&
                "ring-destructive ring-2 ring-offset-2 motion-safe:animate-pulse",
            )}
            aria-label={
              action.shortcut ? `${label} (${action.shortcut})` : label
            }
          >
            {action.isLoading && (
              <svg
                className="mr-2 h-4 w-4 motion-safe:animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
            {action.icon && !action.isLoading && (
              <span className="mr-2">{action.icon}</span>
            )}
            {label}
            {action.shortcut && !action.isLoading && (
              <kbd className="border-border bg-muted ml-2.5 hidden rounded-lg border px-2 py-0.5 font-mono text-xs font-medium sm:inline-block">
                {action.shortcut}
              </kbd>
            )}
          </Button>
        );
      })}
    </div>
  );
}

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export type UseActionButtonsOptions = {
  actions: Action[];
  onAction: (actionId: string) => void | Promise<void>;
  onBeforeAction?: (actionId: string) => boolean | Promise<boolean>;
  confirmTimeout?: number;
};

export type UseActionButtonsResult = {
  actions: Array<
    Action & {
      currentLabel: string;
      isConfirming: boolean;
      isExecuting: boolean;
      isDisabled: boolean;
      isLoading: boolean;
    }
  >;
  runAction: (actionId: string) => Promise<void>;
  confirmingActionId: string | null;
  executingActionId: string | null;
};

export function useActionButtons(
  options: UseActionButtonsOptions,
): UseActionButtonsResult {
  const {
    actions,
    onAction,
    onBeforeAction,
    confirmTimeout = 3000,
  } = options;

  const [confirmingActionId, setConfirmingActionId] = useState<string | null>(
    null,
  );
  const [executingActionId, setExecutingActionId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!confirmingActionId) return;
    const id = setTimeout(() => setConfirmingActionId(null), confirmTimeout);
    return () => clearTimeout(id);
  }, [confirmingActionId, confirmTimeout]);

  useEffect(() => {
    if (!confirmingActionId) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setConfirmingActionId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [confirmingActionId]);

  const runAction = useCallback(
    async (actionId: string) => {
      const action = actions.find((a) => a.id === actionId);
      if (!action) return;

      const isAnyActionExecuting = executingActionId !== null;
      if (action.disabled || action.loading || isAnyActionExecuting) {
        return;
      }

      if (action.confirmLabel && confirmingActionId !== action.id) {
        setConfirmingActionId(action.id);
        return;
      }

      if (onBeforeAction) {
        const shouldProceed = await onBeforeAction(action.id);
        if (!shouldProceed) {
          setConfirmingActionId(null);
          return;
        }
      }

      try {
        setExecutingActionId(action.id);
        await onAction(action.id);
      } finally {
        setExecutingActionId(null);
        setConfirmingActionId(null);
      }
    },
    [actions, confirmingActionId, executingActionId, onAction, onBeforeAction],
  );

  const resolvedActions = useMemo(
    () =>
      actions.map((action) => {
        const isConfirming = confirmingActionId === action.id;
        const isThisActionExecuting = executingActionId === action.id;
        const isLoading = action.loading || isThisActionExecuting;
        const isDisabled =
          action.disabled || (executingActionId !== null && !isThisActionExecuting);
        const currentLabel =
          isConfirming && action.confirmLabel
            ? action.confirmLabel
            : action.label;

        return {
          ...action,
          currentLabel,
          isConfirming,
          isExecuting: isThisActionExecuting,
          isDisabled,
          isLoading,
        };
      }),
    [actions, confirmingActionId, executingActionId],
  );

  return {
    actions: resolvedActions,
    runAction,
    confirmingActionId,
    executingActionId,
  };
}


import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Tool UI conventions:
 * - Serializable schemas are JSON-safe (no callbacks/ReactNode/`className`).
 * - Schema: `SerializableXSchema`
 * - Parser: `parseSerializableX(input: unknown)`
 * - Actions: `responseActions`, `onResponseAction`, `onBeforeResponseAction`
 * - Root attrs: `data-tool-ui-id` + `data-slot`
 */

/**
 * Schema for tool UI identity.
 *
 * Every tool UI should have a unique identifier that:
 * - Is stable across re-renders
 * - Is meaningful (not auto-generated)
 * - Is unique within the conversation
 *
 * Format recommendation: `{component-type}-{semantic-identifier}`
 * Examples: "data-table-expenses-q3", "option-list-deploy-target"
 */
export const ToolUIIdSchema = z.string().min(1);

export type ToolUIId = z.infer<typeof ToolUIIdSchema>;

/**
 * Primary role of a Tool UI surface in a chat context.
 */
export const ToolUIRoleSchema = z.enum([
  "information",
  "decision",
  "control",
  "state",
  "composite",
]);

export type ToolUIRole = z.infer<typeof ToolUIRoleSchema>;

export const ToolUIReceiptOutcomeSchema = z.enum([
  "success",
  "partial",
  "failed",
  "cancelled",
]);

export type ToolUIReceiptOutcome = z.infer<typeof ToolUIReceiptOutcomeSchema>;

/**
 * Optional receipt metadata: a durable summary of an outcome.
 */
export const ToolUIReceiptSchema = z.object({
  outcome: ToolUIReceiptOutcomeSchema,
  summary: z.string().min(1),
  identifiers: z.record(z.string(), z.string()).optional(),
  at: z.string().datetime(),
});

export type ToolUIReceipt = z.infer<typeof ToolUIReceiptSchema>;

/**
 * Base schema for Tool UI payloads (id + optional role/receipt).
 */
export const ToolUISurfaceSchema = z.object({
  id: ToolUIIdSchema,
  role: ToolUIRoleSchema.optional(),
  receipt: ToolUIReceiptSchema.optional(),
});

export type ToolUISurface = z.infer<typeof ToolUISurfaceSchema>;

export const ActionSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  /**
   * Canonical narration the assistant can use after this action is taken.
   *
   * Example: "I exported the table as CSV." / "I opened the link in a new tab."
   */
  sentence: z.string().optional(),
  confirmLabel: z.string().optional(),
  variant: z
    .enum(["default", "destructive", "secondary", "ghost", "outline"])
    .optional(),
  icon: z.custom<ReactNode>().optional(),
  loading: z.boolean().optional(),
  disabled: z.boolean().optional(),
  shortcut: z.string().optional(),
});

export type Action = z.infer<typeof ActionSchema>;

export const ActionButtonsPropsSchema = z.object({
  actions: z.array(ActionSchema).min(1),
  align: z.enum(["left", "center", "right"]).optional(),
  confirmTimeout: z.number().positive().optional(),
  className: z.string().optional(),
});

export const SerializableActionSchema = ActionSchema.omit({ icon: true });
export const SerializableActionsSchema = ActionButtonsPropsSchema.extend({
  actions: z.array(SerializableActionSchema),
}).omit({ className: true });

export interface ActionsConfig {
  items: Action[];
  align?: "left" | "center" | "right";
  confirmTimeout?: number;
}

export const SerializableActionsConfigSchema = z.object({
  items: z.array(SerializableActionSchema).min(1),
  align: z.enum(["left", "center", "right"]).optional(),
  confirmTimeout: z.number().positive().optional(),
});

export type SerializableActionsConfig = z.infer<
  typeof SerializableActionsConfigSchema
>;

export type SerializableAction = z.infer<typeof SerializableActionSchema>;


export type ActionsProp = ActionsConfig | Action[];

const NEGATORY_ACTION_IDS = new Set([
  "cancel",
  "dismiss",
  "skip",
  "no",
  "reset",
  "close",
  "decline",
  "reject",
  "back",
  "later",
  "not-now",
  "maybe-later",
]);

function inferVariant(action: Action): Action {
  if (action.variant) return action;
  if (NEGATORY_ACTION_IDS.has(action.id)) {
    return { ...action, variant: "ghost" };
  }
  return action;
}

export function normalizeActionsConfig(
  actions?: ActionsProp,
): ActionsConfig | null {
  if (!actions) return null;

  const rawItems = Array.isArray(actions) ? actions : (actions.items ?? []);

  if (rawItems.length === 0) {
    return null;
  }

  const items = rawItems.map(inferVariant);

  return Array.isArray(actions)
    ? { items }
    : {
        items,
        align: actions.align,
        confirmTimeout: actions.confirmTimeout,
      };
}

export function formatRelativeTime(iso: string): string {
  const seconds = Math.round((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)}h`;
  if (seconds < 604800) return `${Math.round(seconds / 86400)}d`;
  return `${Math.round(seconds / 604800)}w`;
}

export function formatCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return String(count);
}

export function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}
