const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { toHex } = require("ethereum-cryptography/utils");

app.use(cors());
app.use(express.json());

const balances = {
  "0388118d3327d9f60a12440f69a57c20180f2bd1f5bb453e18fde8581840691a91": 100,
  "03ea5bdcde7ac318ec3b4ba69077207d551771246120d44dbf062f3b5a3b76056b": 50,
  "0239a61edf4d75550ecfcb3351a50e79217dae1c019ee5df0d2d186d39b073ec29": 75,
};

// Get the balance for client input of address.
app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

 
// app function to post the data inputs from the client to the server, to `send` info for data inputs from server.
app.post("/send", (req, res) => {

  // TODO: get a signature from the client-side application
  // recover the public address from the signature

  // hash the message
  const message = "Transfer crypto funds to-n-fro to Top Geees!";
  const hashedMessage = keccak256(utf8ToBytes(message));

  // deconstruct the objects in the `req.body` var to be returned into different named variables.
  const { sender, recipient, amount,r, s, recovery, publicKey} = req.body

  // parse the data's recovered by the signature as a bigNumber, because it is. 
  bigIntR = BigInt(r);
  bigIntS = BigInt(s);
  const sig = new secp.secp256k1.Signature(bigIntR, bigIntS, parseInt(recovery));

  // verify the signature to know if the intention is = `true` to prove it is authentic. Then release funds if it's.
  const verify = secp.secp256k1.verify(sig, hashedMessage, publicKey);
  console.log(verify)

  if (verify) {
    setInitialBalance(sender);
    setInitialBalance(recipient);
  
    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
