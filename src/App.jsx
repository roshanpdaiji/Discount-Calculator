import './App.css';
import { TextField } from '@mui/material';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Button from '@mui/material/Button';
import { useState } from 'react';

function App() {
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [totalDiscount, setTotalDiscount] = useState("");
  const [totalTax, setTotalTax] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [isOriginalPriceValid, setIsOriginalPriceValid] = useState(true);
  const [isDiscountRateValid, setIsDiscountRateValid] = useState(true);
  const [isQuantityValid, setIsQuantityValid] = useState(true);
  const [isTaxRateValid, setIsTaxRateValid] = useState(true);

  const handleValidation = (tag) => {
    const { name, value } = tag;
    let isValid = true;

    switch (name) {
      case "originalPrice":
        isValid = !!value.match(/^\d*\.?\d+$/);
        setOriginalPrice(value);
        setIsOriginalPriceValid(isValid);
        break;
      case "discountRate":
        isValid = !!value.match(/^\d*\.?\d+$/);
        setDiscountRate(value);
        setIsDiscountRateValid(isValid);
        break;
      case "quantity":
        isValid = !!value.match(/^\d+$/);
        setQuantity(value);
        setIsQuantityValid(isValid);
        break;
      case "taxRate":
        isValid = !!value.match(/^\d*\.?\d+$/);
        setTaxRate(value);
        setIsTaxRateValid(isValid);
        break;
      default:
        break;
    }
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    if (isOriginalPriceValid && isDiscountRateValid && isQuantityValid && isTaxRateValid) {
      const totalOriginal = originalPrice * quantity;
      const discountAmount = totalOriginal * (discountRate / 100);
      const taxableAmount = totalOriginal - discountAmount;
      const taxAmount = taxableAmount * (taxRate / 100);
      const finalAmount = taxableAmount + taxAmount;

      const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

      setTotalDiscount(formatCurrency(discountAmount));
      setTotalTax(formatCurrency(taxAmount));
      setFinalPrice(formatCurrency(finalAmount));
    }
  };

  const handleReset = () => {
    setOriginalPrice("");
    setDiscountRate("");
    setQuantity("");
    setTaxRate("");
    setTotalDiscount("");
    setTotalTax("");
    setFinalPrice("");
    setIsOriginalPriceValid(true);
    setIsDiscountRateValid(true);
    setIsQuantityValid(true);
    setIsTaxRateValid(true);
  };

  return (
    <div className="container d-flex flex-column align-items-center mt-5" style={{
      boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
      padding: "20px",
      borderRadius: "12px",
      backgroundColor: "#f1f8e9"
    }}>
      <h1 className="text-center text-success mb-4">Discount Calculator</h1>
      <div className="calculator d-flex justify-content-around p-4">
        
        {/* Left Panel - Results */}
        <div className="results p-3" style={{
            flex: 1,
            backgroundColor: "#e8f5e9",
            borderRadius: "10px",
            marginRight: "20px",
            border: "2px solid #4caf50",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
          }}>
          <h3 className="text-primary">Calculation Results</h3>
          <p>Total Discount Amount: <strong>{totalDiscount || "₹0.00"}</strong></p>
          <p>Total Tax Amount: <strong>{totalTax || "₹0.00"}</strong></p>
          <p>Final Price: <strong>{finalPrice || "₹0.00"}</strong></p>
          <Button variant="contained" color="secondary" onClick={handleReset} style={{ backgroundColor: "#e53935", color: "#fff", marginTop: "20px" }}>
            Reset
          </Button>
        </div>

        {/* Right Panel - Inputs */}
        <div className="inputs p-3" style={{
            flex: 1,
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            border: "2px solid #90caf9",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
          }}>
          <h3 className="text-secondary">Enter Details</h3>
          <form>
            <TextField
              id="originalPrice"
              name="originalPrice"
              label="Original Price (₹)"
              value={originalPrice}
              className="mb-3"
              variant="outlined"
              fullWidth
              onChange={e => handleValidation(e.target)}
              InputProps={{
                style: { borderColor: "#333333" },
              }}
            />
            {!isOriginalPriceValid && <div className="mb-2 text-danger">*Invalid Price Input</div>}
            
            <TextField
              id="discountRate"
              name="discountRate"
              label="Discount Rate (%)"
              value={discountRate}
              className="mb-3"
              variant="outlined"
              fullWidth
              onChange={e => handleValidation(e.target)}
              InputProps={{
                style: { borderColor: "#333333" },
              }}
            />
            {!isDiscountRateValid && <div className="mb-2 text-danger">*Invalid Discount Rate</div>}
            
            <TextField
              id="quantity"
              name="quantity"
              label="Quantity"
              value={quantity}
              className="mb-3"
              variant="outlined"
              fullWidth
              onChange={e => handleValidation(e.target)}
              InputProps={{
                style: { borderColor: "#333333" },
              }}
            />
            {!isQuantityValid && <div className="mb-2 text-danger">*Invalid Quantity</div>}
            
            <TextField
              id="taxRate"
              name="taxRate"
              label="Tax Rate (%)"
              value={taxRate}
              className="mb-3"
              variant="outlined"
              fullWidth
              onChange={e => handleValidation(e.target)}
              InputProps={{
                style: { borderColor: "#333333" },
              }}
            />
            {!isTaxRateValid && <div className="mb-2 text-danger">*Invalid Tax Rate</div>}

            <Button variant="contained" color="primary" onClick={handleCalculate} style={{ marginTop: "20px", transition: "transform 0.2s" }}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            >
              Calculate
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
