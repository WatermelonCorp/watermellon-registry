'use client';

import { useState, useRef, useEffect, useLayoutEffect, type FC } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Minus,
  Maximize2,
  Mail,
  ChevronDown,
  Smile,
  Paperclip,
  Link2,
  Sparkles,
  MoreHorizontal,
  Bold,
  Italic,
  Calendar,
  Upload,
  Check,
} from 'lucide-react';
import { LuSend } from 'react-icons/lu';

// --- Types ---
export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: string;
  icon: 'PDF' | 'IMAGE' | 'DOC';
}

export interface Recipient {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

export interface EmailData {
  from: Recipient;
  to: Recipient[];
  subject: string;
  body: string;
  attachments: Attachment[];
}

interface ComposeEmailCardProps {
  data: EmailData;
  onSend?: (data: EmailData) => void;
  onClose?: () => void;
}

type ActivePopover =
  | 'more'
  | 'emoji'
  | 'attach'
  | 'link'
  | 'ai'
  | 'schedule'
  | null;

const EMOJIS = [
  '😊',
  '👍',
  '🙌',
  '🔥',
  '💡',
  '✅',
  '🚀',
  '💼',
  '📊',
  '🎯',
  '💬',
  '🤝',
  '⭐',
  '📌',
  '🎉',
  '💪',
  '🌟',
  '📈',
  '🔑',
  '⚡',
];

const AI_SUGGESTIONS = [
  "I'd love to schedule a quick call this week to discuss further.",
  'Please let me know if you have any questions — happy to help!',
  'Looking forward to your feedback on this.',
];

const SCHEDULE_OPTIONS = [
  { label: 'Tomorrow 9:00 AM', value: 'tom-9am' },
  { label: 'Tomorrow 2:00 PM', value: 'tom-2pm' },
  { label: 'Monday 10:00 AM', value: 'mon-10am' },
  { label: 'Monday 3:00 PM', value: 'mon-3pm' },
];

export const ComposeEmailCard: FC<ComposeEmailCardProps> = ({
  data,
  onSend,
  onClose,
}) => {
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPos, setToolbarPos] = useState({ x: 0, y: 0 });
  const [activePopover, setActivePopover] = useState<ActivePopover>(null);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [linkInserted, setLinkInserted] = useState(false);
  const [scheduledTime, setScheduledTime] = useState<string | null>(null);
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [fromOpen, setFromOpen] = useState(false);
  const [selectedFrom, setSelectedFrom] = useState(data.from);
  const [safeX, setSafeX] = useState(0);

  const bodyRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const fromRef = useRef<HTMLDivElement>(null);

  const springConfig = {
    type: 'spring',
    stiffness: 450,
    damping: 32,
    mass: 1,
  } as const;
  const popoverAnim = {
    initial: { opacity: 0, y: 8, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 8, scale: 0.96 },
    transition: { type: 'spring' as const, damping: 22, stiffness: 300 },
  } as const;

  const handleSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0 && bodyRef.current) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const parentRect = bodyRef.current.getBoundingClientRect();
      setToolbarPos({
        x: rect.left + rect.width / 2 - parentRect.left,
        y: rect.top - parentRect.top - 60,
      });
      setShowToolbar(true);
    } else {
      setShowToolbar(false);
    }
  };

  const getSafeToolbarX = (rawX: number) => {
    if (!toolbarRef.current || !bodyRef.current) return rawX;
    const toolbarWidth = toolbarRef.current.offsetWidth;
    const containerWidth = bodyRef.current.offsetWidth;
    const padding = 12;
    const minX = padding;
    const maxX = containerWidth - toolbarWidth - padding;
    return Math.min(Math.max(rawX - toolbarWidth / 2, minX), maxX);
  };

  useLayoutEffect(() => {
    if (showToolbar) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSafeX(getSafeToolbarX(toolbarPos.x));
    }
  }, [toolbarPos, showToolbar]);

  const togglePopover = (name: ActivePopover) => {
    setActivePopover((prev) => (prev === name ? null : name));
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setActivePopover(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const insertEmoji = (emoji: string) => {
    if (bodyRef.current) {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        if (bodyRef.current.contains(range.commonAncestorContainer)) {
          range.deleteContents();
          range.insertNode(document.createTextNode(emoji));
          range.collapse(false);
          sel.removeAllRanges();
          sel.addRange(range);
          return;
        }
      }
      bodyRef.current.innerText += emoji;
    }
    setActivePopover(null);
  };

  const insertLink = () => {
    if (!linkUrl) return;
    const display = linkText || linkUrl;
    if (bodyRef.current) {
      const a = document.createElement('a');
      a.href = linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`;
      a.textContent = display;
      a.className = 'text-primary underline underline-offset-2';
      bodyRef.current.appendChild(document.createTextNode(' '));
      bodyRef.current.appendChild(a);
      bodyRef.current.appendChild(document.createTextNode(' '));
    }
    setLinkInserted(true);
    setTimeout(() => {
      setLinkInserted(false);
      setLinkUrl('');
      setLinkText('');
      setActivePopover(null);
    }, 1000);
  };

  const insertAISuggestion = (text: string) => {
    if (bodyRef.current) {
      bodyRef.current.innerText =
        (bodyRef.current.innerText || '').trimEnd() + '\n\n' + text;
    }
    setActivePopover(null);
  };

  const handleSchedule = (label: string) => {
    setScheduledTime(label);
    setActivePopover(null);
  };

  const handleFakeAttach = () => {
    const names = [
      'proposal.pdf',
      'design-v2.png',
      'notes.docx',
      'report.xlsx',
    ];
    const random = names[Math.floor(Math.random() * names.length)];
    if (!attachedFiles.includes(random))
      setAttachedFiles((p) => [...p, random]);
    setActivePopover(null);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (fromRef.current && !fromRef.current.contains(e.target as Node))
        setFromOpen(false);
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node))
        setActivePopover(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ...springConfig, damping: 38 }}
      className="bg-card border-border text-foreground theme-injected z-10 flex max-h-screen w-full flex-col overflow-hidden rounded-4xl border antialiased shadow-lg sm:rounded-3xl lg:max-w-145"
    >
      {/* Header */}
      <div className="bg-card flex flex-none items-center justify-between py-3 pr-3 pl-4 sm:py-4 sm:pr-4 sm:pl-5">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg sm:h-10 sm:w-10 sm:rounded-xl">
            <Mail size={18} className="sm:w-5" strokeWidth={1.5} />
          </div>
          <span className="text-foreground text-sm font-semibold tracking-tight sm:text-base">
            Compose email
          </span>
        </div>
        <div className="flex items-center gap-0.5">
          <button
            title="minimize"
            className="text-muted-foreground hover:text-foreground/70 rounded-lg p-1.5 transition-colors sm:p-2"
          >
            <Minus size={16} />
          </button>
          <button
            title="Maximize"
            className="text-muted-foreground hover:text-foreground/70 hidden rounded-lg p-2 transition-colors sm:block"
          >
            <Maximize2 size={15} />
          </button>
          <button
            title="close"
            onClick={onClose}
            className="hover:text-foreground/70 text-muted-foreground rounded-lg p-1.5 transition-colors sm:p-2"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Scrollable Body */}
      <div className="custom-scrollbar bg-background border-border flex-1 overflow-y-auto rounded-2xl border sm:rounded-4xl">
        <div className="space-y-2 px-4 pt-4 pb-2 sm:px-8 sm:pt-6">
          {/* From */}
          <div className="flex items-center text-sm">
            <span className="text-muted-foreground w-12 sm:w-14">From</span>
            <div ref={fromRef} className="relative">
              <button
                onClick={() => setFromOpen((v) => !v)}
                className="bg-card border-border hover:border-ring flex max-w-52 cursor-pointer items-center gap-2 rounded-full border px-2 py-0.5 shadow-sm transition-all sm:max-w-none sm:px-2.5 sm:py-1"
              >
                <img
                  src={selectedFrom.avatar}
                  alt=""
                  className="h-4 w-4 shrink-0 rounded-full object-cover sm:h-5 sm:w-5"
                />
                <span className="text-foreground truncate font-medium">
                  {selectedFrom.name}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-muted-foreground shrink-0 transition-transform ${fromOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {fromOpen && (
                  <motion.div
                    {...popoverAnim}
                    className="bg-popover border-border absolute top-full left-0 z-50 mt-2 w-52 overflow-hidden rounded-2xl border py-1.5 shadow-2xl"
                  >
                    <p className="text-muted-foreground px-4 pt-1.5 pb-1 text-[10px] font-semibold tracking-wider uppercase">
                      Switch account
                    </p>
                    {[
                      {
                        id: data.from.id,
                        name: data.from.name,
                        email: data.from.email ?? 'me@example.com',
                        avatar: data.from.avatar,
                      },
                      {
                        id: 'work',
                        name: 'Work',
                        email: 'work@company.com',
                        avatar: data.from.avatar,
                      },
                      {
                        id: 'personal',
                        name: 'Personal',
                        email: 'personal@gmail.com',
                        avatar: data.from.avatar,
                      },
                    ].map((acc) => (
                      <button
                        key={acc.email}
                        onClick={() => {
                          setSelectedFrom(acc);
                          setFromOpen(false);
                        }}
                        className={`hover:bg-accent flex w-full items-center gap-2.5 px-4 py-2.5 text-left transition-colors ${selectedFrom.name === acc.name ? 'text-primary' : 'text-foreground'}`}
                      >
                        <img
                          src={acc.avatar}
                          alt=""
                          className="h-5 w-5 shrink-0 rounded-full object-cover"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-xs font-medium">
                            {acc.name}
                          </p>
                          <p className="text-muted-foreground truncate text-[10px]">
                            {acc.email}
                          </p>
                        </div>
                        {selectedFrom.name === acc.name && (
                          <Check size={13} className="ml-auto shrink-0" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* To */}
          <div className="border-border flex items-start border-b py-2 text-sm">
            <span className="text-muted-foreground mt-2 w-12 sm:w-14">To</span>
            <div className="flex flex-1 flex-wrap gap-1.5 sm:gap-2">
              {data.to.map((recipient) => (
                <div
                  key={recipient.id}
                  className="bg-card border-border flex items-center gap-1.5 rounded-full border px-2 py-0.5 shadow-sm sm:gap-2 sm:px-2.5 sm:py-1"
                >
                  <img
                    src={recipient.avatar}
                    alt=""
                    className="h-4 w-4 rounded-full object-cover sm:h-5 sm:w-5"
                  />
                  <span className="text-foreground font-medium">
                    {recipient.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="text-muted-foreground mt-2.5 ml-2 flex gap-2 text-xs font-medium sm:ml-4 sm:gap-3">
              <button className="hover:text-primary transition-colors">
                CC
              </button>
              <button className="hover:text-primary transition-colors">
                BCC
              </button>
            </div>
          </div>

          {/* Subject */}
          <div className="border-border flex items-center gap-2 border-b py-2 sm:gap-4">
            <span className="text-muted-foreground w-12 text-sm sm:w-14">
              Subject
            </span>
            <input
              title="subject"
              type="text"
              defaultValue={data.subject}
              className="text-foreground flex-1 bg-transparent text-sm font-medium outline-none sm:text-base"
            />
          </div>
        </div>

        {/* Editor Area */}
        <div className="relative min-h-40 px-4 py-2 sm:min-h-52 sm:px-8">
          <AnimatePresence>
            {showToolbar && (
              <motion.div
                ref={toolbarRef}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  left: safeX,
                }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={springConfig}
                className="bg-popover border-border absolute z-50 flex origin-bottom scale-90 items-center gap-1 rounded-xl border p-1 shadow-xl sm:scale-100"
                style={{ top: toolbarPos.y }}
              >
                <button className="bg-secondary hover:bg-accent flex items-center gap-2 rounded-xl px-2 py-1.5 whitespace-nowrap transition-colors sm:px-3">
                  <Sparkles size={14} className="text-primary" />
                  <span className="text-foreground text-xs font-semibold sm:text-sm">
                    Ask AI
                  </span>
                </button>
                <div className="bg-border mx-1 h-4 w-px" />
                <button
                  title="bold"
                  className="hover:bg-accent text-muted-foreground rounded-lg p-1.5 sm:p-2"
                >
                  <Bold size={14} />
                </button>
                <button
                  title="italic"
                  className="hover:bg-accent text-muted-foreground rounded-lg p-1.5 sm:p-2"
                >
                  <Italic size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            ref={bodyRef}
            contentEditable
            onMouseUp={handleSelection}
            onKeyUp={handleSelection}
            className="text-foreground min-h-40 text-sm leading-relaxed whitespace-pre-wrap outline-none sm:text-base"
            dangerouslySetInnerHTML={{ __html: data.body }}
          />

          {/* Attachments */}
          <div className="mt-6 pb-4 sm:mt-8">
            <h4 className="text-muted-foreground mb-3 text-xs font-medium tracking-widest capitalize sm:mb-4">
              Attachments
            </h4>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {data.attachments.map((file) => (
                <motion.div
                  key={file.id}
                  whileHover={{ y: -2 }}
                  className="group bg-card border-border hover:border-primary/30 flex cursor-pointer items-center gap-3 rounded-2xl border p-2 transition-all sm:rounded-xl"
                >
                  <div className="bg-muted/40 text-muted-foreground group-hover:bg-accent group-hover:text-primary flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold transition-colors sm:h-11 sm:w-11">
                    {file.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground truncate text-sm font-bold">
                      {file.name}
                    </p>
                    <p className="text-muted-foreground text-xs font-normal uppercase">
                      {file.type} · {file.size}
                    </p>
                  </div>
                </motion.div>
              ))}
              {attachedFiles.map((fname) => (
                <motion.div
                  key={fname}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -2 }}
                  className="group bg-card border-primary/20 hover:border-primary/40 flex cursor-pointer items-center gap-3 rounded-2xl border p-2 transition-all sm:rounded-xl"
                >
                  <div className="bg-accent text-primary flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold sm:h-11 sm:w-11">
                    {fname.split('.').pop()?.toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground truncate text-sm font-bold">
                      {fname}
                    </p>
                    <p className="text-primary text-xs font-normal">
                      Just added
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setAttachedFiles((p) => p.filter((f) => f !== fname))
                    }
                    className="hover:bg-accent text-muted-foreground rounded-full p-1 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-border bg-card flex flex-none flex-col justify-between gap-4 px-4 py-3 sm:flex-row sm:items-center sm:px-6 sm:py-4">
        <div
          ref={popoverRef}
          className="text-muted-foreground relative flex items-center gap-0.5 sm:gap-1"
        >
          {/* More */}
          <div className="relative">
            <button
              title="more"
              onClick={() => togglePopover('more')}
              className="hover:text-foreground rounded-lg p-2 transition-all"
            >
              <MoreHorizontal size={18} />
            </button>
            <AnimatePresence>
              {activePopover === 'more' && (
                <motion.div
                  {...popoverAnim}
                  className="bg-popover border-border absolute bottom-full left-0 z-50 mb-2 w-48 overflow-hidden rounded-2xl border py-1.5 shadow-2xl"
                >
                  {[
                    { label: 'Discard draft', danger: true },
                    { label: 'Print', danger: false },
                    { label: 'Save as template', danger: false },
                    { label: 'Spell check', danger: false },
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => setActivePopover(null)}
                      className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                        opt.danger
                          ? 'text-red-500 hover:bg-red-500/10'
                          : 'text-foreground hover:bg-accent'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Emoji */}
          <div className="relative">
            <button
              title="emoji"
              onClick={() => togglePopover('emoji')}
              className="hover:text-foreground rounded-lg p-2 transition-all"
            >
              <Smile size={18} />
            </button>
            <AnimatePresence>
              {activePopover === 'emoji' && (
                <motion.div
                  {...popoverAnim}
                  className="bg-popover border-border absolute bottom-full left-0 z-50 mb-2 w-52 rounded-2xl border p-3 shadow-2xl"
                >
                  <p className="text-muted-foreground mb-2 text-[11px] font-semibold tracking-wider uppercase">
                    Emoji
                  </p>
                  <div className="grid grid-cols-5 gap-1">
                    {EMOJIS.map((e) => (
                      <button
                        key={e}
                        onClick={() => insertEmoji(e)}
                        className="hover:bg-accent rounded-lg p-1 text-xl transition-colors"
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Attach */}
          <div className="relative">
            <button
              title="attach"
              onClick={() => togglePopover('attach')}
              className="hover:text-foreground rounded-lg p-2 transition-all"
            >
              <Paperclip size={18} />
            </button>
            <AnimatePresence>
              {activePopover === 'attach' && (
                <motion.div
                  {...popoverAnim}
                  className="bg-popover border-border absolute bottom-full left-0 z-50 mb-2 w-52 -translate-x-6 rounded-2xl border p-4 shadow-2xl sm:w-56 sm:translate-x-0"
                >
                  <p className="text-muted-foreground mb-3 text-[11px] font-semibold tracking-wider uppercase">
                    Attach File
                  </p>
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDraggingOver(true);
                    }}
                    onDragLeave={() => setIsDraggingOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDraggingOver(false);
                      handleFakeAttach();
                    }}
                    onClick={handleFakeAttach}
                    className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed p-4 transition-all ${isDraggingOver ? 'border-primary bg-accent' : 'border-border hover:border-primary/50 hover:bg-accent/50'}`}
                  >
                    <Upload size={20} className="text-muted-foreground" />
                    <p className="text-muted-foreground text-center text-xs">
                      Click or drag files here
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Link */}
          <div className="relative">
            <button
              title="link"
              onClick={() => togglePopover('link')}
              className="hover:text-foreground rounded-lg p-2 transition-all"
            >
              <Link2 size={18} />
            </button>
            <AnimatePresence>
              {activePopover === 'link' && (
                <motion.div
                  {...popoverAnim}
                  className="bg-popover border-border absolute bottom-full left-0 z-50 mb-2 w-56 -translate-x-16 rounded-2xl border p-4 shadow-2xl sm:w-64 sm:translate-x-0"
                >
                  <p className="text-muted-foreground mb-3 text-[11px] font-semibold tracking-wider uppercase">
                    Insert Link
                  </p>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="URL (e.g. https://...)"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      className="bg-background border-border focus:border-primary text-foreground placeholder:text-muted-foreground w-full rounded-lg border px-3 py-2 text-sm transition-colors outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Display text (optional)"
                      value={linkText}
                      onChange={(e) => setLinkText(e.target.value)}
                      className="bg-background border-border focus:border-primary text-foreground placeholder:text-muted-foreground w-full rounded-lg border px-3 py-2 text-sm transition-colors outline-none"
                    />
                    <button
                      onClick={insertLink}
                      disabled={!linkUrl}
                      className="bg-primary text-primary-foreground flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {linkInserted ? (
                        <>
                          <Check size={14} /> Inserted!
                        </>
                      ) : (
                        'Insert Link'
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* AI */}
          <div className="relative">
            <button
              title="ai"
              onClick={() => togglePopover('ai')}
              className="hover:text-primary rounded-lg p-2 transition-all"
            >
              <Sparkles size={18} />
            </button>
            <AnimatePresence>
              {activePopover === 'ai' && (
                <motion.div
                  {...popoverAnim}
                  className="bg-popover border-border absolute bottom-full left-0 z-50 mb-2 w-56 -translate-x-24 rounded-2xl border p-4 shadow-2xl sm:w-72 sm:translate-x-0"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <Sparkles size={14} className="text-primary" />
                    <p className="text-muted-foreground text-[11px] font-semibold tracking-wider uppercase">
                      AI Suggestions
                    </p>
                  </div>
                  <div className="space-y-2">
                    {AI_SUGGESTIONS.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => insertAISuggestion(s)}
                        className="text-foreground bg-muted/40 hover:bg-accent hover:text-primary w-full rounded-xl px-3 py-2.5 text-left text-sm leading-relaxed transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="bg-border mx-2 hidden h-5 w-px sm:block" />
        </div>

        {/* Action Buttons */}
        <div className="border-border flex min-w-0 items-center justify-between gap-2 border-t pt-3 sm:justify-end sm:gap-3 sm:border-t-0 sm:pt-0">
          <span className="text-muted-foreground max-w-[140px] min-w-0 truncate text-xs font-medium sm:max-w-[180px]">
            {scheduledTime ? `📅 ${scheduledTime}` : 'Draft saved'}
          </span>
          <div className="flex flex-shrink-0 items-center gap-2">
            {/* Schedule */}
            <div className="relative">
              <button
                onClick={() => togglePopover('schedule')}
                className={`flex items-center justify-center gap-1.5 rounded-full border px-2.5 py-1.5 text-sm font-normal transition-all ${scheduledTime ? 'border-primary/40 text-primary bg-accent' : 'border-border text-muted-foreground hover:bg-accent'}`}
              >
                <Calendar size={15} strokeWidth={2.5} />
                {!scheduledTime && (
                  <span className="hidden sm:inline">Schedule</span>
                )}
              </button>
              <AnimatePresence>
                {activePopover === 'schedule' && (
                  <motion.div
                    {...popoverAnim}
                    className="bg-popover border-border absolute right-0 bottom-full z-50 mb-2 w-56 rounded-2xl border p-4 shadow-2xl"
                  >
                    <p className="text-muted-foreground mb-3 text-[11px] font-semibold tracking-wider uppercase">
                      Schedule Send
                    </p>
                    <div className="space-y-1.5">
                      {SCHEDULE_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleSchedule(opt.label)}
                          className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${scheduledTime === opt.label ? 'bg-accent text-primary' : 'text-foreground hover:bg-accent/50'}`}
                        >
                          {opt.label}
                          {scheduledTime === opt.label && <Check size={14} />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSend?.(data)}
              className="bg-primary text-primary-foreground flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap shadow-md transition-all hover:opacity-90 sm:px-5 sm:py-2"
            >
              <LuSend size={14} /> {scheduledTime ? 'Confirm' : 'Send'}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ComposeEmailCard;