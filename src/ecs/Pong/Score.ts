export enum EPlayers {
  PLAYER_ONE = 'player1',
  PLAYER_TWO = 'player2',
};

export class Score {
  static _scores: Record<string, number> = {
    [EPlayers.PLAYER_ONE]: 0,
    [EPlayers.PLAYER_TWO]: 0,
  };

  static get scores() { return this._scores; }

  static addPoint(player: EPlayers) {
    this._scores[player]++;
  }
}