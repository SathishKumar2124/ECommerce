import {  useEffect, useState } from "react"
import { useFilter } from "./FilterContext"


type Product = {
    category : string
}

interface FetchResponse{
    products : Product[]
}

export default function Sidebar() {

        const {searchQuery,
            setSearchQuery,
            selectedCategory,
            setSelectedCategory,
            minPrice,
            setMinPrice,
            maxPrice,
            setMaxPrice,
            setKeyword} = useFilter()

    const [catagories,setCatagories] = useState<string[]>([])
    const [keywords] = useState<string[]>([
        "apple",
        "watch",
        "fashion",
        "trend",
        "shoes",
        "shirt"
    ])

    useEffect(()=>{
        const fetchCatgories = async() => {
            try {
                const response = await fetch('https://dummyjson.com/products')
                const data : FetchResponse = await response.json()
                
                const uniqueCatagories = Array.from(new Set(data.products.map((product) => product.category )))
                setCatagories(uniqueCatagories);
                
            } catch (error) {
                console.log("error fetching products!!");   
            }
        }
        fetchCatgories()
    },[])

    
    

    const handleChangeCategory = (category : string) => {
        setSelectedCategory(category)
    }

    const handleKeywordClick = (keyword : string) => {
        setKeyword(keyword)
    }

    const handleResetFilter = () => {
        setSearchQuery('')
        setMinPrice(undefined);
        setSelectedCategory('')
        setMaxPrice(undefined)
        setKeyword('')
    }

  return (
    <div className="w-64 p-5 h-screen">
        <h1 className="text-2xl font-bold mb-10 mt-4">
            React Store
        </h1>
        <section>
            <input type="text" className="border-2 border-gray-300 rounded sm:mb-0 w-full outline-none" placeholder="search products" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="flex justify-center items-center">
                <input type="text" className="border-2 mr-2 px-5 py-3 mb-3 w-full" placeholder="min" value={minPrice ? minPrice : '' } onChange={(e) => setMinPrice(parseFloat(e.target.value))} />
                <input type="text" className="border-2 mr-2 px-5 py-3 mb-3 w-full" placeholder="max" value={maxPrice ? maxPrice : ''} onChange={(e) => setMaxPrice(parseFloat(e.target.value))}  />
            </div>

                <div className="mb-5">
                    <h2 className="text-xl font-semibold mb-3">
                        Catagories
                    </h2>
                </div>
                <section>
                {
                    catagories.map((category,index) => (
                        <label key={index} className="block mb-2">
                            <input type="radio" name="category" value={category} onChange={() => handleChangeCategory(category)} className="mr-2 w-[16px] h-[16px]" checked={selectedCategory === category} />
                            {category.toUpperCase()}
                        </label>
                    ))
                }
                </section>
                    
                <div className="mb-5">
                    <h2 className="text-xl font-semibold mb-3">Keywords</h2>
                    <div className="">
                        {keywords.map((keyword,index) => (
                            <button key={index} className="block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200"  onClick={() => handleKeywordClick(keyword)}>
                                {keyword.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                <button className="w-full mb-[4rem] mt-5 bg-black text-white rounded py-2" onClick={handleResetFilter}>Reset</button>

        </section>
    </div>
  )
}