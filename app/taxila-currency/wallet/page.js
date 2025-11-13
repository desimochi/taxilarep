'use client'
import { SendIcon } from "lucide-react";
import CurrencyProjectComponent from "./ProjectList";
import ProjectPopupForm from "./ProjectPost";
import { useContext, useEffect, useState } from "react";
import StudentsList from "./Students";
import { GlobalContext } from "@/components/GlobalContext";
import { authFetch } from "@/app/lib/fetchWithAuth";
import ListSubject from "./Subjects";

export default function Page(){
    const [send, setSend] = useState(false)
    const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [projects, setProjects] = useState({});
    const {state} = useContext(GlobalContext)
    console.log(state)
      useEffect(() => {
        fetchProject();
      }, [state.user_id]);
    
      const fetchProject = async () => {
        try {
          setLoading(true);
          const response = await authFetch(`student-currency-wallet-balance/${state.user_id}`);
          const result = await response.json();
    
          if (result.code === 200) {
            console.log(result.data)
            setProjects(result.data);
            setError(null);
          } else {
            setError('Failed to fetch project data');
          }
        } catch (err) {
          setError('Error: ' + err.message);
        } finally {
          setLoading(false);
        }
      };
    
    return (
        <div className="relative">
         <section className="relative">
        <div className="bg-violet-200 w-full sm:w-80 h-40 rounded-full absolute top-1 opacity-20 max-sm:left-0 sm:right-56 z-0"></div>
        <div className="bg-violet-300 w-full sm:w-40 h-24 absolute top-0 -right-0 opacity-20 z-0"></div>
        <div className="bg-violet-500 w-full sm:w-40 h-24 absolute top-40 -right-0 opacity-20 z-0"></div>
        <div className="w-full pt-12 px-2 sm:px-16 relative z-10 backdrop-blur-3xl min-h-screen">
            <div className="flex justify-between items-center">
                <div>
                     <h1 className="text-3xl font-bold mb-2 font-sans">Welcome to Taxila Currency</h1>
            <p className="text-sm text-gray-500 mb-8">Everyhting you need to know about Your Currency</p>
                </div>
                <div className="text-center flex gap-4 items-center">
                    <div className=" p-4">
                        
                        <p className="text-2xl font-bold">{projects?.total_currency}</p>
                        <p className="text-sm text-gray-700">Available Currency</p>
                    </div>
                    
                    <button onClick={()=>setSend(true)} className="bg-zinc-950 px-6 py-2 text-white flex items-center justify-between gap-2">Transfer Currency <SendIcon className="h-4 w-4" /></button>
                </div>
            </div>
       
            <hr className=" border  border-spacing-y-0.5 mb-6"/>
            <div className="flex">
                <div className="w-1/2">
            <ProjectPopupForm />
            <CurrencyProjectComponent />
            </div>

            
            </div>
            <ListSubject enrollment_number={projects?.student?.enrollment_number} state={state.user_id}/>
    </div>
    </section>
    {send  && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">

    <div className="bg-white rounded-lg shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-y-auto">

      {/* Header */}
      <div className="sticky top-0 bg-red-800 text-white p-4 flex justify-between items-center rounded-t-lg">
        <h2 className="text-xl font-bold">Select Student</h2>
        <button
          onClick={() => setSend(false)}
          className="text-white p-2 hover:bg-white/20 rounded-full"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="p-4">
        <StudentsList />
      </div>

    </div>

  </div>
)}

        </div>
    )
}