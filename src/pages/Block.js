import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Block = ({ provider }) => {
  const [block, setBlock] = useState();
  const { number } = useParams();
  useEffect(() => {
    provider
      .getBlock(parseInt(number))
      .then((response) => setBlock(response))
      .catch((error) => console.log(error));
  }, [number, provider]);
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
      {block && (
        <div>
          <p>Transactions:</p>
          <ol>
            {block.transactions.map((tx) => (
              <li key={tx}>
                <Link to={`/transaction/${tx}`}>{tx}</Link>
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
};

export default Block;
