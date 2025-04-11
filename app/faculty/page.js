"use client"

import introJs from 'intro.js';
import 'intro.js/minified/introjs.min.css';
import ClassOverview from "@/components/faculty/ClassOverview";
import ClassShedule from "@/components/faculty/ClassShedule";

export default function Page(){
    const startTour = () => {
        introJs()
          .setOptions({
            steps: [
              {
                element: '#step1',
                intro: 'From here you can see all the subject assigned to you ',
              },
              {
                element: '#step2',
                intro: 'here you can see the schedule of your upcoming classes.',
              },
            ],
           
            nextLabel: 'Next →',
            prevLabel: '← Back',
            doneLabel: 'Done',
          })
          .start();
      };
    
    return(
        <div className="px-8 py-8">
             <button
        onClick={startTour}
        className="fixed bottom-12 right-12 z-50 bg-red-800 text-white px-5 py-2 rounded-full shadow-lg hover:bg-red-700 transition-all"
      >
        Need help
      </button>
        <div className="flex gap-2">
            <div className="w-2/3 "id="step1">
            <ClassOverview />
            <div className="mt-3">
            </div>
            
            </div>
            <div className="w-1/3" id="step2">
                <ClassShedule />
            </div>
        </div>
        
        </div>
    )
}