import { Observable, of, switchMap } from "rxjs";
import { ConditionHandler, IUser } from "./interface";

export class LevelUpChain {
    /**
        * Handlers for Level Up chain
        * 
        * If any of the handler returns false the chain is broken 
        * and level up is stopped. 
    */
    private _handlers: ConditionHandler[] = [];

    addHandler(handler: ConditionHandler): this {
        this._handlers.push(handler);
        return this;
    }

    levelUp(userDto: IUser): Observable<boolean> {
        let source$: Observable<boolean> = of(true);

        for (let i=0; i < this._handlers.length; i++) {
            let handler$ = this._handlers[i].handle(userDto);

            source$ = source$.pipe(
                switchMap((canLevelUp) => {
                    // if any of the handlers return false, stop remaining handlers from execution and return false
                    if (!canLevelUp) {
                        return of(false);
                    }
                    return typeof handler$ === 'boolean' ? of(handler$) : handler$;
                })
            );
        }

        return source$;
    }
}
