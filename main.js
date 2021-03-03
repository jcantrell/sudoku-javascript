var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext('2d');
let sudoku = new Sudoku(ctx.canvas.getBoundingClientRect().left,ctx.canvas.getBoundingClientRect().top);

sudoku.fromString(boardList[6]);

var canvas = document.getElementById("mainCanvas");
document.addEventListener("mousedown", mouseDownHandler);
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("mousemove", mouseMoveHandler);
document.getElementById("mysolveBtn").onclick = solveButtonPressed;
document.getElementById("newBoardBtn").onclick = newBoard;
canvas.width = 450;
canvas.height = 450;
sudoku.draw(ctx);
function mouseDownHandler(e) {
  var x = e.x - sudoku.tl.x;
  var y = e.y - sudoku.tl.y;
  if ((x <= canvas.width) && (y <= canvas.height) && x >= 0 && y >= 0)
    sudoku.click(ctx,e);
}
function keyDownHandler(e) {
  sudoku.keypress(ctx,e);
}
function mouseMoveHandler(e) {
  if (e.x <= canvas.width && e.y <= canvas.height)
    sudoku.keypress(ctx,e);
}
function solveButtonPressed() {
  document.querySelector('#indicator').style.background = 'red';
  setTimeout(function() { sudoku.requestSolve(ctx);
  }, 100);
}
function newBoard() {
  var genb = sudoku.generateBoard();
  sudoku.copyFrom(genb);
  sudoku.draw(ctx);
}
