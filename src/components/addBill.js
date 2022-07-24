import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';

export default function AddBill() {

  const navigate = useNavigate();

  const [billDate, setBillDate] = useState();
  const [paidDate, setPaidDate] = useState();
  const [unitConsumed, setUnitConsumed] = useState();
  const [amount, setAmount] = useState();
  const [error, setError]=useState("");
  const [success, setSuccess]=useState("");

  useEffect(() => {

    if(error || success){
      const timeout=setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timeout);   
    }

  },[error, success]);


  function submit(){
    fetch(process.env.REACT_APP_SERVER_URL+"addBill", {
      method: "POST",
      body: JSON.stringify({
        billDate,
        paidDate,
        unitConsumed,
        amount,
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(response => response.json())
    .then(result => {
      if(result.error){
        setError(result.error);
      }
      if(result.success){
        setSuccess(result.success);
        navigate("/");
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <div align="center">
      <Card style={{width: "60%", marginTop: "80px"}} align="left">
        {success &&
          <Alert variant="success">{success}</Alert>
        }
        {error &&
          <Alert variant="danger">{error}</Alert>
        }
        <div style={{padding: "3%"}}>
          <h3 align="center">Add New Bill Record</h3>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Bill Date</Form.Label>
            <Form.Control type="date" placeholder="Bill Date" onChange={(e)=>setBillDate(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Paid Date</Form.Label>
            <Form.Control type="date" placeholder="Paid Date" onChange={(e)=>setPaidDate(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Unit Consumed</Form.Label>
            <Form.Control type="number" placeholder="Unit Consumed" onChange={(e)=>setUnitConsumed(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Amount</Form.Label>
            <Form.Control type="number" placeholder="Amount" onChange={(e)=>setAmount(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit" style={{width:"100%"}} onClick={()=>submit()}>
            Add New Bill
          </Button>
        </div>
      </Card>
    </div>
  )
}