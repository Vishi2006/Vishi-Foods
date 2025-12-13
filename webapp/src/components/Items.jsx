
import { IoCartOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Items = () => {
  const [activeCategory, setActiveCategory] = useState("Thali");
  const [searchQuery, setSearchQuery] = useState("");
  const { cartItems, addToCart, getTotalItems } = useCart();
  const { tableId } = useParams();
  
  // Simple table display name
  const getTableDisplayName = () => {
    return tableId ? `Table ${tableId}` : 'Unknown Table';
  };

  {
    console.log(import.meta.env.VITE_FIREBASE_PROJECT_ID);

  }
  const categories = [
    { id: "thali", name: "Thali" },
    { id: "combos", name: "Combos" },
    { id: "pizza", name: "Pizza" },
    { id: "dessert", name: "Dessert" },
    { id: "shakes", name: "Shakes" },
    { id: "burgers", name: "Burgers" },
  ];

  const menuItems = [
    { id: 1, name: "Chocolate Shake", price: 40, category: "Shakes", image: "https://plus.unsplash.com/premium_photo-1669687173644-21c1381f9183?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2hvY29sYXRlJTIwc2hha2V8ZW58MHx8MHx8fDA%3D" },
    { id: 2, name: "Vanilla Shake", price: 35, category: "Shakes", image: "https://plus.unsplash.com/premium_photo-1695035005979-0682199ef755?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmFuaWxsYSUyMHNoYWtlfGVufDB8fDB8fHww" },
    { id: 3, name: "Strawberry Shake", price: 50, category: "Shakes", image: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3RyYXdiZXJyeSUyMHNoYWtlfGVufDB8fDB8fHww" },
    { id: 4, name: "Banana Shake", price: 30, category: "Shakes", image: "https://plus.unsplash.com/premium_photo-1695035006295-d37b73003e27?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFuYW5hJTIwc2hha2V8ZW58MHx8MHx8fDA%3D" },
    { id: 5, name: "Oreo shake", price: 50, category: "Shakes", image: "https://images.unsplash.com/photo-1641665271888-575e46923776?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 6, name: "Kitkat shake", price: 50, category: "Shakes", image: "https://images.unsplash.com/photo-1714799263245-4fc7cc21911e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2l0a2F0JTIwc2hha2V8ZW58MHx8MHx8fDA%3D" },
    { id: 7, name: "Basic thali", price: 70, category: "Thali", image: "https://images.unsplash.com/photo-1591022132290-26a8144bd9c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFzaWMlMjB0aGFsaXxlbnwwfHwwfHx8MA%3D%3D" },
    { id: 8, name: "Big thali", price: 120, category: "Thali", image: "https://images.unsplash.com/photo-1680993032090-1ef7ea9b51e5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGhhbGl8ZW58MHx8MHx8fDA%3D" },
    { id: 9, name: "Panjabi thali", price: 100, category: "Thali", image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBhbmphYmklMjBmb29kfGVufDB8fDB8fHww" },
    { id: 10, name: "South-Indian thali", price: 100, category: "Thali", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c291dGglMjBpbmRpYW4lMjBmb29kfGVufDB8fDB8fHww" },
    { id: 11, name: "Bahubali thali", price: 200, category: "Thali", image: "https://media.istockphoto.com/id/1205080286/photo/bahubali-paratha-thali.webp?a=1&b=1&s=612x612&w=0&k=20&c=_uFJDVRegzAGtIu6GkuSyQTTsDpzvfF8VZi6SmE-B1I=" },
    { id: 12, name: "Mix thali", price: 150, category: "Thali", image: "https://media.istockphoto.com/id/1391647144/photo/gujarati-thali.webp?a=1&b=1&s=612x612&w=0&k=20&c=OITCY55pvl145xesFOEYMYODYiiLChGpk5BatfgIv5Y=" },
    { id: 13, name: "Pepsi + Burger", price: 120, category: "Combos", image: "https://images.unsplash.com/photo-1603614550145-c7bb90bbfddf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVwc2klMjBidXJnZXJ8ZW58MHx8MHx8fDA%3D" },
    { id: 14, name: "Pepsi + Pizza", price: 120, category: "Combos", image: "https://media.istockphoto.com/id/1224219335/photo/cola-and-tasty-homemade-pizza.webp?a=1&b=1&s=612x612&w=0&k=20&c=Tr9VGQl17JBoCjBUvGAndiWKAc5pi04tkCrUI2WqVAI=" },
    { id: 15, name: "Burger + Pizza", price: 180, category: "Combos", image: "https://media.istockphoto.com/id/2160023759/photo/junk-food-and-unhealthy-food.webp?a=1&b=1&s=612x612&w=0&k=20&c=ibiIFHyyUvV-61ZlSUaoG5qo5OOnOV3CZ3By00hqaMo=" },
    { id: 16, name: "Coke + Fries", price: 130, category: "Combos", image: "https://media.istockphoto.com/id/1366993520/photo/delicious-cheeseburger-with-cola-and-potato-fries-on-the-wooden-table-fast-food-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=dR6IP4mr5EkffSwHHbOuq50NQe_adBc66DgDzL7kvzM=" },
    { id: 17, name: "OTC pizza", price: 60, category: "Pizza", image: "https://media.istockphoto.com/id/1140492277/photo/tandoori-chicken-pizza-on-wooden-table.webp?a=1&b=1&s=612x612&w=0&k=20&c=5CrQuzjWZ7w1i20z0aJu9UII_18oPqYA09Law1rOuQc=" },
    { id: 18, name: "Corn pizza", price: 60, category: "Pizza", image: "https://images.unsplash.com/photo-1620894599483-aefd71cb525f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvcm4lMjBwaXp6YXxlbnwwfHwwfHx8MA%3D%3D" },
    { id: 19, name: "Panner pizza", price: 70, category: "Pizza", image: "https://media.istockphoto.com/id/1388938025/photo/pan-pizza-freshly-baked-with-lot-of-cheese-and-vegetable-and-paneer.webp?a=1&b=1&s=612x612&w=0&k=20&c=UzvkAsSMfkUL3JFN2wPpRHddTW6qlXkry0feC5k_hG8=" },
    { id: 20, name: "Loaded cheez pizza", price: 100, category: "Pizza", image: "https://media.istockphoto.com/id/1280012606/photo/a-picture-of-pizza-with-selective-focus.webp?a=1&b=1&s=612x612&w=0&k=20&c=kqNsdWxRaicPjZQBAxM3-qWDBgylDekDaoBPGmY5GfI=" },
    { id: 21, name: "Tandori pizza", price: 110, category: "Pizza", image: "https://images.unsplash.com/photo-1681567604770-0dc826c870ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRhbmRvcmklMjBwaXp6YXxlbnwwfHwwfHx8MA%3D%3D" },
    { id: 22, name: "Itallian pizza", price: 120, category: "Pizza", image: "https://images.unsplash.com/photo-1693609930470-2eb935294945?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGl0YWxsbGlhbiUyMHBpenphfGVufDB8fDB8fHww" },
    { id: 23, name: "Gulab jamun (2)", price: 50, category: "Dessert", image: "https://media.istockphoto.com/id/163064596/photo/gulab-jamun.webp?a=1&b=1&s=612x612&w=0&k=20&c=F_5_AgCdrsecO13W-wiuCZAwYZPBpN3UETTyYtQQlLM=" },
    { id: 24, name: "Kaju katli (4)", price: 50, category: "Dessert", image: "https://media.istockphoto.com/id/2203353610/photo/kaju-katli-is-a-rich-smooth-indian-sweet-made-from-cashew-nuts-sugar-and-ghee-delicately.webp?a=1&b=1&s=612x612&w=0&k=20&c=5_1m_0MHvQEt3RgjD-55iujyPqIAt--9gUeI-llWZ6w=" },
    { id: 25, name: "Rasmalai (2)", price: 50, category: "Dessert", image: "https://media.istockphoto.com/id/515853026/photo/traditional-rasmalai-or-ras-malai-indian-dessert-bengali-sweet.webp?a=1&b=1&s=612x612&w=0&k=20&c=M_bkgtt4nYVBSvX5RrWxjG-y07gOvCyFH4x9aiQOVZo=" },
    { id: 26, name: "Ghevar (1/4)", price: 50, category: "Dessert", image: "https://media.istockphoto.com/id/845078294/photo/rajasthani-ghevar-or-ghewar-indian-sweets.webp?a=1&b=1&s=612x612&w=0&k=20&c=pBvVIJS3nxKFlpjgaaptS31b35JwA5c5zr4gLy-OOME=" },
    { id: 27, name: "Cham Cham (2)", price: 50, category: "Dessert", image: "https://media.istockphoto.com/id/1415715233/photo/cham-cham-mithai-also-called-rasgulla-malai-chaap-chomchom-or-rosogolla-chamcham-is-made-of.webp?a=1&b=1&s=612x612&w=0&k=20&c=7RGl87Ig6HgBjTNE6TMn1DHVxX0DtktDH0iGXbXDyIU=" },
    { id: 28, name: "Laddu (4)", price: 50, category: "Dessert", image: "https://images.unsplash.com/photo-1605194000384-439c3ced8d15?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFkZHV8ZW58MHx8MHx8fDA%3D" },
    { id: 29, name: "Veg Burger", price: 40, category: "Burgers", image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YnVyZ2VyfGVufDB8fDB8fHww" },
    { id: 30, name: "Doubble tikki Burger", price: 60, category: "Burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww" },
    { id: 31, name: "Cheez Burger", price: 70, category: "Burgers", image: "https://images.unsplash.com/photo-1618538701087-fb7e0312de34?q=80&w=1334&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 32, name: "Tandoori Burger", price: 90, category: "Burgers", image: "https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2hlZXolMjBidXJnZXJ8ZW58MHx8MHx8fDA%3D" },
  ];

  // Handle Category Click
  const handleCategoryChange = (categoryName) => {
    setActiveCategory(categoryName);
  };

  // Handle Search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  // Filter Menu Items (by category + search)
  const filteredItems = menuItems.filter(
    (item) =>
      item.category.toLowerCase().includes(activeCategory.toLowerCase()) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Simple validation - just check if tableId exists
  if (!tableId) {
    return (
      <div className="bg-[#0f132] font-display text-white min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4 text-red-400">No Table Found</h1>
            <p className="text-white/50">Please scan a valid QR code</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0f1323] font-display text-white min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md h-screen flex flex-col overflow-hidden">
        <div className="relative flex h-full w-full flex-col overflow-x-hidden glassmorphism">
          {/* Header */}
          <header className="sticky top-0 z-10 bg-[#0f1323]/80 backdrop-blur-sm flex-shrink-0">
            <div className="flex items-center p-4 pb-2 justify-between">
              <div className="flex-1 text-center">
                <h1 className="text-xl font-bold text-white">VISHFOODS</h1>
              </div>
              <NavLink to={`/table/${tableId}/cart`} className="flex items-center justify-center h-10 w-10 text-white relative">
                  <IoCartOutline className="text-2xl" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#607AFB] text-white text-xs rounded-full px-1">
                      {getTotalItems()}
                    </span>
                  )}
                </NavLink>
            </div>

            {/* Navigation */}
            <nav className="flex border-b border-white/10 px-4 gap-6 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.name)}
                  className={`flex flex-col items-center justify-center border-b-2 py-3 whitespace-nowrap ${
                    activeCategory === category.name
                      ? "border-[#607AFB] text-[#607AFB]"
                      : "border-transparent text-white/50 hover:text-white"
                  }`}
                >
                  <p className="text-sm font-bold">{category.name}</p>
                </button>
              ))}
            </nav>
          </header>

          {/* Main Content */}
          <main className="flex-1 flex flex-col p-4 space-y-4 overflow-hidden">
            {/* Search Bar */}
            <div className="relative flex-shrink-0">
              <input
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/50 focus:ring-2 focus:ring-[#607AFB] focus:outline-none"
                placeholder="Search for food items..."
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <IoIosSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 text-xl" />
            </div>


            {/* Menu Items Grid */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 pb-4">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="glassmorphism p-3 rounded-xl flex flex-col h-full"
                    >
                      <div
                        className="w-full h-24 bg-center bg-no-repeat bg-cover rounded-lg mb-2 bg-gray-700"
                        style={item.image ? { backgroundImage: `url("${item.image}")` } : {}}
                      ></div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm text-white/50">{item.category}</p>
                        <p className="text-base font-bold text-white">{item.name}</p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-base font-semibold text-[#607AFB]">
                          {item.price} ₹
                        </p>
                        <button
                          onClick={() => addToCart(item)}
                          className="flex items-center justify-center h-8 w-8 rounded-full bg-[#607AFB] text-white hover:bg-[#607AFB]/80 transition-colors"
                        >
                          <IoMdAdd />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-white/50">No items found.</p>
                </div>
              )}
            </div>

            
              <div className="w-full border-b-2 border-[#607AFB] text-[#607AFB] text-center py-2 font-semibold">
                Your order from {getTableDisplayName()}.
              </div>
        

          </main>
        </div>
      </div>
    </div>
  );
};

export default Items;