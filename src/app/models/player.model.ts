export class PlayerModel {
  id: string;
  name: string;
  team: string;
  status: boolean;

  constructor() {
    this.status = true;
  }
}
