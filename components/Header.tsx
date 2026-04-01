import LogoutBtn from "./LogoutBtn";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

const Header = () => {
  return (
    <>
      <div className="flex flex-row justify-between p-4 border-b-1">
        <div className="flex flex-row gap-2 items-center">
          <LocalLibraryIcon fontSize="large" />
          <h1 className="text-2xl">Ekagra Library</h1>
        </div>

        <LogoutBtn />
      </div>
    </>
  );
};

export default Header;
