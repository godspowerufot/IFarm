const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { ethers } = require("ethers");

// ============================================
// BLOCKCHAIN CONFIGURATION
// ============================================
const CONTRACT_ADDRESS = "0x6C2Fe26e85c6d51a4e53802062D68301DBcAB213";
const RPC_URL = "https://testnet.hashio.io/api";
const PRIVATE_KEY = "";
// Contract ABI
const CONTRACT_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "farmer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "product",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "unit",
        type: "string",
      },
    ],
    name: "BatchCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "priceWei",
        type: "uint256",
      },
    ],
    name: "BatchListedForSale",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newPriceWei",
        type: "uint256",
      },
    ],
    name: "BatchPriceUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "pricePaidWei",
        type: "uint256",
      },
    ],
    name: "BatchPurchased",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum SimpleAgriSupplyChain.Status",
        name: "status",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "string",
        name: "note",
        type: "string",
      },
    ],
    name: "BatchStatusUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "note",
        type: "string",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "batchPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "reason",
        type: "string",
      },
    ],
    name: "cancelBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "product",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "unit",
        type: "string",
      },
      {
        internalType: "string",
        name: "location",
        type: "string",
      },
      {
        internalType: "string",
        name: "metadata",
        type: "string",
      },
    ],
    name: "createBatch",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "getBatch",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "enum SimpleAgriSupplyChain.Status",
        name: "",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "getBatchHistory",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "isForSale",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "priceWei",
        type: "uint256",
      },
    ],
    name: "listForSale",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "purchaseBatch",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "string",
        name: "note",
        type: "string",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "newPriceWei",
        type: "uint256",
      },
    ],
    name: "updatePrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "enum SimpleAgriSupplyChain.Status",
        name: "newStatus",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "note",
        type: "string",
      },
    ],
    name: "updateStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// Initialize blockchain connection
let provider, wallet, contract;

function initBlockchain() {
  try {
    provider = new ethers.JsonRpcProvider(RPC_URL);
    wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);
    console.log("✅ Blockchain connected!");
    console.log(`   Wallet: ${wallet.address}`);
    return true;
  } catch (error) {
    console.error("❌ Blockchain connection failed:", error.message);
    return false;
  }
}

// Status enum mapping
const STATUS = {
  0: "Created",
  1: "ForSale",
  2: "InTransit",
  3: "Received",
  4: "Sold",
  5: "Cancelled",
};

// State management for multi-step conversations
const userStates = new Map();

// Create batch states
const CREATE_STATES = {
  IDLE: "idle",
  AWAITING_PRODUCT: "awaiting_product",
  AWAITING_QUANTITY: "awaiting_quantity",
  AWAITING_UNIT: "awaiting_unit",
  AWAITING_LOCATION: "awaiting_location",
  AWAITING_METADATA: "awaiting_metadata",
};

// ============================================
// WHATSAPP BOT SETUP
// ============================================
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

console.log("🚀 Starting WhatsApp Bot with Blockchain...\n");

client.on("qr", (qr) => {
  console.log("📱 SCAN THIS QR CODE WITH YOUR WHATSAPP:\n");
  qrcode.generate(qr, { small: true });
  console.log("\n👆 Open WhatsApp > Settings > Linked Devices > Link a Device");
});

client.on("authenticated", () => {
  console.log("✅ WhatsApp authenticated!");
});

client.on("ready", () => {
  console.log("\n✅ WhatsApp Bot is ONLINE!\n");
  console.log("📋 Bot will only respond to:");
  console.log("   • Direct/private messages");
  console.log("   • Group messages where bot is mentioned");
  console.log("   • Replies to bot's messages\n");
  console.log("📋 Blockchain Commands:");
  console.log("   • /create - Create new batch");
  console.log("   • /batch <id> - View batch details");
  console.log("   • /history <id> - View batch history");
  console.log("   • /list <id> <price> - List batch for sale");
  console.log("   • /buy <id> - Purchase a batch");
  console.log("   • /transfer <id> <address> - Transfer ownership");
  console.log("   • /status <id> <status> - Update status");
  console.log("   • /price <id> <newprice> - Update price");
  console.log("   • /help - Show all commands\n");

  // Initialize blockchain
  initBlockchain();
});

// ============================================
// MESSAGE HANDLER WITH FILTERING
// ============================================
// ============================================
// MESSAGE HANDLER - PRIVATE CHATS ONLY
// ============================================
client.on("message", async (msg) => {
  try {
    // Skip status broadcasts
    if (msg.isStatus) {
      return;
    }

    const chat = await msg.getChat();

    // Only respond to private/direct messages
    if (chat.isGroup) {
      console.log(`⏭️ Ignoring group message`);
      return;
    }

    const contact = await msg.getContact();

    // Log incoming messages
    console.log(`\n📨 Message from ${contact.pushname || contact.number}:`);
    console.log(`   "${msg.body}"`);
    console.log(`   📱 Private chat`);

    const text = msg.body.toLowerCase().trim();
    const parts = msg.body.trim().split(" ");
    const command = parts[0].toLowerCase();

    let response = "";

    // Get user's current state
    const userId = contact.id._serialized;
    const userState = userStates.get(userId) || { state: CREATE_STATES.IDLE };

    // ============================================
    // HANDLE MULTI-STEP CREATE BATCH FLOW
    // ============================================
    if (userState.state !== CREATE_STATES.IDLE && command !== "/cancel") {
      response = await handleCreateBatchStep(msg, userId, userState);
      if (response) {
        await msg.reply(response);
        console.log(`✅ Replied`);
      }
      return;
    }

    // ============================================
    // BLOCKCHAIN COMMANDS
    // ============================================

    if (command === "/create") {
      response = await handleCreateBatch(msg, userId);
    } else if (command === "/cancel") {
      response = handleCancelCreate(userId);
    } else if (command === "/batch" && parts[1]) {
      response = await handleGetBatch(parts[1]);
    } else if (command === "/history" && parts[1]) {
      response = await handleGetHistory(parts[1]);
    } else if (command === "/list" && parts[1] && parts[2]) {
      response = await handleListForSale(parts[1], parts[2]);
    } else if (command === "/buy" && parts[1]) {
      response = await handleBuyBatch(parts[1]);
    } else if (command === "/transfer" && parts[1] && parts[2]) {
      response = await handleTransfer(
        parts[1],
        parts[2],
        parts.slice(3).join(" ")
      );
    } else if (command === "/status" && parts[1] && parts[2]) {
      response = await handleUpdateStatus(
        parts[1],
        parts[2],
        parts.slice(3).join(" ")
      );
    } else if (command === "/price" && parts[1] && parts[2]) {
      response = await handleUpdatePrice(parts[1], parts[2]);
    }

    // ============================================
    // GENERAL COMMANDS
    // ============================================
    else if (text === "/help" || text === "help") {
      response =
        "🤖 *WhatsApp Blockchain Bot*\n\n" +
        "*📦 Batch Commands:*\n" +
        "• `/create` - Create new batch (interactive)\n" +
        "• `/batch <id>` - View batch\n" +
        "• `/history <id>` - View history\n" +
        "• `/cancel` - Cancel current operation\n\n" +
        "*💰 Trading:*\n" +
        "• `/list <id> <price>` - List for sale\n" +
        "• `/buy <id>` - Purchase batch\n" +
        "• `/price <id> <new>` - Update price\n\n" +
        "*📝 Management:*\n" +
        "• `/transfer <id> <addr>` - Transfer\n" +
        "• `/status <id> <0-5>` - Update status\n\n" +
        "*Status codes:*\n" +
        "0=Created, 1=ForSale, 2=InTransit\n" +
        "3=Received, 4=Sold, 5=Cancelled";
    } else if (text === "hello" || text === "hi") {
      response = `Hello ${
        contact.pushname || "there"
      }! 👋\n\nI'm a blockchain supply chain bot. Type */help* for commands.`;
    } else if (text.startsWith("/")) {
      response = "❓ Unknown command. Type */help* for available commands.";
    } else if (text.length > 0) {
      response = "Hi! 👋 Type */help* to see blockchain commands.";
    }

    if (response && response.length > 0) {
      await msg.reply(response);
      console.log(`✅ Replied`);
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
    try {
      await msg.reply("⚠️ An error occurred. Please try again.");
    } catch (e) {
      console.error("Failed to send error message");
    }
  }
});

// ============================================
// BLOCKCHAIN FUNCTIONS
// ============================================

async function handleCreateBatch(msg, userId) {
  try {
    // Initialize user state
    userStates.set(userId, {
      state: CREATE_STATES.AWAITING_PRODUCT,
      data: {},
    });

    return (
      "📝 *Create New Batch - Step 1/5*\n\n" +
      "Please enter the *product name*:\n\n" +
      "Example: `Maize`, `Rice`, `Tomatoes`\n\n" +
      "_Type /cancel to cancel this operation_"
    );
  } catch (error) {
    userStates.delete(userId);
    return `❌ Error: ${error.message}`;
  }
}

async function handleCreateBatchStep(msg, userId, userState) {
  try {
    const input = msg.body.trim();

    switch (userState.state) {
      case CREATE_STATES.AWAITING_PRODUCT:
        userState.data.product = input;
        userState.state = CREATE_STATES.AWAITING_QUANTITY;
        userStates.set(userId, userState);
        return (
          "✅ Product saved!\n\n" +
          "📝 *Step 2/5*\n\n" +
          "Please enter the *quantity* (numbers only):\n\n" +
          "Example: `100`, `50`, `1000`\n\n" +
          "_Type /cancel to cancel_"
        );

      case CREATE_STATES.AWAITING_QUANTITY:
        const quantity = parseInt(input);
        if (isNaN(quantity) || quantity <= 0) {
          return "❌ Invalid quantity. Please enter a valid number greater than 0:";
        }
        userState.data.quantity = quantity;
        userState.state = CREATE_STATES.AWAITING_UNIT;
        userStates.set(userId, userState);
        return (
          "✅ Quantity saved!\n\n" +
          "📝 *Step 3/5*\n\n" +
          "Please enter the *unit of measurement*:\n\n" +
          "Example: `kg`, `tons`, `bags`, `pieces`\n\n" +
          "_Type /cancel to cancel_"
        );

      case CREATE_STATES.AWAITING_UNIT:
        userState.data.unit = input;
        userState.state = CREATE_STATES.AWAITING_LOCATION;
        userStates.set(userId, userState);
        return (
          "✅ Unit saved!\n\n" +
          "📝 *Step 4/5*\n\n" +
          "Please enter the *location*:\n\n" +
          "Example: `Lagos Farm`, `Kano Warehouse`, `Ibadan Market`\n\n" +
          "_Type /cancel to cancel_"
        );

      case CREATE_STATES.AWAITING_LOCATION:
        userState.data.location = input;
        userState.state = CREATE_STATES.AWAITING_METADATA;
        userStates.set(userId, userState);
        return (
          "✅ Location saved!\n\n" +
          "📝 *Step 5/5*\n\n" +
          "Please enter *additional information* (metadata):\n\n" +
          "Example: `Fresh harvest`, `Organic certified`, `Grade A quality`\n\n" +
          "_Type /cancel to cancel_"
        );

      case CREATE_STATES.AWAITING_METADATA:
        userState.data.metadata = input;

        // Show confirmation
        const confirmation =
          "📋 *Batch Summary*\n\n" +
          `Product: ${userState.data.product}\n` +
          `Quantity: ${userState.data.quantity} ${userState.data.unit}\n` +
          `Location: ${userState.data.location}\n` +
          `Info: ${userState.data.metadata}\n\n` +
          "⏳ Creating batch on blockchain...";

        await msg.reply(confirmation);

        // Create batch on blockchain
        try {
          const tx = await contract.createBatch(
            userState.data.product,
            userState.data.quantity,
            userState.data.unit,
            userState.data.location,
            userState.data.metadata
          );

          // Wait for transaction
          const receipt = await tx.wait();

          // Get batch ID from event
          let batchId = "N/A";
          if (receipt.logs && receipt.logs.length > 0) {
            try {
              const event = receipt.logs.find((log) => {
                try {
                  return (
                    contract.interface.parseLog(log)?.name === "BatchCreated"
                  );
                } catch {
                  return false;
                }
              });
              if (event) {
                const parsedEvent = contract.interface.parseLog(event);
                batchId = parsedEvent.args.id.toString();
              }
            } catch (e) {
              console.error("Error parsing event:", e);
            }
          }

          // Clear user state
          userStates.delete(userId);

          return (
            "✅ *Batch Created Successfully!*\n\n" +
            `Batch ID: #${batchId}\n` +
            `Product: ${userState.data.product}\n` +
            `Quantity: ${userState.data.quantity} ${userState.data.unit}\n\n` +
            `Transaction: ${tx.hash}\n\n` +
            `Use \`/batch ${batchId}\` to view details`
          );
        } catch (error) {
          userStates.delete(userId);
          return `❌ Error creating batch: ${error.message}`;
        }

      default:
        userStates.delete(userId);
        return "❌ Invalid state. Please start over with /create";
    }
  } catch (error) {
    userStates.delete(userId);
    return `❌ Error: ${error.message}`;
  }
}

function handleCancelCreate(userId) {
  const userState = userStates.get(userId);
  if (!userState || userState.state === CREATE_STATES.IDLE) {
    return "❌ No active operation to cancel.";
  }

  userStates.delete(userId);
  return "✅ Operation cancelled. Type /create to start again.";
}

async function handleGetBatch(id) {
  try {
    const batch = await contract.getBatch(id);

    return (
      `📦 *Batch #${id}*\n\n` +
      `Product: ${batch[1]}\n` +
      `Quantity: ${batch[2]} ${batch[3]}\n` +
      `Farmer: ${batch[4].slice(0, 8)}...${batch[4].slice(-6)}\n` +
      `Owner: ${batch[5].slice(0, 8)}...${batch[5].slice(-6)}\n` +
      `Status: ${STATUS[batch[7]]}\n` +
      `Location: ${batch[8] || "N/A"}\n` +
      `Price: ${
        batch[10] > 0 ? ethers.formatEther(batch[10]) + " ETH" : "Not listed"
      }\n` +
      `Created: ${new Date(Number(batch[6]) * 1000).toLocaleString()}`
    );
  } catch (error) {
    return `❌ Error fetching batch: ${error.message}`;
  }
}

async function handleGetHistory(id) {
  try {
    const [owners, notes] = await contract.getBatchHistory(id);

    let history = `📜 *Batch #${id} History*\n\n`;
    for (let i = 0; i < owners.length; i++) {
      history += `${i + 1}. ${owners[i].slice(0, 8)}...${owners[i].slice(
        -6
      )}\n`;
      history += `   ${notes[i]}\n\n`;
    }

    return history;
  } catch (error) {
    return `❌ Error: ${error.message}`;
  }
}

async function handleListForSale(id, priceEth) {
  try {
    const priceWei = ethers.parseEther(priceEth);
    const tx = await contract.listForSale(id, priceWei);

    return `⏳ Listing batch #${id} for ${priceEth} ETH...\nTx: ${tx.hash}`;
  } catch (error) {
    return `❌ Error: ${error.message}`;
  }
}

async function handleBuyBatch(id) {
  try {
    const price = await contract.batchPrice(id);
    const tx = await contract.purchaseBatch(id, { value: price });

    return `⏳ Purchasing batch #${id}...\nTx: ${tx.hash}`;
  } catch (error) {
    return `❌ Error: ${error.message}`;
  }
}

async function handleTransfer(id, toAddress, note) {
  try {
    const tx = await contract.transferOwnership(
      id,
      toAddress,
      note || "Transfer via WhatsApp"
    );

    return `⏳ Transferring batch #${id}...\nTo: ${toAddress}\nTx: ${tx.hash}`;
  } catch (error) {
    return `❌ Error: ${error.message}`;
  }
}

async function handleUpdateStatus(id, statusCode, note) {
  try {
    const tx = await contract.updateStatus(
      id,
      parseInt(statusCode),
      note || "Status updated"
    );

    return `⏳ Updating status for batch #${id}...\nTx: ${tx.hash}`;
  } catch (error) {
    return `❌ Error: ${error.message}`;
  }
}

async function handleUpdatePrice(id, newPriceEth) {
  try {
    const priceWei = ethers.parseEther(newPriceEth);
    const tx = await contract.updatePrice(id, priceWei);

    return `⏳ Updating price for batch #${id} to ${newPriceEth} ETH...\nTx: ${tx.hash}`;
  } catch (error) {
    return `❌ Error: ${error.message}`;
  }
}

// ============================================
// STANDARD EVENT HANDLERS
// ============================================
client.on("disconnected", (reason) => {
  console.log("\n⚠️  Bot disconnected:", reason);
});

client.on("auth_failure", () => {
  console.error("\n❌ Authentication failed!");
});

client.initialize().catch((err) => {
  console.error("❌ Failed to initialize:", err);
});

process.on("SIGINT", async () => {
  console.log("\n\n👋 Shutting down...");
  await client.destroy();
  process.exit(0);
});

console.log("🌍 Bot ready to accept blockchain commands!\n");
