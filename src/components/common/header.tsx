import { db } from "@/db";

import HeaderClient from "./header-client";

const Header = async () => {
  const categories = await db.query.categoryTable.findMany({
    columns: { id: true, name: true, slug: true },
    orderBy: (category, { asc }) => [asc(category.name)],
  });

  return <HeaderClient categories={categories} />;
};

export default Header;
