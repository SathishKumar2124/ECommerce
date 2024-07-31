import { Link } from "react-router-dom";



type Props = {
    id:string;
    title : string;
    image : string;
    price : number
}

export default function BookCard({id,title,image,price}: Props) {
  return (
    <div className="border p-4 rounded mb-2">
        <Link to={`/product/${id}`}>
            <img src={image} alt={image} className="w-full h-32 object-cover mb-2" />
            <h2 className="font-bold">
                {title}
            </h2>
            <p className="">{price}</p>
        </Link>
    </div>
  )
}