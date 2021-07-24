import { db } from '../../database/db';
// FIXME: Fix these types


export class _CharacterDB {
  async fetchCharacters(playerId: number): Promise<any[]> {
    const query = `SELECT * FROM characters WHERE playerid = ?`;
    const [results] = await db.query(query, [playerId]);

    return <any[]>results;
  }

  async fetchBody(charid: number): Promise<any> {
    const query = `SELECT body FROM characters WHERE id = ?`;
    const [results] = await db.query(query, [charid]);
    const result = <any[]>results;

    return result[0].body;
  }

  async fetchClothing(charid: number): Promise<any> {
    const query = `SELECT clothes FROM characters WHERE id = ?`;
    const [results] = await db.query(query, [charid]);
    const result = <any[]>results;

    return result[0].clothes;
  }
}

const CharacterDB = new _CharacterDB();

export default CharacterDB;
