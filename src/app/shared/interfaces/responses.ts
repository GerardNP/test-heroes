export interface DeleteResponse {
    success: boolean;
    message: string;
}

export interface CreateUpdateResponse<T> {
    message: string;
    body: T
}