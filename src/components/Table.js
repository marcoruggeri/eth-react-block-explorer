import React from "react";
import styled from "styled-components";
import { useTable } from "react-table";
import { ethers } from "ethers";
import { Link } from "react-router-dom";

const Styles = styled.div`
  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

function Table({ data }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Time",
        accessor: "timestamp",
        Cell: (props) => new Date(props.value * 1000).toGMTString(),
      },
      {
        Header: "Block",
        accessor: "number",
        Cell: (props) => (
          <Link to={`/block/${props.value}`}>{props.value}</Link>
        ),
      },
      {
        Header: "Txn",
        accessor: "transactions.length",
      },
      {
        Header: "Gas Used",
        accessor: "gasUsed._hex",
        Cell: (props) =>
          Math.round(ethers.utils.formatUnits(props.value, "wei")),
      },
      {
        Header: "Gas Limit",
        accessor: "gasLimit._hex",
        Cell: (props) =>
          Math.round(ethers.utils.formatUnits(props.value, "wei")),
      },
      {
        Header: "Difficulty",
        accessor: "difficulty",
      },
    ],
    []
  );
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  // Render the UI for your table
  return (
    <Styles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Styles>
  );
}

export default Table;
