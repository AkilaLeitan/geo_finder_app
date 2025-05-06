import BaseController from "../app/lib/base-controller";
import { BaseResponse } from "../app/lib/base-response";
import { GetLocationsRequest, GetLocationsResponse } from "./dashboard-model";

class DashboardController extends BaseController {
    public getLocations = (request: GetLocationsRequest): Promise<BaseResponse<GetLocationsResponse>> => {
        return this.get<BaseResponse<GetLocationsResponse>>(`/locations/search`, request);
    }
}

export const dashboardController = new DashboardController();