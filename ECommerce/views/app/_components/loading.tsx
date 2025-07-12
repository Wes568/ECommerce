import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center mt-20 justify-center">
      <Loader2 className="h-[50px] w-[50px] animate-spin" />
    </div>
  );
};

export default Loading;
