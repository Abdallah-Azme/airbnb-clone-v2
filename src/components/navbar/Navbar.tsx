import { User } from "@prisma/client";
import { auth } from "../../../auth";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

export default async function Navbar() {
  const session = await auth();
  const user = session?.user as User;
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm ">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0 ">
            <Logo />
            <Search />
            <UserMenu user={user} />
          </div>
        </Container>
      </div>
    </div>
  );
}
