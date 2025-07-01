import api from "./apiClient";

export const createNote = async (data: { text: string; body: string }) => {
    return api.post('/notes', data);
}

export const deleteNotes = async (id: string) => {
    return api.delete(`/notes/${id}`);
}

export const getNotes = async () => {
    return api.get('/notes');
}

export const getNote = async (id: string) => {
    return api.get(`/notes/${id}`);
}

export const updateNote = async (id: string, data: { text: string; body: string }) => {
    return api.put(`/notes/${id}`, data);
}