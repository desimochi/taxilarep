import Temp from "./Temo"

export default async function Page({params}){
  const {id} = await params
  return <Temp id={id}/>
}