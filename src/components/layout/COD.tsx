import { PackageCheck, ShoppingBasket, TruckElectric } from "lucide-react";

const codSteps = [
  {
    id: "01",
    title: "Choose your items",
    description: "Add products to your cart and review your quantities.",
    icon: ShoppingBasket,
  },
  {
    id: "02",
    title: "Confirm your order",
    description: "Submit your address and place the order in one click.",
    icon: PackageCheck,
  },
  {
    id: "03",
    title: "Receive and pay",
    description: "Pay cash to the courier when your package arrives.",
    icon: TruckElectric,
  },
];

export default function COD() {
  return (
    <section className="relative mt-10 overflow-hidden  bg-text/2 p-4 shadow-lg sm:p-6 lg:p-8">
      <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-primary/20 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-3 sm:gap-4">
          <p className="inline-flex w-fit items-center gap-2  bg-accent/10 px-3 py-1 text-xs font-semibold uppercase text-accent">
            Payment Method
          </p>
          <h2 className="max-w-2xl text-2xl font-semibold  text-text sm:text-3xl lg:text-4xl">
            Cash on Delivery
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-text/80 sm:text-base">
            You selected Cash on Delivery. Prepare the exact amount and pay the
            courier when your order arrives.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-5 lg:mt-10 lg:grid-cols-3">
          {codSteps.map((step) => {
            const Icon = step.icon;
            return (
              <article
                key={step.id}
                className="group relative flex flex-col justify-between  bg-background/70 p-5 transition-colors duration-200 hover:-accent/50 "
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-text">
                    {step.title}
                  </h3>
                  <div className="grid h-11 w-11 place-items-center  bg-accent/10 text-accent transition-colors duration-200 group-hover:bg-accent/20">
                    <Icon size={22} />
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-text/75">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
