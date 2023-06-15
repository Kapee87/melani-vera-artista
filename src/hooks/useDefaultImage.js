import imgDefault from '../assets/imgDefault.jpg'
import { useEffect } from 'react'

function useDefaultImage() {
    
    useEffect(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        imgs.forEach(i => i.addEventListener(() => {
            i.src = imgDefault
        })
        )
    }, [])
}