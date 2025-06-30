import SubjectTopperTable from "./SubjectTopperCard";

export default function BatchTopperTable({ batch }) {
  const sortedSubjects = batch.subjects.map((subject) => ({
    ...subject,
    top_3: subject.top_3 ? [...subject.top_3].sort((a, b) => b.total_marks - a.total_marks) : [],
  }));

  return (
    <div className="mb-10">
      <h2 className=" font-semibold text-red-700 mb-3">
        Batch: {batch.batch_name}
      </h2>
      <SubjectTopperTable subjects={sortedSubjects} />
    </div>
  );
}
