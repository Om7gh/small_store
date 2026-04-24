"use client";
export default function CodAnimation() {
  const labels = Array.from({ length: 8 }, () => "Cash on Delivery");

  return (
    <section className="w-full overflow-hidden rounded-xl border border-accent/30 bg-linear-to-r from-accent/10 via-accent/5 to-accent/10 py-2">
      <div className="relative w-full overflow-hidden">
        <div className="cod-track flex w-max items-center gap-4 whitespace-nowrap px-4">
          {labels.concat(labels).map((label, index) => (
            <div
              key={`${label}-${index}`}
              className="inline-flex items-center gap-3 rounded-full border border-accent/35 bg-background/70 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-accent uppercase"
            >
              <span className="block h-2 w-2 rounded-full bg-accent" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .cod-track {
          animation: cod-marquee 20s linear infinite;
        }

        @keyframes cod-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
