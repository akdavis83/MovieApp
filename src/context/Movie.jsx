import axios from "axios";

const { createContext, useState, useEffect, useContext } = require("react");

const MovieContext = createContext()

export const MovieProvider = ({children})=>{

    const [movies, setMovies] = useState([])

    const baseUrl = 'https://api.themoviedb.org/3'
    const movieUrl = `${baseUrl}/discover/movie?api_key=${process.env.REACT_APP_movieApiKey}`

    useEffect(()=>{
        fetchMovies(movieUrl)
    }, [movieUrl])

    const fetchMovies = async(url)=>{
        const res = await axios.get(url)
        setMovies(res.data.results)
        console.log(res.data.results)
    }

    return <MovieContext.Provider value={{movies, setMovies}}>
        {children}
    </MovieContext.Provider>
}

export const useMovie = ()=> useContext(MovieContext)