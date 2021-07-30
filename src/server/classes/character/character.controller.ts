import { CharacterEvents } from '../../../shared/events';
import { CharacterClothingProps, CharacterData } from '../../../shared/types';
import CharacterService from './character.service';

onNet(CharacterEvents.FETCH_CHARACTERS, async () => {
  const _source = (<any>global).source;
  await CharacterService.handleGetCharacters(_source);
});

onNet(CharacterEvents.SELECT_CHARACTER, async (characterData: CharacterData) => {
  const _source = (<any>global).source;
  await CharacterService.handleNewCharacter(_source, characterData);
})

onNet(CharacterEvents.FETCH_CLOTHING, async () => {
  const _source = (<any>global).source;
  await CharacterService.handleFetchClothing(_source)
})

onNet(CharacterEvents.UPDATE_CLOTHING, async (clothing: CharacterClothingProps): Promise<void> => {
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
    },
    setMoney: () => {
      console.log('Giving you that sexy money')
    },
    getName: () => {
      return player.getName();
    }
  }
});

global.exports('GetCharid', (src: number) => {
  return CharacterService.getCharacter(src).getCharid();
})

global.exports('GetIdentifier', (src: number) => {
  return CharacterService.getIdentifier(src);
});

global.exports('GetCharacterFromIdentifier', (identifier: string) => {
  return CharacterService.getCharacterFromIdentifier(identifier);
});