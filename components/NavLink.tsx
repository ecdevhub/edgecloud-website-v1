"use client";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { triggerLoader } from "./PageLoader";
import React from "react";

type NavLinkProps = LinkProps & {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  [key: string]: unknown;
};

export default function NavLink({ href, children, onClick, ...props }: NavLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const url = href.toString();
    // Don't intercept external links, hash links, or modifier clicks
    const isExternal = url.startsWith("http") || url.startsWith("mailto");
    const isHash = url.startsWith("#");
    const isModified = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;

    if (isExternal || isHash || isModified) {
      onClick?.(e);
      return;
    }

    e.preventDefault();
    triggerLoader();
    onClick?.(e);

    // Small delay so loader appears before navigation starts
    setTimeout(() => router.push(url), 80);
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
