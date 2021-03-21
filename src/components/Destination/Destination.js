import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './Destination.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons';
const Destination = () => {
    const { travelTo } = useParams();
    const [search, setSearch] = useState(false)
    const [data, setData] = useState([])
    useEffect(() => {
        const url = 'https://api.mocki.io/v1/735d5585'
        fetch(url)
            .then(res => res.json())
            .then(data => setData(data))
    }, [0])

    const searchResult = data.find(data => data.travelTo == travelTo);
    console.log(searchResult);
    const handleSearchClick = () => {
        setSearch(true)
    }
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-5">
                        <div className="form-section mt-5">
                            {travelTo ? search ? 
                            <div className="main-background">
                            <div className="destination-heading">
                                <div className="coloring-bg">
                                <h5>Cumilla</h5>
                                <h5>Dhaka</h5>
                                </div>
                            <div className="background-item">
                            <div className='flex-item'>
                                <div className="img-div">
                                <img src={searchResult.images} alt=""/>
                                </div>
                                <div className="person-div">
                                    <span><FontAwesomeIcon icon={faUser} /> </span> <span className='ml-1'> {searchResult.travelTo}   </span>
                                </div>
                                 <div className="heading-div">
                                 <strong>{searchResult.name}</strong>
                                 </div>
                                 <div className="amount">
                                     <strong> $ {searchResult.price}</strong>
                                 </div>
                            </div>
                            </div> 
                            <div className="background-item mt-3">
                            <div className='flex-item'>
                                <div className="img-div">
                                <img src={searchResult.images} alt=""/>
                                </div>
                                <div className="person-div">
                                    <span><FontAwesomeIcon icon={faUser} /> </span> <span className='ml-1'> {searchResult.travelTo}   </span>
                                </div>
                                 <div className="heading-div">
                                 <strong>{searchResult.name}</strong>
                                 </div>
                                 <div className="amount">
                                     <strong> $ {searchResult.price}</strong>
                                 </div>
                            </div>
                            </div> 
                            <div className="background-item mt-3">
                            <div className='flex-item'>
                                <div className="img-div">
                                <img src={searchResult.images} alt=""/>
                                </div>
                                <div className="person-div">
                                    <span><FontAwesomeIcon icon={faUser} /> </span> <span className='ml-1'> {searchResult.travelTo}   </span>
                                </div>
                                 <div className="heading-div">
                                 <strong>{searchResult.name}</strong>
                                 </div>
                                 <div className="amount">
                                     <strong> $ {searchResult.price}</strong>
                                 </div>
                            </div>
                            </div> 
                            </div>
                            </div>:
                                <div className='background'>
                                    <h6 className='text-light mb-4'>Find Your own Destination</h6>
                                    <form action="">
                                        <input type="text" className='form-control mt-2' placeholder='Cumilla' name="" id="" />
                                        <input type="text" className='form-control mt-3' name="" placeholder='Dhaka' id="" />
                                        <input type="submit" onClick={handleSearchClick} className='form-control mt-3' value="Search" />

                                    </form>
                                    </div> : search ? <div>
                                     <h2>hello world</h2>
                                     </div> : <div>
                                     <form action="">
                                    <input type="text" className='form-control mt-2' placeholder='Cumilla' name="" id="" />
                                    <input type="text" className='form-control mt-3' name="" placeholder='Dhaka' id="" />
                                    <input type="submit" onClick={handleSearchClick} className='form-control mt-3' value="Search" />

                                </form>
                            </div>}
                        </div>

                    </div>
                    <div className="col-lg-7 ">
                        <div className="iframe-part mt-5">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14529.920850985389!2d90.77410692216641!3d24.434119184081982!2m3!1f0!2f0!3f0!3m2!
                              1i1024!2i768!4f13.1!3m3!1m2!1s0x3756918773180af5%3A0x530a9427210ef003!2sKishoreganj!5e0!3m2!1sen!2sbd!4v1616183548045!5m2!1sen!2sbd"
                                width="500px" height="600px" loading="lazy"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Destination;