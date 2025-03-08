import { EyeIcon } from "@heroicons/react/24/outline";

export default function ClassOverview(){
    const products = [
        { name: 'Marketing', color: '20', category: '8', price: '12' },
        { name: 'Human Resource', color: '20', category: '6', price: '14' },
        { name: 'International Business', color: '20', category: '3', price: '17' },
      ];
    
      return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400">
            <thead className="text-xs text-gray-100 uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Subject Name</th>
                <th scope="col" className="px-6 py-3">Total Classes</th>
                <th scope="col" className="px-6 py-3">Taken</th>
                <th scope="col" className="px-6 py-3">Remaning</th>
                <th scope="col" className="px-6 py-3">See Details</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                   <td className="px-6 py-4">
                    {product.name}
                  </td>
                  <td className="px-6 py-4">{product.color}</td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">{product.price}</td>
                  <td className="px-6 py-4 ">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      See Details
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };