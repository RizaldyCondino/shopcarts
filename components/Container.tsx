import { cn } from "@/lib/utils";
import React from "react";

function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
<<<<<<< HEAD
  return <div className={cn("max-w-screen-xl mx-auto px-4", className)}>{children}</div>;
}
export default Container; 
=======
  return (
    <div className={cn("max-w-screen-xl mx-auto px-4", className)}>
      {children}
    </div>
  );
}
export default Container;
>>>>>>> 7558155 (Hot Deals Done)
