import type { NextRequest } from "next/server";

import productsData from "@/data/products.json";
import type { Product } from "@/types/product";

export const dynamic = "force-dynamic";

const products = productsData as Product[];

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

function parseNumber(value: string | null): number | undefined {
  if (value === null || value.trim() === "") return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}


function parsePrice(value: string | null): number | undefined {
  const n = parseNumber(value);
  return n !== undefined && n >= 0 ? n : undefined;
}

function parsePage(value: string | null): number {
  const n = parseNumber(value);
  if (n === undefined) return DEFAULT_PAGE;
  return Math.max(1, Math.floor(n));
}

function parseLimit(value: string | null): number {
  const n = parseNumber(value);
  if (n === undefined) return DEFAULT_LIMIT;
  return Math.min(MAX_LIMIT, Math.max(1, Math.floor(n)));
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const search = (searchParams.get("search") ?? "").trim().toLowerCase();
  const category = (searchParams.get("category") ?? "").trim().toLowerCase();
  const minPrice = parsePrice(searchParams.get("minPrice"));
  const maxPrice = parsePrice(searchParams.get("maxPrice"));
  const rating = parseNumber(searchParams.get("rating"));
  const sort = (searchParams.get("sort") ?? "").trim();
  const page = parsePage(searchParams.get("page"));
  const limit = parseLimit(searchParams.get("limit"));

  let filtered = products;

  if (category) {
    filtered = filtered.filter((p) => p.category.toLowerCase() === category);
  }

  if (search) {
    filtered = filtered.filter((p) =>
      `${p.title} ${p.description} ${p.brand} ${p.category}`
        .toLowerCase()
        .includes(search),
    );
  }

  if (minPrice !== undefined) {
    filtered = filtered.filter((p) => p.price >= minPrice);
  }

  if (maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.price <= maxPrice);
  }

  if (rating !== undefined) {
    filtered = filtered.filter((p) => p.rating >= rating);
  }

  const sorted = [...filtered];
  switch (sort) {
    case "price-low":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
      break;
    case "newest":
      sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      break;
    default:
      break;
  }

  const total = sorted.length;
  const totalPages = total === 0 ? 0 : Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paged = sorted.slice(start, start + limit);

  return Response.json({
    products: paged,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1 && totalPages > 0,
    },
  });
}
