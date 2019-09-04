import React, { Component } from 'react';
import $ from 'jquery';
import aeroplane from '/Users/truecaller/Documents/skyscraper/src/3.png';
import ShowFlights from './showFlights';

class Details extends Component {
  constructor() {
    super();
    this.state = {
      start: '',
      end: '',
      startDate: '',
      currency: [{}],
      places: [{}],
      conversion: '',
      country: '',
      flights: {
        carriers: [{}],
        amount: '',
        places: [{}],
        quotes: [{}]
      }
    };
  }
  
  componentDidMount() {
    
    var headers = {
      'X-RapidAPI-Key': 'e64e536092mshe6ca86c6136d4f3p1fa3c9jsnc9ea106e78e6'
    };

    fetch('https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/reference/v1.0/countries/en-US',{
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache',
      headers
    })
    .then(data => data.json())
    .then(data => {
      this.setState({
        places: data.Countries
      })
    })

    fetch(
      'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/reference/v1.0/currencies',
      {
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache',
        headers
      }
    )
      .then(data => data.json())
      .then(data => {
        this.setState({
          currency: data.Currencies,
          conversion: data.Currencies[100].Code
        });
      });
    $.get(
      'http://ip-api.com/json',
      response => {
        this.setState({
          country: response.countryCode
        });
       
      },
      'jsonp'
    );
    
  }


  onSelect = e => {
    let a = document.getElementById('currencyType').value;
    console.log(a);
    this.setState({
      conversion: a
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  getFlights = e => {
    var headers = {
      'X-RapidAPI-Key': 'e64e536092mshe6ca86c6136d4f3p1fa3c9jsnc9ea106e78e6'
    };

    fetch(
      `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/${this.state.country}/${
        this.state.conversion
      }/fr-ca/${this.state.start}/${this.state.end}/${this.state.startDate}`,
      {
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache',
        headers
      }
    )
      .then(data => data.json())
      .then(data => {
        this.setState(state => {
          state.flights.carriers = data.Carriers;
          state.flights.places = data.Places;
          state.flights.quotes = data.Quotes;
          state.flights.amount = data.Currencies[0].Code;
          return state;
        });
      })
      .catch(err => alert('Please enter Correct Values') )
  };

  checkDisabled =e =>{
      if(this.state.start.length<3   || this.state.end.length<3 || this.state.startDate ==='') return true;
      return false;
  }


  render() {

    const checkFlights= (
      <div className="details">
         <div className='mt-2 row '>
           <h5 className="text-muted mt-3 ml-4 mr-2">Flights</h5>
          <img src={aeroplane} id='aeroplane' alt="rotating-aeroplane" width='60' height='60' />
          <h5 className="text-muted mt-3 ml-2">Checker</h5>
        </div>
        <div className='ml-4 '>

        <div>
            <b htmlFor='country' className='float-left'>
              Country
            </b>
            <input list="countries"
               className="form-control w-75 "
               name="country" 
               placeholder="IN"
               value={this.state.country}
               onChange={this.onChange} 
               />
            <br />
            <datalist id="countries">
            <select
              className='custom-select w-75 float-left '
              onChange={this.onSelect} 
            >
              {this.state.places.map((data, index) => {
                return (
                  <option key={index}  value={data.Code}>
                    {data.Code}
                  </option>
                );
              })}
            </select>
          </datalist>
           
          </div>
       

          <div className='form-group'>
            <b htmlFor='start' className='float-left'>
              From
            </b>
            <br />
            <input
              placeholder='DEL'
              name='start'
              className='des1 form-control w-75'
              value={this.state.start}
              onChange={this.onChange}
              maxLength="3"
            />
            

          </div>
          <div className='form-group'>
            <b htmlFor='end' className='float-left'>
              To
            </b>
            <br />
            <input
              type='text'
              placeholder='BLR'
              name='end'
              value={this.state.end}
              onChange={this.onChange}
              className='form-control w-75'
              maxLength="3"
            />
          </div>          
          <div className='form-group'>
            <b htmlFor='startDate' className='float-left'>
              Start Date
            </b>
            <input
              type='text'
              placeholder='YYYY-MM-DD'
              name='startDate'
              value={this.state.startDate}
              onChange={this.onChange}
              className='form-control w-75 date'
            />
          </div>
          <div>
            <b htmlFor='conversion' className='float-left'>
              Currency
            </b>
            <input list="currencies"
               className="form-control w-75 "
               name="conversion" 
               value={this.state.conversion}
               onChange={this.onChange} 
               />
            <br />
            <datalist id="currencies">
            <select
              className='custom-select w-75 float-left '
              id='currencyType'
              onChange={this.onSelect} 
            >
              {this.state.currency.map((data, index) => {
                return (
                  <option key={index}  value={data.Code}>
                    {data.Code}
                  </option>
                );
              })}
            </select>
          </datalist>
           
          </div>
          
          <input
            type='button'
            className='btn btn-primary btn-block w-75 '
            value='Check Flights'
            onClick={this.getFlights}
            disabled={this.checkDisabled()}
          />
        </div>
      </div>
    );

    return (
      <div className='ml-4 mt-3'>
              { this.state.flights.amount===''? checkFlights :<ShowFlights flight={this.state.flights} /> }
      </div>
    );
  }
}

export default Details;
