// "use client";

// import { AnimatePresence, motion, useSpring } from "framer-motion";
// import { Play, Plus } from "lucide-react";
// import {
//   MediaControlBar,
//   MediaController,
//   MediaMuteButton,
//   MediaPlayButton,
//   MediaSeekBackwardButton,
//   MediaSeekForwardButton,
//   MediaTimeDisplay,
//   MediaTimeRange,
//   MediaVolumeRange,
// } from "media-chrome/react";
// import type { ComponentProps, ReactNode } from "react";
// import React, { useState } from "react";

// import { cn } from "@/lib/utils";

// /* ------------------------ Base Components ------------------------ */
// export type VideoPlayerProps = ComponentProps<typeof MediaController> & {
//   children?: ReactNode;
// };

// export const VideoPlayer = ({ style, children, ...props }: VideoPlayerProps) => (
//   <MediaController style={{ ...style }} {...props}>
//     {children}
//   </MediaController>
// );

// export type VideoPlayerControlBarProps = ComponentProps<typeof MediaControlBar>;
// export const VideoPlayerControlBar = (props: VideoPlayerControlBarProps) => (
//   <MediaControlBar {...props} />
// );

// export type VideoPlayerTimeRangeProps = ComponentProps<typeof MediaTimeRange>;
// export const VideoPlayerTimeRange = ({ className, ...props }: VideoPlayerTimeRangeProps) => (
//   <MediaTimeRange
//     className={cn("[--media-range-thumb-opacity:0] [--media-range-track-height:2px]", className)}
//     {...props}
//   />
// );

// export type VideoPlayerTimeDisplayProps = ComponentProps<typeof MediaTimeDisplay>;
// export const VideoPlayerTimeDisplay = ({ className, ...props }: VideoPlayerTimeDisplayProps) => (
//   <MediaTimeDisplay className={cn("p-2.5", className)} {...props} />
// );

// export type VideoPlayerVolumeRangeProps = ComponentProps<typeof MediaVolumeRange>;
// export const VideoPlayerVolumeRange = ({ className, ...props }: VideoPlayerVolumeRangeProps) => (
//   <MediaVolumeRange className={cn("p-2.5", className)} {...props} />
// );

// export type VideoPlayerPlayButtonProps = ComponentProps<typeof MediaPlayButton>;
// export const VideoPlayerPlayButton = ({ className, ...props }: VideoPlayerPlayButtonProps) => (
//   <MediaPlayButton className={cn("", className)} {...props} />
// );

// export type VideoPlayerSeekBackwardButtonProps = ComponentProps<typeof MediaSeekBackwardButton>;
// export const VideoPlayerSeekBackwardButton = ({ className, ...props }: VideoPlayerSeekBackwardButtonProps) => (
//   <MediaSeekBackwardButton className={cn("p-2.5", className)} {...props} />
// );

// export type VideoPlayerSeekForwardButtonProps = ComponentProps<typeof MediaSeekForwardButton>;
// export const VideoPlayerSeekForwardButton = ({ className, ...props }: VideoPlayerSeekForwardButtonProps) => (
//   <MediaSeekForwardButton className={cn("p-2.5", className)} {...props} />
// );

// export type VideoPlayerMuteButtonProps = ComponentProps<typeof MediaMuteButton>;
// export const VideoPlayerMuteButton = ({ className, ...props }: VideoPlayerMuteButtonProps) => (
//   <MediaMuteButton className={cn("", className)} {...props} />
// );

// export type VideoPlayerContentProps = ComponentProps<"video">;
// export const VideoPlayerContent = ({ className, ...props }: VideoPlayerContentProps) => (
//   <video className={cn("mb-0 mt-0", className)} {...props} />
// );

// /* ------------------------ Skiper67 Reusable ------------------------ */
// export type VideoPlayer01Props = {
//   videoUrl?: string;
//   previewText?: string;
// };

// export const VideoPlayer01 = ({
//   videoUrl = "https://www.pexels.com/download/video/6933752/",
//   previewText = "Click the video to play",
// }: VideoPlayer01Props) => {
//   const [showVideoPopOver, setShowVideoPopOver] = useState(false);

//   const SPRING = { mass: 0.1 };
//   const x = useSpring(0, SPRING);
//   const y = useSpring(0, SPRING);
//   const opacity = useSpring(0, SPRING);

//   const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
//     opacity.set(1);
//     const bounds = e.currentTarget.getBoundingClientRect();
//     x.set(e.clientX - bounds.left);
//     y.set(e.clientY - bounds.top);
//   };

//   return (
//     <section className="relative flex h-screen w-full items-center justify-center bg-[#f5f4f3]">
//       <div className="absolute top-1/4 grid content-start justify-items-center gap-6 text-center ">
//         <span className="after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']">
//           {previewText}
//         </span>
//       </div>

//       <AnimatePresence>
//         {showVideoPopOver && (
//           <VideoPopOver videoUrl={videoUrl} setShowVideoPopOver={setShowVideoPopOver} />
//         )}
//       </AnimatePresence>

//       <div
//         onMouseMove={handlePointerMove}
//         onMouseLeave={() => opacity.set(0)}
//         onClick={() => setShowVideoPopOver(true)}
//         className="size-45"
//       >
//         <motion.div
//           style={{ x, y, opacity }}
//           className="relative z-20 flex w-fit select-none items-center justify-center gap-2 p-2 text-sm text-white mix-blend-exclusion "
//         >
//           <Play className="size-4 fill-white" /> Play
//         </motion.div>

//         <video autoPlay muted playsInline loop className="h-[30vh] w-[20vw] object-cover">
//           <source src={videoUrl} />
//         </video>
//       </div>
//     </section>
//   );
// };

// /* ------------------------ Video PopOver ------------------------ */
// type VideoPopOverProps = {
//   videoUrl: string;
//   setShowVideoPopOver: (showVideoPopOver: boolean) => void;
// };

// const VideoPopOver = ({ videoUrl, setShowVideoPopOver }: VideoPopOverProps) => {
//   return (
//     <div className="fixed left-0 top-0 z-[101] flex h-full w-screen items-center justify-center bg-[#1F1F1F]">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 0.2 }}
//         className="bg-background/90 absolute left-0 top-0 h-full w-full backdrop-blur-lg"
//         onClick={() => setShowVideoPopOver(false)}
//       ></motion.div>

//       <motion.div
//         initial={{ clipPath: "inset(43.5% 43.5% 33.5% 43.5%)", opacity: 0 }}
//         animate={{ clipPath: "inset(0 0 0 0)", opacity: 1 }}
//         exit={{
//           clipPath: "inset(43.5% 43.5% 33.5% 43.5%)",
//           opacity: 0,
//           transition: { duration: 1, type: "spring", stiffness: 100, damping: 20 },
//         }}
//         transition={{ duration: 1, type: "spring", stiffness: 100, damping: 20 }}
//         className="relative aspect-video max-w-7xl"
//       >
//         <VideoPlayer style={{ width: "70vw", height: "80vh" }}>
//           <VideoPlayerContent
//             src={videoUrl}
//             autoPlay
//             slot="media"
//             className="w-full object-cover"
//             style={{ width: "100%", height: "100%" }}
//           />

//           <span
//             onClick={() => setShowVideoPopOver(false)}
//             className="absolute right-2 top-2 z-10 cursor-pointer rounded-full p-1 transition-colors"
//           >
//             <Plus className="size-5 rotate-45 text-white" />
//           </span>

//           <VideoPlayerControlBar className="absolute bottom-0 left-1/2 flex w-full max-w-7xl -translate-x-1/2 items-center justify-center px-5 mix-blend-exclusion md:px-10 md:py-5">
//             <VideoPlayerPlayButton className="h-4 bg-transparent" />
//             <VideoPlayerTimeRange className="bg-transparent" />
//             <VideoPlayerMuteButton className="size-4 bg-transparent" />
//           </VideoPlayerControlBar>
//         </VideoPlayer>
//       </motion.div>
//     </div>
//   );
// };
