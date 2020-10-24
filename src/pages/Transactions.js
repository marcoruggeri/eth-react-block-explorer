import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import { useParams } from "react-router-dom";

const Transactions = ({ provider }) => {
  const [transaction, setTransaction] = useState();
  const { tx } = useParams();
  useEffect(() => {
    provider
      .getTransaction(tx)
      .then((response) => setTransaction(response))
      .catch((error) => console.log(error));
  }, [tx, provider]);
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
      {transaction && (
        <>
          <p>block hash: {transaction.blockHash}</p>
          <p>confirmations: {transaction.confirmations}</p>
          <p>data: {transaction.data}</p>
          <p>
            from:{" "}
            <Link to={`/account/${transaction.from}`}>{transaction.from}</Link>
          </p>
          <p>
            to: <Link to={`/account/${transaction.to}`}>{transaction.to}</Link>
          </p>
          <p>value: {ethers.utils.formatUnits(transaction.value._hex)}</p>
        </>
      )}
    </>
  );
};

export default Transactions;
