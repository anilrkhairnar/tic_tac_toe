import React, { useState } from "react";

import "./App.css";

import Icon from "./components/Icon";

// list created
const itemList = new Array(9).fill("empty");

const App = () => {
  // States declared
  const [isCross, setIsCross] = useState(false);
  const [isTie, setIsTie] = useState(false);
  const [winner, setWinner] = useState("");
  const [xCount, setXCount] = useState(0);
  const [oCount, setOCount] = useState(0);
  const [clickCount, setClickCount] = useState(1);

  // game won line activation
  const [wonLine, setWonLine] = useState("");

  // function on click
  const btnClicked = (index) => {
    if (winner === "") {
      if (itemList[index] === "empty") {
        itemList[index] = isCross ? "cross" : "circle";
        setClickCount(clickCount + 1);
        checkWinner();

        // check tie or not

        if (clickCount === 9 && winner === "") {
          setTimeout(() => {
            setIsTie(true);
            setIsCross("");
            setWonLine("");
          }, 1000);
        } else {
          setIsCross(!isCross);
        }
      } else if (itemList[index] !== "empty") {
        alert("already filled!");
      } else {
        alert("Something went wrong...");
      }
    } else {
      alert("not winner or tie");
    }
  };

  // reset game
  const resetGame = () => {
    itemList.fill("empty", 0, 9);
    setWinner("");
    setIsCross(false);
    setIsTie(false);
    setClickCount(1);
  };

  // winner logic
  const checkWinner = () => {
    const checkEmpty = (direction, i) => {
      if (itemList[i] !== "empty") {
        if (direction === "row") {
          setWonLine(i === 0 ? "row1" : i === 3 ? "row2" : "row3");
        } else if (direction === "col") {
          setWonLine(i === 0 ? "col1" : i === 1 ? "col2" : "col3");
        } else if (direction === "bline") {
          setWonLine("bline");
        } else if (direction === "fline") {
          setWonLine("fline");
        }

        setTimeout(() => {
          setWinner(itemList[i]);
          setWonLine("");
        }, 1000);

        itemList[i] === "circle"
          ? setOCount(oCount + 1)
          : setXCount(xCount + 1);
      }
    };

    // Winner Logic
    for (let row = 0; row < 7; row += 3) {
      if (
        itemList[row] === itemList[row + 1] &&
        itemList[row + 1] === itemList[row + 2]
      ) {
        checkEmpty("row", row);
      }
    }
    for (let col = 0; col < 3; col++) {
      if (
        itemList[col] === itemList[col + 3] &&
        itemList[col + 3] === itemList[col + 6]
      ) {
        checkEmpty("col", col);
      }
    }
    if (itemList[0] === itemList[4] && itemList[4] === itemList[8]) {
      checkEmpty("bline", 4);
    }
    if (itemList[2] === itemList[4] && itemList[4] === itemList[6]) {
      checkEmpty("fline", 4);
    }
  };

  // useEffect(() => {
  //   console.log("line: ", wonLine);
  // }, [winner]);
  return (
    <div className="space-between">
      <div className="header flex">
        <div className={`section ${isTie ? "" : isCross ? "" : "active"}`}>
          <Icon name="circle" />
          {oCount > 0 ? <span>{oCount}</span> : <Icon name="dash" />}
        </div>
        <span className="divider-line"></span>
        <div className={`section ${isTie ? "" : isCross ? "active" : ""}`}>
          <Icon name="cross" />
          {xCount > 0 ? <span>{xCount}</span> : <Icon name="dash" />}
        </div>
      </div>
      {winner ? (
        <div className="game-winner" onClick={resetGame}>
          <div>
            <Icon name={winner} />
          </div>
          <h1>Won</h1>
        </div>
      ) : isTie ? (
        <div className="game-winner" onClick={resetGame}>
          <div>
            <Icon name="circle" />
            <Icon name="cross" />
          </div>
          <h1>Draw!</h1>
        </div>
      ) : (
        <div className="game">
          <div className="game-area">
            <div className="row-span">
              <span></span>
              <span></span>
            </div>
            <div className="col-span">
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="game-box">
            {itemList.map((item, index) => (
              <div
                onClick={() => btnClicked(index)}
                key={index}
                className="icon flex"
              >
                <Icon name={item} />
              </div>
            ))}
          </div>
          <div className={`game-won-line ${wonLine !== "" ? "active" : ""}`}>
            <div className="row-line">
              <div
                className={`row-line-1 ${wonLine === "row1" ? "active" : ""}`}
              ></div>
              <div
                className={`row-line-2 ${wonLine === "row2" ? "active" : ""}`}
              ></div>
              <div
                className={`row-line-3 ${wonLine === "row3" ? "active" : ""}`}
              ></div>
            </div>
            <div className="col-line">
              <div
                className={`col-line-1 ${wonLine === "col1" ? "active" : ""}`}
              ></div>
              <div
                className={`col-line-2 ${wonLine === "col2" ? "active" : ""}`}
              ></div>
              <div
                className={`col-line-3 ${wonLine === "col3" ? "active" : ""}`}
              ></div>
            </div>
            <div className="x-line">
              <div
                className={`backward-line ${
                  wonLine === "bline" ? "active" : ""
                }`}
              ></div>
              <div
                className={`forward-line ${
                  wonLine === "fline" ? "active" : ""
                }`}
              ></div>
            </div>
          </div>
        </div>
      )}
      <div className="footer flex">
        <span>
          Created️ by{" "}
          <a
            href="https://anilrkhairnar.github.io/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Anil Khairnar
          </a>
        </span>
      </div>
    </div>
  );
};

export default App;
