export default function SubjectTopperTable({ subjects }) {
  const getRankLabel = (index) => {
    if (index === 0) return "1st";
    if (index === 1) return "2nd";
    if (index === 2) return "3rd";
    return `${index + 1}th`;
  };

  return (
    <div className="overflow-x-auto rounded-md">
      <table className="min-w-full text-sm text-left bg-white">
        <thead className="bg-red-50 text-xs text-red-700 uppercase">
          <tr>
            <th className="px-4 py-2 border">Subject Name</th>
            <th className="px-4 py-2 border">Rank</th>
            <th className="px-4 py-2 border">Topper</th>
            <th className="px-4 py-2 border">Marks</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) =>
            subject.top_3.map((student, idx) => (
              <tr key={`${subject.subject_id}-${student.student_id}-${idx}`} className="hover:bg-gray-50">
                {idx === 0 && (
                  <>
                    <td className="px-4 py-2 border" rowSpan={subject.top_3.length}>
                      {subject.subject_name} {subject.term_name} {subject.subject_type}
                    </td>
                  </>
                )}
                <td className="px-4 py-2 border">
                  <span
                    className={`font-semibold ${
                      idx === 0 ? "text-yellow-600" : "text-gray-600"
                    }`}
                  >
                    {getRankLabel(idx)}
                  </span>
                </td>
                <td className="px-4 py-2 border">{student.student_name}</td>
                <td className="px-4 py-2 border font-medium text-indigo-600">
                  {student.total_marks}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
