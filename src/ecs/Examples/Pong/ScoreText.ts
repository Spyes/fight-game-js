import { TextComponent } from "../../components/TextComponent";
import { Entity } from "../../core/Entity";
import { RGBA } from "../../core/RGBA";
import { Vector2 } from "../../core/Vector2";
import { EPlayers, Score } from "./Score";

interface IScoreText {
  position: Vector2;
  player: EPlayers;
}

export class ScoreText extends Entity {
  _player: EPlayers;
  _textComp: TextComponent;

  constructor({ position, player }: IScoreText) {
    super({ position });

    this._player = player;

    this._textComp = new TextComponent({
      rgba: RGBA.White,
      text: Score.scores[this._player].toString(),
      font: '68px sans-serif',
    });
    this.addComponent(this._textComp);
  }

  public update(delta: number): void {
    this._textComp.text = Score.scores[this._player].toString();
  }
}