// Mock data for the e-commerce site
const products = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      description: "Premium noise-cancelling headphones with 30-hour battery life and comfortable over-ear design.",
      price: 199.99,
      rating: 4.7,
      reviewCount: 128,
      category: "electronics",
      image: "/placeholder.svg?height=300&width=300",
      stock: 15,
      featured: true,
      deal: false,
      images: [
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300"
      ]
    },
    {
      id: 2,
      name: "Smartphone X Pro",
      description: "Latest flagship smartphone with 6.7-inch OLED display, 5G connectivity, and professional-grade camera system.",
      price: 999.99,
      rating: 4.8,
      reviewCount: 256,
      category: "electronics",
      image: "/placeholder.svg?height=300&width=300",
      stock: 10,
      featured: true,
      deal: true,
      images: [
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300"
      ]
    },
    {
      id: 3,
      name: "Men's Casual Jacket",
      description: "Stylish and comfortable jacket perfect for everyday wear. Water-resistant and available in multiple colors.",
      price: 79.99,
      rating: 4.5,
      reviewCount: 92,
      category: "clothing",
      image: "/placeholder.svg?height=300&width=300",
      stock: 25,
      featured: false,
      deal: true,
      images: [
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300"
      ]
    },
    {
      id: 4,
      name: "Smart Home Speaker",
      description: "Voice-controlled smart speaker with premium sound quality and integrated virtual assistant.",
      price: 129.99,
      rating: 4.6,
      reviewCount: 175,
      category: "electronics",
      image: "/placeholder.svg?height=300&width=300",
      stock: 20,
      featured: true,
      deal: false,
      images: [
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300"
      ]
    },
    {
      id: 5,
      name: "Stainless Steel Cookware Set",
      description: "Professional-grade 10-piece cookware set made from durable stainless steel with ergonomic handles.",
      price: 249.99,
      rating: 4.9,
      reviewCount: 64,
      category: "home",
      image: "/placeholder.svg?height=300&width=300",
      stock: 8,
      featured: false,
      deal: true,
      images: [
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300"
      ]
    },
    {
      id: 6,
      name: "Bestselling Novel",
      description: "The latest bestselling fiction novel that's captivating readers worldwide. Available in hardcover and paperback.",
      price: 24.99,
      rating: 4.7,
      reviewCount: 312,
      category: "books",
      image: "/placeholder.svg?height=300&width=300",
      stock: 50,
      featured: true,
      deal: false,
      images: [
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300"
      ]
    },
    {
      id: 7,
      name: "Women's Running Shoes",
      description: "Lightweight and supportive running shoes with responsive cushioning and breathable mesh upper.",
      price: 119.99,
      rating: 4.6,
      reviewCount: 87,
      category: "clothing",
      image: "/placeholder.svg?height=300&width=300",
      stock: 18,
      featured: false,
      deal: true,
      images: [
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300"
      ]
    },
    {
      id: 8,
      name: "4K Smart TV",
      description: "55-inch 4K Ultra HD Smart TV with HDR and built-in streaming apps for the ultimate entertainment experience.",
      price: 599.99,
      rating: 4.8,
      reviewCount: 143,
      category: "electronics",
      image: "/placeholder.svg?height=300&width=300",
      stock: 12,
      featured: true,
      deal: true,
      images: [
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300"
      ]
    },
    {
      id: 9,
      name: "Coffee Maker",
      description: "Programmable coffee maker with thermal carafe that keeps coffee hot for hours without burning.",
      price: 89.99,
      rating: 4.5,
      reviewCount: 76,
      category: "home",
      image: "/placeholder.svg?height=300&width=300",
      stock: 22,
      featured: false,
      deal: false,
      images: [
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300"
      ]
    },
    {
      id: 10,
      name: "Fitness Tracker",
      description: "Advanced fitness tracker with heart rate monitoring, sleep tracking, and 7-day battery life.",
      price: 79.99,
      rating: 4.4,
      reviewCount: 215,
      category: "electronics",
      image: "/placeholder.svg?height=300&width=300",
      stock: 30,
      featured: true,
      deal: false,
      images: [
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300"
      ]
    },
    {
      id: 11,
      name: "Desk Chair",
      description: "Ergonomic office chair with adjustable height, lumbar support, and breathable mesh back.",
      price: 149.99,
      rating: 4.6,
      reviewCount: 58,
      category: "home",
      image: "/placeholder.svg?height=300&width=300",
      stock: 15,
      featured: false,
      deal: true,
      images: [
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300"
      ]
    },
    {
      id: 12,
      name: "Cookbook Collection",
      description: "Set of 3 bestselling cookbooks covering everything from quick weeknight meals to gourmet dinner parties.",
      price: 49.99,
      rating: 4.7,
      reviewCount: 42,
      category: "books",
      image: "/placeholder.svg?height=300&width=300",
      stock: 20,
      featured: false,
      deal: false,
      images: [
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300",
        "/placeholder.svg?height=300&width=300"
      ]
    }
  ];
  
  // Mock reviews data
  const reviews = [
    {
      id: 1,
      productId: 1,
      author: "John D.",
      date: "2023-05-15",
      rating: 5,
      title: "Best headphones I've ever owned",
      content: "The sound quality is amazing and the noise cancellation works perfectly. Battery life is as advertised - I can go days without charging. Very comfortable to wear for long periods too."
    },
    {
      id: 2,
      productId: 1,
      author: "Sarah M.",
      date: "2023-04-28",
      rating: 4,
      title: "Great sound, slightly tight fit",
      content: "The sound quality and noise cancellation are excellent. My only complaint is that they're a bit tight on my head after a few hours of use. Otherwise, they're perfect."
    },
    {
      id: 3,
      productId: 1,
      author: "Michael T.",
      date: "2023-06-02",
      rating: 5,
      title: "Worth every penny",
      content: "These headphones have transformed my daily commute. The noise cancellation blocks out all the subway noise, and the sound quality is crisp and clear. Highly recommend!"
    },
    {
      id: 4,
      productId: 2,
      author: "Emily R.",
      date: "2023-05-20",
      rating: 5,
      title: "Amazing camera quality",
      content: "I upgraded from last year's model and the camera improvements are significant. The battery life is also much better. Very happy with this purchase!"
    },
    {
      id: 5,
      productId: 2,
      author: "David K.",
      date: "2023-06-05",
      rating: 4,
      title: "Great phone but expensive",
      content: "This is definitely a premium smartphone with all the latest features. The display is gorgeous and performance is top-notch. My only hesitation is the high price, but you get what you pay for."
    }
  ];
  
  // Mock user data
  const users = [
    {
      id: 1,
      name: "Demo User",
      email: "demo@example.com",
      password: "password123" // In a real app, this would be hashed
    }
  ];
  
  // Mock orders data
  const orders = [
    {
      id: "ORD12345",
      userId: 1,
      date: "2023-06-10",
      status: "Delivered",
      items: [
        {
          productId: 1,
          quantity: 1,
          price: 199.99
        },
        {
          productId: 6,
          quantity: 2,
          price: 24.99
        }
      ],
      shipping: 5.99,
      tax: 18.00,
      total: 273.97,
      shippingAddress: {
        name: "Demo User",
        address: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
        country: "US"
      },
      paymentMethod: {
        type: "Credit Card",
        last4: "1234"
      }
    }
  ];
  
  // Mock addresses data
  const addresses = [
    {
      id: 1,
      userId: 1,
      name: "Demo User",
      address: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      country: "US",
      phone: "555-123-4567",
      isDefault: true
    }
  ];
  
  // Mock payment methods data
  const paymentMethods = [
    {
      id: 1,
      userId: 1,
      type: "Credit Card",
      cardName: "Demo User",
      last4: "1234",
      expiry: "12/25",
      isDefault: true
    }
  ];
  
  // Mock wishlist data
  const wishlist = [
    {
      userId: 1,
      productIds: [3, 5, 8]
    }
  ];
  
  // Export the data
  if (typeof window !== 'undefined') {
    window.shopData = {
      products,
      reviews,
      users,
      orders,
      addresses,
      paymentMethods,
      wishlist
    };
  }
  