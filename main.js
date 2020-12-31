class Point {
  constructor(x=0,y=0) {
    this.x=x;
    this.y=y;
  }
  asString() {
    return "(Pt "+this.x+" "+this.y+")";
  }
  equal(p) {
    return p.x === this.x && p.y === this.y;
  }
}
class Line {
  constructor (a, b) {
    this.a = a;
    this.b = b;
  }
  draw (ctx) {
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 1;
    ctx.moveTo(this.a.x,this.a.y);
    ctx.lineTo(this.b.x,this.b.y);
    ctx.stroke();
  }
  asString() {
    return "(Line: "+this.a.asString()+" "+this.b.asString()+")"
  }
}
class SudokuBoard {
  constructor(in) {
    this.board = [
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0]
    ];
    this.inked = [
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0]
    ];
  }
}

class SudokuView {
}

class SudokuController {
}

class Sudoku {
  constructor(xin=0,yin=0) {
    this.board = [
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0]
    ];
    this.inked = [
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0]
    ];
    this.focus = { x: 0, y: 0, r: 0, c: 0 };
    this.tl = new Point(xin,yin);
    this.bw = 50;
    this.bh = 50;
    this.debug = true;
  }
  inkedasString() {
    var s="";
    for (var r=0;r<9;r++) { 
      for (var c=0;c<9;c++) {
        s+=this.inked[r][c]+" ";
      }
      s+="\n";
    }
    s+="Valid: "+this.isValid(this.board)+" isFull: "+this.isFull(this.board)
      +"\n";
    return s;
  }
  asString() {
    var s="";
    for (var r=0;r<9;r++) { 
      for (var c=0;c<9;c++) {
        s+=this.board[r][c]+" ";
      }
      s+="\n";
    }
    s+="Valid: "+this.isValid(this.board)+" isFull: "+this.isFull(this.board)
      +"\n";
    return s;
  }
  copy() {
    var ret = new Sudoku();
    for (var r=0;r<9;r++) for (var c=0; c<9; c++) {
      ret.board[r][c] = this.board[r][c];
      ret.inked[r][c] = this.inked[r][c];
    }
    ret.focus.x = this.focus.x; ret.focus.y = this.focus.y; ret.focus.r = this.focus.r; ret.focus.c = this.focus.c;
    ret.tl.x = this.tl.x; ret.tl.y = this.tl.y; ret.bw = this.bw;
    ret.bh = this.bh;

    ret.s = this.s;
    return ret;
  }
  copyFrom(i) {
    for (var r=0;r<9;r++) for (var c=0; c<9; c++) 
    {
      this.board[r][c] = i.board[r][c];
      this.inked[r][c] = i.inked[r][c];
    }
  }
  copyBoard(bin) {
    var b = [
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0]
    ];
    for (var r=0;r<9;r++) for (var c=0; c<9; c++) b[r][c] = bin[r][c];
    return b;
  }
  draw (ctx) {
    this.tl.x = ctx.canvas.getBoundingClientRect().left;
    this.tl.y = ctx.canvas.getBoundingClientRect().top;

    // Background
    ctx.fillStyle = "lightgrey";
    ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
    
    // Darken background of inked squares
    for (var r=0;r<9;r++) {
      for (var c=0;c<9;c++) {
        if (this.inked[r][c]) {
          ctx.fillStyle = "#c6c6c6";
          ctx.fillRect(c*this.bw, r*this.bh, this.bw, this.bh);
        }
      }
    }

    // Highlight focused row and column
    for (var i=0;i<9;i++) {
      ctx.fillStyle = "#bbbbbb";
      ctx.fillRect(i*this.bw,this.focus.r*this.bh,this.bw,this.bh);
      ctx.fillRect(this.focus.c*this.bw,i*this.bh,this.bw,this.bh);
    }

    // Highlight focused square
    ctx.fillStyle = "#cccccc";
    ctx.fillRect(this.focus.c*this.bw,this.focus.r*this.bh,this.bw,this.bh);

    // Outline individual squares
    for (var r=0;r<9;r++) {
      for (var c=0;c<9;c++) {
        ctx.strokeStyle = 'grey';
        ctx.strokeRect(c*this.bw, r*this.bh, this.bw, this.bh);
      }
    }

    // Draw 3x3 outlined squares
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    for (var r=0;r<3;r++) {
      for (var c=0;c<3;c++) {
        ctx.strokeRect(c*this.bw*3, r*this.bh*3, this.bw*3, this.bh*3);
      }
    }
    ctx.lineWidth = 1;

    // Print numbers
    for (var r=0;r<9;r++) {
      for (var c=0;c<9;c++) {
        ctx.fillStyle = 'black';
        ctx.font = '16px serif';
        if (this.board[r][c] != 0)
          ctx.fillText(this.board[r][c],(c+1)*this.bw-30,(r+1)*this.bh-20);
      }
    }
  }
  click(ctx,e) {
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    this.focus.x = e.x - this.tl.x; 
    this.focus.y = e.y - this.tl.y;
    this.focus.r = Math.floor(this.focus.y / this.bh);
    this.focus.c = Math.floor(this.focus.x / this.bw);
    this.draw(ctx);
  }
  ink(x,y,v) {
    this.board[x][y] = v;
    this.inked[x][y] = 1;
  }
  pencil(x,y,v) {
    this.board[x][y] = v;
  }
  next(xin,yin) {
    xin = (xin+1)%9;
    if (xin==0)
      yin = (yin+1)%9;
    return new Point(xin, yin);
  }
  prev(xin,yin) {
    xin = xin-1;
    if (xin<0) {
      xin = 8;
      yin--;
      if (yin<0)
        yin=8;
    }
    return new Point(xin,yin);
  }
  nextUninked(xin,yin) {
    var s = this.next(xin,yin);
    while (this.inked[s.y][s.x] == 1)
      s = this.next(s.x,s.y);
    return s;
  }
  prevUninked(xin,yin) {
    var s = this.prev(xin,yin);
    while (this.inked[s.y][s.x] == 1)
      s = this.prev(s.x,s.y);
    return s;
  }
  firstUninked() {
    var s = new Point(0,0);
    if (this.inked[s.y][s.x]==0) return s;
    else return this.nextUninked(s.x,s.y);
  }
  lastUninked() {
    var s = { x: 8, y: 8 };
    if (this.inked[s.y][s.x]==0) return s;
    else return this.prevUninked(s.x,s.y);
  }
  setupsolve() {
    this.overflow = false;
    this.s = this.firstUninked();
    this.searchComplete = false;
    this.solutionsCount = 0;
  }
  solveIteration() {
    var s = this.s;
    if (this.overflow) {
      if (s.equal(this.firstUninked()))
        this.searchComplete = true;
      s = this.prevUninked(s.x,s.y);
    }

    if (this.overflow || !this.isValid() || this.board[s.y][s.x]==0) {
      this.board[s.y][s.x] = (this.board[s.y][s.x]+1)%10;
      this.overflow = (this.board[s.y][s.x]==0);
    } else if (s.equal(this.lastUninked())) {
      this.solutionsCount++;
    } else {
      s = this.nextUninked(s.x,s.y);
    }
    this.s = s;
  }
  solve () {
    if (this.isValid() && this.isFull()) return true;

    while (!this.searchComplete && this.solutionsCount < 1) {
      this.solveIteration();
    }
  }
  db(text) {
    if (this.debug) console.log(text);
  }
  requestSolve(ctx) {
      document.querySelector('#indicator').style.background = 'red';
      var t = this.copy();

      t.setupsolve();
      t.solve();
      this.copyFrom(t);
      console.log(this.asString()+"\n");
      this.draw(ctx);
      document.querySelector('#indicator').style.background = 'transparent';
      if (this.isValid() && this.isFull())
        document.querySelector('#complete-indicator').style.background = 'green';
  }
  keypress(ctx,e) {
    if (e.keyCode >= 48 && e.keyCode <= 57) {
      if (!this.inked[this.focus.r][this.focus.c])
        this.pencil(this.focus.r, this.focus.c, e.keyCode - 48);
      this.draw(ctx);
      this.isValid(this.board);
      if (this.isValid() && this.isFull())
        document.querySelector('#complete-indicator').style.background = 'green';
    } else if (e.keyCode == 83) {
      this.requestSolve(ctx);
    }
  }
  isValid(b = this.board) {
    var totals = [
      [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]
      ],
      [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]
      ],
      [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]
      ]
    ];
    for (var r=0;r<9;r++) {
      for (var c=0;c<9;c++) {
        if (this.board[r][c] != 0) {
          totals[0][r][b[r][c]-1]++;
          totals[1][c][b[r][c]-1]++;
          totals[2][Math.floor(r/3)*3+Math.floor(c/3)][b[r][c]-1]++;
        }
      }
    }
    var flag=true;
    for (var i=0;i<3;i++) {
      for (var r=0;r<9;r++) {
        for (var c=0;c<9;c++) {
          flag = flag && !(totals[i][r][c] > 1);
        }
      }
    }
    return flag;
  }
  isFull(b = this.board) {
    var flag = true;
    for (var r=0;r<9;r++)
      for (var c=0;c<9;c++)
        flag = flag && (b[r][c] != 0);
    return flag;
  }
  fromString(s) {
    // ll is linelength in chars
    var x=0, y=0, nl=0;
    // Map string indexes (into current line) to board x-values
    //            1,  3,  5,      9,  11, 13,     17, 19, 21
    var xmap = [x,0,x,1,x,2,x,x,x,3,x,4,x,5,x,x,x,6,x,7,x,8,x];
    for (let i=0;i < s.length; i++) {
      if (s[i] === '\n') nl = i+1, y = (s[i+1]==='-') ? y : y+1;
      if (s[i] ==='.') this.pencil(y, xmap[i-nl], 0);
      if (s[i] >= '0' && s[i] <= '9') this.ink(y, xmap[i-nl], (s[i] - '0'));
    }
  }
  generateBoard() {
    var s = new SudokuGenerator();
    return s.generateBoard();
  }
  loadRow(rn, ra) {
    for (let i=0;i<9;i++) {
      this.board[rn][i] = ra[i];
    }
  }
  loadColumn(cn, ca) {
    for (let i=0;i<9;i++) {
      this.board[i][cn] = ca[i];
    }
  }
  loadBlock(bn, ba) {
    for (let j=0;j<9;j++) {
      this.board[3*(bn%3)+j%3][3*Math.floor(bn/3)+Math.floor(j/3)] =ba[j];
    }
  }
}

class SudokuGenerator {
  constructor() {
    this.board = new Sudoku();
  }
  getShuffledSequence() {
    var sequence = [1,2,3,4,5,6,7,8,9];
    for (let i=0;i<9;i++) {
      var r = i+Math.floor(Math.random()*(9-i));
      var t = sequence[i];
      sequence[i] = sequence[r];
      sequence[r] = t;
    }
    return sequence;
  }
  loadShuffledRow(r) {
    var shuffled = getShuffledSequence();
    this.board.loadRow(r,shuffled);
  }
  loadShuffledColumn(c) {
    var shuffled = getShuffledSequence();
    this.board.loadColumn(c, shuffled);
  }
  loadShuffledBlock(i) {
    var shuffled = this.getShuffledSequence();
    this.board.loadBlock(i, shuffled);
  }
  eraseBlock(i) {
    var shuffled = [0,0,0,0,0,0,0,0,0];
    this.board.loadBlock(i,shuffled);
  }
  generateBoard() {
    this.board.db('generateBoard called');
    for (let i=0;i<4;i++) {
      this.loadShuffledBlock(i);
      while (!this.board.isValid())
        this.loadShuffledBlock(i);
    }
    return this.board;
  }
}

class SudokuSolver {
  constructor(board) {
    this.board = board.copy(); 
    this.overflow = false;
    this.s = this.board.firstUninked();
    this.searchComplete = false;
    this.solutionsCount = 0;
  }
  asString() {
    var s = this.board.asString()
          + " " + this.overflow
          + " " + this.s.asString()
          + " " + this.searchComplete
          + " " + this.solutionsCount
          + "\n";
    return s;
  }
  solveIteration() {
    var s = this.s;
    if (this.overflow) {
      s = this.board.prevUninked(s.x,s.y);
      if (s.equal(this.board.firstUninked()))
        this.searchComplete = true;
    }

    if (this.overflow || !this.board.isValid() || this.board.board[s.y][s.x]==0) {
      this.board.board[s.y][s.x] = (this.board.board[s.y][s.x]+1)%10;
      this.overflow = (this.board.board[s.y][s.x]==0);
    } else if (s.equal(this.board.lastUninked())) {
      this.solutionsCount++;
    } else {
      s = this.board.nextUninked(s.x,s.y);
    }
    this.s = s;
  }
  solvable () {
    if (this.searchComplete) return this.solutionsCount!=0;

    while (!this.searchComplete && this.solutionsCount < 1) {
      this.solveIteration();
    }
    return this.solutionsCount!=0;
  }
  countSolutions(maxCount) {
    if (this.searchComplete) return this.solutionsCount;
    while (!this.searchComplete && this.solutionsCount < maxCount)
    {
      this.solveIteration();
      console.log("counting");
    }
    return this.solutionsCount;
  }
  unique() {
    if (this.searchComplete) return this.solutionsCount===1;
    while (!this.searchComplete && this.solutionsCount < 2) {
      this.solveIteration();
    }
    return this.countSolutions()===1;
  }
  solvedBoard() {
    this.unique();
    return this.board();
  }
}

class LogicSudokuSolver {
  constructor(board) {
    this.board = board.copy();
    this.PossibilityGrid = [
      [511,511,511,511,511,511,511,511,511],
      [511,511,511,511,511,511,511,511,511],
      [511,511,511,511,511,511,511,511,511],
      [511,511,511,511,511,511,511,511,511],
      [511,511,511,511,511,511,511,511,511],
      [511,511,511,511,511,511,511,511,511],
      [511,511,511,511,511,511,511,511,511],
      [511,511,511,511,511,511,511,511,511],
      [511,511,511,511,511,511,511,511,511]
    ];
  }
  bit2num(v) {
    var n = 1;
    while (v!=1) {
      n++;
      v>>=1;
    }
    return n;
  }
  singlePossibility(v) {
      return ( v && !(v&(n-1)) ); // If exacly 1 bit is set
  }
  removePossibility(v,r,c) {
    for (var i=0;i<9;i++)
    {
      this.PossibilityGrid[i][c] = this.PossibilityGrid[i][c] & ~v;
      this.PossibilityGrid[r][i] = this.PossibilityGrid[r][i] & ~v;
    }
    var blockc = Math.floor(c / 3)*3;
    var blockr = Math.floor(r / 3)*3;
    for (var i=0;i<3;i++) for (var j=0;j<3;j++)
    {
      this.PossibilityGrid[i+r][j+c] = this.PossibilityGrid[i+r][j+c] & ~v;
    }
    this.PossibilityGrid[r][c] = this.PossibilityGrid[r][c] | v;
  }
  inkSquares() {
    for (var c=0;c<9;c++) for (var r=0;r<9;r++)
      if (this.board.inked[r][c])
        this.PossibilityGrid[r][c] = 1<<(this.board[r][c]-1);
  }
  rowwiseCount(r,v) {
    var t = 0;
    for (var i=0;i<9;i++)
      if (this.PossibilityGrid[r][i] & 1<<v) t++;
    return t;
  }
  columnwiseCount(c,v) {
    var t = 0;
    for (var i=0;i<9;i++)
      if (this.PossibilityGrid[i][c] & 1<<v) t++;
    return t;
  }
  blockwiseCount(r,c,v) {
    var t = 0;
    var blockc = Math.floor(c / 3)*3;
    var blockr = Math.floor(r / 3)*3;
    for (var i=0;i<3;i++) for (var j=0;j<3;j++)
      if (this.PossibilityGrid[i+r][j+c] & 1<<v) t++;

    return t;
  }
  solveBoard() {
    inkSquares();
    for (var c=0;c<9;c++) for (var r=0;r<9;r++)
    {
      var v = this.PossibilityGrid[r][c];
      if (singlePossibility(v))
        removePossibility(v,r,c);
      for (var p=0;p<9;p++)
        if (this.PossibilityGrid[r][c] & 1<<p)
        {
          var rc = rowwiseCount(r,p);
          var cc = columnwiseCount(c,p);
          var bc = blockwiseCount(r,c,p);
          if ((rc === 1) || (cc === 1) || (bc === 1))
            this.PossibilityGrid[r][c] = 1<<p;
        }
    }
  }
  solvedBoard() {
    this.solveBoard();
    for (var r=0;r<9;r++) for (var c=0;c<9;c++)
      if (singlePossibility(this.PossibilitySquare[r][c]))
        this.board[r][c] = bit2num(this.PossibilitySquare[r][c]);
    return this.board();
  }
}

var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext('2d');
let sudoku = new Sudoku(ctx.canvas.getBoundingClientRect().left,ctx.canvas.getBoundingClientRect().top);

board0 = "\
 . . . | . . . | . . .\n\
 . . . | . . . | . . .\n\
 . . . | . . . | . . .\n\
-------+-------+-------\n\
 . . . | . . . | . . .\n\
 . . . | . . . | . . .\n\
 . . . | . . . | . . .\n\
-------+-------+-------\n\
 . . . | . . . | . . .\n\
 . . . | . . . | . . .\n\
 . . . | . . . | . . .\n";

board1 = "\
 9 5 . | . . . | 6 . 3\n\
 1 . . | 7 . . | 5 . .\n\
 . . 8 | 2 . . | . . .\n\
-------+-------+-------\n\
 . . . | . 1 . | . . 9\n\
 7 . 1 | 8 . 3 | 2 . 6\n\
 2 . . | . 4 . | . . .\n\
-------+-------+-------\n\
 . . . | . . 1 | 8 . .\n\
 . . 2 | . . 6 | . . 5\n\
 5 . 4 | . . . | . 9 7\n";

board2 = "\
 5 . 9 | . . . | . . 3\n\
 1 . . | . . 9 | . 8 2\n\
 . 7 . | . 8 5 | 9 4 .\n\
-------+-------+-------\n\
 . 2 . | 8 3 . | 7 . .\n\
 . . 8 | . . . | 3 . .\n\
 . . 7 | . 9 1 | . 2 .\n\
-------+-------+-------\n\
 . 6 2 | 1 5 . | . 9 .\n\
 9 4 . | 6 . . | . . 7\n\
 8 . . | . . . | 2 . 5\n";

board3 = "\
 . 8 . | 2 1 4 | 6 7 .\n\
 . 3 4 | 7 6 . | 5 . .\n\
 2 . 6 | 3 . . | . . 1\n\
-------+-------+-------\n\
 4 . 1 | . . 6 | . 5 9\n\
 . . . | . . . | . . .\n\
 . . . | . . . | . . .\n\
-------+-------+-------\n\
 . . . | . . . | . . .\n\
 . . . | . . . | . . .\n\
 . . . | . . . | . . .\n";

sudoku.fromString(board1);

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
  setTimeout(function() {
    sudoku.requestSolve(ctx);
  }, 100);
}
function newBoard() {
  var genb = sudoku.generateBoard();
  sudoku.copyFrom(genb);
  sudoku.draw(ctx);
}
