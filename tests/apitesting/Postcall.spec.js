import {test,expect} from 'playwright/test';

test('post call test',async({request})=>{

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
   
  const response = await request.post("https://restful-booker.herokuapp.com/booking",{headers:{"Content-Type": "application/json"},data:authdata});
  //console.log(response.status());
  
  const responseData =await response.json();
  //console.log(responseData);
  // expect (responseData.bookingid).not.toBeNull();
  // expect (responseData.firstname).toBe(responseData.firstname);
  // expect (responseData.token).not.toBeNull();
});