import React, { Component } from 'react';
import DirectFlight from '/Users/truecaller/Documents/skyscraper/src/flight.png';
import arrow from '/Users/truecaller/Documents/skyscraper/src/arrow-icon.png';


export class showFlights extends Component {


      convertCarrierIdToName=id=>{
          return this.props.flight.carriers.map(data => {
                  return data.CarrierId === id ? data.Name:null;
            })
      }
            
      render() {
            const directFlights = (
                  <img src={DirectFlight}  width="30px" height="20px" alt="flight type" />
            )
            const flightResults = (
                   this.props.flight.quotes.map((data,index)=>{
                        return(
                            <div className="card mt-4 bg-light mr-5" style={{width:'280px'}} key={index}>
                                  <div className="row">
                                        <span className="col-8"><h5>{ this.convertCarrierIdToName(data.OutboundLeg.CarrierIds[0]) }</h5></span>
                                        <span className="col-4">{data.Direct === true ? directFlights : null }</span>
                                   </div>     
                                   <div className="row ml-2 mt-2">
                                  <b className="mt-2">{`Min Price in(${this.props.flight.amount}):   ` }</b>
                                  <p className="text-muted ml-2 mt-2">{data.MinPrice}</p>
                                  </div>
                                  <div className="row ml-2 mt-2">
                                       <b>{'Departure: '}</b>
                                       <p className="text-muted ml-2">{ data.OutboundLeg.DepartureDate.slice(0,10)}</p>
                                   </div>
                                  <div className="row ml-5">
                                        <p className="mt-3 mr-4">{this.props.flight.places[0].IataCode}</p>
                                                <img src={arrow} alt="arrow icon"  />
                                        <p className="mt-3 ml-4">{this.props.flight.places[1].IataCode}</p>
                                  </div>
                            </div>                               
                        )
                  })
                  
                
            )

            return (
                  
                     <div className="row">
                        <h4 className="text-muted float-left">Flights - </h4><br/>
                        <p className="text-muted mt-1 ml-2">{this.props.flight.places[0].IataCode + '  To  ' +  this.props.flight.places[1].IataCode}</p>
                      { flightResults}
                              
                    </div>
                            
            );
      }
}

export default showFlights;
