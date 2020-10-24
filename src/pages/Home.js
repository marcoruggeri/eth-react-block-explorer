import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";

import Table from "../components/Table";

const Home = ({ provider, blocks }) => {
  const [input, setInput] = useState("");
  const [select, setSelect] = useState("homestead");
  const [gasPrice, setGasPrice] = useState();
  const [balance, setBalance] = useState();

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSelect = (e) => {
    setSelect(e.target.value);
  };
  const handleSwitch = () => {
    localStorage.setItem("network", select);
    window.location.reload();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    provider
      .getBalance(input, "latest")
      .then((response) => setBalance(ethers.utils.formatUnits(response._hex)))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setSelect(localStorage.getItem("network"));
  }, []);

  useEffect(() => {
    provider
      .getGasPrice()
      .then((response) => setGasPrice(response))
      .catch((error) => console.log(error));
  }, [provider]);
  return (
    <>
      <select
        name="network"
        id="network"
        value={select}
        onChange={handleSelect}
      >
        <option value="homestead">Main Net</option>
        <option value="ropsten">Ropsten</option>
        <option value="rinkeby">Rinkeby</option>
      </select>
      <button className="switch" onClick={handleSwitch}>
        switch
      </button>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          placeholder="address"
          onChange={handleChange}
        ></input>
        <Link to={`/account/${input}`}>get balance</Link>
      </form>
      {gasPrice && (
        <p className="gas">
          gas price: {ethers.utils.formatUnits(gasPrice._hex, "gwei")} gwei
        </p>
      )}
      {balance && <p>balance: {parseFloat(balance).toFixed(2)} ether</p>}
      {blocks.length > 0 && <Table data={blocks} />}
    </>
  );
};

export default Home;
