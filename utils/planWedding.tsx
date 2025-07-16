// // utils/planWedding.ts

import { Seller } from "@/types/seller_types";

// interface Seller {
//   id: string;
//   category: string;
//   name: string;
//   price: number;
// }

// interface PlanResult {
//   commission: number;
//   services: Seller[];
//   totalUsed: number;
//   remaining: number;
// }

// export function planWedding(
//   budget: number,
//   sellers: Seller[],
//   categories: string[]
// ): PlanResult {
//   const commission = budget * 0.1;
//   const effectiveBudget = budget - commission;

//   const selectedServices: Seller[] = [];
//   let used = 0;

//   for (let category of categories) {
//     // Get all sellers in that category, sorted by price
//     const options = sellers
//       .filter((s) => s.category === category)
//       .sort((a, b) => a.price - b.price);

//     // Pick the cheapest seller that fits remaining budget
//     for (let seller of options) {
//       if (seller.price + used <= effectiveBudget) {
//         selectedServices.push(seller);
//         used += seller.price;
//         break;
//       }
//     }
//   }

//   return {
//     commission,
//     services: selectedServices,
//     totalUsed: used,
//     remaining: effectiveBudget - used,
//   };
// }


export function planWedding(
  budget: number,
  sellers: Seller[],
  categories: string[]
) {
  const commission = budget * 0.1;
  const usableBudget = budget - commission;

  const categoryMap: Record<string, Seller[]> = {};

  // Group sellers by category and sort by price ascending
  for (const category of categories) {
    const options = sellers
      .filter((s) => s.category === category)
      .sort((a, b) => a.price - b.price);
    categoryMap[category] = options;
  }

  return {
    commission,
    usableBudget,
    sellersByCategory: categoryMap,
  };
}
