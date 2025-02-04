export interface Session {
    token_type?: string;
    expires_in?: number;
    access_token?: string;
    start_session?: number;
    refresh_token?: string;
    idCompany?: string;
    idUser?: string;
}

export interface UserSession {
    FirstPayerLogin: boolean;
    IsPayer: boolean;
    IsBroker: boolean;
    IsSupplier: boolean;
    emailUser: string;
    hasLegalRep: boolean;
    idCompany: string;
    idRequest: string;
    idUser: string;
    nameUser: string;
    nit: string;
    pipedriveId: string;
    token: string;
}
