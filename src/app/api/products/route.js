export async function GET() {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=5");
    if (!response.ok) {
      throw new Error("Failed to fetch products from the external API");
    }

    const data = await response.json();
    const formattedItems = data.products.map((product) => ({
      id: product.id,
      name: product.title,
      price: product.price,
    }));

    return new Response(JSON.stringify(formattedItems), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching products" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
