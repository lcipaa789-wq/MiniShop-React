import {
  Grid,
  HelpCircle,
  Home,
  ShoppingBag,
  Tag,
  TrendingUp,
  User,
} from "lucide-react";

export const menuItems = [
  { icon: <Home size={18} />, label: "Home", href: "/" },
  { icon: <Grid size={18} />, label: "Catalog", href: "/" },
  { icon: <TrendingUp size={18} />, label: "Top Sales", href: "/?sort=top" },
  { icon: <Tag size={18} />, label: "Sales", href: "/?discount=true" },
  { icon: <ShoppingBag size={18} />, label: "My Orders", href: "/orders" },
  { icon: <User size={18} />, label: "Profile", href: "/profile" },
  { icon: <HelpCircle size={18} />, label: "Help", href: "/help" },
];
