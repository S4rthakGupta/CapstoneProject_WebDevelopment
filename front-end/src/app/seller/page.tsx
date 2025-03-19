import { connectToDatabase } from "@/lib/mongodb";
import { Ad as AdModel } from "@/lib/models/Ads"; // ✅ Renamed to avoid conflict
import { currentUser } from "@clerk/nextjs/server";

export default async function SellerPage() {
  await connectToDatabase();
  const user = await currentUser();

  if (!user) {
    return <p>Please login to see your ads.</p>;
  }

  const ads = await AdModel.find({ userId: user.id }).sort({ createdAt: -1 }).lean();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Listings</h1>
      {ads.length > 0 ? (
        ads.map((ad: any) => (
          <div key={ad._id} className="p-4 border rounded-lg mb-4 shadow-md">
            <h2 className="text-xl font-semibold">{ad.title}</h2>
            <p>{ad.description}</p>
            <p className="font-bold">${ad.price}</p>
            {ad.image && (
              <img
                src={ad.image}
                alt={ad.title}
                className="w-full h-48 object-cover rounded-md mt-2"
              />
            )}
          </div>
        ))
      ) : (
        <p>You have not posted any ads yet.</p>
      )}
    </div>
  );
}