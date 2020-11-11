# Sudoku in javascript
This is an implementation of suduko in javascript. The goals here are simply
so I can learn basic input/output with vanilla javascript (detecting keypresses
and location of mouse clicks, rendering things to a canvas). It is *not* to
implement a fancy sudoku logical solver or puzzle generator - hence why I use
brute force to solve puzzles.

# How to use
Click a cell then type a number.
Hit 's' to solve. (Currently broken, see to-do)

## To-do
- [ ] Puzzle generator (and button to invoke it)
- [ ] Bugfix: entering an incorrect number in a cell and calling solve doesn't do anything
- [x] Do not allow user to overwrite initial clues
- [ ] Add a toggle to highlight conflicting numbers
- [ ] Alert user when they complete a puzzle correctly
- [ ] Generate different difficulties of puzzles
- [ ] Proper solver algorithm using logic rather than guessing

# Notes
Described below is the algorithm I use to solve a puzzle. I am writing it
out here, in pseudo-code-english, because I think this will make it easier
to port to other languages.

```
if board is invalid, increment b[s]
if overflow flag set,
  unset
  decrement s, (if s is already first square, there is no solution)
  increment b[s]

let s = first non-inked square
let overflow flag = false
while (true)
  if invalid, increment b[s]
  if overflow flag set,
    unset
    if s is first, 
      return false
    else
      decrement s
    increment b[s]
  if blank
    increment b[s]
  otherwise,
    if s is last
      return true
    else
      increment s
```
