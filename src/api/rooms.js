

// get all room from database
export const getAllRooms = async() => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms`);
    const data = await response.json();
    return data;
}

// get single room from database
export const getRoom = async(id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/room/${id}`);
    const data = await response.json();
    return data;
}