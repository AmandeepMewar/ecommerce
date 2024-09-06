export async function addToCart(req, res) {
  try {
    const { productId } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push(productId);
    }

    await user.save();

    res.status(200).json({ status: 'success', result: user.cartItems });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}

// this removes all items from cart if no productId is provided OR removes specific item based on productId provided
export async function removeAllFromCart(req, res) {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter((item) => item.id !== productId);
    }

    await user.save();

    res.status(200).json({ status: 'success', result: user.cartItems });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}
