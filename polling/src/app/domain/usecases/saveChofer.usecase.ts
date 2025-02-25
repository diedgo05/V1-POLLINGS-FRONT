import { Observable } from "rxjs";
import { UseCase } from "../../base/use-case";
import { ChoferModel } from "../models/chofer.model";
import { ChoferRepository } from "../repositories/chofer.repository";


export class saveChoferUseCase implements UseCase<ChoferModel, ChoferModel> {
    constructor(private cRepo: ChoferRepository) {}

    execute(cMod : ChoferModel): Observable<ChoferModel> {
        return this.cRepo.save(cMod);
    }
}
