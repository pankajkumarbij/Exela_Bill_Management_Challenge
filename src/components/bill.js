import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function ViewBill() {

  const {id} = useParams();
  const navigate = useNavigate();

  const [billDate, setBillDate] = useState();
  const [paidDate, setPaidDate] = useState();
  const [unitConsumed, setUnitConsumed] = useState();
  const [amount, setAmount] = useState();
  const [error, setError]=useState("");
  const [success, setSuccess]=useState("");
  const [flag, setFlag]=useState(true);

  useEffect(() => {

    if(id && flag){
      fetch(process.env.REACT_APP_SERVER_URL+"bill/"+id)
      .then(response => response.json())
      .then(result => {
        setBillDate(result[0].billDate);
        setPaidDate(result[0].paidDate);
        setUnitConsumed(result[0].unitConsumed);
        setAmount(result[0].amount);
        setFlag(false);
      })
      .catch(err => console.log(err));
    }

    if(error || success){
      const timeout=setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timeout);   
    }

  },[error, success, id, flag]);


  function submit(){
    fetch(process.env.REACT_APP_SERVER_URL+"deleteBill/"+id, {
      method: "DELETE",
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
          <h3 align="center">Bill Details</h3>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Bill Date</Form.Label>
            <Form.Control disabled type="date" placeholder="Bill Date" value={billDate} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Paid Date</Form.Label>
            <Form.Control disabled type="date" placeholder="Paid Date" value={paidDate} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Unit Consumed</Form.Label>
            <Form.Control disabled type="number" placeholder="Unit Consumed" value={unitConsumed} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Amount</Form.Label>
            <Form.Control disabled type="number" placeholder="Amount" value={amount} />
          </Form.Group>

          <div style={{display: 'flex'}}>
            <Button variant="danger" type="submit" style={{width:"100%"}} onClick={()=>submit()}>
              Delete Bill
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button as={Link} to={"/editBill/"+id} variant="primary" style={{width:"100%"}}>
              Edit Bill
            </Button>
          </div>

        </div>
      </Card>
    </div>
  )
}