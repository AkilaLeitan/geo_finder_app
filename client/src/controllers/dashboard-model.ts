import { BaseRequest } from "../app/lib/base-request";
import { BaseResponse } from "../app/lib/base-response";

export interface LocationModel {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    link: string;
    distance?: number;
    description?: string;
}

export interface GetLocationsRequest extends BaseRequest {
    latitude: number;
    longitude: number;
    searchText?: string;
    limit?: number;
}

export interface GetLocationsResponse {
    locations: LocationModel[];
    total: number;
}