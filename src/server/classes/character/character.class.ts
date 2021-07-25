import { CharacterProps } from './character.interface';

export class Character {
  private readonly _playerId: number;
  private readonly _name: string;

  constructor({ playerId, name }: CharacterProps) {
    this._playerId = playerId;
    this._name = name;
  }

  getCharid(): number {
    return this._playerId;
  }

  getName(): string {
    return this._name;
  }

  getMoney(): number {
    // some sort of uhhh stored amount when we select character, then sync to DB?
    return 0;
  }
  
  getBankMoney(bank: string): number {
    // some sort of uhhh stored amount when we select character, then sync to DB?
    return 0;
  }
}
