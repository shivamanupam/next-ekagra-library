"use client";

import LogoutIcon from "@mui/icons-material/Logout";
import { Tooltip } from "@mui/material";

const LogoutBtn = () => {
  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
      window.location.href = "/login";
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Tooltip title="Logout">
        <LogoutIcon
          fontSize="medium"
          onClick={handleLogout}
          className="cursor-pointer"
        />
      </Tooltip>
    </>
  );
};

export default LogoutBtn;
