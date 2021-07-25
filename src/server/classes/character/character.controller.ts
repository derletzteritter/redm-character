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

global.exports('GetCharacter', (src: number) => {
  return CharacterService.getCharacter(src);
});

global.exports('GetIdentifier', (src: number) => {
  return CharacterService.getIdentifier(src);
});

global.exports('GetCharacterFromIdentifier', (identifier: string) => {
  return CharacterService.getCharacterFromIdentifier(identifier);
});