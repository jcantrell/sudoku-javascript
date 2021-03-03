function testPencil() {
  let sudoku = new Sudoku(0,0);
  sudoku.fromString(boardList[9]);
  var t = new LogicSudokuSolver(sudoku);
  console.log(t.asString());
  t.ruleOutPossibilities();
  console.log(t.asString());
  t.board.pencil(1,2,4);
  console.log(t.asString());
  t.ruleOutPossibilities();
  console.log(t.asString());
}
function testSolve() {
  let sudoku = new Sudoku(0,0);
  sudoku.fromString(boardList[9]);
  var t = new LogicSudokuSolver(sudoku);
  t.solveBoard();
  console.log(t.asString());
}

function testEasterMonster() {
  let sudoku = new Sudoku(0,0);
  sudoku.fromString(boardList[7]);
  var t = new LogicSudokuSolver(sudoku);
  t.solveBoard();
  console.log(t.asString());
}
function testHard() {
  let sudoku = new Sudoku(0,0);
  sudoku.fromString(boardList[12]);
  var t = new LogicSudokuSolver(sudoku);
  t.solveBoard();
  console.log(t.asString());
}
function testGoldenNugget() {
  let sudoku = new Sudoku(0,0);
  sudoku.fromString(boardList[6]);
  var t = new LogicSudokuSolver(sudoku);
  t.solveBoard();
  console.log(t.asString());
}
function testEscargot() {
  let sudoku = new Sudoku(0,0);
  sudoku.fromString(boardList[11]);
  var t = new LogicSudokuSolver(sudoku);
  t.ruleOutPossibilities();
  console.log(t.asString());
  //t.solveBoard();
}

function testEmpty() {
  let sudoku = new Sudoku(0,0);
  sudoku.fromString(boardList[0]);
  var t = new LogicSudokuSolver(sudoku);
  t.solveBoard();
  console.log(t.asString());
}
function test13() {
  let sudoku = new Sudoku(0,0);
  sudoku.fromString(boardList[13]);
  var t = new LogicSudokuSolver(sudoku);
  t.solveBoard();
  console.log(t.asString());
}
test13();