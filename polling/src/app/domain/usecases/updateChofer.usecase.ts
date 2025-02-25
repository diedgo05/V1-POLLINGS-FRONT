import { Observable } from "rxjs";
import { UC, UseCase } from "../../base/use-case";
import { ChoferModel } from "../models/chofer.model";
import { ChoferRepository } from "../repositories/chofer.repository";


export class updateChoferUseCase implements UC<number, ChoferModel, ChoferModel> {
    constructor(private cRepo: ChoferRepository) {}

    execute(id: number, params: ChoferModel): Observable<ChoferModel> {
        return this.cRepo.update(id, params);
    }
}