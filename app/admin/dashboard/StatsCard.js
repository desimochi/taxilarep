import { BookCheckIcon, BookOpenCheckIcon, UserCircle, UsersRoundIcon } from "lucide-react";
import Link from "next/link";


export default function StatsCard({students, faculty, subject, batch}){
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href={"/students"} className="bg-red-800 text-white p-6 rounded-xl relative overflow-hidden hover:scale-110 transform transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-red-100 text-sm">Total No. of Students</p>
                <p className="text-4xl font-bold">{students}</p>
              </div>
              <UserCircle className="text-red-200" size={24} />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <UserCircle size={16} className="text-red-200" />
              <span className="text-red-100">Batch T29 - {batch?.T29} | Batch T30 - {batch?.T30}</span>
            </div>
          </Link>

          <Link href={"/all-faculty"} className="bg-white p-6 rounded-xl border border-gray-200 hover:scale-110 transform transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-600 text-sm">Faculty</p>
                <p className="text-4xl font-bold text-gray-900">{faculty}</p>
              </div>
              <BookCheckIcon className="text-gray-400" size={24} />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <BookCheckIcon size={16} className="text-gray-400" />
              <span className="text-gray-500">Check out to See More</span>
            </div>
          </Link>

          <Link href={"/course/subject-manager"} className="bg-white p-6 rounded-xl border border-gray-200 hover:scale-110 transform transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-600 text-sm">Subjects</p>
                <p className="text-4xl font-bold text-gray-900">{subject}</p>
              </div>
              <BookOpenCheckIcon className="text-gray-400" size={24} />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <BookOpenCheckIcon size={16} className="text-gray-400" />
              <span className="text-gray-500">Currently Active Subject</span>
            </div>
          </Link>

          <div className="bg-white p-6 rounded-xl border border-gray-200 hover:scale-110 transform transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-600 text-sm">Active Term</p>
                <p className="text-4xl font-bold text-gray-900">2</p>
              </div>
              <UsersRoundIcon className="text-gray-400" size={24} />
            </div>
            <div className="text-sm text-gray-500">T-29 | T-30</div>
          </div>
        </div>
    )
}