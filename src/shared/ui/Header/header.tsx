import Link from "next/link";
import { Container } from "../Container";
import { Button } from "../Button";

export const Header = () => {
  return (
    <div className="bg-slate-200 mb-5">
      <Container>
        <div className="flex justify-between items-center py-4">
          <Link href="/">
            <div className="font-bold text-lg">Recipes</div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/create">
              <Button>Create recipe</Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};
