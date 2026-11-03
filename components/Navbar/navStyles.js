// Classes compartilhadas pela navbar, para manter o visual consistente.
export const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900";

export const navLink = `inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 ${focusRing}`;

export const dropdownLink = `block rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 ${focusRing}`;
