import { CharacterEvents } from '../../../shared/events';
import CharacterService from './character.service';

onNet(CharacterEvents.FETCH_CHARACTERS, async () => {
  const _source = (<any>global).source;
  await CharacterService.handleGetCharacters(_source);
});

onNet(CharacterEvents.SELECT_CHARACTER, async (characterData: any) => {
  const _source = (<any>global).source;
  await CharacterService.handleNewCharacter(_source, characterData);
})

global.exports('getPlayer', (src: number) => {
  return CharacterService.getCharacter(src);
});

global.exports('getIdentifier', (src: number) => {
  return CharacterService.getIdentifier(src);
});

global.exports('getCharacterFromIdentifier', (identifier: string) => {
  return CharacterService.getCharacterFromIdentifier(identifier);
});