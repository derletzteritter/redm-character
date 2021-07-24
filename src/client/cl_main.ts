import Character from './classes/character';
import { Delay } from '../shared/functions';
import { CharacterEvents } from '../shared/events';
import { CharacterBodyProps, CharacterClothingProps } from '../shared/types';
import exp from "constants";

on('playerSpawned', async () => {
  console.log('Player spawned');

  // @ts-ignore
  while (!Citizen.invokeNative('0xA0BC8FAED8CFEB3C', PlayerPedId())) {
    await Delay(1000);
    console.log('waiting for player to be ready');
  }

  emitNet(CharacterEvents.FETCH_CHARACTERS);
});

// keeping it 'any' for now.
onNet(CharacterEvents.SEND_CHARACTERS, (characters: any) => {
  global.exports['chip-ui'].NUISendCharacters(characters)
});

onNet(CharacterEvents.SEND_CLOTHING, async (body: CharacterBodyProps, clothing: CharacterClothingProps) => {
  await Character.loadPlayer('mp_male', body, clothing);
});

RegisterCommand(
  'setmodel',
  async () => {
    emitNet(CharacterEvents.FETCH_CLOTHING);
  },
  false,
);

RegisterCommand(
  'ismale',
  () => {
    console.log('isMale', IsPedMale(PlayerPedId()));
  },
  false,
);
