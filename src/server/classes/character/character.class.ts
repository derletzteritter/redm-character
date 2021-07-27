import { CharacterProps } from './character.interface';

export class Character {
  private readonly charid: number;
  private readonly name: string;
  
  constructor({ playerId, name }: CharacterProps) {
    this.charid = playerId;
    this.name = name;
  }

  public getCharid(): number {
    return this.charid;
  }
  
  public getName(): string {
    return this.name;
  }
  
  public getMoney(): number {
    // some sort of uhhh stored amount when we select character, then sync to DB?
    return 0;
  }
  
  getBankMoney(bank: string): number {
    // some sort of uhhh stored amount when we select character, then sync to DB?
    return 0;
  }
}
