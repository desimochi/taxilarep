// app/student-mapping-edit/[id]/page.jsx
import EditMappingClient from "./EditMappingClient"

export default async function Page({ params }) {
  const id = params.id

  return <EditMappingClient id={id} />
}
