import EthCrypto from 'eth-crypto'
import EthUtil from 'ethereumjs-util';

const publicKeyOfPrivateKey = (privateKey) => {
  const publicKeyBuffer = EthUtil.privateToPublic(privateKey);
  return publicKeyBuffer.toString('hex');
}

export const encryptor = async (privateKey, receiverPrivateKey, secretMessage) => {

  const signature = EthCrypto.sign(
    privateKey,
    EthCrypto.hash.keccak256(secretMessage)
  )

  const payload = {
      message: secretMessage,
      signature
  }

  const encrypted = await EthCrypto.encryptWithPublicKey(
      publicKeyOfPrivateKey(receiverPrivateKey),
      JSON.stringify(payload)
  )

  return encrypted
}
