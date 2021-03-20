import React from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router';
import './Cars.css'

const Cars = (props) => {
const { name, images,travelTo } = props.car
   const history = useHistory();
   const handleClick =(travelTo)=>{
       const url=`cars/${travelTo}`
       history.push(url)
   }
    return (

        <div className='display-inline'>
            <div className="container ">
                <div className="row ">
                    <div className="col-lg-3 ">
                        <div className="card-part m-3">
                            <Card   onClick={()=>handleClick(travelTo)} style={{ width: '11rem ',height:'230px',  paddingTop:'50px', background:'#DDD',
                                 position:'relative',bottom:'10px'}}>
                                <Card.Img variant="top" src={images} />
                                <Card.Body>
                                    <Card.Title>
                                        <div className="text-center">
                                            <h6>{name}</h6>
                                          </div>
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cars;