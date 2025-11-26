import { JobType } from "./JobType";

export type JobByIdRequestType = {
    success: boolean;
    message: string;
    data: JobType;
}