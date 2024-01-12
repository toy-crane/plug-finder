import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  trail: { title: string; link: string }[];
}

const BreadcrumbNavigation = ({ trail }: Props) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center gap-1">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={index} className="flex items-center gap-1">
              <Button
                variant="link"
                className="px-0 py-2 text-lg font-normal"
                size="lg"
              >
                <Link
                  href={crumb.link}
                  className={cn(isLast && "font-semibold underline")}
                >
                  {crumb.title}
                </Link>
              </Button>
              {index < trail.length - 1 && <ChevronRight className="w-5 h-5" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;
