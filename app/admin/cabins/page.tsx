"use client";

import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const dropdownStyle = {
  width: 300,
  "& .MuiInputBase-root": {
    color: "#fff",
  },

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#555",
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#888",
  },

  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#3b82f6", // blue focus
  },

  "& .MuiSvgIcon-root": {
    color: "#fff",
  },
};

const CabinPage = () => {
  const [branches, setBranches] = useState([]);
  const [branchId, setBranchId] = useState("");

  const fetchBranches = async () => {
    try {
      const response = await fetch("/api/admin/branches");
      const data = await response.json();

      const labeledData = data.map((item) => {
        return {
          label: item.name,
          id: item._id,
        };
      });

      setBranches(labeledData);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const fetchCabins = async (brId: string) => {
    try {
      console.log("fetch cabins: ", brId);
    } catch (err) {
      console.log(err);
    }
  };

  const selectBranch = (e: React.SyntheticEvent, val: string) => {
    console.log("val: ", val);
    setBranchId(val?._id ?? null);
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return (
    <>
      <div>
        <div className="flex flex-row items-center justify-between gap-8">
          <h2 className="text-2xl">Cabins</h2>

          <Autocomplete
            disablePortal
            options={branches}
            sx={dropdownStyle}
            onChange={(e, val) => selectBranch(e, val)}
            renderInput={(params) => <TextField {...params} label="Branch" />}
          />
        </div>
      </div>
    </>
  );
};

export default CabinPage;
