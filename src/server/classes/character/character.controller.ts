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

onNet(CharacterEvents.FETCH_CLOTHING, async () => {
  const _source = (<any>global).source;
  await CharacterService.handleFetchClothing(_source)
})

onNet(CharacterEvents.UPDATE_CLOTHING, async (clothing: any) => {
  console.log('updated clothing', clothing)
  const _source = (<any>global).source;
  await CharacterService.handleUpdateClothing(_source, JSON.stringify(clothing));
})

global.exports('GetCharacter', (src: number) => {
  const player = CharacterService.getCharacter(src);
  return {
    ...player,
    getCharid: () => {
      return player.getCharid()
    },
    getMoney: () => {
      return player.getMoney()
    }
  }
});

global.exports('GetIdentifier', (src: number) => {
  return CharacterService.getIdentifier(src);
});

global.exports('GetCharacterFromIdentifier', (identifier: string) => {
  return CharacterService.getCharacterFromIdentifier(identifier);
});