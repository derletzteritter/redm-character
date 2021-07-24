import {PlayerProps} from "./player.interface";

export class Player {
	private readonly _source: number;
	private readonly _identifier: string;
	private readonly _name: string;
	private readonly _playerId: number;
	
	constructor({ source, identifier, name, playerId }: PlayerProps) {
		this._source = source;
		this._identifier = identifier;
		this._name = name;
		this._playerId = playerId;
	}
	
	getIdentifier(): string {
		return this._identifier;
	}
	
	getPlayerId(): number {
		return this._playerId;
	}
	
	getName(): string {
		return this._name;
	}
	
}