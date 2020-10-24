import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ethers } from "ethers";
import "./App.css";

import Home from "./pages/Home";
import Block from "./pages/Block";
import Transactions from "./pages/Transactions";
import Account from "./pages/Account";

const network = localStorage.getItem("network");

function App() {
  const [blocks, setBlocks] = useState([]);
  const provider = new ethers.providers.InfuraProvider(
    network,
    process.env.REACT_APP_INFURA
  );

  const fetchBlock = useCallback(() => {
    provider
      .getBlock("latest")
      .then((response) => {
        if (blocks.length === 0) {
          setBlocks([...blocks, response]);
        } else if (
          blocks.filter((e) => e.number === response.number).length === 0
        ) {
          setBlocks([...blocks, response]);
        } else {
          setTimeout(() => fetchBlock(), 4000);
        }
      })
      .catch((error) => console.log(error));
  }, [blocks, provider]);

  useEffect(() => {
    setTimeout(() => fetchBlock(), 4000);
  }, [fetchBlock]);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home provider={provider} blocks={blocks} />
          </Route>
          <Route path="/block/:number" exact>
            <Block provider={provider} />
          </Route>
          <Route path="/transaction/:tx" exact>
            <Transactions provider={provider} />
          </Route>
          <Route path="/account/:address" exact>
            <Account provider={provider} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
