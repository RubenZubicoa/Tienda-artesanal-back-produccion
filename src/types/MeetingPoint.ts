export type MeetingPoint = {
    uuid: string;
    name: string;
    location: {
        latitude: number;
        longitude: number;
    };
    manufacturerId: string;
    description?: string;
    isDeleted?: boolean;
}

export type CreateMeetingPoint = Omit<MeetingPoint, 'uuid'>;
export type UpdateMeetingPoint = Omit<MeetingPoint, 'uuid' | 'isDeleted'>;

export function isCreateMeetingPoint(meetingPoint: unknown): meetingPoint is CreateMeetingPoint {
    return (
        meetingPoint !== undefined &&
        meetingPoint !== null &&
        typeof meetingPoint === "object" &&
        "name" in meetingPoint &&
        "location" in meetingPoint &&
        "manufacturerId" in meetingPoint
    );
}

export function isUpdateMeetingPoint(meetingPoint: unknown): meetingPoint is UpdateMeetingPoint {
    return (
        meetingPoint !== undefined &&
        meetingPoint !== null &&
        typeof meetingPoint === "object" &&
        "name" in meetingPoint &&
        "location" in meetingPoint &&
        "manufacturerId" in meetingPoint
    );
}