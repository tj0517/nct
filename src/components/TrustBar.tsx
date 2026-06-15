const items = ["Oxford-founded", "Native speakers", "Warsaw & online since 2012"];

export default function TrustBar() {
  return (
    <div className="flex items-center justify-center w-full border-y-2 border-accent py-4 gap-[10px]">
      {items.map((item, i) => (
        <div
          key={item}
          data-trust-item
          className={`flex-1 flex items-center justify-center ${
            i < items.length - 1 ? "border-r border-accent" : ""
          }`}
        >
          <p className="font-fraunces font-normal text-2xl text-main text-center w-full">
            {item}
          </p>
        </div>
      ))}
    </div>
  );
}
