import { Component, OnInit } from "@angular/core";
import { PlayerModel } from "src/app/models/player.model";
import { NgForm } from "@angular/forms";
import { PlayersService } from "src/app/services/players.service";
import Swal from "sweetalert2";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.css"],
})
export class PlayerComponent implements OnInit {
  player = new PlayerModel();
  constructor(
    private playerService: PlayersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    console.log(id);
    if (id !== "new") {
      this.playerService.getPlayer(id).subscribe((answer: PlayerModel) => {
        this.player = answer;
        this.player.id = id;
      });
    }
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      alert("formulario no válido");
      return;
    }

    Swal.fire({
      title: "Please wait",
      text: "Saving data",
      allowOutsideClick: false,
      icon: "info",
    });

    Swal.showLoading();

    let petition: Observable<any>;

    if (this.player.id) {
      petition = this.playerService.updatePlayer(this.player);
    } else {
      petition = this.playerService.createPlayer(this.player);
    }

    petition.subscribe((answer) => {
      Swal.fire({
        title: this.player.name,
        text: "Successfully updated ",
        icon: "success",
      });
    });
  }
}
