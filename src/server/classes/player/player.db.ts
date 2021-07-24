import { db } from '../../database/db';

export class _PlayerDB {
  async getPlayerId(identifier: string): Promise<number> {
    const query = `SELECT id FROM players WHERE identifier = ?`;
    const [results] = await db.query(query, [identifier]);
    const result = <any[]>results;

    return result[0].id;
  }
}

const PlayerDB = new _PlayerDB();
export default PlayerDB;
