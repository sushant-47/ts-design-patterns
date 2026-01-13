import { Observable } from "rxjs";
import { UserHasActiveDays, UserHasOpenIssue, UserPoint } from "./condition-handlers";
import { IUser } from "./interface";
import { LevelUpChain } from "./level-up-chain";

export class UserLevel {
    private _levelUpChain = new LevelUpChain();

    constructor(
        private userPoint: UserPoint,
        private userHasOpenIssue: UserHasOpenIssue,
        private userHasActiveDays: UserHasActiveDays
    ) {
        this._levelUpChain
            .addHandler(this.userHasOpenIssue)
            .addHandler(this.userPoint)
            .addHandler(this.userHasActiveDays);
    }

    checkLevelUp2(userDto: IUser): Observable<boolean> {
        return this._levelUpChain.levelUp(userDto);
    }

  checkLevelUp(userDto: IUser) {
    this.userPoint
      .setNext(this.userHasOpenIssue)
      .setNext(this.userHasActiveDays);

    const levelUp = this.userPoint.handle(userDto);
    return levelUp;
  }
}


const userLevel = new UserLevel(
  new UserPoint(),
  new UserHasOpenIssue(),
  new UserHasActiveDays(),
)

const userDto: IUser = { point:60, hasOpenIssue: true, activeDays: 120 }
const levelUp = userLevel.checkLevelUp(userDto);

console.log('User levelup status:', levelUp);

userLevel.checkLevelUp2(userDto).subscribe({
    next: (levelUp) => {
        console.log('User levelup status:', levelUp);
    }
});
