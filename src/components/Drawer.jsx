import React, { useCallback, useEffect, useId, useRef, useState } from "react";

/**
 * Drawer (modal-like) component using Tailwind CSS.
 * - Positions: right | left | top | bottom (default: right)
 * - Sizes: sm | md | lg | xl (side-dependent)
 * - Closes on overlay click and Escape by default
 * - ARIA attributes included; lightweight focus management
 */
export default function Drawer({
  open,
  onClose,
  side = "right",
  size = "md",
  title,
  description,
  children,
  footer,
  closeOnOverlay = true,
  className = "",
}) {
  const panelRef = useRef(null);
  const titleId = useId();
  const descId = useId();

  // Prevent background scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev || "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Focus the panel when opening
  useEffect(() => {
    if (open && panelRef.current) {
      panelRef.current.focus({ preventScroll: true });
    }
  }, [open]);

  const stop = useCallback((e) => e.stopPropagation(), []);

  // Side -> positioning & transform classes
  const sideClasses = {
    right: "inset-y-0 right-0 w-full sm:max-w-sm md:max-w-md",
    left: "inset-y-0 left-0 w-full sm:max-w-sm md:max-w-md",
    top: "inset-x-0 top-0 h-[70vh] sm:h-[60vh]",
    bottom: "inset-x-0 bottom-0 h-[70vh] sm:h-[60vh]",
  }[side];

  // Size tweaks
  const sizeClasses = {
    sm: side === "top" || side === "bottom" ? "sm:h-[45vh]" : "sm:max-w-sm",
    md: side === "top" || side === "bottom" ? "sm:h-[60vh]" : "sm:max-w-md",
    lg: side === "top" || side === "bottom" ? "sm:h-[75vh]" : "sm:max-w-lg",
    xl: side === "top" || side === "bottom" ? "sm:h-[85vh]" : "sm:max-w-xl",
  }[size];

  // Enter/exit transforms
  const translateEnter = {
    right: "translate-x-0",
    left: "-translate-x-0",
    top: "translate-y-0",
    bottom: "-translate-y-0",
  }[side];

  const translateExit = {
    right: "translate-x-full",
    left: "-translate-x-full",
    top: "-translate-y-full",
    bottom: "translate-y-full",
  }[side];

  return (
    <div
      className={`fixed inset-0 z-[100] ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Overlay */}
      <div
        onClick={closeOnOverlay ? onClose : undefined}
        className={`absolute inset-0 transition-opacity duration-300 ${
          open ? "bg-black/50 backdrop-blur-[1.5px] opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        ref={panelRef}
        onClick={stop}
        className={`focus:outline-none fixed ${sideClasses} ${sizeClasses} transition-transform duration-300 ease-out ${
          open ? translateEnter : translateExit
        } ${
          side === "right" || side === "left" ? "h-full" : "w-full"
        } bg-white ring-1 ring-black/5 rounded-none ${
          side === "right"
            ? "rounded-l-2xl"
            : side === "left"
            ? "rounded-r-2xl"
            : side === "top"
            ? "rounded-b-2xl"
            : "rounded-t-2xl"
        } ${className}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-4 border-b border-zinc-200/70 dark:border-zinc-800">
          <div className="min-w-0">
            {title ? (
              <h2 id={titleId} className="text-lg font-semibold truncate">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p
                id={descId}
                className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2"
              >
                {description}
              </p>
            ) : null}
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-xl p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-400"
            aria-label="Close"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-4 overflow-auto max-h-full">{children}</div>

        {/* Footer */}
        {footer ? (
          <div className="p-4 border-t border-zinc-200/70 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
            {footer}
          </div>
        ) : null}
      </section>
    </div>
  );
}

// // --- Demo Usage ---
// export default function DrawerDemo() {
//   const [open, setOpen] = useState(false);
//   const [side, setSide] = useState("right");
//   const [size, setSize] = useState("md");

//   return (
//     <div className="min-h-[60vh] grid place-items-center p-6 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-950 dark:to-black text-zinc-900 dark:text-zinc-100">
//       <div className="w-full max-w-2xl mx-auto">
//         <div className="mb-6 flex flex-wrap items-center gap-3">
//           <select
//             value={side}
//             onChange={(e) => setSide(e.target.value)}
//             className="px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
//           >
//             <option value="right">Right</option>
//             <option value="left">Left</option>
//             <option value="top">Top</option>
//             <option value="bottom">Bottom</option>
//           </select>
//           <select
//             value={size}
//             onChange={(e) => setSize(e.target.value)}
//             className="px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
//           >
//             <option value="sm">Small</option>
//             <option value="md">Medium</option>
//             <option value="lg">Large</option>
//             <option value="xl">XL</option>
//           </select>
//           <button
//             onClick={() => setOpen(true)}
//             className="rounded-2xl px-4 py-2 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow hover:shadow-md transition"
//           >
//             Open Drawer
//           </button>
//         </div>

//         <p className="text-sm text-zinc-600 dark:text-zinc-400">
//           A lightweight, accessible drawer built with Tailwind. Try different
//           sides and sizes, then open it.
//         </p>
//       </div>

//       <Drawer
//         open={open}
//         onClose={() => setOpen(false)}
//         side={side}
//         size={size}
//         title="hello"
//         description="bye"
//         // footer={
//         //   <div className="flex justify-end gap-2">
//         //     <button
//         //       onClick={() => setOpen(false)}
//         //       className="rounded-xl px-3 py-2 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
//         //     >
//         //       Cancel
//         //     </button>
//         //     <button
//         //       onClick={() => setOpen(false)}
//         //       className="rounded-xl px-3 py-2 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow"
//         //     >
//         //       Save
//         //     </button>
//         //   </div>
//         // }
//       >
//         {/* <form className="space-y-4">
//           <div>
//             <label className="block text-sm mb-1">Title</label>
//             <input
//               type="text"
//               className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2"
//               placeholder="Task title"
//             />
//           </div>
//           <div>
//             <label className="block text-sm mb-1">Description</label>
//             <textarea
//               className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2"
//               rows={4}
//               placeholder="What needs to be done?"
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <label className="block text-sm mb-1">Priority</label>
//               <select className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2">
//                 <option>Low</option>
//                 <option>Medium</option>
//                 <option>High</option>
//               </select>
//             </div>
//             <div className="flex items-end">
//               <label className="inline-flex items-center gap-2 text-sm">
//                 <input type="checkbox" className="size-4 rounded border-zinc-300 dark:border-zinc-700" />
//                 Mark urgent
//               </label>
//             </div>
//           </div>
//         </form> */}
//         helloo
//       </Drawer>
//     </div>
//   );
// }
