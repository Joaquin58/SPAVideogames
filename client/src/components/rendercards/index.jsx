import React, { Suspense, lazy } from 'react'
import RenderCards from './rendercards'
// import Genres from '../genres/genres'
import useNearScreen from '../../hooks/useNearScreen'
export default function Lazyload() {

    const { isNearScreen, elementRef } = useNearScreen({ distanceRender1: "70px" })

    const Genres = lazy(
        () => import("../genres/genres.jsx")
    )

    return (
        <>
            <RenderCards />
            <Suspense fallback={""}>  {/* !poner un spiner de carga */}
                <div ref={elementRef} >
                    {isNearScreen ? <Genres /> : null} {/* Any componet like a footer or anything else*/}
                </div>
            </Suspense>
        </>
    )
}