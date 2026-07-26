import { useState } from 'react'
import { FiTrash2, FiShoppingBag, FiArrowRight, FiCheckCircle, FiShield, FiTag } from 'react-icons/fi'

export function CartPage({ setCurrentPage }) {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Visiting Cards - Premium Matte',
      qty: 250,
      paper: '350gsm Premium Matte',
      finish: 'Gold Foil Accent',
      unitPrice: 0.8,
      totalPrice: 449,
      image: 'https://images.unsplash.com/photo-1612831819695-7e71f5ccf16c?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 2,
      name: 'Tri-Fold Marketing Pamphlets',
      qty: 500,
      paper: '170gsm Gloss Art Paper',
      finish: 'None',
      unitPrice: 1.8,
      totalPrice: 899,
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=600',
    },
  ])

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0)
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99
  const total = subtotal + shipping

  return (
    <div className="bg-[#FAFBFD] font-sans min-h-screen text-[#0B1633]">
      
      {/* Page Hero Header — Deep Navy #07152F */}
      <section className="bg-[#07152F] text-white py-14 sm:py-18 relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-1/3 w-[500px] h-[300px] bg-[#FF5A1F]/10 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center sm:text-left">
          <div className="flex items-center gap-2 mb-3 justify-center sm:justify-start text-xs font-semibold text-slate-400">
            <span>Home</span>
            <span>/</span>
            <span className="text-[#FF5A1F] font-bold">Shopping Cart</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
            Your Cart & Order Summary
          </h1>
          <p className="text-slate-300 text-[15px] max-w-2xl leading-relaxed">
            Review your custom print configurations, artwork uploads, and quantities prior to secure checkout.
          </p>
        </div>
      </section>

      {/* Cart Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Cart Items List (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-[16px] p-5 border border-[#E7EAF0] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-[12px] bg-[#F7F8FA]"
                    />
                    <div>
                      <h3 className="text-[16px] font-bold text-[#0B1633] leading-snug">{item.name}</h3>
                      <p className="text-[12px] text-[#667085] mt-0.5">Quantity: {item.qty} units</p>
                      <p className="text-[12px] text-[#667085]">Paper: {item.paper} • Finish: {item.finish}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E7EAF0]">
                    <div className="text-left sm:text-right">
                      <span className="text-[18px] font-extrabold text-[#FF5A1F]">₹{item.totalPrice}</span>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-slate-400 hover:text-red-500 transition border-none bg-transparent cursor-pointer"
                      title="Remove Item"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Sidebar (4 cols) */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-[20px] p-7 border border-[#E7EAF0] shadow-sm">
                <h3 className="text-xl font-extrabold text-[#0B1633] mb-5">Order Summary</h3>

                <div className="space-y-3 pb-5 border-b border-[#E7EAF0] text-xs">
                  <div className="flex justify-between text-[#667085]">
                    <span>Items Subtotal</span>
                    <span className="font-bold text-[#0B1633]">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-[#667085]">
                    <span>Estimated Shipping</span>
                    <span className="font-bold text-[#0B1633]">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                  </div>
                </div>

                <div className="py-4 flex justify-between items-center mb-6">
                  <span className="text-sm font-bold text-[#0B1633]">Total Amount</span>
                  <span className="text-2xl font-extrabold text-[#FF5A1F]">₹{total}</span>
                </div>

                <button
                  onClick={() => alert('Proceeding to Secure Checkout Portal...')}
                  className="w-full bg-[#FF5A1F] hover:bg-[#e44d15] text-white font-extrabold text-[14px] py-3.5 rounded-[12px] transition border-none cursor-pointer shadow-md shadow-[#FF5A1F]/20 flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        ) : (
          <div className="bg-white rounded-[20px] p-12 text-center max-w-md mx-auto border border-[#E7EAF0]">
            <div className="w-16 h-16 rounded-full bg-[#FF5A1F]/10 text-[#FF5A1F] flex items-center justify-center mx-auto mb-4">
              <FiShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-[#0B1633] mb-2">Your Cart is Empty</h3>
            <p className="text-[#667085] text-xs mb-6">Explore our catalog and customize print products to add them to your cart.</p>
            <button
              onClick={() => setCurrentPage && setCurrentPage('products')}
              className="bg-[#FF5A1F] hover:bg-[#e44d15] text-white font-extrabold text-xs px-6 py-3 rounded-[12px] border-none cursor-pointer shadow-md shadow-[#FF5A1F]/20 inline-flex items-center gap-2"
            >
              Browse Products <FiArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

    </div>
  )
}
