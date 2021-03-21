import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Cars from '../Cars/Cars';
import './Home.css'
const Home = () => {
    const [riders, SetRider] = useState([])
    useEffect(() => {
        const url = 'https://api.mocki.io/v1/735d5585'
        fetch(url)
            .then(res => res.json())
            .then(data => SetRider(data))

    },[])
    return (
        <div>
            <div className="container mt-5">
                <div className="row mt-5">
                    <div className="col-lg-12 mt-5">
                              <div className="text-center mb-5 text-primary">
                                  <h1>Select Your Favourite Option And Make It Enjoyable</h1>
                              </div>
                            {
                              riders.map(rider => <Cars car={rider}></Cars>)
                             }
                      
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;