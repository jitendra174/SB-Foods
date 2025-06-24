export default function FoodCard({ name, image, price }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-[1.03] cursor-pointer">
      <img
        src={image}
        alt={name}
        className="h-40 w-full object-cover rounded-t-xl"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
        <p className="text-green-600 font-bold mt-1">₹{price}</p>
      </div>
    </div>
  );
}
