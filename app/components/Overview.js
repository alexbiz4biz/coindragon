import { useState, useEffect } from 'react'

import Image from 'next/image'

// Components
import Account from './Account'
import Add from './Add'

// Images
import up from '../assets/up.svg'
import down from '../assets/down.svg'
import add from '../assets/add.svg'


const Overview = ({account, setAccount, markets, trackedTokens, setTrackedTokens, tokens}) => {

	const [isAccountModalOpen, setIsAccountModalOpen] = useState(false) // State for account modal (True / False)
	const [isAddTokenModalOpen, setIsAddTokenModalOpen] = useState(false) // State for account modal (True / False)

	const [value, setValue] = useState(0.0)
	const [percentageChange, setPercentageChange] = useState(0)


	const accountModalHandler = () => {
		setIsAccountModalOpen(true)
	}

	const tokenModalHandler = () => {
		if(account){
			setIsAddTokenModalOpen(true)
		} else{
			setIsAccountModalOpen(true)
		}
	}

	const calculateValue = () => {
		let total = 0

		for (var i = 0 ; i < tokens.length; i++){
			if(tokens[i].balance === 0){continue}
			    total += tokens[i].value
		}

		setValue(total)
	}

	const calculatePercetageChange = () => {
		let total = 0

		for (var i = 0 ; i < tokens.length; i++){
			if(tokens[i].balance === 0){continue}
			
			const pastValue = (tokens[i].market.current_price - tokens[i].market.price_change_24h) * tokens[i].balance
			const currentValue = tokens[i].value
			const change = ((currentValue - pastValue) / pastValue ) * 100

			total += change
		}		

		setPercentageChange(total)
	}

	useEffect(() => {
		if(tokens.length === 0){
		  setValue(0.0)
		  setPercentageChange(0.0)
		} else{
		  calculateValue()
		  calculatePercetageChange()
		}

	})

	return (

		<div className="overview">
		  <div className="overview__account">
		  	<h3>Set Account</h3>
		  	{account ? 
		  	  (
		  	    <p>{account.slice(0,6) + "..." + account.slice(-4)} </p>
		  	  ):
		  	  (
			  	<button onClick={accountModalHandler} >
			  		<Image
			  			src={add}
			  			width={20}
			  			height={20}
			  			alt="Set account"
			  		/>
			  	</button>
		  	  )
		  	}
		  </div>

		  <div className="overview__tracked">
		  	<h3>Assets Tracked</h3>
		  	<p>{tokens.length}</p>
		  	<button onClick={tokenModalHandler}>
		  		<Image
		  			src={add}
		  			width={20}
		  			height={20}
		  			alt="Add Token"
		  		/>
		  	</button>
		  </div>

		  <div className="overview__total">
		  	<h3>Total Value</h3>
		  	<p>{value.toLocaleString('en-us',{ style: 'currency', currency: 'USD'})}</p>
		  </div>

		  <div className="overview__change">
		  	<h3>% Change</h3>

		  	  <p>
		  	    <Image
		  			src={percentageChange >= 0.0 ? up : down}
		  			width={20}
		  			height={20}
		  			alt="Add Token"
		  		/>
    		  	<span className="{percentageChange >= 0.00 ? green : red}" >{percentageChange.toFixed(2)}%</span>
		  	  </p>
		  </div>

		  {isAccountModalOpen && 
		    <Account
		      setIsAccountModalOpen={setIsAccountModalOpen}
		      setAccount={setAccount}
		    />
		  }
		  
		  {isAddTokenModalOpen && 
		    <Add
   		      setIsAddTokenModalOpen={setIsAddTokenModalOpen}
   		      markets={markets}
   		      trackedTokens={trackedTokens}
   		      setTrackedTokens={setTrackedTokens}
		    />
		  }
		  

		</div>


	);


}

export default Overview;