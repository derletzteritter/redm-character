import { Player } from './player.class';
import { getGameLicense } from '../../utils/getGameLicense';
import PlayerDB, { _PlayerDB } from './player.db';

class _PlayerService {
  private readonly playersBySource: Map<number, Player>;
  private readonly playersByIdentifier: Map<string, Player>;
  private readonly playerDB: _PlayerDB;

  constructor() {
    console.log('Player service started');
    this.playersBySource = new Map<number, Player>();
    this.playersByIdentifier = new Map<string, Player>();
    this.playerDB = PlayerDB;
  }

  private addPlayersToMap(source: number, player: Player) {
    this.playersBySource.set(source, player);
    this.playersByIdentifier.set(this.getIdentifier(source), player);
  }

  async handleGetPlayerId(source: number): Promise<number> {
    return this.playerDB.getPlayerId(this.getIdentifier(source))
  }

  getPlayer(source: number): Player | null {
    const player = this.playersBySource.get(source);
    if (!player) return null;
    return player;
  }

  getIdentifier(source: number): string {
    return this.getPlayer(source).getIdentifier();
  }
  
  getPlayerId(source: number): number {
    return this.getPlayer(source).getPlayerId();
  }

  getPlayerFromIdentifier(identifier: string): Player | null {
    const player = this.playersByIdentifier.get(identifier);
    if (!player) return null;
    return player;
  }

  async handleNewPlayer(source: number): Promise<void> {
    const identifier = getGameLicense(source);
    const name = GetPlayerName(source.toString());
    
    const playerId = await this.playerDB.getPlayerId(identifier);

    const player = new Player({ source, identifier, name, playerId });
    this.addPlayersToMap(source, player);
  }
}

const PlayerService = new _PlayerService();
export default PlayerService;
