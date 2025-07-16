import { ImageSourcePropType } from "react-native";

export type Seller = {
  id: string;
  category: string;
  name: string;
  price: number;
  rating?: number;
  deliveryTime?: string;
  deliveryType?: string;
  image?: ImageSourcePropType; // local or remote
  unavailableDates?: string[]; // dates when the seller is unavailable
};
