import { useState } from 'react';
import './App.css'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import backgroundImage from './assets/backgroundImage.jpg'
import arrowupdown from './assets/arrow-up-down.svg'

function App() {

  const [rotation, setRotation] = useState(0); // Animation
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);
  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
    setRotation(prev => prev + 180); // Animation
  }

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  }

  return (
    <>

      <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >

        <div className="w-full">
          <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
            <div className="text-center mb-10 ">
              <h1 className="text-4xl font-bold text-blue-500 drop-shadow-lg">Currency Converter</h1>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert();

              }}
            >
              <div className="w-full mb-1">
                <InputBox
                  label="From"
                  amount={amount}
                  currencyOptions={options}
                  onCurrencyChange={
                    (currency) => setFrom(currency)
                  }
                  selectCurrency={from}
                  onAmountChange={
                    (amount) => setAmount(amount)
                  }
                />
              </div>
              <div className="relative w-full h-0.5">
                <button
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5 cursor-pointer"
                  onClick={swap}
                >
                  <img
                    src={arrowupdown}
                    alt="Arrow Up Down"
                    className="w-5 h-5 transition-transform duration-500"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  />
                </button>
              </div>
              <div className="w-full mt-1 mb-4">
                <InputBox
                  label="To"
                  amount={convertedAmount}
                  currencyOptions={options}
                  onCurrencyChange={
                    (currency) => setTo(currency)
                  }
                  selectCurrency={to}
                  amountDisable

                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg cursor-pointer">
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App
