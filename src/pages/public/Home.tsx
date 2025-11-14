import { WEBSITE } from "@/config/website";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Button } from "@/components/ui/button";

function Home() {
  usePageTitle({ title: `${WEBSITE.slogan}` });

  return (
    <div>
      Home
      <div className="flex flex-col items-center justify-center">
        <Button>Click me</Button>
      </div>
    </div>
  );
}

export default Home;
