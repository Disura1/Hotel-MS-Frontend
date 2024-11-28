import { useState } from "react";
import uploadMedia from "../../utils/mediaUpload.js";

/*export default function TestComponent(){

    const [num, setNum] = useState(0)           //hook --> useState hook

    return(
        <div className="bg-c3 w-screen h-screen flex justify-center items-center">
            <div className="bg-c1 w-[250px] h-[150px] flex justify-between items-center p-6">

                <button className="w-[60px] h-[60px] bg-c3 rounded-full text-2xl text-c1 text-center"
                onClick={()=>{
                    const newNum = num-1
                    setNum(newNum)
                }}>
                    -
                </button>

                <span className="text-6xl">
                    {num}
                </span>

                <button className="w-[60px] h-[60px] bg-c3 rounded-full text-2xl text-c1 text-center" 
                onClick={()=>{
                    const newNum = num+1
                    setNum(newNum)
                }}>
                    +
                </button>

            </div>
        </div>
    )
}*/

export default function TestComponent(){
    const [file, setFile] = useState(null)

    return(
        <div className="bg-c3 w-screen h-screen flex justify-center items-center">
            <input
                type="file"
                defaultValue={file}
                onChange={(e)=>
                {
                    setFile(e.target.files[0])
                }
                }
            />
            <button onClick={()=>{uploadMedia(file)}}>
                Submit
            </button>
        </div>
    )
}