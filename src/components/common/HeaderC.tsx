import { WEBSITE } from "@/config/website";

function HeaderC() {
  return (
    <header className="flex items-center justify-between bg-white p-4 shadow">
      <div className="flex items-center gap-3">
        <img src={WEBSITE.logo} alt={WEBSITE.name} className="h-10 w-10" />
        <div>
          <h1 className="text-lg font-bold">{WEBSITE.name}</h1>
          <p className="text-sm text-gray-500">{WEBSITE.slogan}</p>
        </div>
      </div>
    </header>
  );
}

export default HeaderC;
