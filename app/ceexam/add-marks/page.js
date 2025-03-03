import AssignMarkTable from "@/components/AssignMarkTable";
import ResultSearch from "@/components/ResultSearch";

export default function Page(){
    return(
        <div className="px-5 py-4">
             <ResultSearch />
             <AssignMarkTable />
        </div>
    )
}