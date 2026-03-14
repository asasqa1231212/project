/**
 * Script to get distinct categories from database
 * Usage: pnpm exec tsx scripts/get-categories-from-db.ts
 * 
 * Requires DATABASE_URL environment variable
 */

import { prisma } from "@/lib/prisma";

async function main() {
  try {
    // Get distinct categories from MasterProduct that have retailer links
    const categories = await prisma.masterProduct.findMany({
      where: {
        retailerLinks: {
          some: {}
        }
      },
      select: {
        category: true
      },
      distinct: ['category'],
      orderBy: {
        category: 'asc'
      }
    });
    
    const categoryList = categories.map(c => c.category);
    console.log(JSON.stringify(categoryList));
  } catch (error) {
    console.error('Error fetching categories:', error);
    process.exit(1);
  }
}

main();
