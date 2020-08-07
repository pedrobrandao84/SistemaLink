import { environment } from 'src/environments/environment';

export class AppConstants {
    //URL BASE
    public static get BASE_URL_REST(): string { return environment.BaseUrl};

    //LINK
    public static get LINK(): string {return 'EnderecosLinks'};

    //GRUPO
    public static get GRUPO(): string {return 'Grupos'};

    //USUARIO
    public static get USUARIO(): string {return 'Usuarios'};
}