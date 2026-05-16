import Image from "next/image";

export function DecorativeBackground({ variant = "both" }: { variant?: "both" | "left" | "right" }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {(variant === "both" || variant === "left") && (
        <Image
          src="/images/bg-editorial-1.png"
          alt=""
          width={1200}
          height={600}
          className="absolute -left-[10%] top-[15%] w-[min(90vw,720px)] opacity-[0.07]"
        />
      )}
      {(variant === "both" || variant === "right") && (
        <Image
          src="/images/bg-editorial-2.png"
          alt=""
          width={1400}
          height={500}
          className="absolute -right-[5%] bottom-[8%] w-[min(95vw,800px)] opacity-[0.06]"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
    </div>
  );
}
