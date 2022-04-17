//@ts-nocheck
import './web3.js';

export class Web3Integration {
    web3
    constructor(provider) {
        this.web3 = new Web3(provider)
    }

    // retorna uma instancia do contrato
    private _loadContract = (abiInterface, contractAddress, senderAddress) => {
        return new this.web3.eth.Contract(abiInterface, contractAddress, {
            from: senderAddress
        })
    }

    // retorna nonce do usuario
    private _getNonce = async (userAddress) => {
        return this.web3.utils.toHex(await this.web3.eth.getTransactionCount(userAddress))
    }

    // retorna gasprice
    private _getGasPrice = async () => {
        return this.web3.utils.toHex(await this.web3.eth.getGasPrice())
    }

    private _estimateGasLimit = async (from, nonce, to, data) => {
        return this.web3.utils.toHex(
            await this.web3.eth.estimateGas({
                from, nonce, to, data
            })
        )
    }

    // aguarda transação ser minerada
    private _getTransactionReceiptMined = (txHash) => {
        const transactionReceiptAsync = (resolve, reject) => {
            this.web3.eth.getTransactionReceipt(txHash, (error, receipt) => {
                if (error) {
                    reject(error)
                } else if (receipt == null) {
                    setTimeout(
                        () => transactionReceiptAsync(resolve, reject),
                        500)
                } else {
                    resolve(receipt)
                }
            })
        }

        if (Array.isArray(txHash)) {
            return Promise.all(txHash.map(
                oneTxHash => this._getTransactionReceiptMined(oneTxHash, interval)))
        } else if (typeof txHash === `string`) {
            return new Promise(transactionReceiptAsync)
        } else {
            throw new Error(`Invalid Hash: ${txHash}`)
        }
    }

    // monta a tx para ser enviada    
    private _createTxObject = async (contractAbi, contractAddress, ownerAddress, method, ...paramsOfMethod) => {
        const nonce = await this._getNonce(ownerAddress);
        const gasPrice = await this._getGasPrice();
        const data = this._loadContract(contractAbi, contractAddress, ownerAddress).methods[method](...paramsOfMethod).encodeABI()
        const gasLimit = await this._estimateGasLimit(contractAddress, nonce, ownerAddress, data)
        return {
            to: contractAddress,
            from: ownerAddress,
            nonce,
            gasLimit,
            gasPrice,
            data
        }
    }

    private _sendTransaction = async (povider, txObject) => {
        return povider.request({
            method: `eth_sendTransaction`,
            params: [txObject]
        })
    }

    sendTransaction = async (provider, abi, factoryAddress, ownerAddres, method, ...methodParams) => {
        const txObject = await this._createTxObject(abi, factoryAddress, ownerAddres, method, ...methodParams)
        const txHash = await this._sendTransaction(provider, txObject)
        return await this._getTransactionReceiptMined(txHash)
    }

    getWalletPermission = async (provider) => {
        await provider.request({
            method: `wallet_requestPermissions`,
            params: [{
                eth_accounts: {}
            }]
        })
        return ethereum.request({ method: `eth_accounts` })
    }

    getNetWork = async () => {
        return new Promise((resolve, reject) => {
            this.web3.eth.getChainId((err, netId) => {
                switch (netId) {
                    case 44787:
                        resolve('Celo (Alfajores Testnet) - ID 44787')
                        break
                    case 42220:
                        resolve('Celo (Mainnet) - ID 42220')
                        break
                    default:
                        resolve('ID ' + netId)
                }

            })
        })

    }

    call(abiInterface, contractAddress, senderAdress, method, ...params) {                
        return this._loadContract(abiInterface, contractAddress, senderAdress).methods[method](...params).call()
    }
}