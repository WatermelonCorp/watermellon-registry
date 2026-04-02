"use client";

import { useState } from "react";

import { FiBookmark } from "react-icons/fi";
import { FaBookmark } from "react-icons/fa";

import { Button } from "@/components/ui/button";

const Button29 = () => {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setBookmarked(!bookmarked)}
    >
      {bookmarked ? (
        <FaBookmark className="size-5 text-blue-600" />
      ) : (
        <FiBookmark className="size-5" />
      )}
      <span className="sr-only">Bookmark</span>
    </Button>
  );
};

export default Button29;
