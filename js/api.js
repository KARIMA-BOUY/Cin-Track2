// export async function Movies() {
//     try {
//         const res = await fetch(ApiUrl);
//         if (!res.ok) {
//             throw new Error("Erreur API");
//         }
//         const data = await res.json();
//         return data;
//     } catch (error) {
//         console.log(error.message);
//         return [];
//     }
// }
const BASE_URL = "https://6afad817730c1d152f329a32.mockapi.io";
export async function request(path, options = {}) {
    const res = await fetch(BASE_URL + path, {
        headers: {
            "Content-Type": "application/json"
        },
        ...options
    });
    if (!res.ok) {
        throw new Error("Erreur " + res.status);
    }
    return res.json();
}
export const getContents = () => {
    return request("/cinetrack");
};
export const createContent = (data) => {
    return request("/cinetrack", {
        method: "POST",
        body: JSON.stringify(data)
    });
};
export const updateContent = (id, data) => {
    return request("/cinetrack/" + id, {
        method: "PUT",
        body: JSON.stringify(data)
    });
};
export const deleteContent = (id) => {
    return request("/cinetrack/" + id, {
        method: "DELETE"
    });
};
