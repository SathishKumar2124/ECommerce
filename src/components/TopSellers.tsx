import { useEffect, useState } from "react"


type Props = {}

interface Author{
    name : string;
    isFollowing : boolean;
    image : string;
}

const TopSellers = ({}: Props) => {
    const [author,setAuthor] = useState<Author[]>([])
    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch(`https://randomuser.me/api/?results=5`)
                const data = await response.json()

                const authorsData : Author[] = data.results.map((user : any) => ({
                    name : `${user.name.first} ${user.name.last}`,
                    isFollowing : false,
                    image : user.picture.medium
                }))

                setAuthor(authorsData)

            } catch (error) {
                console.log(error);
                
            }
        }

        fetchData()

    },[])

    const handleFollowClick = (index : number) => {
        setAuthor(prev => prev.map((auth,i) => i == index ? {...auth,isFollowing : !auth.isFollowing} : auth))
    }

  return (
    <div className="bg-white p-5 mx-5 mt-5 border w-[23rem] rounded">
        <h2 className="text-xl font-bold mb-5">Top Sellers</h2>
        <ul>
            {author.map((auth , index) => (
                <li key={index} className="flex items-center justify-between mb-4">
                    <section className="flex justify-center items-center">
                        <img src={auth.image} alt={auth.name} className="w-[25%] h-[25%] justify-center rounded-full" />
                        <span className="ml-4">{auth.name}</span>
                    </section>
                    <button onClick={() => handleFollowClick(index)} className={`py-1 px-3 rounded ${auth.isFollowing ? 'bg-red-500 text-white' : ' bg-black text-white' }`}>{auth.isFollowing ? "Unfollow" : "Follow"}</button>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default TopSellers