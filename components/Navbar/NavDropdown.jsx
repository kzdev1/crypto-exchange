"use client";

import { useRef } from "react";
import Link from "next/link";
import { navLink, dropdownLink } from "./navStyles";

export default function NavDropdown({ item, isOpen, onToggle, onClose }) {
  const buttonRef = useRef(null);
  const panelId = `menu-${item.id}`;

  function handleKeyDown(event) {
    if (event.key === "Escape" && isOpen) {
      onClose();
      buttonRef.current?.focus();
    }
  }

  return (
    <li className="relative" onKeyDown={handleKeyDown}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className={navLink}
      >
        {item.label}
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-4 w-4 transition-transform motion-reduce:transition-none ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path d="M5.5 7.5 10 12l4.5-4.5-1-1L10 10 6.5 6.5z" />
        </svg>
      </button>

      {isOpen && (
        <ul
          id={panelId}
          className="absolute left-0 top-full z-40 mt-2 min-w-56 rounded-md border border-neutral-200 bg-white p-2 shadow-sm"
        >
          {item.links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={onClose} className={dropdownLink}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
