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

class SudokuBoard {
  constructor() {
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
  equal(b) {
    var f=true;
    for (var r=0;r<9;r++) for (var c=0;c<9;c++)
      f = f 
          && this.board[r][c] == b.board[r][c]
          && this.inked[r][c] == b.inked[r][c]
          ;
    return f;
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
    this.b = new SudokuBoard();
  }
  equal(b) {
    var f=true;
    for (var r=0;r<9;r++) for (var c=0;c<9;c++)
      f = f 
          && this.board[r][c] == b.board[r][c]
          && this.inked[r][c] == b.inked[r][c]
          ;
    return f;
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
  copyBoardFrom(b) {
    for (var r=0;r<9;r++) for (var c=0;c<9;c++)
      this.board[r][c] = b.board[r][c];
  }
  db(text) {
    if (this.debug) console.log(text);
  }
  requestSolve(ctx) {
      document.querySelector('#indicator').style.background = 'red';

      var t = new LogicSudokuSolver(this);
      //var t = new SudokuSolver(this);
      this.copyBoardFrom(t.solvedBoard());
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
  swapRows(a,b) {
    var t;
    for (var i=0;i<9;i++) {
      t = this.board[a][i];
      this.board[a][i] = this.board[b][i];
      this.board[b][i] = t;
    }
  }
  swapColumns(a,b) {
    var t;
    for (var i=0;i<9;i++) {
      t = this.board[i][a];
      this.board[i][a] = this.board[i][b];
      this.board[i][b] = t;
    }
  }
  rotateClockwise() {
    var tboard = [
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
    var inked = [
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
    for (var x=0;x<9;x++) for (var y=0;y<9;y++) {
      tboard[x][y] = this.board[9-y-1][x];
      inked[x][y] = this.inked[9-y-1][x];
    }
    this.copyFrom({board: tboard,inked: inked});
  }
  flopY() {
    var tboard = [
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
    var inked = [
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
    for (var x=0;x<9;x++) for (var y=0;y<9;y++) {
      tboard[x][y] = this.board[9-x-1][y];
      inked[x][y] = this.inked[9-x-1][y];
    }
    this.copyFrom({board: tboard,inked: inked});
  }
  flopX() {
    var tboard = [
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
    var inked = [
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
    for (var x=0;x<9;x++) for (var y=0;y<9;y++) {
      tboard[x][y] = this.board[9-x-1][y];
      inked[x][y] = this.inked[9-x-1][y];
    }
    this.copyFrom({board: tboard,inked: inked});
  }
  swapBlockColumn(a,b) {
    for (var i=0;i<3;i++)
      this.swapColumn(a+i,b+i);
  }
  swapBlockRow(a,b) {
    for (var i=0;i<3;i++)
      swapRow(a+i,b+i);
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
  swapRows(i,j) {
    this.board.swapRows(i,j);
  }
  swapColumns(i,j) {
    this.board.swapColumns(i,j);
  }
  rotateClockwise() {
  }
  shuffleBoard() {
  }
}

class SudokuSolver {
  constructor(board) {
    this.board = board.copy(); 
    this.overflow = false;
    this.s = this.board.firstUninked();
    this.searchComplete = false;
    this.solutionsCount = 0;

    this.iterCount = 0;
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
    this.iterCount++;
    console.log("iterCount: "+this.iterCount);
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
    return this.board;
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
    this.inkSquares();

    this.iterCounter = 0;
    this.counter = 0;
    this.explanation = "";
  }
  bit2num(v) {
    var n = 1;
    while (v!=1) {
      n++;
      v>>=1;
    }
    return n;
  }
  countSetBits(n) {
    var count = 0;
    while (n!=0) {
      count += (n & 1);
      n >>= 1;
    }
    return count;
  }
  singlePossibility(v) {
      return ( v && !(v&(v-1)) ); // If exacly 1 bit is set
  }
	removePossibility(v,r,c) {
    this.PossibilityGrid[r][c] = this.PossibilityGrid[r][c] & ~v;
	}
	ruleOutFromGroupMembers(v,r,c) {
    for (var i=0;i<9;i++)
    {
      this.PossibilityGrid[i][c] = this.PossibilityGrid[i][c] & ~v;
      this.PossibilityGrid[r][i] = this.PossibilityGrid[r][i] & ~v;
    }
    var blockc = Math.floor(c / 3)*3;
    var blockr = Math.floor(r / 3)*3;
    for (var i=0;i<3;i++) for (var j=0;j<3;j++)
    {
      this.PossibilityGrid[i+blockr][j+blockc] = this.PossibilityGrid[i+blockr][j+blockc] & ~v;
    }
    this.PossibilityGrid[r][c] = this.PossibilityGrid[r][c] | v;
  }
  inkSquares() {
    for (var c=0;c<9;c++) for (var r=0;r<9;r++)
      if (this.board.board[r][c] != 0)
        this.PossibilityGrid[r][c] = 1<<(this.board.board[r][c]-1);
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
      if (this.PossibilityGrid[i+blockr][j+blockc] & 1<<v) t++;

    return t;
  }
  ruleOutPossibilitiesIteration() {
    this.iterCounter++;
    for (var c=0;c<9;c++) for (var r=0;r<9;r++)
    {
      var v = this.PossibilityGrid[r][c];
      if (this.singlePossibility(v)) {
        this.board.pencil(r,c,this.bit2num(v));
        this.ruleOutFromGroupMembers(v,r,c);
        continue;
      }
      for (var p=0;p<9;p++)
        if (this.PossibilityGrid[r][c] & 1<<p)
        {
          var rc = this.rowwiseCount(r,p);
          var cc = this.columnwiseCount(c,p);
          var bc = this.blockwiseCount(r,c,p);
          if ((rc === 1) || (cc === 1) || (bc === 1))
          {
            this.PossibilityGrid[r][c] = 1<<p;
            //console.log("Deducing "+this.bit2num(1<<p)+" at ("+r+","+c+")");
            this.explanation += "d "+this.bit2num(1<<p)+" ("+r+","+c+")\n";
            this.counter++;
          }
        }
    }
  }
  asString() {
    var s="";
    s+=this.board.asString();
    for (var r=0;r<9;r++) { 
      for (var c=0;c<9;c++) {
        s += String(this.PossibilityGrid[r][c]).padStart(3, '0') +" ";
      }
      s+="\n";
    }
    return s;
  }
  checkValidity() {
    // Scan for empty squares with no possibilities; if they exist, there is no
    // solution
    for (var r=0; r<9; r++) for (var c=0;c<9;c++) {
      if (this.PossibilityGrid[r][c]==0)
        return false;
    }
    return true;
  }
  ruleOutPossibilities() {
    var oldgrid = [
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
    var PossGridChanged = true;
    while (PossGridChanged) {
      for (var c=0;c<9;c++) for (var r=0;r<9;r++)
        oldgrid[r][c] = this.PossibilityGrid[r][c];
      this.ruleOutPossibilitiesIteration();
      PossGridChanged = false;
      for (var c=0;c<9;c++) for (var r=0;r<9;r++)
        PossGridChanged = PossGridChanged || (this.PossibilityGrid[r][c] != oldgrid[r][c]);
    }
  }
  fewestPossibilities() {
    // Find empty square with fewest possibilities
    var min = 10;
    var minx = 0;
    var miny = 0;
    for (var r=0;r<9;r++) for (var c=0;c<9;c++) {
      var bits = this.countSetBits(this.PossibilityGrid[r][c]);
      if (bits < min && bits >= 2)
      {
        min = this.countSetBits(this.PossibilityGrid[r][c]);
        minx = r;
        miny = c;
      }
    }
    return {x:minx,y:miny};
  }
  checkGuess(x,y,v) {
    var b = this.board.copy();
    b.pencil(x,y,this.bit2num(v));
    var r = new LogicSudokuSolver(b);

    if (r.solveBoard()) {
      this.board.copyFrom(r.board);
      return true;
    }
    return false;
  }
  unsolved() {
    return !this.board.isFull() && this.board.isValid();
  }
  backwardMakeBestGuess() {
		// Get first possibility to guess
    var fp = this.fewestPossibilities();
		var i;
    for (i=256; ((i&this.PossibilityGrid[fp.x][fp.y]) == 0) && i>0; i>>=1) 
			;
    return this.makeGuess(i,fp);
  }
  makeBestGuess() {
		// Get first possibility to guess
    var fp = this.fewestPossibilities();
		var i;
    for (i=1; ((i&this.PossibilityGrid[fp.x][fp.y]) == 0) && i<512; i<<=1) 
			;
    return this.makeGuess(i,fp);
  }
  makeGuess(i,fp) {
    console.log( "g "+this.bit2num(i)+" ("+fp.x+","+fp.y+")\n");
    this.explanation += "g "+this.bit2num(i)+" ("+fp.x+","+fp.y+")\n";
		if (this.checkGuess(fp.x,fp.y,i))
			return true;

    this.explanation = this.explanation.slice(0,-10);
		this.removePossibility(i,fp.x,fp.y);
    return false;
  }
  solveBoard() {
    this.ruleOutPossibilities();
    if (this.board.isFull() && this.board.isValid())
      return true;

    while (this.checkValidity() && this.unsolved() && !this.makeBestGuess()) // && this.counter<43)
      this.ruleOutPossibilities();
    return this.checkValidity();
  }
  backwardSolveBoard() {
    this.ruleOutPossibilities();
    if (this.board.isFull() && this.board.isValid())
      return true;

    while (this.checkValidity() && this.unsolved() && !this.backwardMakeBestGuess()) // && this.counter<43)
      this.ruleOutPossibilities();
    return this.checkValidity();
  }
  explain() {
    console.log("Explanation:\n"+this.explanation);
  }
  solvedBoard() {
    this.solveBoard();
    for (var r=0;r<9;r++) for (var c=0;c<9;c++)
      if (this.singlePossibility(this.PossibilityGrid[r][c]))
        this.board.board[r][c] = this.bit2num(this.PossibilityGrid[r][c]);
    return this.board;
  }
  checkUniqueness() {
    var a = new LogicSudokuSolver(this.board);
    var b = new LogicSudokuSolver(this.board);
    a.solveBoard();
    console.log("End solving a");
    b.backwardSolveBoard();
    var ab = a.solvedBoard();
    var bb = b.solvedBoard();
    console.log(ab.toString());
    console.log(bb.toString());
    return ab.equal(bb);
  }
}
