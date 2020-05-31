import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { PlayerModel } from "../models/player.model";
import { map, delay } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PlayersService {
  url: string = "https://crud-4d16d.firebaseio.com";

  constructor(private httpClient: HttpClient) {}

  createPlayer(player: PlayerModel) {
    return this.httpClient.post(`${this.url}/players.json`, player).pipe(
      map((answer: any) => {
        player.id = answer.name;
        return player;
      })
    );
  }

  updatePlayer(player: PlayerModel) {
    const playerTemp = {
      ...player,
    };

    delete playerTemp.id;

    return this.httpClient.put(
      `${this.url}/players/${player.id}.json`,
      playerTemp
    );
  }

  getPlayers() {
    return this.httpClient.get(`${this.url}/players.json`).pipe(
      map((answer) => this.buildArray(answer)),
      delay(1500)
    );
  }

  private buildArray(playersObject: object) {
    const players: PlayerModel[] = [];

    console.warn(players);

    if (playersObject === null) {
      return [];
    }

    Object.keys(playersObject).forEach((key) => {
      const player: PlayerModel = playersObject[key];
      player.id = key;

      players.push(player);
    });

    return players;
  }

  getPlayer(id: string) {
    return this.httpClient.get(`${this.url}/players/${id}.json`);
  }

  deletePlayer(id: string) {
    return this.httpClient.delete(`${this.url}/players/${id}.json`);
  }
}
