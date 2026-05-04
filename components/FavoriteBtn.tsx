import { Heart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const FavoriteBtn = () => {
  return (
    <Link href={"/cart"} className="group relative">
      <Heart className='w-5 h-5 hover:text-shop_dark_green hoverEffect' />
      <span className="absolute -top-1 -right-1 bg-shop_dark_green text-white text-xs font-semibold rounded-full flex justify-center item-center h-3. w-3.5">0</span>
    </Link>
  )
}

export default FavoriteBtn 