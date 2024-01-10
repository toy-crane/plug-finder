import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

interface Props {
  trail: { title: string; link: string }[];
}

const BreadcrumbNavigation = ({ trail }: Props) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center gap-1">
        {trail.map((crumb, index) => (
          <li key={index} className="flex items-center gap-1">
            <Button
              variant="link"
              className="px-0 py-2 font-medium text-lg"
              size="lg"
            >
              <Link href={crumb.link}>{crumb.title}</Link>
            </Button>
            {index < trail.length - 1 && <ChevronRight className="w-5 h-5" />}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;
