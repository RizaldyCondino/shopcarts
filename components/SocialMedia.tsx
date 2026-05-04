import React from "react";
import {
  FaYoutube,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaSlack,
} from "react-icons/fa";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import Link from "next/link";
import { cn } from "@/lib/utils";
interface Props {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

const socialLink = [
  {
    title: "YouTube",
    href: "#",
    icon: <FaYoutube className="w-5 h-5" />,
  },
  {
    title: "GitHub",
    href: "#",
    icon: <FaGithub className="w-5 h-5" />,
  },
  {
    title: "LinkedIn",
    href: "#",
    icon: <FaLinkedin className="w-5 h-5" />,
  },
  {
    title: "Facebook",
    href: "#",
    icon: <FaFacebook className="w-5 h-5" />,
  },
  {
    title: "Slack",
    href: "#",
    icon: <FaSlack className="w-5 h-5" />,
  },
];

const SocialMedia = ({ className, iconClassName, tooltipClassName }: Props) => {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-3.5", className)}>
        {socialLink.map((item) => (
          <Tooltip key={item?.title}>
            <TooltipTrigger asChild>
              <Link
                key={item?.title}
                target="_blank"
                rel = "noopener noreferrer"
                href={item?.href}
                className={cn("p-2 border rounded-full hover:text-white hover:border-shop_light_green hoverEffect",iconClassName)}
              >
                {item?.icon}
              </Link>
            </TooltipTrigger>
            <TooltipContent className={cn("bg-white text-darkColor font-semibold", tooltipClassName)}>
              {item?.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SocialMedia;
