import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function usePath() {
    const location = useLocation();
    const currentPath = location.pathname;
    const [title, setTitle] = useState()

    useEffect(() => {
        setTitle(currentPath.substring(1).charAt(0).toUpperCase() + currentPath.substring(1).slice(1))
    }, [currentPath])

    return { title: title === '' ? 'Trabajos' : title }

}