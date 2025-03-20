import { connectToDatabase } from "@/lib/mongodb";
import { Ad as AdModel } from "@/lib/models/Ads"; // ✅ Renamed to avoid conflict
import { currentUser } from "@clerk/nextjs/server";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

export default async function SellerPage() {
  await connectToDatabase();
  const user = await currentUser();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Please login to see your ads.</p>
      </div>
    );
  }

  const ads = await AdModel.find({ userId: user.id }).sort({ createdAt: -1 }).lean();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Listings</h1>
      {ads.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ads.map((ad: any) => (
            <Card key={ad._id} className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{ad.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {ad.image && (
                  <img
                    src={ad.image}
                    alt={ad.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <p className="text-gray-600">{ad.description}</p>
                <p className="text-blue-700 font-bold mt-2">${ad.price}</p>
              </CardContent>
              <CardFooter>
                {/* <Button variant="outline" className="w-full">
                  Edit Listing
                </Button> */}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="min-h-[50vh] flex items-center justify-center">
          <p className="text-lg font-semibold text-gray-600">
            You have not posted any ads yet.
          </p>
        </div>
      )}
    </div>
  );
}