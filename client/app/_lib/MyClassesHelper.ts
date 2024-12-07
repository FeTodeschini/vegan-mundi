'use client'

import config from './config';
import axios from "axios";

export function handleSetMyClasstDate(email: string,
        date: Date,
        classId: number, setSelectedDates: (newSelectedDates: { [key: number]: Date | null }) => void, selectedDates: { [key: number]: Date | null }){
    const updatedDates = { ...selectedDates, [classId]: date};
    updatedDates[classId] = date;
    setSelectedDates(updatedDates!);

    updateClassDate(email, date, classId)
}

async function updateClassDate(email: string, date: Date, classId: number){
    const params = {
        email,
        classId,
        date
    }

    try {
        // Persist the order to the database
        await axios.post(`${config.serverEndpoint}classes/update-date`, params);
    }
    catch (err: any){
        if (err.response) {
            const message = err.response.data.message || "An error occurred while adding your order"
        } else {
            const message = "An unexpected error occurred while adding your order";
        }
    }

    return null;
}