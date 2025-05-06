export interface BaseResponse<T> {
    data: T;
    success: boolean;
    errorCode: string | null;
    message: string | null;
}
