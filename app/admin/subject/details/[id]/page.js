import Tempage from "./Tempage"


export default async function Page({params}) {
        const {id} = await params
    return (
      <Tempage id={id}/>
    )
}
