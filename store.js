const PRODUCT_CATEGORIES = [
    "Electronics",
    "Accessories",
    "Audio",
    "Gadgets"
];

const PRODUCT_VARIANTS = {
    colors: [
        { name: 'Black', value: '#000000' },
        { name: 'White', value: '#FFFFFF' },
        { name: 'Silver', value: '#C0C0C0' },
        { name: 'Gold', value: '#FFD700' },
        { name: 'Rose Gold', value: '#B76E79' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    storage: ['64GB', '128GB', '256GB', '512GB', '1TB']
};

const SAMPLE_PRODUCTS = [
    {
        id: 1,
        name: "Wireless Headphones Pro",
        price: 299.99,
        description: "Premium wireless headphones with active noise cancellation, featuring high-fidelity audio drivers and 30-hour battery life. Perfect for audiophiles and professionals.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
        category: "Audio",
        tags: ["wireless", "bluetooth", "noise-cancelling", "premium"],
        discount: 15,
        salesCount: 150,
        stock: 50,
        variants: {
            colors: ['Black', 'White', 'Silver'],
            sizes: null,
            storage: null
        },
        averageRating: 4.5,
        reviewCount: 128,
        reviews: [
            {
                id: 1,
                userId: "user1",
                userName: "John D.",
                rating: 5,
                title: "Amazing Sound Quality",
                comment: "These headphones are incredible! The noise cancellation is top-notch.",
                createdAt: "2024-01-15T10:30:00Z",
                likes: 24,
                verified: true
            },
            {
                id: 2,
                userId: "user2",
                userName: "Sarah M.",
                rating: 4,
                title: "Great but Battery Life Could Be Better",
                comment: "Sound quality is excellent, but battery life is shorter than advertised.",
                createdAt: "2024-01-10T15:45:00Z",
                likes: 12,
                verified: true
            }
        ]
    },
    {
        id: 2,
        name: "Smart Watch Elite",
        price: 399.99,
        description: "Advanced smartwatch with health monitoring, GPS, and seamless connectivity. Features a bright AMOLED display and premium build quality.",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80",
        category: "Electronics",
        tags: ["smartwatch", "fitness", "health", "premium"],
        discount: 10,
        salesCount: 200,
        stock: 75,
        variants: {
            colors: ['Black', 'Silver', 'Gold', 'Rose Gold'],
            sizes: null,
            storage: ['64GB', '128GB']
        },
        averageRating: 4.7,
        reviewCount: 156,
        reviews: [
            {
                id: 3,
                userId: "user3",
                userName: "Mike R.",
                rating: 5,
                title: "Best Smartwatch Ever",
                comment: "The health features are incredibly accurate. Battery life is amazing!",
                createdAt: "2024-01-18T14:20:00Z",
                likes: 31,
                verified: true
            }
        ]
    },
    {
        id: 3,
        name: "Wireless Earbuds Plus",
        price: 159.99,
        description: "True wireless earbuds with exceptional sound quality, active noise cancellation, and compact charging case.",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80",
        category: "Audio",
        tags: ["wireless", "earbuds", "portable", "premium"],
        discount: 20,
        salesCount: 300,
        stock: 100,
        variants: {
            colors: ['Black', 'White'],
            sizes: null,
            storage: null
        },
        averageRating: 4.6,
        reviewCount: 89,
        reviews: []
    },
    {
        id: 4,
        name: "Professional Camera Drone",
        price: 999.99,
        description: "High-end camera drone with 4K video, advanced stabilization, and 30-minute flight time.",
        image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=500&q=80",
        category: "Electronics",
        tags: ["drone", "camera", "professional", "4K"],
        discount: 5,
        salesCount: 75,
        stock: 25,
        variants: {
            colors: ['Black', 'White'],
            sizes: null,
            storage: ['128GB', '256GB']
        },
        averageRating: 4.8,
        reviewCount: 45,
        reviews: []
    },
    {
        id: 5,
        name: "Smart Home Hub",
        price: 199.99,
        description: "Central smart home controller with voice control, automation features, and wide device compatibility.",
        image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=500&q=80",
        category: "Gadgets",
        tags: ["smart home", "automation", "voice control"],
        discount: 0,
        salesCount: 120,
        stock: 60,
        variants: {
            colors: ['White', 'Black'],
            sizes: null,
            storage: null
        },
        averageRating: 4.4,
        reviewCount: 67,
        reviews: []
    }
];

const saveReview = async (reviewData) => {
    try {
        const review = await trickleCreateObject('review', reviewData);
        return review;
    } catch (error) {
        console.error('Error saving review:', error);
        throw error;
    }
};

const getProductReviews = async (productId) => {
    try {
        const reviews = await trickleListObjects(`review:${productId}`);
        return reviews.items;
    } catch (error) {
        console.error('Error getting reviews:', error);
        throw error;
    }
};

const updateReviewLikes = async (reviewId, likes) => {
    try {
        await trickleUpdateObject('review', reviewId, { likes });
        return true;
    } catch (error) {
        console.error('Error updating review likes:', error);
        throw error;
    }
};
