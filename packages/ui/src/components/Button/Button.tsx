"use client";

type ButtonProps = Readonly<{
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}>;

export function Button({
  children,
  variant = "primary",
}: ButtonProps) {
  const rootClassName =
    variant === "primary"
      ? "cursor-pointer rounded-xl bg-blue-600 px-4 py-2"
      : "cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-2";

  const textClassName = variant === "primary" ? "text-white" : "text-gray-900";

  return (
    <button
      className={rootClassName}
      type="button"
    >
      <span className={textClassName}>
        {children}
      </span>
    </button>
  );
}
