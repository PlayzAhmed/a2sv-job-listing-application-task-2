import { JobType } from "./JobType";

export type AllJobRequestType = {
    success: boolean;
    message: string;
    data: JobType[];
}