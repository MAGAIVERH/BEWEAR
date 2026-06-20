"use server";

import { db } from "@/db";

export const getCategories = async () => {
  return db.query.categoryTable.findMany({
    columns: { id: true, name: true, slug: true },
    orderBy: (category, { asc }) => [asc(category.name)],
  });
};
