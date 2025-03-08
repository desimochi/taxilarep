export default function ClassShedule(){
    const products = [
        { name: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', price: '$2999' },
        { name: 'Microsoft Surface Pro', color: 'White', category: 'Laptop PC', price: '$1999' },
        { name: 'Magic Mouse 2', color: 'Black', category: 'Accessories', price: '$99' },
      ];
    
      return (
        <div className="shadow-md rounded-lg w-full">
            <div className="">
                <h3 className="text-sm rounded text-gray-100 uppercase bg-black dark:bg-gray-700 dark:text-gray-400 text-center p-2.5 font-semibold">Upcoming Classes</h3>
                <div className="px-6">
                    <ul className="pb-3">
                        <span><li className="mt-4 mb-2">Marketing - Batch T28 at 14/03/2025 - 12:30 PM to 13:45 PM</li>
                        <hr className="border-spacing-2 border-gray-400 pb-2" />
                        </span>
                        <span><li className="mt-4  mb-2">HRM - Batch T28 at 14/03/2025 - 12:30 PM to 13:45 PM</li>
                        <hr className="border-spacing-2 border-gray-400 pb-2" />
                        </span>
                        <span><li className="mt-3  mb-2">International Business - Batch T28 at 14/03/2025 - 12:30 PM to 13:45 PM</li>
                        <hr className="border-spacing-2 border-gray-400 pb-2" />
                        </span>
                    </ul>
                </div>
            </div>
        </div>
      );
    };