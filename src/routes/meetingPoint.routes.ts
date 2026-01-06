import { Router } from "express";
import { createMeetingPoint, deleteMeetingPoint, getMeetingPointsByManufacturerId, updateMeetingPoint } from "../controllers/meetingPoint.controller";

export const meetingPointRoutes = Router();

meetingPointRoutes.get('/manufacturer/:manufacturerId', getMeetingPointsByManufacturerId);
meetingPointRoutes.post('/', createMeetingPoint);
meetingPointRoutes.put('/:id', updateMeetingPoint);
meetingPointRoutes.delete('/:id', deleteMeetingPoint);

export default meetingPointRoutes;