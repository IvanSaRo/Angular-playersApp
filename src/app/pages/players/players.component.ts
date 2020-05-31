import { Component, OnInit } from "@angular/core";
import { PlayersService } from "src/app/services/players.service";
import { PlayerModel } from "src/app/models/player.model";
import Swal from "sweetalert2";
import { ThrowStmt } from "@angular/compiler";

@Component({
  selector: "app-players",
  templateUrl: "./players.component.html",
  styleUrls: ["./players.component.css"],
})
export class PlayersComponent implements OnInit {
  players: PlayerModel[] = [];
  loading = false;
  empty = false;
  constructor(private playersService: PlayersService) {}

  ngOnInit() {
    this.loading = true;
    this.playersService.getPlayers().subscribe((answer) => {
      this.players = answer;
      this.loading = false;
    });
  }

  deletePlayer(player: PlayerModel, i: number) {
    Swal.fire({
      title: "Are you sure?",
      text: `You are going to delete ${player.name}`,
      showConfirmButton: true,
      showCancelButton: true,
    }).then((answer) => {
      if (answer.value) {
        this.players.splice(i, 1);
        this.playersService.deletePlayer(player.id).subscribe();
      }
    });
  }
}
