var boardList = [
//0
" . . . | . . . | . . .\n"+
" . . . | . . . | . . .\n"+
" . . . | . . . | . . .\n"+
"-------+-------+-------\n"+
" . . . | . . . | . . .\n"+
" . . . | . . . | . . .\n"+
" . . . | . . . | . . .\n"+
"-------+-------+-------\n"+
" . . . | . . . | . . .\n"+
" . . . | . . . | . . .\n"+
" . . . | . . . | . . .\n",

//1
" 9 5 . | . . . | 6 . 3\n"+
" 1 . . | 7 . . | 5 . .\n"+
" . . 8 | 2 . . | . . .\n"+
"-------+-------+-------\n"+
" . . . | . 1 . | . . 9\n"+
" 7 . 1 | 8 . 3 | 2 . 6\n"+
" 2 . . | . 4 . | . . .\n"+
"-------+-------+-------\n"+
" . . . | . . 1 | 8 . .\n"+
" . . 2 | . . 6 | . . 5\n"+
" 5 . 4 | . . . | . 9 7\n",

//2
" 5 . 9 | . . . | . . 3\n"+
" 1 . . | . . 9 | . 8 2\n"+
" . 7 . | . 8 5 | 9 4 .\n"+
"-------+-------+-------\n"+
" . 2 . | 8 3 . | 7 . .\n"+
" . . 8 | . . . | 3 . .\n"+
" . . 7 | . 9 1 | . 2 .\n"+
"-------+-------+-------\n"+
" . 6 2 | 1 5 . | . 9 .\n"+
" 9 4 . | 6 . . | . . 7\n"+
" 8 . . | . . . | 2 . 5\n",

//3
" . 8 . | 2 1 4 | 6 7 .\n"+
" . 3 4 | 7 6 . | 5 . .\n"+
" 2 . 6 | 3 . . | . . 1\n"+
"-------+-------+-------\n"+
" 4 . 1 | . . 6 | . 5 9\n"+
" . . . | . . . | . . .\n"+
" . . . | . . . | . . .\n"+
"-------+-------+-------\n"+
" . . . | . . . | . . .\n"+
" . . . | . . . | . . .\n"+
" . . . | . . . | . . .\n",
//4
" . . 7 | . 2 . | 5 4 .\n"+
" 4 . . | 3 . . | . 1 .\n"+
" 1 . . | . . 6 | . . .\n"+
"-------+-------+-------\n"+
" 5 . . | 8 . . | . . .\n"+
" . 4 . | . 3 . | . 8 .\n"+
" . . . | . . 2 | . . 1\n"+
"-------+-------+-------\n"+
" . . . | 2 . . | . . 7\n"+
" . 2 . | . . 9 | . . 3\n"+
" . 9 8 | . 6 . | 2 . .\n",
//5
" 8 . . | . . . | . . .\n"+
" . . 3 | 6 . . | . . .\n"+
" . 7 . | . 9 . | 2 . .\n"+
"-------+-------+-------\n"+
" . 5 . | . . 7 | . . .\n"+
" . . . | . 4 5 | 7 . .\n"+
" . . . | 1 . . | . 3 .\n"+
"-------+-------+-------\n"+
" . . 1 | . . . | . 6 8\n"+
" . . 8 | 5 . . | . 1 .\n"+
" . 9 . | . . . | 4 . .\n",

//6
// Golden Nugget
" . . . | . . . | . 3 9\n"+
" . . . | . 1 . | . . 5\n"+
" . . 3 | . . 5 | 8 . .\n"+
"-------+-------+-------\n"+
" . . 8 | . . 9 | . . 6\n"+
" . 7 . | . 2 . | . . .\n"+
" 1 . . | 4 . . | . . .\n"+
"-------+-------+-------\n"+
" . . 9 | . . 8 | . 5 .\n"+
" . 2 . | . . . | 6 . .\n"+
" 4 . . | 7 . . | . . .\n",

//7
// Easter Monster
" 1 . . | . . . | . . 2\n"+
" . 9 . | 4 . . | . 5 .\n"+
" . . 6 | . . . | 7 . .\n"+
"-------+-------+-------\n"+
" . 5 . | 9 . 3 | . . .\n"+
" . . . | . 7 . | . . .\n"+
" . . . | 8 5 . | . 4 .\n"+
"-------+-------+-------\n"+
" 7 . . | . . . | 6 . .\n"+
" . 3 . | . . 9 | . 8 .\n"+
" . . 2 | . . . | . . 1\n",

//8
// Al Escargot
" 1 . . | . . 7 | . 9 .\n"+
" . 3 . | . 2 . | . . 8\n"+
" . . 9 | 6 . . | 5 . .\n"+
"-------+-------+-------\n"+
" . . 5 | 3 . . | 9 . .\n"+
" . 1 . | . 8 . | . . 2\n"+
" 6 . . | . . 4 | . . .\n"+
"-------+-------+-------\n"+
" 3 . . | . . . | . 1 .\n"+
" . 4 . | . . . | . . 7\n"+
" . . 7 | . . . | 3 . .\n",

//9
" 1 . . | . . 7 | . 9 .\n"+
" . 3 . | . 2 . | . . 8\n"+
" . . 9 | 6 . . | 5 . .\n"+
"-------+-------+-------\n"+
" . . 5 | 3 . . | 9 . .\n"+
" . 1 . | . 8 . | . . 2\n"+
" 6 . . | . . 4 | . . .\n"+
"-------+-------+-------\n"+
" 3 . . | . . . | . 1 .\n"+
" . 4 1 | . . . | . . 7\n"+
" . . 7 | . . . | 3 . .\n",

//10
" 1 . . | . . 7 | 2 9 .\n"+
" 5 3 4 | 1 2 9 | 6 7 8\n"+
" . . 9 | 6 . . | 5 . 1\n"+
"-------+-------+-------\n"+
" . . 5 | 3 . . | 9 . .\n"+
" . 1 3 | . 8 . | 7 . 2\n"+
" 6 . . | . . 4 | 1 . .\n"+
"-------+-------+-------\n"+
" 3 . . | . . . | 4 1 .\n"+
" . 4 1 | . . . | 8 . 7\n"+
" . . 7 | . . . | 3 . .\n",

//11
" 1 6 2 | 8 5 7 | 4 9 3\n"+
" 5 3 4 | 1 2 9 | 6 7 8\n"+
" 7 8 9 | 6 4 3 | 5 2 1\n"+
"-------+-------+-------\n"+
" 4 . 5 | 3 . . | 9 8 .\n"+
" . 1 3 | . 8 . | 7 . 2\n"+
" 6 . 8 | . . 4 | 1 3 5\n"+
"-------+-------+-------\n"+
" 3 . 6 | . . . | . 1 .\n"+
" . 4 1 | . 3 . | . . 7\n"+
" . . 7 | . . . | 3 . .\n",

//12
" . . 7 | . 2 . | 5 4 .\n"+
" 4 . . | 3 . . | . 1 .\n"+
" 1 . . | . . 6 | . . .\n"+
"-------+-------+-------\n"+
" 5 . . | 8 . . | . . .\n"+
" . 4 . | . 3 . | . 8 .\n"+
" . . . | . . 2 | . . 1\n"+
"-------+-------+-------\n"+
" . . . | 2 . . | . . 7\n"+
" . 2 . | . . 9 | . . 3\n"+
" . 9 8 | . 6 . | 2 . .\n",

//13
//..39.....
//.4..7...1
//6....2...
//8.......2
//.7..5..3.
//..9...4..
//2....1..8
//....4..5.
//...6..9..
" . . 3 | 9 . . | . . .\n"+
" . 4 . | . 7 . | . . 1\n"+
" 6 . . | . . 2 | . . .\n"+
"-------+-------+-------\n"+
" 8 . . | . . . | . . 2\n"+
" . 7 . | . 5 . | . 3 .\n"+
" . . 9 | . . . | 4 . .\n"+
"-------+-------+-------\n"+
" 2 . . | . . 1 | . . 8\n"+
" . . . | . 4 . | . 5 .\n"+
" . . . | 6 . . | 9 . .\n",
];

