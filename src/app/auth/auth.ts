export interface AuthResponseData {
    status: boolean;
    value: {
      codUsuario: number;
      nombreUsuario: string | null;
      correo: string;
      nombreRol: string;
    };
    msg: string | null;
  }
  