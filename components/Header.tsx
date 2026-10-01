import HeaderClient from "@/components/HeaderClient";
import { getMenuCategories } from "@/lib/wordpress";

// Busca as marcas do submenu "Reparo de Notebooks" no build. O cabeçalho em
// si é client component (menu mobile), então os dados chegam por prop.
export default async function Header() {
  const categorias = await getMenuCategories();
  return <HeaderClient categorias={categorias.map(({ name, slug }) => ({ name, slug }))} />;
}
