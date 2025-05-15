// app/student-mapping-edit/[id]/page.jsx
import EditMappingClient from "./EditMappingClient"
export default async function Page({ params }) {
  const id = params.id

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/student-mapping-edit/${id}`, {
    cache: 'no-store', // or 'force-cache' depending on needs
    headers: {
      // add auth headers if needed for server-side call
    }
  })

  if (!res.ok) {
    throw new Error("Failed to fetch student mapping data.")
  }

  const response = await res.json()

  const data = response.data.map(item => ({
    ...item,
    checked: item.checked,
  }))

  return <EditMappingClient id={id} data={data} extra={response.extra} />
}
