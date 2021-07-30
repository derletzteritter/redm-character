import PlayerService from "./player.service";

on('playerJoining', () => {
	const _source = (<any>global).source;
	const playerName = GetPlayerName(_source);
	
	PlayerService.handleNewPlayer(_source);
	console.log(`${playerName} is joining`);
});

on('onServerResourceStart', async (resource: string) => {
	if (resource === GetCurrentResourceName()) {
		const onlinePlayers = getPlayers();
		for (const player of onlinePlayers) {
			await PlayerService.handleNewPlayer(parseInt(player));
		}
	}
});

global.exports('GetPlayer', (src: number) => {
	return PlayerService.getPlayer(src);
})