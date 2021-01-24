document.addEventListener('DOMContentLoaded', () => {
  const gridDisplay = document.querySelector('.grid');
  const scoreDisplay = document.getElementById('score');
  const resultDisplay = document.getElementById('result');
  const width = 4;
  const squares = [];
  let score = 0;

  // create a playing board

  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div');
      square.innerHTML = 0;
      gridDisplay.appendChild(square);
      squares.push(square);
    }

    // post creating board, generate random number 2 in any one of sqare
    generate();
    generate(); // for generating second number
  }

  createBoard();

  // randomly generate a number on the createBoard
  function generate() {
    const randomNumber = Math.floor(Math.random() * squares.length);
    if (squares[randomNumber].innerHTML == 0) { // could be string so ==
      squares[randomNumber].innerHTML = 2;
      isGameOver();
    } else {
      generate();
    }
  }

  // swipe right
  function swipeRight() {
    for (let i = 0; i < width * width; i++) {
      if (i % 4 === 0) {
        const totalOne = squares[i].innerHTML;
        const totalTwo = squares[i + 1].innerHTML;
        const totalThree = squares[i + 2].innerHTML;
        const totalFour = squares[i + 3].innerHTML;

        const row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
        const filteredRow = row.filter(num => num);
        const missingElements = width - filteredRow.length; // 4 - filteredRow length
        
        let zeroes = Array(missingElements).fill(0);
        // console.log(zeroes);

        // while swipeRight all element with zeroes will come first on right side
        const newRow = zeroes.concat(filteredRow);
        console.log(newRow);

        // reassing value to squares post creating new row
        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }

  // swipe left
  function swipeLeft() {
    for (let i = 0; i < width * width; i++) {
      if (i % 4 === 0) {
        const totalOne = squares[i].innerHTML;
        const totalTwo = squares[i + 1].innerHTML;
        const totalThree = squares[i + 2].innerHTML;
        const totalFour = squares[i + 3].innerHTML;

        const row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
        const filteredRow = row.filter(num => num);
        const missingElements = width - filteredRow.length; // 4 - filteredRow length
        
        let zeroes = Array(missingElements).fill(0);
        // console.log(zeroes);
        
        // while swipeLeft all element with zeroes will come right side
        const newRow = filteredRow.concat(zeroes);
        console.log(newRow);

        // reassing value to squares post creating new row
        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }

  function swipeDown() {
    for(let i = 0; i < width; i++) {
      const totalOne = squares[i].innerHTML;
      const totalTwo = squares[i + width].innerHTML;
      const totalThree = squares[i + (width * 2)].innerHTML;
      const totalFour = squares[i + (width * 3)].innerHTML;

      const column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
      const filteredColumn = column.filter(num => num);
      const missingColumns = width - filteredColumn.length;
      const zeroes = Array(missingColumns).fill(0);

      const newColumn = zeroes.concat(filteredColumn);
      squares[i].innerHTML = newColumn[0];
      squares[i + width].innerHTML = newColumn[1];
      squares[i + (width * 2)].innerHTML = newColumn[2];
      squares[i + (width * 3)].innerHTML = newColumn[3];
    }
  }

  function swipeUp() {
    for(let i = 0; i < width; i++) {
      const totalOne = squares[i].innerHTML;
      const totalTwo = squares[i + width].innerHTML;
      const totalThree = squares[i + (width * 2)].innerHTML;
      const totalFour = squares[i + (width * 3)].innerHTML;

      const column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
      const filteredColumn = column.filter(num => num);
      const missingColumns = width - filteredColumn.length;
      const zeroes = Array(missingColumns).fill(0);

      const newColumn = filteredColumn.concat(zeroes);
      squares[i].innerHTML = newColumn[0];
      squares[i + width].innerHTML = newColumn[1];
      squares[i + (width * 2)].innerHTML = newColumn[2];
      squares[i + (width * 3)].innerHTML = newColumn[3];

    }
  }

  function combineRows() {
    for (let i = 0; i < ((width * width) - 1); i++) { // no need to check with last row
      if (squares[i].innerHTML === squares[i + 1].innerHTML) {
        const combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
        squares[i + 1].innerHTML = combinedTotal;
        squares[i].innerHTML = 0;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
    checkIsWin();
  }

  function combineColumns() { 
    for (let i = 0; i < (width * (width - 1)); i++) { // no need to check with last row
      if (squares[i].innerHTML === squares[i + width].innerHTML) {
        const combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
        squares[i + width].innerHTML = combinedTotal;
        squares[i].innerHTML = 0;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
    checkIsWin();
  }

  function keyRight() {
    swipeRight();
    combineRows();
    swipeRight();
    generate();
  }

  function keyLeft() {
    swipeLeft();
    combineRows();
    swipeLeft();
    generate();
  }

  function keyUp() {
    swipeUp();
    combineColumns();
    swipeUp();
    generate();
  }

  function keyDown() {
    swipeDown();
    combineColumns();
    swipeDown();
    generate();
  }

  // assign controls use key codes
  function control(e) {
    if (e.keyCode === 39) {
      keyRight();
    } else if (e.keyCode === 37) {
      keyLeft();
    } else if (e.keyCode === 38) {
      keyUp();
    } else if (e.keyCode === 40) {
      keyDown();
    }
  }

  document.addEventListener('keyup', control);

  // check for 2048 to win
  function checkIsWin() {
     for(let i = 0; i < width * width; i++) {
       if (parseInt(squares[i].innerHTML) === 2048) {
         resultDisplay.innerHTML = 'You win!';
         document.removeEventListener('keyup', control);
       }
     }
  }

  // check if there are no 0 on board for lose
  function isGameOver() {
    let zeroes = 0;
    for(let i = 0; i < width * width; i++) {
      if (squares[i].innerHTML == 0) {
        zeroes++;
      }
    }

    if (zeroes === 0) {
      resultDisplay.innerHTML = 'Game over!';
      document.removeEventListener('keyup', control);
    }
  }
});