import { ObjectId } from "mongodb";
import { clientDB, database } from "../db/database";
import { CreateMeetingPoint, MeetingPoint, UpdateMeetingPoint } from "../types/MeetingPoint";

export async function getMeetingPointsByManufacturerId(manufacturerId: string) {
    try {
        await clientDB.connect();
        const meetingPoints = await database.collection("MeetingPoints").find({ manufacturerId: manufacturerId, isDeleted: false }).toArray();
        await clientDB.close();
        return meetingPoints;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al obtener los puntos de encuentro");
    }
}

export async function createMeetingPoint(meetingPoint: CreateMeetingPoint) {
    try {
        await clientDB.connect();
        meetingPoint.isDeleted = false;
        const result = await database.collection("MeetingPoints").insertOne(meetingPoint);
        await clientDB.close();
        return result;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al crear el punto de encuentro");
    }
}

export async function updateMeetingPoint(meetingPointId: string, meetingPoint: UpdateMeetingPoint) {
    try {
        await clientDB.connect();
        const id = new ObjectId(meetingPointId);
        const result = await database.collection("MeetingPoints").updateOne({ _id: id }, { $set: meetingPoint });
        await clientDB.close();
        return result;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al actualizar el punto de encuentro");
    }
}

export async function deleteMeetingPoint(meetingPointId: string) {
    try {
        await clientDB.connect();
        const id = new ObjectId(meetingPointId);
        const result = await database.collection("MeetingPoints").updateOne({ _id: id }, { $set: { isDeleted: true } });
        await clientDB.close();
        return result;
    } catch (error) {
        await clientDB.close();
        console.error(error);
        throw new Error("Error al eliminar el punto de encuentro");
    }
}