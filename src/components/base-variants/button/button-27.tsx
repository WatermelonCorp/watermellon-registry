"use client";

import { useState } from "react";

import { FiMenu, FiX } from "react-icons/fi";

import { Button } from "@/components/ui/button";

const Button27 = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsOpen(!isOpen)}
      aria-label="Toggle menu"
    >
      {isOpen ? <FiX className="size-5" /> : <FiMenu className="size-5" />}
    </Button>
  );
};

export default Button27;
