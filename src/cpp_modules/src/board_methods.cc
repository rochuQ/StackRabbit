#include "../include/board_methods.h"

#include <iostream>
#include <stdio.h>
#include <stdlib.h>

void encodeBoard(char *boardStr, int outBoard[20]) {
  for (int i = 0; i < 20; i++) {
    int acc = 0;
    for (int j = 0; j < 10; j++) {
      char c = boardStr[i * 10 + j];
      // printf("%c", c);
      acc *= 2;
      if (c == '1') {
        acc += 1;
      }
    }
    outBoard[i] = acc;
  }
}

void getSurfaceArray(int board[20], int outSurface[10]) {
  for (int col = 0; col < 10; col++) {
    int colMask = 1 << (9 - col);
    int row = 0;
    while (!(board[row] & colMask) && row < 20){
      row++;
    }
    outSurface[col] = 20 - row;
  }
}

void duplicateBoard(int inBoard[20], int outBoard[20]) {
  for (int i = 0; i < 20; i++) {
    outBoard[i] = inBoard[i];
  }
}

void printBoard(int board[20]) {
  printf("----- Board start -----\n");
  for (int i = 0; i < 20; i++) {
    char line[] = "aaaaaaaaaa";
    int thisRow = board[i];
    for (int j = 0; j < 10; j++) {
      line[9 - j] = (thisRow & 0x1) ? 'X' : '.';
      thisRow = thisRow >> 1;
    }
    printf("%s\n", line);
  }
}