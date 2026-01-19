/* ================= DESKTOP META ITEM ================= */

export const MetaItem = ({ title, main, sub, icon: Icon }) => (
  <div className="flex flex-col items-start">
    <Icon size={24} />
    <p className="text-[0.75em] font-jakarta text-[rgba(60,60,60,0.60)] mt-2">
      {title}
    </p>
    <p className="text-[#2C2C2C] font-jakarta font-[600]">{main}</p>
    <span className="text-[rgba(44,44,44,0.55)] text-[0.75em] font-jakarta">
      {sub}
    </span>
  </div>
);

/* ================= MOBILE META ITEM ================= */

export const MobileItem = ({ title, main, sub, icon: Icon }) => (
  <div className="p-[0.8em] border border-black/10">
    <div className="flex gap-[0.31em] items-center">
      <Icon size={16} />
      <p className="text-[0.875em] font-jakarta text-[rgba(44,44,44,0.60)]">
        {title}
      </p>
    </div>
    <p className="font-jakarta font-[600] mt-[0.375em]">{main}</p>
    <span className="text-[rgba(44,44,44,0.75)] text-[0.875em]">{sub}</span>
  </div>
);

export default MetaItem;
