const getCart = () => JSON.parse(localStorage.getItem('cart') || '[]')

const saveCart = (cart) => localStorage.setItem('cart', JSON.stringify(cart))

const notify = () => window.dispatchEvent(new Event('cartUpdated'))

const addToCart = (item) => {
    const cart = getCart()
    const existing = cart.find(i => i._id === item._id)
    if (existing) {
        existing.quantity += 1
    } else {
        cart.push({ _id: item._id, name: item.name, price: item.price, image: item.image, quantity: 1 })
    }
    saveCart(cart)
    notify()
}

const removeFromCart = (id) => {
    saveCart(getCart().filter(i => i._id !== id))
    notify()
}

const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id)
    saveCart(getCart().map(i => i._id === id ? { ...i, quantity: qty } : i))
    notify()
}

const clearCart = () => {
    localStorage.removeItem('cart')
    notify()
}

const cartTotal = (cart) => cart.reduce((sum, i) => sum + i.price * i.quantity, 0)

export { getCart, addToCart, removeFromCart, updateQty, clearCart, cartTotal }
