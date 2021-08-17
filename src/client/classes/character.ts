import { Delay } from '../../../../ts-shared/shared/functions';
import { CharacterBodyProps, CharacterClothingProps } from '../../../../ts-shared/shared/types';

class _Character {
  constructor() {
    console.log('Character service started');
  }

  async loadPlayer(model: string, body: CharacterBodyProps, clothing: CharacterClothingProps): Promise<void> {
    try {
      await this.fixPedIssues(PlayerPedId());
      await this.setModel(model);
      await Delay(500);
      this.loadBody(PlayerPedId(), body);
      this.loadClothes(PlayerPedId(), clothing);
      console.log('Loaded Player');
    } catch (e) {
      console.log(`Failed to load player. Error: ${e.message}`);
    }
  }

  async setModel(model: string): Promise<void> {
    const modelHash = GetHashKey(model);
    RequestModel(modelHash);

    while (!HasModelLoaded(modelHash)) {
      await Delay(100);
      RequestModel(modelHash);
    }

    // SetPlayerModel
    Citizen.invokeNative('0xED40380076A31506', PlayerId(), modelHash, false);

    // SetPedOutfitPreset
    Citizen.invokeNative('0x77FF8D35EEC6BBC4', PlayerPedId(), 0, false);

    // @ts-ignore
    while (!Citizen.invokeNative('0xA0BC8FAED8CFEB3C', PlayerPedId())) {
      await Delay(100);
    }
  }

  loadBody(target: number, body: CharacterBodyProps): void {
    console.log('gang', body);
    global.exports['chip-clothing'].LoadBody(body);
  }

  loadClothes(target: number, clothing: CharacterClothingProps): void {
    global.exports['chip-clothing'].LoadClothes(clothing);
  }

  /**
   * This apparently fixes some loading stuff for ped components?
   *
   * Credits: https://github.com/RedEM-RP/redemrp_skin/blob/master/client/cl_main.lua#L565
   */
  async fixPedIssues(target: number): Promise<void> {
    Citizen.invokeNative('0x77FF8D35EEC6BBC4', target, 0, false);

    // @ts-ignore
    while (!Citizen.invokeNative('0xA0BC8FAED8CFEB3C', target)) {
      await Delay(10);
    }
    Citizen.invokeNative('0x0BFA1BD465CDFEFD', target);
    if (IsPedMale(target)) {
      Citizen.invokeNative(
        '0xD3A7B003ED343FD9',
        target,
        GetHashKey('CLOTHING_ITEM_M_BODIES_UPPER_001_V_001'),
        false,
        true,
        true,
      );
      Citizen.invokeNative(
        '0xD3A7B003ED343FD9',
        target,
        GetHashKey('CLOTHING_ITEM_M_BODIES_LOWER_001_V_001'),
        false,
        true,
        true,
      );
      Citizen.invokeNative(
        '0xD3A7B003ED343FD9',
        target,
        GetHashKey('CLOTHING_ITEM_M_HEAD_001_V_001'),
        false,
        true,
        true,
      );
    } else {
      Citizen.invokeNative(
        '0xD3A7B003ED343FD9',
        target,
        GetHashKey('CLOTHING_ITEM_F_BODIES_UPPER_001_V_001'),
        false,
        true,
        true,
      );
      Citizen.invokeNative(
        '0xD3A7B003ED343FD9',
        target,
        GetHashKey('CLOTHING_ITEM_F_BODIES_LOWER_001_V_001'),
        false,
        true,
        true,
      );
      Citizen.invokeNative(
        '0xD3A7B003ED343FD9',
        target,
        GetHashKey('CLOTHING_ITEM_F_HEAD_001_V_001'),
        false,
        true,
        true,
      );
    }

    Citizen.invokeNative('0xD710A5007C2AC539', target, 0x1d4c528a, 0);
    Citizen.invokeNative('0xD710A5007C2AC539', target, 0x3f1f01e5, 0);
    Citizen.invokeNative('0xD710A5007C2AC539', target, 0xda0e2c55, 0);
    Citizen.invokeNative('0x704C908E9C405136', target);
    Citizen.invokeNative('0xCC8CA3E88256E58F', target, false, true, true, true, false);
  }
}

const Character = new _Character();

export default Character;
