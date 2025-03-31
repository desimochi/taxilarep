import AttendanceManageFac from "@/components/faculty/AttendanceManageFac";
import ClassOverview from "@/components/faculty/ClassOverview";
import ClassShedule from "@/components/faculty/ClassShedule";

export default function Page(){
    return(
        <div className="px-8 py-8">
        <div className="flex gap-2">
            <div className="w-2/3">
            <ClassOverview />
            <div className="mt-3">
            </div>
            
            </div>
            <div className="w-1/3">
                <ClassShedule />
            </div>
        </div>
        
        </div>
    )
}