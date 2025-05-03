export class BaseResponse<T> {
    constructor(
        public success: boolean,
        public data: T | null = null,
        public errorCode: string | null = null,
        public message: string | null = null
    ) {}
}