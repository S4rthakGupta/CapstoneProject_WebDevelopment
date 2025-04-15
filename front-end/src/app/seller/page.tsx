// import { connectToDatabase } from "@/lib/mongodb";
// import { Ad as AdModel } from "@/lib/models/Ads"; // ✅ Renamed to avoid conflict
// import { currentUser } from "@clerk/nextjs/server";
// import {
//   Card,
//   // CardHeader,
//   // CardTitle,
//   CardContent,
//   // CardFooter,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// // import CreateAdDialog from "@/components/ui/CreateAdDialog";

// export default async function SellerPage() {
//   await connectToDatabase();
//   const user = await currentUser();

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-lg font-semibold">Please login to see your ads.</p>
//       </div>
//     );
//   }

//   const ads = await AdModel.find({ userId: user.id })
//     .sort({ createdAt: -1 })
//     .lean();

//   return (
//     <section className="w-full px-6 py-30 bg-background text-foreground">
//       <div className="p-6">
//         <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
//           My Listings
//         </h1>
//         {ads.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {ads.map((ad: any) => (
//               <Card
//                 key={ad._id}
//                 className="flex flex-col justify-between h-[450px] border rounded-lg shadow-md overflow-hidden bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200"
//               >
//                 <div className="relative w-full h-48">
//                   {ad.image && (
//                     <img
//                       src={ad.image}
//                       alt={ad.title}
//                       className="w-full h-full object-cover"
//                     />
//                   )}
//                 </div>
//                 <CardContent className="p-4 flex flex-col flex-1">
//                   <h3 className="font-semibold text-lg truncate text-gray-800 dark:text-gray-200">
//                     {ad.title}
//                   </h3>
//                   <p className="text-[#92DCE5] font-bold mt-2 dark:text-[#92DCE5]">
//                     ${ad.price}
//                   </p>
//                   <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
//                     📍 {ad.location}
//                   </p>
//                   <div className="mt-auto flex flex-col gap-2">
//                     <Button
//                       variant="default"
//                       className="w-full bg-[#92DCE5] text-white hover:bg-[#6FBACD] dark:bg-[#6FBACD] dark:hover:bg-[#5CA9B5]"
//                     >
//                       Edit Listing
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         ) : (
//           <div className="min-h-[50vh] flex items-center justify-center">
//             <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">
//               You have not posted any ads yet.
//             </p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

//new code
// app/(dashboard)/seller/page.tsx

import { currentUser } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Ad } from "@/lib/models/Ads";
import SellerClient from "@/app/seller/SellerClient";

export default async function SellerPage() {
  await connectToDatabase();
  const user = await currentUser();

  if (!user) {
    return <div>Please login to see your ads.</div>;
  }

  const ads = await Ad.find({ userId: user.id }).lean();

  return <SellerClient ads={ads} />;
}
