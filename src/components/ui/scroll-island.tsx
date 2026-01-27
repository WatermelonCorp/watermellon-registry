"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

/*  TYPES  */

export interface Topic {
  id: string;
  title: string;
  content: string;
}

interface ScrollIslandProps {
  topics?: Topic[];
}

/*  DEFAULT TOPICS  */

const DEFAULT_TOPICS: Topic[] =[
  {
    id: "a",
    title: "What is Interaction Design",
    content:
      "Interaction design focuses on crafting meaningful relationships between users and digital products. It emphasizes creating interfaces that are not only visually appealing but also highly functional and easy to use. The discipline revolves around designing intuitive touchpoints where users interact with a product, such as buttons, gestures, and other inputs. Core principles include usability, feedback mechanisms, and accessibility, all of which contribute to a seamless user journey. By anticipating user needs and behaviors, interaction design aims to reduce friction and make digital experiences enjoyable, empowering users to achieve their goals effortlessly.",
  },
  {
    id: "b",
    title: "Enhance User Experiences",
    content:
      "Enhancing user experience (UX) is about designing every aspect of a product to meet users' needs effectively and delightfully. It goes beyond aesthetics to include usability, functionality, and emotional resonance. A great UX ensures that the interface is intuitive, the navigation is seamless, and the user’s journey is smooth. This involves optimizing load times, ensuring mobile responsiveness, and creating clear information hierarchies. Designers use tools like user research, wireframing, and usability testing to identify pain points and opportunities for improvement. Ultimately, enhancing UX builds trust, fosters loyalty, and creates lasting impressions that encourage users to return.",
  },
  {
    id: "c",
    title: "Feedback and responsiveness",
    content:
      "Feedback and responsiveness are vital to creating an engaging and interactive user experience. Feedback ensures that users receive clear, immediate confirmation of their actions, whether through visual cues like button animations, auditory notifications, or haptic feedback. For example, progress indicators during loading or error messages for invalid inputs provide valuable context and guide user behavior. Responsiveness complements feedback by ensuring that the system reacts quickly and accurately to user input. Together, they enhance the sense of control and reliability, making the interaction feel smooth and intuitive. A responsive and feedback-rich design not only improves usability but also boosts user confidence and satisfaction.",
  },
  {
    id: "d",
    title: "Reducing Cognitive Load",
    content:
      "Cognitive load refers to the amount of mental effort required to process information and make decisions. Effective design reduces cognitive load by presenting information clearly and minimizing unnecessary complexity. Techniques include using consistent patterns, grouping related elements, and employing familiar icons and terminology. Clear calls-to-action and concise messaging guide users through tasks without overwhelming them. Visual hierarchy, such as bold headings and strategically placed whitespace, helps users focus on what’s important. By reducing cognitive load, designers make interfaces more accessible, enabling users to complete tasks faster and with less effort, ultimately improving user satisfaction and retention.",
  },
  {
    id: "e",
    title: "Consistance in Design",
    content:
      "Consistency is a cornerstone of effective design, ensuring that users experience a cohesive and predictable interface. It involves using uniform colors, typography, layouts, and interaction patterns across an application or website. For example, a 'Save' button should look and behave the same way on every page, creating familiarity and reducing the learning curve. Consistency not only helps users feel confident navigating an interface but also reinforces brand identity by maintaining a recognizable visual style. It extends to tone of voice in content, interaction feedback, and even motion design, ensuring that all elements work harmoniously to create a unified user experience.",
  },
  {
    id: "f",
    title: "The role of Motion Design",
    content:
      "Motion design brings static interfaces to life, using animation and transitions to enhance usability and engagement. It serves as a guide, drawing attention to important elements like buttons or form fields. Subtle animations can indicate a successful action, such as a checkmark appearing after form submission, or provide visual feedback, like a button press effect. Motion also helps improve the flow between pages, reducing perceived load times with loading spinners or skeleton screens. When used thoughtfully, motion design adds personality and reinforces the product’s brand identity, creating a dynamic experience that feels intuitive and polished. However, excessive motion can be distracting, so it’s crucial to strike a balance.",
  },
];

/*  COMPONENT  */

export  function ScrollIsland({
  topics = DEFAULT_TOPICS,
}: ScrollIslandProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const totalHeight =
          containerRef.current.scrollHeight - window.innerHeight;
        const progress = Math.min((window.scrollY / totalHeight) * 100, 100);
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTopicClick = (id: string) => {
    setActiveTopicId(id);
    setTimeout(() => setActiveTopicId(null), 1800);
    setIsOpen(false);
  };

  return (
    <div
      className="relative min-h-screen mt-20 p-6 sm:p-8 px-4 sm:px-8 md:px-20 lg:px-40 xl:px-72 2xl:px-96"
      ref={containerRef}
    >
      <div className="container">
        {topics.map((topic) => (
          <div
            key={topic.id}
            id={topic.id}
            className={`topic mb-12 ${
              activeTopicId === topic.id ? "animate-flash" : ""
            }`}
          >
            <h4 className="text-2xl font-bold mb-4">{topic.title}</h4>
            <p className="text-[#5D5D63] font-medium text-base mb-4">
              {topic.content}
            </p>
          </div>
        ))}
      </div>

      {/* Floating Island Navigation */}
      <motion.div
        className="fixed z-10 left-1/2 top-[4%] bg-[#000002] rounded-[38px] shadow-lg flex flex-col items-center justify-center p-4"
        style={{ x: "-50%", y: "-7%" }}
        animate={{
          height: isOpen ? 280 : 50,
          width: isOpen ? 400 : 210,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="w-full flex justify-between items-center gap-6 h-[18px]">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <motion.div
              className="w-[30px] h-[30px] rounded-full mr-2 flex items-center justify-center"
              style={{
                background: `conic-gradient(white ${scrollProgress}%, transparent 0), #87868D`,
              }}
            >
              <div className="w-5 h-5 bg-[#000002] rounded-full" />
            </motion.div>

            <span className="text-white font-semibold ml-1.5">Index</span>

            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown
                size={20}
                strokeWidth={2.5}
                className="text-[#FFFFFF]"
              />
            </motion.div>
          </div>

          <div className="bg-[#515158] text-[#fefefe] font-bold text-sm h-8 w-16 flex items-center justify-center rounded-2xl">
            {scrollProgress.toFixed(0)}%
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="links flex flex-col space-y-2 mt-4 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {topics.map((topic) => (
                <a
                  key={topic.id}
                  href={`#${topic.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById(topic.id)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    handleTopicClick(topic.id);
                  }}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {topic.title}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm z-[5]"
          onClick={() => setIsOpen(false)}
        />
      )}
{/* eslint-disable-next-line */}
      <style>{`
        @keyframes flash {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }
        .animate-flash {
          animation: flash 0.45s ease 4;
        }
      `}</style>
    </div>
  );
}
