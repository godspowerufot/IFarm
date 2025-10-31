# 🤖 WhatsApp Blockchain Supply Chain Bot

A powerful WhatsApp bot that integrates with blockchain technology to manage agricultural supply chain operations. Built with `whatsapp-web.js` and `ethers.js`, this bot allows farmers, distributors, and buyers to track products from farm to market using blockchain transparency.

## 📋 Table of Contents

- [Features](#features)
- [How It Works](#how-it-works)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Commands](#commands)
- [Workflow Examples](#workflow-examples)
- [Troubleshooting](#troubleshooting)
- [Deployment](#deployment)
- [Security](#security)
- [Contributing](#contributing)

---

## ✨ Features

### 🔐 Blockchain Integration

- **Hedera Hashgraph Testnet** - Fast, secure, and eco-friendly
- **Immutable Records** - All transactions permanently recorded
- **Full Transparency** - Track ownership and status changes
- **Smart Contract** - Automated, trustless operations

### 💬 WhatsApp Interface

- **Private Chat Only** - Secure one-on-one conversations
- **Interactive Workflows** - Step-by-step batch creation
- **Real-time Updates** - Instant transaction confirmations
- **User-Friendly** - No technical knowledge required

### 📦 Supply Chain Management

- **Create Batches** - Register new agricultural products
- **Track Ownership** - Monitor who owns what
- **Update Status** - Track product journey (Created → ForSale → InTransit → Received → Sold)
- **Price Management** - List items for sale and update prices
- **Transfer Ownership** - Seamlessly hand off products
- **Purchase System** - Buy batches with cryptocurrency

---

## 🎯 How It Works

```
┌─────────────┐         ┌──────────────┐         ┌─────────────────┐
│   Farmer    │         │  WhatsApp    │         │   Blockchain    │
│ (via phone) │────────▶│     Bot      │────────▶│ (Hedera Testnet)│
└─────────────┘         └──────────────┘         └─────────────────┘
      │                        │                          │
      │   1. Send /create      │                          │
      ├───────────────────────▶│                          │
      │                        │   2. Guide through       │
      │   3. Enter details     │      5-step process      │
      │   (Product, Qty, etc)  │                          │
      ├───────────────────────▶│                          │
      │                        │   4. Submit transaction  │
      │                        ├─────────────────────────▶│
      │                        │                          │
      │                        │   5. Confirm & get ID    │
      │   6. Batch created!    │◀─────────────────────────│
      │◀───────────────────────│                          │
      │   Batch ID: #123       │                          │
```

### User Journey

1. **Farmer** messages the bot on WhatsApp
2. **Bot** responds with commands and guides the user
3. **User** creates a batch (product information)
4. **Bot** submits data to blockchain smart contract
5. **Blockchain** confirms transaction and generates unique ID
6. **Bot** sends confirmation with batch ID to user
7. **User** can now track, sell, or transfer the batch

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** (v16.0.0 or higher)
- **npm** or **yarn**
- **WhatsApp Account** (for the bot)
- **Phone** (to scan QR code)
- **Hedera Testnet Account** (free)
- **Git** (optional, for cloning)

---

## 🚀 Installation

### Step 1: Clone or Download

```bash
# Clone the repository
git clone https://github.com/yourusername/whatsapp-blockchain-bot.git
cd whatsapp-blockchain-bot

# OR download and extract the ZIP file
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs:

- `whatsapp-web.js` - WhatsApp integration
- `qrcode-terminal` - QR code display
- `ethers` - Blockchain interaction

### Step 3: Configure Environment

Create a `.env` file (optional but recommended):

```bash
CONTRACT_ADDRESS=0x6C2Fe26e85c6d51a4e53802062D68301DBcAB213
RPC_URL=https://testnet.hashio.io/api
PRIVATE_KEY=your_private_key_here
```

**⚠️ IMPORTANT:** Never commit your `.env` file to version control!

---

## ⚙️ Configuration

### Blockchain Settings

Edit the configuration in `bot.js`:

```javascript
const CONTRACT_ADDRESS = "0x6C2Fe26e85c6d51a4e53802062D68301DBcAB213";
const RPC_URL = "https://testnet.hashio.io/api";
const PRIVATE_KEY = "your_private_key_here";
```

### Getting Testnet Credentials

1. **Visit** [Hedera Portal](https://portal.hedera.com/)
2. **Create Account** (free for testnet)
3. **Get Test HBAR** from faucet
4. **Copy** your private key
5. **Paste** into `PRIVATE_KEY` variable

### WhatsApp Settings

The bot uses default settings optimized for most systems. For custom setups:

```javascript
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true, // Set false to see browser
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});
```

---

## 🎮 Usage

### Starting the Bot

```bash
# Start the bot
node bot.js

# OR if you configured npm scripts
npm start
```

### First Time Setup

1. **Run** the bot
2. **Scan** the QR code that appears in terminal
3. **Open** WhatsApp on your phone
4. **Go to** Settings → Linked Devices → Link a Device
5. **Scan** the QR code
6. **Wait** for "✅ WhatsApp Bot is ONLINE!" message

### Keeping Session Active

After first scan, the bot remembers your session. You won't need to scan again unless you:

- Delete `.wwebjs_auth` folder
- Unlink device from WhatsApp
- Reset bot authentication

---

## 📱 Commands

### Batch Management

| Command         | Description                      | Example      |
| --------------- | -------------------------------- | ------------ |
| `/create`       | Start interactive batch creation | `/create`    |
| `/batch <id>`   | View batch details               | `/batch 1`   |
| `/history <id>` | View ownership history           | `/history 1` |
| `/cancel`       | Cancel current operation         | `/cancel`    |

### Trading & Sales

| Command              | Description               | Example         |
| -------------------- | ------------------------- | --------------- |
| `/list <id> <price>` | List batch for sale (ETH) | `/list 1 0.5`   |
| `/buy <id>`          | Purchase a listed batch   | `/buy 1`        |
| `/price <id> <new>`  | Update batch price        | `/price 1 0.75` |

### Management

| Command                 | Description         | Example                |
| ----------------------- | ------------------- | ---------------------- |
| `/transfer <id> <addr>` | Transfer ownership  | `/transfer 1 0x123...` |
| `/status <id> <code>`   | Update batch status | `/status 1 2`          |

### General

| Command        | Description       |
| -------------- | ----------------- |
| `/help`        | Show all commands |
| `hello` / `hi` | Greet the bot     |

### Status Codes

```
0 = Created      - Batch just registered
1 = ForSale      - Listed on marketplace
2 = InTransit    - Being transported
3 = Received     - Delivered to buyer
4 = Sold         - Transaction complete
5 = Cancelled    - Batch cancelled
```

---

## 📖 Workflow Examples

### Example 1: Creating a Batch (Farmer)

```
You: /create

Bot: 📝 Create New Batch - Step 1/5
     Please enter the product name:
     Example: Maize, Rice, Tomatoes

You: Tomatoes

Bot: ✅ Product saved!
     📝 Step 2/5
     Please enter the quantity (numbers only):

You: 500

Bot: ✅ Quantity saved!
     📝 Step 3/5
     Please enter the unit of measurement:

You: kg

Bot: ✅ Unit saved!
     📝 Step 4/5
     Please enter the location:

You: Lagos Farm

Bot: ✅ Location saved!
     📝 Step 5/5
     Please enter additional information:

You: Fresh harvest, Grade A

Bot: 📋 Batch Summary
     Product: Tomatoes
     Quantity: 500 kg
     Location: Lagos Farm
     Info: Fresh harvest, Grade A

     ⏳ Creating batch on blockchain...

Bot: ✅ Batch Created Successfully!
     Batch ID: #1
     Product: Tomatoes
     Quantity: 500 kg

     Transaction: 0xabc123...
     Use `/batch 1` to view details
```

### Example 2: Listing for Sale

```
You: /list 1 0.5

Bot: ⏳ Listing batch #1 for 0.5 ETH...
     Tx: 0xdef456...

     [After confirmation]
     ✅ Batch #1 is now listed for sale!
```

### Example 3: Viewing Batch Details

```
You: /batch 1

Bot: 📦 Batch #1
     Product: Tomatoes
     Quantity: 500 kg
     Farmer: 0x1234abcd...
     Owner: 0x1234abcd...
     Status: ForSale
     Location: Lagos Farm
     Price: 0.5 ETH
     Created: 10/31/2025, 2:30:00 PM
```

### Example 4: Purchasing a Batch

```
You: /buy 1

Bot: ⏳ Purchasing batch #1...
     Tx: 0xghi789...

     [After confirmation]
     ✅ Purchase successful!
     You are now the owner of Batch #1
```

### Example 5: Tracking History

```
You: /history 1

Bot: 📜 Batch #1 History

     1. 0x1234abcd...5678
        Initial creation by farmer

     2. 0x8765dcba...4321
        Purchased via WhatsApp

     3. 0x9999eeee...1111
        Transferred to distributor
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. QR Code Not Displaying

**Problem:** Terminal doesn't show QR code

**Solution:**

```bash
# Use a terminal that supports UTF-8
# On Windows: Use Windows Terminal or Git Bash
# On Mac/Linux: Default terminals work fine

# Or set headless to false to see browser
# Edit bot.js:
puppeteer: { headless: false }
```

#### 2. Authentication Fails

**Problem:** "Authentication failed" error

**Solution:**

```bash
# Delete session and restart
rm -rf .wwebjs_auth
node bot.js
# Scan QR code again
```

#### 3. Blockchain Connection Error

**Problem:** "Blockchain connection failed"

**Solution:**

```javascript
// Check your configuration:
// 1. Is CONTRACT_ADDRESS correct?
// 2. Is RPC_URL accessible?
// 3. Is PRIVATE_KEY valid?

// Test connection:
curl https://testnet.hashio.io/api
```

#### 4. Transaction Fails

**Problem:** "Error creating batch: insufficient funds"

**Solution:**

```
1. Visit Hedera Testnet Faucet
2. Request test HBAR
3. Wait 1-2 minutes
4. Try transaction again
```

#### 5. Bot Stops Responding

**Problem:** Bot doesn't reply to messages

**Solution:**

```bash
# Check logs for errors
# Restart the bot
pm2 restart whatsapp-bot

# OR
node bot.js
```

#### 6. Group Messages Not Working

**Problem:** Bot doesn't respond in groups

**Solution:**

```
This is INTENTIONAL. Bot only works in private chats.
Send messages directly to the bot number.
```

### Debugging

Enable detailed logging:

```javascript
// Add at the top of bot.js
const DEBUG = true;

// Use in message handler
if (DEBUG) {
  console.log("Full message object:", msg);
  console.log("User state:", userState);
}
```

---

## 🚢 Production Deployment

### Using PM2 (Recommended)

```bash
# Install PM2
npm install -g pm2

# Start bot with PM2
pm2 start bot.js --name blockchain-bot

# View logs
pm2 logs blockchain-bot

# Monitor
pm2 monit

# Save configuration
pm2 save

# Auto-restart on reboot
pm2 startup
```

### Using Docker

Create `Dockerfile`:

```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

CMD ["node", "bot.js"]
```

Build and run:

```bash
docker build -t whatsapp-blockchain-bot .
docker run -d --name bot whatsapp-blockchain-bot
```

### Using systemd (Linux)

Create `/etc/systemd/system/whatsapp-bot.service`:

```ini
[Unit]
Description=WhatsApp Blockchain Bot
After=network.target

[Service]
Type=simple
User=yourusername
WorkingDirectory=/path/to/bot
ExecStart=/usr/bin/node bot.js
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl enable whatsapp-bot
sudo systemctl start whatsapp-bot
sudo systemctl status whatsapp-bot
```

---

## 🔒 Security

### Best Practices

1. **Never Share Private Key**

   - Keep `PRIVATE_KEY` secret
   - Use environment variables
   - Add `.env` to `.gitignore`

2. **Secure Server**

   - Use firewall
   - Keep OS updated
   - Use SSH keys only
   - Disable root login

3. **Rate Limiting**

   - Implement message throttling
   - Prevent spam attacks
   - Monitor unusual activity

4. **Backup Authentication**

   ```bash
   # Backup WhatsApp session
   tar -czf backup.tar.gz .wwebjs_auth

   # Restore if needed
   tar -xzf backup.tar.gz
   ```

5. **Test Before Production**
   - Always use testnet first
   - Test all commands
   - Monitor for 24 hours
   - Have rollback plan

### Security Checklist

- [ ] Private key stored in environment variable
- [ ] `.env` file in `.gitignore`
- [ ] Server firewall configured
- [ ] SSH key authentication enabled
- [ ] Regular security updates
- [ ] Bot logs monitored
- [ ] Backup authentication saved
- [ ] Rate limiting implemented

---

## 📊 Monitoring

### Health Checks

Add health check endpoint:

```javascript
// Simple HTTP server for monitoring
const http = require("http");

http
  .createServer((req, res) => {
    if (req.url === "/health") {
      const status = client.info ? "online" : "offline";
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status, timestamp: Date.now() }));
    }
  })
  .listen(3000);
```

### Logging

Use Winston for better logs:

```bash
npm install winston
```

```javascript
const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

// Usage
logger.info("Bot started");
logger.error("Transaction failed", { error: err.message });
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Development Setup

```bash
# Clone your fork
git clone https://github.com/yourusername/whatsapp-blockchain-bot.git

# Create branch
git checkout -b feature/my-feature

# Make changes and test
npm test

# Commit and push
git add .
git commit -m "Description of changes"
git push origin feature/my-feature
```

---

## 📝 License

This project is licensed under the MIT License. See `LICENSE` file for details.

---

## 🙏 Acknowledgments

- **whatsapp-web.js** - WhatsApp Web API wrapper
- **ethers.js** - Ethereum library
- **Hedera Hashgraph** - Blockchain network
- **Community Contributors** - Thank you!

---

## 📈 Stats

Made with ❤️ for farmers and supply chain transparency

**⚡ Start tracking your products on blockchain today!**
# IFarm
