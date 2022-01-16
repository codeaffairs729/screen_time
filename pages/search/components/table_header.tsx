import {ReactNode} from 'react';

const TableHeader = ()=>{
  return (
    <>
        <HeaderItem>
          Dataset
        </HeaderItem>
        <HeaderItem>
          Popularity
        </HeaderItem>
        <HeaderItem>
          Quality
        </HeaderItem>
        <HeaderItem>
          Last updated
        </HeaderItem>
        <HeaderItem>
          Last Download
        </HeaderItem>
        <HeaderItem>
          Favourites
        </HeaderItem>
      </>
  )
}

const HeaderItem = ({children}: {children: ReactNode})=>{
  return <div className="text-sm font-bold">
    {children}
  </div>
}

export default TableHeader;