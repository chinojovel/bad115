export class User{
    constructor(
        public correo: string, 
        private _nombreRol: string
        ){}
        get rol(){
            return this._nombreRol
        }
}