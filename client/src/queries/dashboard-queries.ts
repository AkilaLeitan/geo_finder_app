import { useQuery } from "react-query";
import { GetLocationsRequest, GetLocationsResponse } from "../controllers/dashboard-model";
import { dashboardController } from "../controllers/dashboard-controller";
import { BaseResponse } from "../app/lib/base-response";

export const useGetLocationsQuery = (request: GetLocationsRequest) => {
    return useQuery<BaseResponse<GetLocationsResponse>, Error>(
        ["locations", request],
        () => dashboardController.getLocations(request),
        {
            keepPreviousData: true,
        }
    );
}