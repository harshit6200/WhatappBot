const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    proto
} = require('@whiskeysockets/baileys');
const pino = require('pino');
const qrcode = require('qrcode-terminal');
const {
    Boom
} = require('@hapi/boom');

// --- BOT CONFIGURATION ---
const SHOP_NAME = "Sit n' Eat";
const UPI_ID = "6200122998@ptyes";
const CURRENCY = "INR";
const EMOJIS = {
    welcome: '👋',
    menu: '🍕',
    cart: '🛒',
    confirm: '✅',
    cancel: '❌',
    money: '💰',
    location: '📍',
    back: '⬅️',
    order: '🧾'
};

// --- MENU DATA ---
const menu = {
    "Pizza": [
        { name: "Cheese Pizza", price: 149 },
        { name: "Veg Cheese Pizza", price: 149 },
        { name: "Tandoori Paneer Pizza", price: 210 },
        { name: "Cheese Corn Pizza", price: 199 },
        { name: "Paneer Corn Pizza", price: 230 },
        { name: "Margherita Pizza", price: 149 },
        { name: "Green Capsicum Pizza", price: 139 },
        { name: "Onion Pizza", price: 149 },
        { name: "Paneer Capsicum Onion Pizza", price: 279 },
        { name: "Paneer Capsicum Pizza", price: 279 },
        { name: "Peppy Paneer Pizza", price: 269 },
        { name: "Tandoori Paneer Pizza", price: 279 },
        { name: "Paneer Peri Peri Pizza", price: 289 },
        { name: "Veg Paradise Pizza", price: 269 },
        { name: "Veg Loaded Pizza", price: 269 },
        { name: "Veg Cheese Pizza", price: 219 },
        { name: "Tomato Pizza", price: 159 },
        { name: "Corn Cheese Pizza", price: 169 },
        { name: "Broccoli Cheese Pizza", price: 189 }
    ],
    "Burger": [
        { name: "Veg Snacker Burger", price: 129 },
        { name: "Veg Makhani Burger", price: 142 },
        { name: "Mexican Marvel Burger", price: 188 },
        { name: "Mighty Cheese Burger", price: 227 },
        { name: "Veg Rockstar Burger", price: 99 },
        { name: "Korean King", price: 178 },
        { name: "Paneer Tikka Burger", price: 99 },
        { name: "Crunchy Paneer Burger", price: 119 },
        { name: "Aloo Tikki Burger", price: 99 },
        { name: "Hot Veggie Crunch Burger", price: 99 },
        { name: "Veggie Lover Burger", price: 119 },
        { name: "Special Corn Burger", price: 149 },
        { name: "Veg Double Decker Burger", price: 179 }
    ],
    "Sides": [
        { name: "Salted French Fries", price: 129 },
        { name: "Masala French Fries", price: 139 },
        { name: "Peri Peri French Fries", price: 149 },
        { name: "Cheesy Loaded Peri Peri Fries", price: 139 },
        { name: "Paneer Crunchy Fries", price: 139 }
    ],
    "Starters": [
        { name: "Chilli Potato", price: 159 },
        { name: "Veg Spring Roll", price: 179 },
        { name: "Veg Cheese Roll", price: 129 },
        { name: "Veg Roll", price: 109 },
        { name: "Paneer 65", price: 161 }
    ],
    "Sandwich": [
        { name: "Corn Cheese Sandwich", price: 179 },
        { name: "Chocolate Sandwich", price: 169 },
        { name: "Chocolate Cheese Sandwich", price: 169 },
        { name: "Tandoori Paneer Sandwich", price: 179 },
        { name: "Bombay Masala Sandwich", price: 179 },
        { name: "Cheese Grilled Sandwich [3 Layer]", price: 109 },
        { name: "Veg Cheese Grilled Sandwich [3 Layer]", price: 119 },
        { name: "Mushroom Baby Corn Sandwich [3 Layer]", price: 159 },
        { name: "Mushroom Baby Corn Sandwich [3 Layer]", price: 129 },
        { name: "Triple Take Sandwich [3 Layer]", price: 120 },
        { name: "Paneer Tikka Sandwich [3 Layer]", price: 120 },
        { name: "Classic Vegetable Sandwich", price: 119 },
        { name: "Veg Grilled Sandwich", price: 159 },
        { name: "Paneer Corn Cheese Sandwich", price: 198 },
        { name: "Bombay Masala Sandwich", price: 198 }
    ],
    "Maggi": [
        { name: "Masala Maggi", price: 89 },
        { name: "Vegetable Maggi", price: 109 },
        { name: "Schezwan Maggi", price: 109 },
        { name: "Corn Maggi", price: 109 },
        { name: "Corn Cheese Maggi", price: 129 },
        { name: "Veg Cheese Maggi", price: 129 },
        { name: "Plain Maggi", price: 79 },
        { name: "Peri Peri Maggi", price: 90 },
        { name: "Corn Matar Maggi", price: 129 },
        { name: "Paneer Maggi", price: 119 },
        { name: "Schezwan Cheese Maggi", price: 139 },
        { name: "Egg Maggi", price: 90 },
        { name: "Egg Cheese Maggi", price: 100 },
        { name: "Amul Butter Maggi", price: 119 },
        { name: "Peri Peri Masala Maggi", price: 129 },
        { name: "Veg Peri Peri Maggi", price: 129 },
        { name: "Veg Peri Peri Masala Maggi", price: 129 },
        { name: "Paneer Peri Peri Maggi", price: 129 },
        { name: "Amul Butter Cheese Maggi", price: 129 },
        { name: "Paneer Masala Maggi", price: 129 },
        { name: "Cheese Schezwan Maggi", price: 129 },
        { name: "Cheese Garlic Maggi", price: 129 },
        { name: "Chef bhadur Special Tadka Maggi", price: 149 },
        { name: "Chilli Paneer Maggi", price: 170 }
    ],
    "Rice": [
        { name: "Veg Pulao", price: 179 },
        { name: "Paneer Pulao", price: 189 },
        { name: "Veg Fried Rice", price: 169 },
        { name: "Schezwan Fried Rice", price: 179 },
        { name: "Manchurian Fried Rice", price: 189 },
        { name: "Paneer Fried Rice", price: 189 },
        { name: "Schezwan Paneer Fried Rice", price: 195 },
        { name: "Schezwan Manchurian Fried Rice", price: 195 },
        { name: "Egg Fried Rice", price: 129 }
    ],
    "Tossed Salads": [
        { name: "Broccoli Salad", price: 259 },
        { name: "Farm House Salad", price: 158 }
    ],
    "Egg Dishes": [
        { name: "Boiled Egg", price: 50 },
        { name: "Omelette", price: 109 },
        { name: "Egg Bhurji", price: 129 }
    ],
    "Pasta": [
        { name: "White Sauce Pasta", price: 169 },
        { name: "Red Sauce Pasta", price: 189 },
        { name: "Veg Pasta", price: 139 }
    ],
    "Garlic Bread": [
        { name: "Plain Garlic Bread", price: 129 },
        { name: "Cheese Garlic Bread", price: 153 },
        { name: "Corn Cheese Garlic Bread", price: 169 }
    ],
    "Drinks": [
        { name: "Cold Drink 750ml", price: 50 },
        { name: "Water 500ml", price: 15 },
        { name: "Glucose Water", price: 49 },
        { name: "Ors Water", price: 49 }
    ]
};

const userSessions = {}; // To store user state and cart

// --- HELPER FUNCTIONS ---

function generateOrderId() {
    return `MFC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function formatCart(cart) {
    if (!cart || cart.length === 0) {
        return {
            cartText: "Your cart is empty.",
            total: 0
        };
    }
    let total = 0;
    const cartItems = cart.map((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `${index + 1}. ${item.name} (${item.quantity} x ${CURRENCY} ${item.price}) = ${CURRENCY} ${itemTotal}`;
    }).join('\n');

    return {
        cartText: `*${EMOJIS.cart} Your Cart*\n\n${cartItems}\n\n*Total: ${CURRENCY} ${total}*`,
        total: total
    };
}


async function startBot() {
    const {
        state,
        saveCreds
    } = await useMultiFileAuthState('auth_info_baileys');
    const {
        version,
        isLatest
    } = await fetchLatestBaileysVersion();
    console.log(`Using Baileys version ${version.join('.')}, isLatest: ${isLatest}`);

    const sock = makeWASocket({
        version,
        auth: state,
        logger: pino({
            level: 'silent'
        }),
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const {
            connection,
            lastDisconnect,
            qr
        } = update;
        if (qr) {
            console.log("QR code received, please scan:");
            qrcode.generate(qr, {
                small: true
            });
        }
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error instanceof Boom) ?
                lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut :
                true;
            console.log('Connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect);
            if (shouldReconnect) {
                startBot();
            }
        } else if (connection === 'open') {
            console.log('Connection opened!');
        }
    });

    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const jid = msg.key.remoteJid;
        const senderName = msg.pushName || "User";

        if (!userSessions[jid]) {
            userSessions[jid] = {
                state: 'main_menu',
                cart: [],
                context: {}
            };
        }
        const session = userSessions[jid];
        const messageContent = (msg.message.conversation || msg.message.extendedTextMessage?.text || '').trim().toLowerCase();

        try {
            // --- MAIN MENU / START ---
            if (messageContent === 'start' || messageContent === 'menu' || messageContent === 'hi') {
                session.state = 'selecting_category';
                const categories = Object.keys(menu);
                const menuText = categories.map((cat, index) => `${index + 1}. ${EMOJIS.menu} ${cat}`).join('\n');
                await sock.sendMessage(jid, {
                    text: `${EMOJIS.welcome} Welcome to *${SHOP_NAME}*, ${senderName}!\n\nPlease reply with the number of the category you'd like to see.\n\n${menuText}\n\nType *'cart'* to view your order.`
                });
            }

            // --- STATE: SELECTING CATEGORY ---
            else if (session.state === 'selecting_category') {
                if (messageContent === 'cart') {
                    // Handle cart viewing directly from category selection
                    const {
                        cartText
                    } = formatCart(session.cart);
                    await sock.sendMessage(jid, {
                        text: `${cartText}\n\nType *'Pay'* to proceed or *'menu'* to continue shopping.`
                    });
                    if (session.cart.length > 0) session.state = 'in_cart';
                    return;
                }

                const categoryIndex = parseInt(messageContent) - 1;
                const categories = Object.keys(menu);
                if (!isNaN(categoryIndex) && categoryIndex >= 0 && categoryIndex < categories.length) {
                    const selectedCategory = categories[categoryIndex];
                    session.state = 'selecting_item';
                    session.context.category = selectedCategory;
                    const items = menu[selectedCategory];
                    const itemsText = items.map((item, index) => `${index + 1}. ${item.name} - ${CURRENCY} ${item.price}`).join('\n');
                    await sock.sendMessage(jid, {
                        text: `You selected *${selectedCategory}*.\n\nPlease reply with the item number to add it to your cart.\n\n${itemsText}\n\nType *'back'* to return to categories.`
                    });
                } else {
                    await sock.sendMessage(jid, {
                        text: "Invalid selection. Please reply with a valid category number."
                    });
                }
            }

            // --- STATE: SELECTING ITEM ---
            else if (session.state === 'selecting_item') {
                if (messageContent === 'back') {
                    session.state = 'main_menu'; // Go back to the main menu prompt
                    await sock.sendMessage(jid, {
                        text: "Going back..."
                    });
                    // Trigger the main menu display again
                    const menuMessage = {
                        conversation: "menu"
                    };
                    msg.message = menuMessage;
                    await sock.ev.emit('messages.upsert', {
                        messages: [msg],
                        type: 'notify'
                    });
                    return;
                }
                const itemIndex = parseInt(messageContent) - 1;
                const items = menu[session.context.category];
                if (!isNaN(itemIndex) && itemIndex >= 0 && itemIndex < items.length) {
                    session.state = 'selecting_quantity';
                    session.context.item = items[itemIndex];
                    await sock.sendMessage(jid, {
                        text: `How many *${session.context.item.name}* would you like? Please reply with a number (e.g., 1, 2).`
                    });
                } else {
                    await sock.sendMessage(jid, {
                        text: "Invalid selection. Please reply with a valid item number."
                    });
                }
            }

            // --- STATE: SELECTING QUANTITY ---
            else if (session.state === 'selecting_quantity') {
                const quantity = parseInt(messageContent);
                if (!isNaN(quantity) && quantity > 0) {
                    const selectedItem = session.context.item;
                    const existingItem = session.cart.find(item => item.name === selectedItem.name);
                    if (existingItem) {
                        existingItem.quantity += quantity;
                    } else {
                        session.cart.push({ ...selectedItem,
                            quantity
                        });
                    }
                    session.state = 'in_cart';
                    const {
                        cartText
                    } = formatCart(session.cart);
                    await sock.sendMessage(jid, {
                        text: `Added *${quantity}x ${selectedItem.name}* to your cart. ✅\n\n${cartText}\n\nType *'Pay'* to place your order, or *'menu'* to add more items.`
                    });
                } else {
                    await sock.sendMessage(jid, {
                        text: "Invalid quantity. Please enter a valid number (like 1, 2, etc.)."
                    });
                }
            }

            // --- CHECKOUT & PAYMENT ---
            else if (messageContent === 'pay' || messageContent === 'cart') {
                if (session.cart.length === 0) {
                    await sock.sendMessage(jid, {
                        text: `${EMOJIS.cancel} Your cart is empty. Please type *'menu'* to add items.`
                    });
                    session.state = 'main_menu';
                    return;
                }
                session.state = 'awaiting_payment_method';
                const {
                    cartText
                } = formatCart(session.cart);
                await sock.sendMessage(jid, {
                    text: `${EMOJIS.order} *Order Summary*\n\n${cartText}\n\nPlease choose a payment method:\n1. ${EMOJIS.money} Pay with UPI\n2. ${EMOJIS.money} Cash on Delivery (COD)\n\nReply with *1* or *2*.`
                });
            } else if (session.state === 'awaiting_payment_method') {
                const choice = messageContent;
                if (choice === '1') { // UPI
                    session.state = 'awaiting_payment_proof';
                    const {
                        total
                    } = formatCart(session.cart);
                    const upiLink = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(SHOP_NAME)}&am=${total}&cu=${CURRENCY}&tn=OrderFrom${senderName}`;
                    const upiMessage = `Please complete your payment of *${CURRENCY} ${total}*.\n\nTo pay, click the link below or copy our UPI ID.\n\n${upiLink}\n\n*Our UPI ID:* \`${UPI_ID}\`\n\nAfter payment, please send a screenshot of the confirmation.`;
                    await sock.sendMessage(jid, {
                        text: upiMessage
                    });
                } else if (choice === '2') { // COD
                    session.state = 'awaiting_location';
                    await sock.sendMessage(jid, {
                        text: `${EMOJIS.location} Great! Please share your live location or drop a pin so we can deliver your order.`
                    });
                } else {
                    await sock.sendMessage(jid, {
                        text: "Invalid choice. Please reply with *1* for UPI or *2* for COD."
                    });
                }
            }

            // --- HANDLE LOCATION AND PAYMENT PROOF ---
            else if (msg.message.locationMessage && session.state === 'awaiting_location') {
                const orderId = generateOrderId();
                const {
                    cartText
                } = formatCart(session.cart);
                const paymentMethod = session.state === 'awaiting_location' ? 'Cash on Delivery' : 'UPI (Verified)';
                const confirmationMessage = `*${EMOJIS.confirm} Order Confirmed!*\n\nThank you, ${senderName}!\n\n*Order ID:* ${orderId}\n\n${cartText}\n\n*Payment Method:* ${paymentMethod}\n\nWe will deliver to your shared location shortly.`;
                await sock.sendMessage(jid, {
                    text: confirmationMessage
                });
                delete userSessions[jid];
            } else if (msg.message.imageMessage && session.state === 'awaiting_payment_proof') {
                session.state = 'awaiting_location';
                await sock.sendMessage(jid, {
                    text: `${EMOJIS.confirm} Thank you for the payment confirmation!\n\n${EMOJIS.location} Now, please share your live location or drop a pin for delivery.`
                });
            }

            // --- FALLBACK ---
            else {
                await sock.sendMessage(jid, {
                    text: `I'm sorry, I didn't understand. Type *'menu'* to see the options.`
                });
            }

        } catch (error) {
            console.error("Error processing message: ", error);
            await sock.sendMessage(jid, {
                text: `${EMOJIS.cancel} Oops! Something went wrong. Please try again later.`
            });
        }
    });
}

// Start the bot
startBot().catch(err => console.log(err));

