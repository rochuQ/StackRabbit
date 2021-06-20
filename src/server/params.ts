// Each index corresponds to the level you're starting search at while doing the pruning.
export const SEARCH_BREADTH = {
  2: 999, // Don't prune on the before the second stage ("bad" placements could be a floating burn setup)
  3: 8 /* This breadth refers to the first hypothetical level, regardless of whether there was 1 or 2 concrete levels before */,
};

export const EVALUATION_BREADTH = {
  1: 999, // Same as search breadth
  2: 20,
  3: 10 /* This breadth refers to the first hypothetical level, regardless of whether there was 1 or 2 concrete levels before */,
};

export const IS_PAL = false;
export const WELL_COLUMN = 9; // 0-indexed
export const IS_NON_RIGHT_WELL = false;
export const CAN_TUCK = true;
export const USE_FINESSE = true;
export const IS_DROUGHT_MODE = true;

/*--------------------------------
  State-based param modification
---------------------------------*/

export function applyModsToParams(aiParams, modObject) {
  const modifiedParams = JSON.parse(JSON.stringify(aiParams));
  for (const key in modObject) {
    if (aiParams[key] === undefined) {
      throw new Error("Invalid key on mod object: " + key);
    }
    modifiedParams[key] = modObject[key];
  }
  return modifiedParams;
}

export function modifyParamsForAiMode(aiParams, aiMode, paramMods) {
  switch (aiMode) {
    case AiMode.DIG:
      return applyModsToParams(aiParams, paramMods.DIG);
    case AiMode.DIG_INTO_KILLSCREEN:
      return applyModsToParams(aiParams, paramMods.DIG_INTO_KILLSCREEN);
    case AiMode.NEAR_KILLSCREEN:
      return applyModsToParams(aiParams, paramMods.NEAR_KILLSCREEN);
    case AiMode.KILLSCREEN:
      return applyModsToParams(aiParams, paramMods.KILLSCREEN);
    case AiMode.KILLSCREEN_FOR_TETRISES:
      return applyModsToParams(aiParams, paramMods.KILLSCREEN_FOR_TETRISES);
    default:
      return aiParams;
  }
}

export const DEFAULT_PARAM_MODS = {
  DIG: {
    BURN_COEF: -1,
    COL_10_COEF: -1,
    HOLE_WEIGHT_COEF: -8,
    HOLE_COEF: -100,
    AVG_HEIGHT_COEF: -8,
  },
  DIG_INTO_KILLSCREEN: {
    BURN_COEF: -1,
    TETRIS_READY_COEF: 10,
    TETRIS_COEF: 500, // has to be more than INACCESSIBLE_RIGHT, so that it'll take a tetris on 229 lines
  },
  NEAR_KILLSCREEN: {
    TETRIS_READY_COEF: 10,
    TETRIS_COEF: 500, // has to be more than INACCESSIBLE_RIGHT, so that it'll take a tetris on 229 lines
  },
  KILLSCREEN: {
    COL_10_COEF: 0,
    BUILT_OUT_LEFT_COEF: 1,
    BUILT_OUT_RIGHT_COEF: 0.75,
    AVG_HEIGHT_COEF: -3,
    HOLE_COEF: -40, // changed
    BURN_COEF: 0,
    UNABLE_TO_BURN_COEF: 0,
    HIGH_COL_9_COEF: 0,
    HIGH_COL_9_EXP: 0,
    INACCESSIBLE_LEFT_COEF: -100,
    INACCESSIBLE_RIGHT_COEF: -100,
    SPIRE_HEIGHT_COEF: -0.5,
    LEFT_SURFACE_COEF: 0.5,
    TETRIS_COEF: 40,
    SURFACE_COEF: 0.5,
  },
  KILLSCREEN_FOR_TETRISES: {
    BURN_COEF: -1,
  },
};

/*--------------------------------
    Raw Param Data
---------------------------------*/

// Trained using gradient descent and heavily modified
export const DEFAULT_PARAMS: InitialAiParams = {
  AVG_HEIGHT_EXPONENT: 1.5000000000004,
  AVG_HEIGHT_COEF: -5,
  BURN_COEF: -5,
  COL_10_COEF: -1,
  COL_10_HEIGHT_MULTIPLIER_EXP: 3,
  DEAD_COEF: -10000,
  MAX_DIRTY_TETRIS_HEIGHT: 0.25, // (As a multiple of the scare height)
  EXTREME_GAP_COEF: -2,
  BUILT_OUT_LEFT_COEF: 2,
  BUILT_OUT_RIGHT_COEF: 0,
  LOW_LEFT_EXP: 1.5,
  HOLE_COEF: -30,
  HOLE_WEIGHT_COEF: 0,
  SPIRE_HEIGHT_EXPONENT: 1.215999999999999,
  SPIRE_HEIGHT_COEF: -1.1556000000000002,
  UNABLE_TO_BURN_COEF: -0.3,
  UNABLE_TO_BURN_HEIGHT_EXP: 3,
  HIGH_COL_9_COEF: -3,
  HIGH_COL_9_EXP: 2,
  SURFACE_COEF: 1,
  LEFT_SURFACE_COEF: 0,
  TETRIS_COEF: 30,
  TETRIS_READY_COEF: 6,
  INACCESSIBLE_LEFT_COEF: -50,
  INACCESSIBLE_RIGHT_COEF: -300,
};

const CENTER_WELL_MODIFICATIONS = {
  UNABLE_TO_BURN_COEF: 0,
  UNABLE_TO_BURN_HEIGHT_EXP: 0,
  HIGH_COL_9_COEF: 0,
  HIGH_COL_9_EXP: 0,
  LEFT_SURFACE_COEF: 0,
  INACCESSIBLE_LEFT_COEF: -200,
  INACCESSIBLE_RIGHT_COEF: -200,
};

const PLAY_PERFECT_PARAMS: InitialAiParams = {
  AVG_HEIGHT_EXPONENT: 1,
  AVG_HEIGHT_COEF: -300,
  BURN_COEF: -1000,
  COL_10_COEF: 0,
  COL_10_HEIGHT_MULTIPLIER_EXP: 0,
  DEAD_COEF: -100000,
  MAX_DIRTY_TETRIS_HEIGHT: 0,
  EXTREME_GAP_COEF: -5,
  BUILT_OUT_LEFT_COEF: 0,
  BUILT_OUT_RIGHT_COEF: 0,
  LOW_LEFT_EXP: 0,
  HOLE_COEF: 0,
  HOLE_WEIGHT_COEF: 0,
  SPIRE_HEIGHT_EXPONENT: 1.215999999999999,
  SPIRE_HEIGHT_COEF: -1.1556000000000002,
  UNABLE_TO_BURN_COEF: 0,
  UNABLE_TO_BURN_HEIGHT_EXP: 0,
  HIGH_COL_9_COEF: 0,
  HIGH_COL_9_EXP: 0,
  SURFACE_COEF: 0.02,
  LEFT_SURFACE_COEF: 0,
  TETRIS_COEF: 50,
  TETRIS_READY_COEF: 5.909760000000001,
  INACCESSIBLE_LEFT_COEF: -30,
  INACCESSIBLE_RIGHT_COEF: -1000,
};

const DROUGHT_MODIFICATIONS = {
  BURN_COEF: -6,
  EXTREME_GAP_COEF: -20,
  AVG_HEIGHT_COEF: -10,
  AVG_HEIGHT_EXPONENT: 1.5,
  HIGH_COL_9_COEF: -10,
  TETRIS_READY_COEF: 25,
  TETRIS_COEF: 100,
};

const NO_DIRTIES_MODIFICATIONS = {
  MAX_DIRTY_TETRIS_HEIGHT: 0, // (As a multiple of the scare height)
};
export const NO_DIRTIES_PARAMS = applyModsToParams(
  DEFAULT_PARAMS,
  NO_DIRTIES_MODIFICATIONS
);

const TOURNEY_AGGRO_MODIFICATIONS = {
  BURN_COEF: -14,
  HIGH_COL_9_COEF: -5,
  UNABLE_TO_BURN_COEF: -0.5,
};

const TOURNEY_MEDIUM_AGGRO_MODIFICATIONS = {
  BURN_COEF: -10,
  HIGH_COL_9_COEF: -5,
  UNABLE_TO_BURN_COEF: -0.5,
  AVG_HEIGHT_COEF: -6,
};

const TOURNEY_SMALL_AGGRO_MODIFICATIONS = {
  BURN_COEF: -7.5,
  HIGH_COL_9_COEF: -4,
  UNABLE_TO_BURN_COEF: -0.4,
};

const AGGRO_MODIFICATIONS = {
  BURN_COEF: -14,
  HIGH_COL_9_COEF: -1.5,
  UNABLE_TO_BURN_COEF: -0.1,
  AVG_HEIGHT_COEF: -5,
};

const FULL_AGGRO_MODIFICATIONS = {
  BURN_COEF: -40,
  MAX_DIRTY_TETRIS_HEIGHT: 0.25,
  UNABLE_TO_BURN_COEF: -0.1,
  HIGH_COL_9_COEF: -1.5,
  AVG_HEIGHT_COEF: -10,
  INACCESSIBLE_RIGHT_COEF: -1000,
};

const LOW_TAP_SPEED_MODIFICATIONS = {
  UNABLE_TO_BURN_COEF: -0.7,
  BURN_COEF: -5,
  INACCESSIBLE_LEFT_COEF: -200,
};

const MEDIUM_LOW_TAP_SPEED_MODIFICATIONS = {
  UNABLE_TO_BURN_COEF: -0.7,
  INACCESSIBLE_LEFT_COEF: -200,
};

const TOURNEY_MEDIUM_AGGRO_PARAMS = applyModsToParams(
  DEFAULT_PARAMS,
  TOURNEY_MEDIUM_AGGRO_MODIFICATIONS
);
const TOURNEY_SMALL_AGGRO_PARAMS = applyModsToParams(
  DEFAULT_PARAMS,
  TOURNEY_SMALL_AGGRO_MODIFICATIONS
);
const TOURNEY_AGGRO_PARAMS = applyModsToParams(
  DEFAULT_PARAMS,
  TOURNEY_AGGRO_MODIFICATIONS
);
const AGGRO_PARAMS = applyModsToParams(DEFAULT_PARAMS, AGGRO_MODIFICATIONS);
const FULL_AGGRO_PARAMS = applyModsToParams(
  DEFAULT_PARAMS,
  FULL_AGGRO_MODIFICATIONS
);
const DROUGHT_CODE_PARAMS = applyModsToParams(
  DEFAULT_PARAMS,
  DROUGHT_MODIFICATIONS
);
const LOW_TAP_SPEED_PARAMS = applyModsToParams(
  DEFAULT_PARAMS,
  LOW_TAP_SPEED_MODIFICATIONS
);
const MEDIUM_LOW_TAP_SPEED_PARAMS = applyModsToParams(
  DEFAULT_PARAMS,
  MEDIUM_LOW_TAP_SPEED_MODIFICATIONS
);
const CENTER_WELL_PARAMS = applyModsToParams(
  DEFAULT_PARAMS,
  CENTER_WELL_MODIFICATIONS
);

export function getParams(): InitialAiParams {
  return DROUGHT_CODE_PARAMS;
}

export function getParamMods(): ParamMods {
  return DEFAULT_PARAM_MODS;
}
