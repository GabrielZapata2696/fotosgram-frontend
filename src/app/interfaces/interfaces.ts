
export interface RespuestaPosts {
    ok: boolean;
    pagina: number;
    post: Post[];
}

export interface Post {
    _id?: string;
    mensaje?: string;
    imgs?: string[];
    coordenadas?: string;
    usuario?: Usuario;
    created?: string;
}

export interface Usuario {
    _id?: string;
    nombre?: string;
    avatar?: string;
    email?: string;
    password?: string;
}