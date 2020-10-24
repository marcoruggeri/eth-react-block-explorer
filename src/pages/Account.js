import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import { Link } from "react-router-dom";

const Account = ({ provider }) => {
  const [balance, setBalance] = useState();
  const [bytecode, setBytecode] = useState(null);
  const { address } = useParams();
  useEffect(() => {
    provider
      .getBalance(address, "latest")
      .then((response) => setBalance(ethers.utils.formatUnits(response._hex)))
      .catch((error) => console.log(error));
    provider
      .getCode(address)
      .then((response) => setBytecode(response))
      .catch((error) => console.log(error));
  }, [address, provider]);
  return (
    <>
      <span
        onClick={() => window.history.back()}
        style={{
          cursor: "pointer",
          color: "blue",
          textDecoration: "underline",
          display: "block",
        }}
      >
        {"<-"} go back
      </span>
      <Link to="/">Home</Link>
      <p>address: {address}</p>
      <p>balance: {balance} Ether</p>
      <div>
        {bytecode !== null && bytecode !== "0x" && (
          <div style={{ width: "800px", wordWrap: "break-word" }}>
            <p>this is a contract account, bytecode:</p>
            <p>{bytecode}</p>
          </div>
        )}
      </div>
      {bytecode === "0x" && <p>this is an EOA</p>}
    </>
  );
};

export default Account;
