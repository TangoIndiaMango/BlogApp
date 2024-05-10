import axios from "axios";

// const baseUrl = "https://timmie.pythonanywhere.com/blog-path/"
const baseUrl = "https://blogappbackend-pm33.onrender.com/blog-path/"


export const getData = async <T>(endpoint: string):Promise<T | null> => {
    const req = await axios.get(`${baseUrl}${endpoint}`).catch(e => {
        console.log(e)
    })

    if (req) {
        return req.data as T
    }
    return null
}

export const postData = async (endpoint: string, data:any):Promise<boolean> => {
    const res = await axios.post(`${baseUrl}${endpoint}/`, data).catch(e => {
        console.log(e)
    });

    if (res) {
        return true;
    } 
    return false;
}

export const postFileDataToCLD = async (file: any) => {
  
    const url = `https://api.cloudinary.com/v1_1/aliyu-timi/image/upload`;

    const res = await axios.post(url, {
      file: file,
      api_key: "897161839891256",
      upload_preset: "inventory_app"
    });


    return res.data.secure_url;
  };
