import { useRef, useState, useEffect } from "react"

export default function useNearScreen({ distanceRender = "100px" } = {}) {
    const [isNearScreen, setShow] = useState(false)
    const elementRef = useRef()
    useEffect(function () {
        const onChange = (entries, observer) => {
            const el = entries[0]
            if (el.isIntersecting) {
                setShow(true)
                observer.disconnect()
            }
        }
        const observer = new IntersectionObserver(onChange, {
            rootMargin: distanceRender
        })
        observer.observe(elementRef.current)
        return () => observer.disconnect()
    })

    return { isNearScreen, elementRef }

}