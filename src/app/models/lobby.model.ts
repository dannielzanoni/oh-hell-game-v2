export type CreateGameRequest = {
  maxPlayers: number;
  maxLifesPerPlayer: number;
  privateRoom: boolean;
  password?: string;
};

export type CreateGameResponse = {
  lobby_id: string;
};
