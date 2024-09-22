import axios from "axios";

const apiSeries = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TMDB_API_KEY
    }
})

export default apiSeries

