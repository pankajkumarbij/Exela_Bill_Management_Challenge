import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

export default function AllBills() {

  const [bills, setBills] = useState();
  const [sorting_order, setSortingOrder] = useState('ASC');
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);

  useEffect(() => {

    fetch(process.env.REACT_APP_SERVER_URL+"bills")
    .then(response => response.json())
    .then(result => {
      setBills(result);
      setNoOfPages(Math.ceil(result.length/9));
    })
    .catch(err => console.log(err));

  },[]);

  const sorting = (col)=>{
    if(sorting_order==='ASC'){
      const sorted=([...bills].sort((a,b)=>
      a[col].toLowerCase()>b[col].toLowerCase() ?1:-1));
      setBills(sorted);
      setSortingOrder('DES');
    }
    if(sorting_order==='DES'){
      const sorted=([...bills].sort((a,b)=>
      a[col].toLowerCase()<b[col].toLowerCase() ?1:-1));
      setBills(sorted);
      setSortingOrder('ASC');
    }
  }

  return (
    <div align="center">
      <Card style={{width: "80%", marginTop: "50px"}} align="left">
        <div style={{padding: "1%"}}>

          <h3 align="center">All Bill Record (<Link to="/addBill">Add Bill</Link>)</h3>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>S.N.</th>
                <th onClick={()=>sorting("billDate")} style={{cursor: 'pointer'}}><img alt="imgs" src="./sort.png" width="17" />&nbsp;Bill Date</th>
                <th onClick={()=>sorting("paidDate")} style={{cursor: 'pointer'}}><img alt="imgs" src="./sort.png" width="17" />&nbsp;Paid Date</th>
                <th onClick={()=>sorting("unitConsumed")} style={{cursor: 'pointer'}}><img alt="imgs" src="./sort.png" width="17" />&nbsp;Unit Consumed</th>
                <th onClick={()=>sorting("amount")} style={{cursor: 'pointer'}}><img alt="imgs" src="./sort.png" width="17" />&nbsp;Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bills &&
                bills.map((bill, index) => {
                if((index+1)>(9*(page-1)) && (index+1)<=(9*page)){
                  return (
                    <tr>
                      <td>{index+1}</td>
                      <td>{bill.billDate}</td>
                      <td>{bill.paidDate}</td>
                      <td>{bill.unitConsumed}</td>
                      <td>{bill.amount}</td>
                      <td><Button as={Link} to={"/bill/"+bill._id} variant="info">View</Button></td>
                    </tr>
                  )
                }
                else{
                  return null
                }})
              }
            </tbody>
          </Table>
          <div>
            <ButtonToolbar aria-label="Toolbar with button groups">
              <ButtonGroup className="me-2" aria-label="First group">
                {noOfPages && 
                  [...Array(noOfPages)].map((e, i) => (
                    <Button onClick={()=>setPage(i+1)}>{i+1}</Button>
                  ))
                }
              </ButtonGroup>
            </ButtonToolbar>
          </div>
        </div>
      </Card>
    </div>
  )
}