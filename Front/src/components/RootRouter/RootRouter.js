import { Route, Routes } from "react-router"
import { SinglePage } from "../../Pages/SinglePage/SinglePage"
import { HomePage } from "../../Pages/HomePage/HomePage"


export const RootRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:id" element={<SinglePage />}/>
        </Routes>
    )
}