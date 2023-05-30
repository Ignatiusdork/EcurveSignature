const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

//Alice 
const alicePrivateKey = "43c098c77044787a9aabe3672df010c143f17ffa9e0afde1257dcb5d1317fefc"
const alicePublicKey = "0388118d3327d9f60a12440f69a57c20180f2bd1f5bb453e18fde8581840691a91"

//Bob
const bobPrivateKey = "8aebdbfdbf69c7ff4c5869e4a105db829c0191baae64831f6a082be78427713f"
const bobPublicKey = "03ea5bdcde7ac318ec3b4ba69077207d551771246120d44dbf062f3b5a3b76056b"

//Charlie
const charliePrivateKey = "61c9d600c36d408436c31da340bdb0ef8e428800d5620e3ac2a98a12b41d1a60"
const charliePublicKey = "0239a61edf4d75550ecfcb3351a50e79217dae1c019ee5df0d2d186d39b073ec29"

// Steps to sign an intention using the secp256k1 eliptic curve:

// 1. hash the mesaage
// 2. sign the message
// 3. verify the message

const message = "Transfer crypto funds to-n-fro to Top Geees!";
const hashedMessage = keccak256(utf8ToBytes(message));
const signedMessageAlice = secp.secp256k1.sign(hashedMessage, alicePrivateKey);
const verifyAlice = secp.secp256k1.verify(signedMessageAlice, hashedMessage, alicePublicKey);
const signedMessageBob = secp.secp256k1.sign(hashedMessage, bobPrivateKey);
const verifyBob = secp.secp256k1.verify(signedMessageBob,hashedMessage,bobPublicKey);
const signedMessageCharlie = secp.secp256k1.sign(hashedMessage, charliePrivateKey);
const verifyCharlie = secp.secp256k1.verify(signedMessageCharlie, hashedMessage, charliePublicKey);

console.log(`signed alice message,`, signedMessageAlice);
console.log(`signed bob message,`, signedMessageBob);
console.log(`signed charlie message,`, signedMessageCharlie);

const enhancedSignature = {
    r: 32037838708968037261688240625494621210254128557363379062132861747695562223158n,
    s: 6136893787596303074390706387205757244213384191817794025437276737960342154397n,
    recovery: 1
}


const verifyAliceNhanSig = secp.secp256k1.verify(enhancedSignature, hashedMessage, alicePublicKey);
console.log(verifyAliceNhanSig);