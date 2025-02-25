import { Observable } from "rxjs";
import { UseCase } from "../../base/use-case";
import { ChoferModel } from "../models/chofer.model";
import { ChoferRepository } from "../repositories/chofer.repository";


export class GetAllChoferesUseCase implements UseCase<void, ChoferModel[]> {
    constructor(private cRepo: ChoferRepository) {}

    execute(params: void): Observable<ChoferModel[]> {
        return this.cRepo.getAll()
    }
}