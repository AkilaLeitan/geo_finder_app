export interface ErrorResponse {
  code?: string;
  response?: Response;
}

interface Response {
  data?: ErrorData;
  status: number;
}

interface ErrorData {
  value?: {
    errorCode?: number;
    fieldId?:string;
  };
  message?: string;
  lockoutEndUtc?: string;
}
