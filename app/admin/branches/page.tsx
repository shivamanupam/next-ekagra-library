"use client";

import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

type Branch = {
  _id: string;
  name: string;
  address: string;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  border: "1px solid white",
  backgroundColor: "black",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "36px",
};

const BranchPage = () => {
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [filteredBranches, setFilteredBranches] = useState<Branch[]>([]);
  const [open, setOpen] = useState(false);
  const [searchBranch, setSearchBranch] = useState("");
  const [openNewBranchModal, setOpenNewBranchModal] = useState(false);
  const [branchName, setBranchName] = useState("");
  const [branchAddress, setBranchAddress] = useState("");

  const fetchBranches = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/branches");
      const data = await response.json();
      setBranches(data);
      setFilteredBranches(data);
      setLoading(false);
    } catch (err) {
      console.log("Error: ", err);
      setLoading(false);
    }
  };

  const addNewBranch = () => {
    console.log("Branch Details: ", branchName, branchAddress);
    setOpenNewBranchModal(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleBranchSearch = (e: React.SyntheticEvent) => {
    if (e.key === "Enter") {
      const filteredBranchesName = branches.filter((branch) => {
        const branchName = branch.name.trim().toLocaleLowerCase();
        const searchName = searchBranch.trim().toLocaleLowerCase();
        if (branchName.includes(searchName)) return branch;
      });

      setFilteredBranches(filteredBranchesName);
    }
  };

  useEffect(() => {
    handleOpen();
    fetchBranches();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-8 max-w-full">
        <h2 className="text-2xl font-extrabold">Branches:</h2>
        <div className="flex flex-row gap-8 min-h-4">
          <input
            type="text"
            className="border rounded-sm min-w-sm p-2"
            placeholder="Search by branch name"
            onChange={(e) => setSearchBranch(e.target.value)}
            onKeyDown={(e) => handleBranchSearch(e)}
          />
          <button
            onClick={() => setOpenNewBranchModal(true)}
            className="rounded-md px-4 cursor-pointer bg-blue-600 hover:bg-blue-900"
          >
            Add Branch
          </button>
        </div>

        {loading ? (
          <Backdrop
            sx={(theme) => ({
              color: "white",
              zIndex: theme.zIndex.drawer + 1,
            })}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : null}

        {filteredBranches.length > 0 && (
          <table className="border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-300">Branch Name</th>
                <th className="border border-gray-300">Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredBranches.map((branch) => {
                return (
                  <tr key={branch._id}>
                    <td className="border border-gray-300">{branch.name}</td>
                    <td className="border border-gray-300">{branch.address}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <Modal
        open={openNewBranchModal}
        onClose={() => setOpenNewBranchModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-row items-center justify-between">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create New Branch
            </Typography>
            <CloseIcon
              onClick={() => setOpenNewBranchModal(false)}
              className="border rounded-xl cursor-pointer"
            />
          </div>

          <div className="mt-2 flex flex-col gap-8">
            <div className="flex flex-row gap-2 items-center">
              <label htmlFor="branch">Branch Name: </label>
              <input
                className="border rounded-sm px-2 py-1 w-fit min-w-[28ch]"
                type="text"
                placeholder="Enter new branch name"
                onChange={(e) => setBranchName(e.target.value)}
              />
            </div>
            <div className="flex flex-row gap-2 items-center">
              <label htmlFor="branch">Address: </label>
              <input
                className="border rounded-sm px-2 py-1 w-fit min-w-[28ch]"
                type="text"
                placeholder="Enter new branch name"
                onChange={(e) => setBranchAddress(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-4 justify-between">
            <Button
              className="cursor-pointer"
              onClick={() => setOpenNewBranchModal(false)}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button onClick={addNewBranch} variant="contained">
              Create
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default BranchPage;
