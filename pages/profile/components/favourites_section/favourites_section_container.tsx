import { ReactNode } from "react"

const FavouritesSectionContainer = ({children}:{children: ReactNode})=>{
  return (
    <div className="w-full">
      <h3 className="flex text-sm font-semibold p-3 text-dtech-primary-dark">Favourites</h3>
      {children}
    </div>
  );
}

export default FavouritesSectionContainer;