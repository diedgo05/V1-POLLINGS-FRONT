import { Observable } from "rxjs";
import { UseCase } from "../../base/use-case";
import { ChoferModel } from "../models/chofer.model";
import { ChoferRepository } from "../repositories/chofer.repository";


export class deleteChoferUseCase implements UseCase<{id: number}, ChoferModel> {
    constructor(private cRepo: ChoferRepository) {}

    execute(params: { id: number; }): Observable<ChoferModel> {
        return this.cRepo.delete(params.id);
    }
}