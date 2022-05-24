import { Handler } from "@netlify/functions";
import { Any } from "faunadb";

var faunadb = require('faunadb')
var q = faunadb.query;
var clnt = new faunadb.Client({
  secret: "fnAEmyPtKIACVCfYRr_OgrKDnZoTJ0Nx_PcvYKsd",
  domain: "db.fauna.com"
});
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
		'X-RapidAPI-Key': '65ddd9a78amsh99fc5102bfb5ce8p1218f5jsn387acd7f103f'
	}
};

import fetch from "node-fetch";

const handler: Handler = async (event, context) => {
  
    let faunaRes = '';    
    return await clnt.query(
      q.Map(
      q.Paginate(
          q.Documents(q.Collection('EndpointConfig'))
      ),
      q.Lambda((x: any) => q.Get(x))
      )

    ).then(function(res: { data: any; }) {
      faunaRes = JSON.stringify(res.data);
      console.log(faunaRes +'from endpointaaadb')
      return { statusCode: 200, body: faunaRes };
    })
};

export { handler };
