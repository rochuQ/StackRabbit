#include <node.h>
#include <stdio.h>
#include <stdlib.h>

// I don't know why, but including the .h files doesn't work with node-gyp.
// I wish I could do it to follow best practices, but this is what works.
#include "../src/move_search.cc"
#include "../src/board_methods.cc"
#include "../src/eval.cc"
#include "../include/tetrominoes.h"
// #include "data/ranksOutput.cc"

namespace NodeWiring {
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::Value;

void Method(const FunctionCallbackInfo<Value> &args) {
  Isolate *isolate = args.GetIsolate();

  //-----------------

  char *testBoardStr =
      "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
      "00000000000000000011000000001100000000111100000011110000001111110000111110000011111001101111110110";

  int board[20] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1023, 1023};
  int surface[10];
  getSurfaceArray(board, surface);
  // encodeBoard(testBoardStr, board);
  // printBoard(board);
  // testPieces(board);
  int numPlacements = 0;
  for (int i = 0; i < 10000; i++) {
    std::vector<SimState> lockPlacements;
    numPlacements += moveSearch(board, surface, PIECE_L, lockPlacements);
  }

  // Print ranks
  // for (int i = 0; i < 20; i++) {
  //    printf("ranks %d\n", surfaceRanksRaw[i]);
  // }

  //-----------------
  // int surfaceLook[] = {3, 2, 1, 1, 0, 0, 0, 0, 2, 0};
  // float score = lookupSurface(surfaceLook);
  // printf("surface score: %f\n", score);

  auto response = Number::New(isolate, numPlacements);
  args.GetReturnValue().Set(response);
}

void Initialize(Local<Object> exports) { NODE_SET_METHOD(exports, "calc", Method); }

NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize);
} // namespace NodeWiring