// ============================================
// NepStack Products — 1000 Products Array
// ============================================

const categories = ["Tshirts", "Hoodies", "Pants", "Jackets", "Caps", "Bags", "Shoes", "Accessories"];

const productNames = {
    Tshirts: [
        "Oversized Vintage Tee", "Classic Round Neck Tee", "Drop Shoulder Tee",
        "Nepali Flag Print Tee", "Mountain Graphic Tee", "Striped Cotton Tee",
        "Polo Neck T-Shirt", "V-Neck Slim Fit Tee", "Henley Neck T-Shirt",
        "Tie-Dye Street Tee", "Plain Essential Tee", "Typography Print Tee",
        "Abstract Art Tee", "Vintage Washed Tee", "Raglan Sleeve Tee",
        "Crew Neck Premium Tee", "Muscle Fit T-Shirt", "Acid Wash Tee",
        "Pocket Detail Tee", "Colour Block Tee", "Boxy Fit Tee",
        "Longline Curved Tee", "Athletic Dry Tee", "Nepali Script Tee",
        "Embroidered Logo Tee"
    ],
    Hoodies: [
        "Pullover Hoodie", "Zip-Up Hoodie", "Oversized Fleece Hoodie",
        "Cropped Hoodie", "Graphic Print Hoodie", "Plain Essential Hoodie",
        "Sherpa Lined Hoodie", "Kangaroo Pocket Hoodie", "Tech Fleece Hoodie",
        "Colourblock Hoodie", "Nepali Script Hoodie", "Mountain Range Hoodie",
        "Heavyweight Hoodie", "Acid Wash Hoodie", "Half-Zip Hoodie",
        "Washed Cotton Hoodie", "Box Logo Hoodie", "Patchwork Hoodie",
        "Raglan Hoodie", "Hoodie Jacket"
    ],
    Pants: [
        "Slim Fit Joggers", "Cargo Pants", "Straight Leg Trousers",
        "Wide Leg Pants", "Chino Pants", "Classic Sweatpants",
        "Corduroy Pants", "Track Pants", "Relaxed Fit Jeans",
        "Tapered Joggers", "Parachute Pants", "Linen Blend Pants",
        "Utility Pants", "Drawstring Trousers", "Denim Joggers",
        "Pleated Trousers", "Printed Track Pants", "Harem Pants",
        "Nepali Dhaka Pants", "Zip Pocket Joggers"
    ],
    Jackets: [
        "Bomber Jacket", "Denim Jacket", "Puffer Jacket",
        "Windbreaker Jacket", "Track Jacket", "Fleece Jacket",
        "Coach Jacket", "Varsity Jacket", "Quilted Jacket",
        "Rain Jacket", "Sherpa Jacket", "Field Jacket",
        "Harrington Jacket", "Corduroy Jacket", "Down Jacket",
        "Trucker Jacket", "Hiking Shell Jacket", "Overshirt Jacket",
        "Cropped Jacket", "Hooded Windbreaker"
    ],
    Caps: [
        "Classic Baseball Cap", "Snapback Cap", "Bucket Hat",
        "Beanie", "Dad Cap", "Trucker Cap",
        "5-Panel Cap", "Visor Cap", "Fisherman Beanie",
        "Embroidered Cap", "Nepali Topi Cap", "Washed Cotton Cap",
        "Corduroy Cap", "Logo Snapback", "Cuffed Beanie",
        "Camp Cap", "Running Cap", "Sun Hat"
    ],
    Bags: [
        "Canvas Backpack", "Crossbody Bag", "Tote Bag",
        "Drawstring Bag", "Messenger Bag", "Waist Bag",
        "Laptop Backpack", "Duffle Bag", "Sling Bag",
        "Mini Backpack", "Gym Bag", "Pouch Bag",
        "Roll-Top Backpack", "Belt Bag", "Weekender Bag",
        "Utility Bag", "Shoulder Bag", "Travel Backpack"
    ],
    Shoes: [
        "Classic Sneakers", "Canvas Shoes", "Running Shoes",
        "Slip-On Shoes", "High Top Sneakers", "Casual Loafers",
        "Sandals", "Chelsea Boots", "Casual Trainers",
        "Platform Sneakers", "Espadrilles", "Sports Shoes",
        "Hiking Boots", "Retro Sneakers", "Skate Shoes",
        "Chunky Sneakers", "Minimalist Shoes", "Velcro Sneakers"
    ],
    Accessories: [
        "Wrist Watch", "Sunglasses", "Leather Belt",
        "Bi-Fold Wallet", "Socks 3-Pack", "Wool Scarf",
        "Bracelet", "Chain Necklace", "Phone Case",
        "Keychain", "Handkerchief Set", "Compact Umbrella",
        "Ring Set", "Bandana", "Hair Clips Set",
        "Ear Studs Set", "Card Holder", "Tie Set"
    ]
};

const colorOptions = [
    ["Black"], ["White"], ["Navy"], ["Grey"], ["Red"],
    ["Black", "White"], ["Navy", "Grey"], ["Black", "Red"],
    ["White", "Blue"], ["Green", "Black"], ["Maroon"],
    ["Black", "White", "Grey"], ["Olive"], ["Charcoal"],
    ["Beige"], ["Khaki", "Black"]
];

const descriptions = [
    "Premium oversized tee with vintage wash.",
    "Comfortable and stylish, made with 100% cotton.",
    "Trendy design with a modern relaxed fit.",
    "Lightweight and breathable for everyday wear.",
    "Durable stitching with soft inner lining.",
    "Designed for comfort at an affordable price.",
    "Street-ready look with a relaxed silhouette.",
    "Handcrafted in Nepal with premium materials.",
    "Perfect blend of comfort and fashion.",
    "Bold design that stands out from the crowd.",
    "Versatile piece that pairs with any outfit.",
    "Soft stretchable fabric for all-day comfort.",
    "Minimalist design with fine attention to detail.",
    "All-season essential with quality construction.",
    "NepStack signature quality — built to last.",
    "Classic silhouette updated with modern details.",
    "Made for the streets of Kathmandu and beyond.",
    "Effortless style for the modern Nepali wardrobe.",
    "Premium cotton blend with a perfect drape.",
    "Washed finish for a lived-in vintage feel."
];

// Generate 1000 products
const products = [];

(function generateProducts() {
    function seeded(seed) {
        let x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    }

    for (let id = 1; id <= 1000; id++) {
        const r = (n) => seeded(id * 17 + n * 31);

        const category = categories[(id - 1) % 8]; // Even spread
        const names = productNames[category];
        const nameIndex = Math.floor(r(1) * names.length);
        const name = names[nameIndex] + (id > names.length * 8 ? ` V${Math.ceil(id / 50)}` : '');

        const price = Math.floor(r(2) * 4700) + 299;
        const discountPct = Math.floor(r(3) * 31) + 10;
        const originalPrice = Math.round(price / (1 - discountPct / 100));
        const discount = discountPct;

        const allSizes = ["XS", "S", "M", "L", "XL", "XXL"];
        const sStart = Math.floor(r(4) * 2);
        const sEnd = sStart + 3 + Math.floor(r(5) * 2);
        const sizes = allSizes.slice(sStart, Math.min(sEnd, 6));

        const colorSet = colorOptions[Math.floor(r(6) * colorOptions.length)];
        const badge = r(7) < 0.6 ? "FREE DELIVERY" : null;
        const rating = Math.round((3.5 + r(8) * 1.5) * 10) / 10;
        const sold = Math.floor(r(9) * 4990) + 10;
        const stock = Math.floor(r(10) * 95) + 5;
        const desc = descriptions[Math.floor(r(11) * descriptions.length)];

        products.push({
            id: id,
            name: name,
            category: category,
            price: price,
            originalPrice: originalPrice,
            discount: discount,
            sizes: sizes,
            colors: colorSet,
            badge: badge,
            rating: rating,
            sold: sold,
            featured: id >= 1 && id <= 10,
            flashSale: id >= 11 && id <= 30,
            image: "https://picsum.photos/400/400?random=" + id,
            description: desc,
            stock: stock
        });
    }
})();

// ============================================
// Helper Functions
// ============================================
function getProductById(id) {
    return products.find(p => p.id === Number(id));
}

function getProductsByCategory(category) {
    return products.filter(p => p.category === category);
}

function getFeaturedProducts() {
    return products.filter(p => p.featured);
}

function getFlashSaleProducts() {
    return products.filter(p => p.flashSale);
}

function getNewArrivals() {
    return products.slice(30, 38);
}

function searchProducts(query) {
    const q = query.toLowerCase();
    return products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
}

function filterProducts({ category, minPrice, maxPrice, size, sortBy, page = 1, perPage = 40 }) {
    let filtered = [...products];

    if (category) filtered = filtered.filter(p => p.category === category);
    if (minPrice !== undefined) filtered = filtered.filter(p => p.price >= minPrice);
    if (maxPrice !== undefined) filtered = filtered.filter(p => p.price <= maxPrice);
    if (size) filtered = filtered.filter(p => p.sizes.includes(size));

    if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);
    else if (sortBy === 'popularity') filtered.sort((a, b) => b.sold - a.sold);
    else if (sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'newest') filtered.sort((a, b) => b.id - a.id);

    const total = filtered.length;
    const totalPages = Math.ceil(total / perPage);
    const start = (page - 1) * perPage;
    const paginated = filtered.slice(start, start + perPage);

    return { products: paginated, total, totalPages, currentPage: page };
}
