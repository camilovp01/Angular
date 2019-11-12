import { Hospital } from '../hospital/hospital.model';

export class Medico {

    constructor(
        public nombre?: string,
        public img?: string,
        public usuario?: string,
        public hospital?: Hospital,
        public _id?: string
    ) { }
}