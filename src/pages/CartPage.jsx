import { useState, useEffect } from 'react'
import { FiTrash2, FiShoppingBag, FiArrowRight, FiCheckCircle, FiShield, FiTag, FiX, FiZap } from 'react-icons/fi'
import { addOrderToFirestore } from '../services/firebase'
import { useAuth } from '../context/AuthContext'

export function CartPage({ setCurrentPage }) {
  const { cartItems, removeFromCart, clearCart, currentUser } = useAuth()

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerCompany, setCustomerCompany] = useState('')
  const [address, setAddress] = useState('')
  const [isExpress, setIsExpress] = useState(false)
  const [placingOrder, setPlacingOrder] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(null)

  useEffect(() => {
    if (currentUser) {
      setCustomerName(currentUser.displayName || '')
      setCustomerEmail(currentUser.email || '')
    }
  }, [currentUser])

  const subtotal = cartItems.reduce((acc, item) => acc + (item.totalPrice || (item.qty * item.unitPrice)), 0)
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99
  const total = subtotal + shipping

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    setPlacingOrder(true)

    const orderId = `PRT-${Math.floor(10000 + Math.random() * 90000)}`
    const newOrderData = {
      id: orderId,
      customer: {
        uid: currentUser?.uid || null,
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        company: customerCompany || 'Direct Retail',
        isB2B: !!customerCompany,
        creditNet15: false
      },
      items: cartItems.map(item => ({
        productName: item.name,
        variant: `Size: ${item.sizeFormat || 'Standard'} | Paper: ${item.paper || 'Standard'} | Sides: ${item.sides || 'Single-sided'} | Cut: ${item.corners || 'Standard'} | Lam: ${item.lamination || 'None'} | Foil: ${item.foil || 'None'} | SpotUV: ${item.spotUV || 'None'} | Proof: ${item.proof || 'Self Upload'} | Pkg: ${item.packaging || 'Bulk Shrink'}`,
        quantity: item.qty,
        unitPrice: item.unitPrice,
        total: item.totalPrice || (item.qty * item.unitPrice)
      })),
      subtotal,
      shippingFee: shipping,
      gstAmount: Math.round(subtotal * 0.18),
      totalAmount: total,
      status: 'Payment Confirmed',
      isExpress,
      expressDeadline: isExpress ? new Date(Date.now() + 4 * 3600 * 1000).toISOString() : null,
      deliveryMethod: isExpress ? 'Local Porter Express' : 'Pan-India BlueDart Express',
      deliveryAddress: address,
      artworkFile: {
        fileName: 'checkout_artwork.pdf',
        fileType: 'pdf',
        dimensions: 'Standard Spec',
        resolutionDpi: 300,
        cmykVerified: true,
        previewUrl: cartItems[0]?.image || 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600'
      }
    }

    await addOrderToFirestore(newOrderData)
    clearCart()
    setPlacingOrder(false)
    setOrderSuccess(orderId)
    setCheckoutModalOpen(false)
  }

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
        {orderSuccess ? (
          <div className="bg-white rounded-[24px] p-12 text-center max-w-lg mx-auto border border-emerald-200 shadow-xl space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <FiCheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-[#0B1633]">Order Confirmed & Transmitted!</h3>
            <p className="text-slate-600 text-sm">
              Your order <span className="font-bold text-[#FF5A1F]">{orderSuccess}</span> has been saved to Firestore and transmitted directly into our live production pipeline!
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => setCurrentPage('admin')}
                className="bg-[#07152F] text-white font-bold text-xs px-5 py-3 rounded-xl hover:bg-slate-800 transition"
              >
                Track in Admin Pipeline
              </button>
            </div>
          </div>
        ) : cartItems.length > 0 ? (
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
                      <p className="text-[11px] text-[#667085] leading-relaxed">Format: {item.sizeFormat || 'Standard'} • Sides: {item.sides || 'Single-sided'} • Cut: {item.corners || 'Standard'} • Lam: {item.lamination || 'None'} • Foil: {item.foil || 'None'} • SpotUV: {item.spotUV || 'None'} • Proof: {item.proof || 'Standard'} • Pkg: {item.packaging || 'Bulk'}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E7EAF0]">
                    <div className="text-left sm:text-right">
                      <span className="text-[18px] font-extrabold text-[#FF5A1F]">₹{item.totalPrice || (item.qty * item.unitPrice)}</span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
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
                  onClick={() => setCheckoutModalOpen(true)}
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

      {/* Production Checkout Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[20px] shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="p-4 bg-[#07152F] text-white flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-white">Production Order Checkout</h3>
              <button onClick={() => setCheckoutModalOpen(false)} className="text-slate-400 hover:text-white">
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePlaceOrder} className="p-6 space-y-4 text-xs font-sans">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Aarav Sharma"
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-[#FF5A1F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="aarav@company.com"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-[#FF5A1F]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Mobile Phone *</label>
                  <input
                    type="text"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+91 98450 11223"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-[#FF5A1F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Company (Optional)</label>
                  <input
                    type="text"
                    value={customerCompany}
                    onChange={(e) => setCustomerCompany(e.target.value)}
                    placeholder="Nexus Media Ltd"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-[#FF5A1F]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Delivery Address *</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Indiranagar, Bangalore"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-[#FF5A1F]"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer font-bold text-red-600 pt-1">
                <input
                  type="checkbox"
                  checked={isExpress}
                  onChange={(e) => setIsExpress(e.target.checked)}
                  className="accent-red-600 rounded"
                />
                <span className="flex items-center gap-1"><FiZap className="w-3.5 h-3.5 fill-red-600" /> Mark as Express Same-Day Dispatch</span>
              </label>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-slate-500 text-[10px]">Total Payable Amount</span>
                  <div className="font-extrabold text-[#FF5A1F] text-lg">₹{total}</div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 font-bold text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={placingOrder}
                    className="px-5 py-2 rounded-xl bg-[#FF5A1F] hover:bg-[#e44d15] text-white font-bold shadow-md cursor-pointer"
                  >
                    {placingOrder ? 'Transmitting to Admin...' : 'Place Order & Pay'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
