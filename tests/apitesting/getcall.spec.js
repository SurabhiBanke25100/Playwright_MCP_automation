import {test,expect} from 'playwright/test';

test('Get call test',async({request})=>{
  const resp = await request.get("https://restful-booker.herokuapp.com/booking");
  expect (resp.status()).toBe(200);

  const respbody = await resp.body();
    //console.log(respbody);

  const respjson = await resp.json();
  //console.log(respjson);

  const respheader = await resp.headers();
  //console.log(respheader);

  expect(resp.statusText()).toBe("OK");  
  //expect(respjson).toHaveProperty("bookingid",201);

const booking = respjson.find(b => b.bookingid === 201);
expect(booking).toBeDefined();
expect(booking).toHaveProperty("bookingid", 201);



});