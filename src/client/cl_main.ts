import Character from './classes/character';
import { Delay } from '../../../ts-shared/shared/functions';
import { CharacterEvents } from '../../../ts-shared/shared/events';
import { CharacterBodyProps, CharacterClothingProps, CharacterData } from '../../../ts-shared/shared/types';

on('playerSpawned', async () => {
  // @ts-ignore
  while (!Citizen.invokeNative('0xA0BC8FAED8CFEB3C', PlayerPedId())) {
    await Delay(1000);
    console.log('waiting for player to be ready');
  }

  emitNet(CharacterEvents.FETCH_CHARACTERS);
});

setImmediate(() => {
  emitNet(CharacterEvents.FETCH_CHARACTERS);
});

onNet(CharacterEvents.SEND_CHARACTERS, (characters: CharacterData) => {
  global.exports['chip-ui'].NUISendCharacters(characters);
});

onNet(CharacterEvents.SEND_CLOTHING, async (body: CharacterBodyProps, clothing: CharacterClothingProps) => {
  await Character.loadPlayer('mp_male', body, clothing);
});
