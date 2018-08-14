// CONSTANTS
var contractAddress = '0xbf2da0c1bd90b2dafe16571a45f56ce3ace28c2b';

// GLOBALS
var web3Mode = null;
var walletMode = 'metamask';
var currentAddress = null;
var keystore = null;
var dividendValue = 0;
var tokenBalance = 0;
var contract = null;
var muteSound = false;
var etctospend = 0 ;

var buyPrice = 0;
var globalBuyPrice = 0;
var sellPrice = 0;
var ethPrice = 0;
var currency = (typeof default_currency === 'undefined') ? 'USD' : default_currency;
var ethPriceTimer = null;
var dataTimer = null;
var infoTimer = null;
var abi = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "_customerAddress",
				"type": "address"
			}
		],
		"name": "dividendsOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_ethereumToSpend",
				"type": "uint256"
			}
		],
		"name": "calculateTokensReceived",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_tokensToSell",
				"type": "uint256"
			}
		],
		"name": "calculateEthereumReceived",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "onlyAmbassadors",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "administrators",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "sellPrice",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "stakingRequirement",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_includeReferralBonus",
				"type": "bool"
			}
		],
		"name": "myDividends",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalEthereumBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_customerAddress",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_amountOfTokens",
				"type": "uint256"
			}
		],
		"name": "setStakingRequirement",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "buyPrice",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_identifier",
				"type": "bytes32"
			},
			{
				"name": "_status",
				"type": "bool"
			}
		],
		"name": "setAdministrator",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "Hourglass",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "myTokens",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "disableInitialStage",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_toAddress",
				"type": "address"
			},
			{
				"name": "_amountOfTokens",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_symbol",
				"type": "string"
			}
		],
		"name": "setSymbol",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			}
		],
		"name": "setName",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_amountOfTokens",
				"type": "uint256"
			}
		],
		"name": "sell",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "exit",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_referredBy",
				"type": "address"
			}
		],
		"name": "buy",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "reinvest",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "customerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "incomingEthereum",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "tokensMinted",
				"type": "uint256"
			},
			{
				"indexed": true,
				"name": "referredBy",
				"type": "address"
			}
		],
		"name": "onTokenPurchase",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "customerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "tokensBurned",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "ethereumEarned",
				"type": "uint256"
			}
		],
		"name": "onTokenSell",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "customerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "ethereumReinvested",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "tokensMinted",
				"type": "uint256"
			}
		],
		"name": "onReinvestment",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "customerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "ethereumWithdrawn",
				"type": "uint256"
			}
		],
		"name": "onWithdraw",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	}
];

// UTILITY FUNCTIONS
if (!String.prototype.format) {
  String.prototype.format = function () {
    var args = arguments
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] !== 'undefined'
        ? args[number]
        : match

    })
  }
}

function copyToClipboard (text) {
  if (window.clipboardData && window.clipboardData.setData) {
    // IE specific code path to prevent textarea being shown while dialog is visible.
    return clipboardData.setData('Text', text)

  } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
    var textarea = document.createElement('textarea')
    textarea.textContent = text
    textarea.style.position = 'fixed'  // Prevent scrolling to bottom of page in MS Edge.
    document.body.appendChild(textarea)
    textarea.select()
    try {
      return document.execCommand('copy')  // Security exception may be thrown by some browsers.
    } catch (ex) {
      console.warn('Copy to clipboard failed.', ex)
      return false
    } finally {
      document.body.removeChild(textarea)
    }
  }
}

function updateEthPrice () {
  clearTimeout(ethPriceTimer)
  if( currency === 'EPY' ){
    ethPrice = 1 / (sellPrice + ((buyPrice - sellPrice) / 2))
    ethPriceTimer = setTimeout(updateEthPrice, 10000)
  } else {
    $.getJSON('https://min-api.cryptocompare.com/data/price?fsym=ETC&tsyms=ETH,USD,' + currency, function (result) {
      var eth = result.ETH
      var usd = result.USD
      ethPrice = parseFloat(eth)
      usdPrice = parseFloat(usd)
      ethPriceTimer = setTimeout(updateEthPrice, 10000)
    })
  }
}

function convertEthToWei (e) {
  return 1e18 * e
}

function convertWeiToEth (e) {
  return e / 1e18
}

function getSeed () {
  useWallet(function (pwDerivedKey) {
    console.log(keystore.getSeed(pwDerivedKey))
  })
}

function generateWallet () {

  if (keystore !== null) {
    if (!confirm(lang.walletGenConfirmation))
      return
  }

  // generate a new BIP32 12-word seed
  var secretSeed = lightwallet.keystore.generateRandomSeed()

  // the seed is stored encrypted by a user-defined password
  var password = prompt(lang.enterPassword)

  lightwallet.keystore.createVault({
    seedPhrase: secretSeed,
    password: password,
    hdPathString: `m/44'/60'/0'/0`,
  }, function (err, ks) {
    if (err) throw err

    keystore = ks

    // Store keystore in local storage
    localStorage.setItem('keystore', keystore.serialize())

    keystore.keyFromPassword(password, function (err, pwDerivedKey) {
      if (err) throw err
      keystore.generateNewAddress(pwDerivedKey, 1)

      var address = keystore.getAddresses()[0]

      $('#wallet-seed').html(secretSeed)
      $('#wallet-address').html(address)
      $('#seed-dimmer').dimmer('show')

      currentAddress = address
      walletMode = 'web'
      updateData(contract)

    })
  })
}

function getPassword (cb) {
  $('#password-prompt').modal('show')

  $('#confirm-tx').off('click')
  $('#confirm-tx').on('click', function () {
    var password = $('#password').val()
    $('#password').val('')

    $('#password-prompt').modal('hide')

    cb(password)
  })
}

function useWallet (cb) {
  getPassword(function (password) {
    keystore.keyFromPassword(password, function (err, pwDerivedKey) {
      if (err) throw err
      cb(pwDerivedKey)
    })
  })
}

function loadWallet () {
  useWallet(function (pwDerivedKey) {
    try {
      keystore.generateNewAddress(pwDerivedKey, 1)
      currentAddress = keystore.getAddresses()[0]
      walletMode = 'web'
      updateData()

    } catch (err) {
      console.log(err)
      alert(lang.incorrectPassword)
    }
  })
}

function recoverWallet () {
  var secretSeed = prompt(lang.enterSeed)

  if (!secretSeed)
    return

  var password = prompt(lang.enterPassword)

  if (!password)
    return

  try {
    lightwallet.keystore.createVault({
      seedPhrase: secretSeed,
      password: password,
      hdPathString: `m/44'/60'/0'/0`,
    }, function (err, ks) {
      if (err) throw err

      keystore = ks

      // Store keystore in local storage
      localStorage.setItem('keystore', keystore.serialize())

      keystore.keyFromPassword(password, function (err, pwDerivedKey) {
        if (err) throw err

        keystore.generateNewAddress(pwDerivedKey, 1)
        currentAddress = keystore.getAddresses()[0]
        walletMode = 'web'
        updateData()
      })
    })
  } catch (err) {
    console.log(err)
    alert(lang.seedInvalid)
  }
}

function detectWeb3 () {
  if ($('#metamask-detecting').hasClass('visible')) {
    $('#metamask-detecting').dimmer('hide')
  }

  if (typeof web3 !== 'undefined') {
    web3js = new Web3(web3.currentProvider)
    web3Mode = 'metamask'
    currentAddress = web3js.eth.accounts[0]
  } else {
    web3js = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/Fi6gFcfwLWXX6YUOnke8'))
    web3Mode = 'direct'
  }

  var ks = localStorage.getItem('keystore')
  if (ks !== null) {
    keystore = lightwallet.keystore.deserialize(ks)
    $('#unlock-wallet-container').show()
  }

  var contractClass = web3js.eth.contract(abi)
  contract = contractClass.at(contractAddress)

  updateData()
  attachEvents()
  updateTokenInfo()
}

window.addEventListener('load', function () {

  setTimeout(detectWeb3, 500)

  function call (address, method, params, amount) {
    web3js.eth.getTransactionCount(currentAddress, function (err, nonce) {
      if (err) throw err

      web3js.eth.getGasPrice(function (err, gasPrice) {
        if (err) throw err

        // Median network gas price is too high most the time, divide by 10 or minimum 1 gwei
        gasPrice = Math.max(gasPrice / 10, 1000000000)

        var tx = {
          'from': currentAddress,
          'to': address,
          'value': '0x' + amount.toString(16),
          'gasPrice': '0x' + (gasPrice).toString(16),
          'gasLimit': '0x' + (100000).toString(16),
          'nonce': nonce,
        }

        var rawTx = lightwallet.txutils.functionTx(abi, method, params, tx)

        useWallet(function (pwDerivedKey) {
          try {
            var signedTx = '0x' + lightwallet.signing.signTx(keystore, pwDerivedKey, rawTx, currentAddress)
          } catch (err) {
            console.log(err)
            alert(lang.incorrectPassword)
            return
          }
          web3js.eth.sendRawTransaction(signedTx, function (err, hash) {
            if (err) {
              alert(err.message.substring(0, err.message.indexOf('\n')))
              throw err
            }

            $('#tx-hash').empty().append($('<a target="_blank" href="https://etherscan.io/tx/' + hash + '">' + hash + '</a>'))
            $('#tx-confirmation').modal('show')
          })
        })
      })
    })
  }

  function getCookie(name) {
    		var dc = document.cookie;
    		var prefix = name + "=";
    		var begin = dc.indexOf("; " + prefix);

		if (begin == -1) {
        		begin = dc.indexOf(prefix);
        		if (begin != 0) return null;
    		}
    		else
    		{
        		begin += 2;
        		var end = document.cookie.indexOf(";", begin);
        		if (end == -1) {
        		end = dc.length;
        	}
    		}

    return decodeURI(dc.substring(begin + prefix.length, end));
  }

  function fund (address, amount) {
    if (walletMode === 'metamask') {
var etcwei = convertEthToWei(amount) ;
var gasvalue = 120000;    
    contract.buynow({from: web3js.eth.accounts[0], value: etcwei , gas: gasvalue}, function (e,r){});
     
   web3.eth.sendTransaction({
   from: web3.eth.accounts[0],
   to: contractAddress,
   data: web3.eth.abi.encodeFunctionSignature('buynow()')
   value: web3.toWei(amount, "ether")
} ;  
   }else if (walletMode === 'web') {
      call(address, 'buy', [], convertEthToWei(amount))
    }
  }

  function donate (amount) {
    if (walletMode === 'metamask') {
      const txobject = {
        from: currentAddress,
        to: donationAddress,
        value: convertEthToWei(amount)
      }
      web3js.eth.sendTransaction(txobject, function (err, hash) {
        console.log(err)
      })
    } else if (walletMode === 'web') {
      call(donationAddress, 'buy', [], convertEthToWei(amount))
    }
  }

  function sell (amount) {
    if (walletMode === 'metamask') {
      contract.sell(convertEthToWei(amount), function (e, r) {
        console.log(e, r)
      })
    } else if (walletMode === 'web') {
      call(contractAddress, 'sell', [convertEthToWei(amount)], 0)
    }
  }

  function reinvest () {
    if (walletMode === 'metamask') {
      contract.reinvest(function (e, r) {
        console.log(e, r)
      })
    } else if (walletMode === 'web') {
      call(contractAddress, 'reinvest', [], 0)
    }
  }

  function withdraw () {
    if (walletMode === 'metamask') {
      contract.withdraw(function (e, r) {
        console.log(e, r)
      })
    } else if (walletMode === 'web') {
      call(contractAddress, 'withdraw', [], 0)
    }
  }

  // Buy token click handler

$('#buy-tokens').click(function () {
let amount = $('#purchase-amount').val().trim();
    fund(contractAddress,amount)
  })

  	// Transfer handler
	$('#transfer-tokens-btn').click(function() {
		let address = $('#transfer-address').val();
		let amount = $('#transfer-tokens').val();

		console.log('hey');
		if (!web3js.isAddress(address)) {
			return;
		}
		if (!parseFloat(amount))
		{	
			return
		}
		let amountConverted = web3js.toBigNumber(amount * 1000000000000000000);
		transferTokens(amountConverted, address);
	});

	function transferTokens(amount, address) {
		if (walletMode === 'metamask') {
				contract.myTokens(function(err, myTokens) {
					if (parseFloat(amount) <= parseFloat(myTokens)) {
						contract.transfer(address, amount, function(err, result) {
							if (err) {
								alertify.error('An error occured. Please check the logs.');
								console.log('An error occured', err);
							}
						})
					}
				});
		} else {
			alert.log('Transfer functionality supported only with Metamask or Trust Wallet.');
		}

	}

  $('#close-seed').click(function () {
    if ($('#seed-dimmer').hasClass('visible')) {
      $('#seed-dimmer').dimmer('hide')
      $('#wallet-dimmer').dimmer('show')
    }
  })

  $('#generate-wallet').click(function () {
    generateWallet()
  })

  $('#unlock-wallet').click(function () {
    loadWallet()
  })

  $('#recover-wallet').click(function () {
    recoverWallet()
  })

  $('#send-action').click(function () {
    var amount = $('#send-amount').val().trim()
    if (amount <= 0 || !isFinite(amount) || amount === '') {
      $('#send-amount').addClass('error').popup({
        title: lang.invalidInput,
        content: lang.invalidInputResponse
      }).popup('show')
    } else {
      var address = $('#send-address').val()
      if (!address.match(/^0x[0-9a-fA-F]{40}$/)) {
        $('#send-address').addClass('error').popup({
          title: lang.invalidInput,
          content: lang.invalidInputResponse
        }).popup('show')
      } else {
        $('#send-amount').removeClass('error').popup('destroy')
        $('#send-address').removeClass('error').popup('destroy')
        fund(address, amount)
      }
    }
  })

  $('#donate-action').click(function () {
    let amount = $('#donate-amount').val().trim()
    if (amount <= 0 || !isFinite(amount) || amount === '') {
      $('#donate-amount').addClass('error').popup({
        title: lang.invalidInput,
        content: lang.invalidInputResponse
      }).popup('show')
    } else {
      $('#donate-amount').removeClass('error').popup('destroy')
      donate(amount)
    }
  })

  $('#wallet-open').click(function (e) {
    e.preventDefault()
    $('#wallet-dimmer').dimmer('show')
  })

  $('#wallet-close').click(function (e) {
    e.preventDefault()
    $('#wallet-dimmer').dimmer('hide')

    $('#exported-seed').html('').slideUp()
    $('#exported-private-key').val('').slideUp()
  })

  $('#donate-open').click(function (e) {
    e.preventDefault()
    $('#donate-dimmer').dimmer('show')
  })

  $('#donate-close').click(function () {
    $('#donate-dimmer').dimmer('hide')
  })

  // Sell token click handler
  $('#sell-tokens-btn').click(function () {
    sell($("#sell-tokens-amount").val())
  })

  // Reinvest click handler
  $('#reinvest-btn').click(function () {
    reinvest()
  })

  // Withdraw click handler
  $('#withdraw-btn').click(function () {
    withdraw()
  })

  $('#sell-tokens-btn-m').click(function () {
    contract.sell(function (e, r) {
      console.log(e, r)
    })
  })

  $('#reinvest-btn-m').click(function () {
    contract.reinvest(function (e, r) {
      console.log(e, r)
    })
  })

  $('#withdraw-btn-m').click(function () {
    contract.withdraw(function (e, r) {
      console.log(e, r)
    })
  })

  $('#currency').val(currency)

  $('#currency').change(function () {
    currency = $(this).val()
    updateEthPrice()
  })

  updateEthPrice()

  // $('#password-prompt').modal({closable: false})

  $('#cancel-tx').click(function () {
    $('#password-prompt').modal('hide')
  })

  $('#password').keyup(function (e) {
    var code = e.keyCode || e.which
    if (code === 13) {
      $('#confirm-tx').click()
    }
  })

  $('#purchase-amount').bind("keypress keyup click", function (e) {
    var number = $('#purchase-amount').val();
    var numTokens = number / globalBuyPrice;
    $('.number-of-tokens').text("With " + (number==0 ? 0 : number) + " ETH you can buy " + numTokens.toFixed(3) + " Tokens");
  })

  $('#delete-wallet').click(function (e) {
    e.preventDefault()

    if (!confirm(lang.deleteWalletConfirmation))
      return

    useWallet(function (pwDerivedKey) {
      if (!keystore.isDerivedKeyCorrect(pwDerivedKey)) {
        alert(lang.incorrectPassword)
      }
      else {
        $('#wallet-close').click()
        keystore = null
        localStorage.removeItem('keystore')
        currentAddress = null
        updateData()
      }
    })
  })

  $('#export-private-key').click(function (e) {
    e.preventDefault()

    useWallet(function (pwDerivedKey) {
      var key = keystore.exportPrivateKey(currentAddress, pwDerivedKey)
      $('#exported-seed').html('').slideUp()
      $('#exported-private-key').val('0x' + key).slideDown()
    })
  })

  $('#export-seed').click(function (e) {
    e.preventDefault()

    useWallet(function (pwDerivedKey) {
      var seed = keystore.getSeed(pwDerivedKey)
      $('#exported-private-key').val('').slideUp()
      $('#exported-seed').html(seed).slideDown()
    })
  })

  $('#copy-eth-address').click(function (e) {
    e.preventDefault()
    copyToClipboard(currentAddress)

    $('#copy-eth-address').popup({
      content: lang.copiedToClip,
      hoverable: true
    }).popup('show')

  }).on('mouseout', function () {
    $('#copy-eth-address').popup('destroy')
  })

  $('.mute-sound').click(function(e) {
  		var soundText = $(this).find('span');
		e.preventDefault()
		// console.log('Clicked the mute sound')

		muteSound = !muteSound;

		// console.log(muteSound)

		if (soundText.hasClass('on')) {
			soundText.removeClass('on').addClass('off');
			soundText.text('OFF');
		} else {
			soundText.removeClass('off').addClass('on');
			soundText.text('ON');
		}

		// if($(this).find('svg').hasClass('fa-volume-up')){
		//     $('.mute-sound').find("svg").removeClass('fa-volume-up').addClass('fa-volume-off');
		// } else if($(this).find('svg').hasClass('fa-volume-off')) {
		// 	$('.mute-sound').find('svg').removeClass('fa-volume-off').addClass('fa-volume-up');
		// }
	})
})

function updateData () {
  clearTimeout(dataTimer)

  var loggedIn = false

  if (walletMode === 'metamask') {
    loggedIn = typeof web3js.eth.defaultAccount !== 'undefined' && web3js.eth.defaultAccount !== null
    currentAddress = web3js.eth.defaultAccount
    $('#meta-mask-ui').removeClass('wallet-web').addClass('wallet-mm')
  } else if (walletMode === 'web') {
    loggedIn = currentAddress !== null
    $('#meta-mask-ui').addClass('wallet-web').removeClass('wallet-mm')
  }

  if (currentAddress !== null) {
    $('#eth-address').html(currentAddress)
    $('#eth-public-address a.etherscan-link').attr('href', 'https://etherscan.io/address/' + currentAddress).html(currentAddress)
  } else {
    $('#eth-address').html('Not Set')
  }

  if (loggedIn) {
    $('#meta-mask-ui').removeClass('logged-out').addClass('logged-in')

    contract.balanceOf(currentAddress, function (e, r) {
      const tokenAmount = (r / 1e18 * 0.9999)
      $('.balance').text(Number(tokenAmount.toFixed(2)).toLocaleString())
      contract.calculateEthereumReceived(r, function (e, r) {
        let bal = convertWeiToEth(r)
        $('.value').text(bal.toFixed(4))
        $('.value-usd').text(Number((convertWeiToEth(r * 1) * usdPrice).toFixed(2)).toLocaleString())
        if (tokenBalance !== 0) {
          if (bal > tokenBalance) {
            $('.value').addClass('up').removeClass('down')
            setTimeout(function () {
              $('.value').removeClass('up')
            }, 3000)
          }
          else if (bal < tokenBalance) {
            $('.value').addClass('down').removeClass('up')
            setTimeout(function () {
              $('.value').removeClass('down')
            }, 3000)
          }
        }
        tokenBalance = bal
      })
    })

    contract.myDividends(false, function (e, r) {
      let div = convertWeiToEth(r).toFixed(6)
      let refdiv = (dividendValue - div).toFixed(6);

       $('.refdiv').text(refdiv)
       $('.refdiv-usd').text(Number((refdiv * usdPrice).toFixed(2)).toLocaleString())

       $('.nonrefdiv').text(div)
       $('.nonrefdiv-usd').text(Number((convertWeiToEth(r) * usdPrice).toFixed(2)).toLocaleString())
    })


    contract.myDividends(true, function (e, r) {
      let div = convertWeiToEth(r).toFixed(6)

      $('.div').text(div)
      $('input.div').val(div + " ETH")
      $('.div-usd').text(Number((convertWeiToEth(r) * usdPrice).toFixed(2)).toLocaleString())

      if (dividendValue != div) {
        $('.div').fadeTo(100, 0.3, function () { $(this).fadeTo(250, 1.0) })

        dividendValue = div
      }
    })

    web3js.eth.getBalance(currentAddress, function (e, r) {
      // We only want to show six DP in a wallet, consistent with MetaMask
      $('.address-balance').text(convertWeiToEth(r).toFixed(6) + ' ETH')
    })
  } else {
    $('#meta-mask-ui').addClass('logged-out').removeClass('logged-in')
  }

  contract.buyPrice(function (e, r) {
    let buyPrice = convertWeiToEth(r)
    globalBuyPrice = convertWeiToEth(r)
    $('.buy').text(buyPrice.toFixed(6) + ' ')
    $('.buy-usd').text('$' + Number((buyPrice * usdPrice).toFixed(2)).toLocaleString() + ' ' + currency + '')
  })

  contract.totalSupply(function (e, r) {
    let actualSupply = r / 1e18;
    $('.contract-tokens').text(Number(actualSupply.toFixed(0)).toLocaleString());
  })

  contract.sellPrice(function (e, r) {
    let sellPrice = convertWeiToEth(r)
    $('.sell').text(sellPrice.toFixed(6) + ' ')
    $('.sell-usd').text('$' + Number((sellPrice * usdPrice).toFixed(2)).toLocaleString() + ' ' + currency + '')
  })

  web3js.eth.getBalance(contract.address, function (e, r) {
    $('.contract-balance').text(convertWeiToEth(r).toFixed(4) + " ")
    $('.contract-balance-usd').text('$' + Number((convertWeiToEth(r) * usdPrice).toFixed(2)).toLocaleString() + ' ' + currency + '');
  })

	$('#purchase-amount').on('input change', function() {
		var value = parseFloat($(this).val()) * 0.65;
		var tokenPriceInitial_ = 0.0000001;
    	var tokenPriceIncremental_ = 0.00000001;
		

		if ( value === 0 || Number.isNaN(value) ) {
			$('#deposit-hint').text("");
			return;
		}

		if ( value > 0) {
			contract.sellPrice(function (e, r) {
			    let sellPrice = convertWeiToEth(r)
			    var tokens = value / sellPrice;
			    $('#deposit-hint').text("You will get +- " + tokens.toFixed(0) + " P4C (fee not included)");
			})	
		}
		
	});


  dataTimer = setTimeout(function () {
    updateData()
  }, web3Mode === 'metamask' ? 2000 : 6000)
}


function updateTokenInfo() {
	clearTimeout(infoTimer)

	$.ajax({
		url: "https://api.ethplorer.io/getAddressHistory/" + contractAddress + "?apiKey=freekey&limit=10",
		data: null,
		success: function (resp) {
		   console.log(resp);
		}
	});

	infoTimer = setTimeout(function () {
	    updateTokenInfo()
	}, web3Mode === 'metamask' ? 5000 : 10000)	
}


function attachEvents() {

	let buySound = new Audio('./audio/bought.mp3');
	buySound.volume = 0.90;
	let sellSound = new Audio('./audio/reinvest.mp3');
  	sellSound.volume = 0.90

	// Always start from 10 blocks behind
	web3js.eth.getBlockNumber(function(error, result) {
		console.log("Current Block Number is", result);
	  	contract.allEvents({
			fromBlock: result - 17,
		},function(e, result) {
			// console.log('Current user - ', web3.eth.accounts[0])
			let currentUserEvent = web3.eth.accounts[0] == result.args.customerAddress;
			// console.log('Found new transaction');
			// console.log(alertify);
			// if (currentUserEvent) {
			// 	alertify.logPosition('bottom left');
			// } else {
			// 	alertify.logPosition('bottom right');
			// }
			switch(result.event) {
				case 'onTokenPurchase':
					if (currentUserEvent) {
							alertify.success('Your buy order is confirmed! You spent ' + result.args.incomingEthereum.div(1000000000000000000).toFixed(4) + ' ETC and received ' + result.args.tokensMinted.div(1000000000000000000).toFixed(4) + ' P4C.');
					} else {
							alertify.log('Someone else spent ' + result.args.incomingEthereum.div(1000000000000000000).toFixed(4) + ' ETC and received ' + result.args.tokensMinted.div(1000000000000000000).toFixed(4) + ' P4C.');
					}
					if (!muteSound) {
						buySound.play();
					}
					break;
				case 'onTokenSell':
					if (currentUserEvent) {
							alertify.success('Your sell order is confirmed! You received ' + result.args['ethereumEarned'].div(1000000000000000000).toFixed(4) + ' ETC for ' + result.args.tokensBurned.div(1000000000000000000).toFixed(4) + ' P4C.');
					} else {
							alertify.log('Someone else sold tokens. They received ' + result.args['ethereumEarned'].div(1000000000000000000).toFixed(4) + ' ETC for ' + result.args.tokensBurned.div(1000000000000000000).toFixed(4) + ' P4C.');
					}
					if (!muteSound) {
						sellSound.play()
					}
					break;
				case 'onWithdraw':
					if (currentUserEvent) {
						alertify.success('Your withdrawal request is confirmed! You received ' + result.args['ethereumWithdrawn'].div(1000000000000000000).toFixed(4) + '.');
					}
					if (!muteSound) {
						sellSound.play();
					}
					break;
				case 'onReinvestment':
					if (currentUserEvent) {
						alertify.success('You reinvestment order is confirmed! You received ' + result.args.tokensMinted.div(1000000000000000000).toFixed(4) + ' P4C for reinvesting ' + result.args.ethereumReinvested.div(1000000000000000000).toFixed(4) + 'ETC');
					} else {
						alertify.success('Someone reinvested ' + result.args.ethereumReinvested.div(1000000000000000000).toFixed(4) + ' ETC and received ' + result.args.tokensMinted.div(1000000000000000000).toFixed(4) + '. P4C.');
					}
					if (!muteSound) {
						buySound.play();
					}
					break;
				case 'Transfer':
					if (currentUserEvent) {
						alertify.success('Your transfer order is confirmed! ' + result.args['to'] + ' received ' + result.args['tokens'].div(1000000000000000000).toFixed(4) + ' P4C.');
					}
					break;
			}
		})
	})
}