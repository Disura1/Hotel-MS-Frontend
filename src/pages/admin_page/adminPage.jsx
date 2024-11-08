import { Link, Route, Routes } from "react-router-dom";

export default function AdminPage(){
    return(
        <div className="w-full h-screen bg-c2">

            <div>
                <Link className="mr-12" to={"/admin/rooms"}>Rooms</Link>
                <Link to={"/admin/booking"}>Booking</Link>
            </div>

            <Routes path="/*">
            <Route path="/rooms" element={
                <div>
                    <h1>Rooms</h1>
                </div>
            }/>
            <Route path="/booking" element={
                <div>
                    <h1>Booking</h1>
                </div>
            }/>
            <Route path="/*" element={
                <div>
                    <h1>404</h1>
                </div>
            }/>
            </Routes>
        </div>
    )
}