import { Character } from './character.class';
import { getGameLicense } from '../../utils/getGameLicense';
import CharacterDB, { _CharacterDB } from './character.db';
import { CharacterEvents } from '../../../shared/events';
import PlayerService from '../player/player.service';
import { CharacterProps } from './character.interface';
import { CharacterData } from '../../../shared/types';

class _CharacterService {
  private readonly charactersBySource: Map<number, Character>;
  private readonly charactersByIdentifier: Map<string, Character>;
  private readonly characterDB: _CharacterDB;

  constructor() {
    console.log('Character service started');
    this.charactersBySource = new Map<number, Character>();
    this.charactersByIdentifier = new Map<string, Character>();
    this.characterDB = CharacterDB;
  }

  getCharacter(source: number): Character | null {
    const character = this.charactersBySource.get(source);
    if (!character) return null;
    return character;
  }

  getIdentifier(source: number): number {
    return this.getCharacter(source).getCharid();
  }

  getCharacterFromIdentifier(identifier: string): Character | null {
    const character = this.charactersByIdentifier.get(identifier);
    if (!character) return null;
    return character;
  }

  private addCharactersToMap(source: number, character: Character): void {
    this.charactersBySource.set(source, character);
  }
  

  // CHARACTER HANDLING

  async handleGetCharacters(src: number) {
    try {
      const playerId = await PlayerService.getPlayerId(src);
      const characters = await this.characterDB.fetchCharacters(playerId);
      console.log('handleGetCharacters', characters);

      emitNet(CharacterEvents.SEND_CHARACTERS, src, characters);
    } catch (e) {
      console.log(e.message);
    }
  }
  
  // FIXME: This will not stay like this. Should be taking in a object of the character data.
  async handleNewCharacter(source: number, characterData: CharacterData): Promise<void> {
    console.log('characterData charid', characterData.charid);
    
    const character = new Character({ playerId: characterData.charid, name: characterData.name });
    this.addCharactersToMap(source, character);
    
    console.log('New character loaded');
    console.log(character);
    await this.handleGetPlayerBody(source);
  }

  /**
   * Gets all clothing for the character
   * @param src
   */
  async handleGetPlayerBody(src: number): Promise<void> {
    try {
      const charid = this.getCharacter(src).getCharid();
      const body = await this.characterDB.fetchBody(charid);
      const clothing = await this.characterDB.fetchClothing(charid);

      emitNet(CharacterEvents.SEND_CLOTHING, src, JSON.parse(body), JSON.parse(clothing));
    } catch (e) {
      console.log(e.message);
    }
  }
}

const CharacterService = new _CharacterService();

export default CharacterService;
