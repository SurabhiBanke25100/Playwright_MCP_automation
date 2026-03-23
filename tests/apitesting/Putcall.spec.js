import {test,expect} from 'playwright/test';

test('update call test',async({request})=>{

  const authdata ={
    "firstname" : "Jim",
    "lastname" : "Brown",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast"
  };
   
  const response = await request.post("https://restful-booker.herokuapp.com/booking",{headers:{"Content-Type": "application/json","Accept": "application/json" , "Cookie": "token=abc123"}});
  //console.log(response.status());
  
  const responseData =await response.json(); 
 
});