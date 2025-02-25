import { Mapper } from "../../../base/mapper";
import { ChoferModel } from "../../../domain/models/chofer.model";
import { ChoferEntity } from "../entities/chofer.entity";

export class ChoferImplementationRepositoryMapper extends Mapper<ChoferEntity,ChoferModel> {
    mapFrom(param: ChoferEntity): ChoferModel {
        return {
            id: Number(param.id),
            nombre: param.nombre,
            apellido_p: param.apellido_p,
            apellido_m: param.apellido_m,
            edad: param.edad,
        };
    }
    mapTo(param: ChoferModel): ChoferEntity {
        return {
            id: param.id,
            nombre: param.nombre,
            apellido_p: param.apellido_p,
            apellido_m: param.apellido_m,
            edad: param.edad,
        }
    }
}