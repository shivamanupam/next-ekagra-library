"use client";

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
      <button
        onClick={handleLogout}
        className="border rounded-sm px-2 py-1 cursor-pointer"
      >
        Logout
      </button>
    </>
  );
};

export default LogoutBtn;
