import AddForm from '@/components/addAlunos'
import GetAlunosNivel from '@/components/getAlunosNivel'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="">
      <GetAlunosNivel/>
      <AddForm/>
    </main>
  )
}
