import { Handler } from "@netlify/functions";
import { Any } from "faunadb";
import fetch from "node-fetch";

var faunadb = require('faunadb')
var q = faunadb.query;
var clientDB = new faunadb.Client({
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

const handler: Handler = async (event, context) => {
    const API_ENDPOINT = event.queryStringParameters?.api
    console.log("API_ENDPOINT"+API_ENDPOINT)
    const response = await fetch(<any>API_ENDPOINT, options);
    let faunaRes = '';
    const data = await response.json();
    console.log("datadata"+JSON.stringify(data))
    clientDB.query(
      q.Create(
        q.Collection('StockInfo'),
        {
          data: data
        },
      )
    )
    
    return clientDB.query(
      q.Map(
      q.Paginate(
          q.Documents(q.Collection('StockInfo'))
      ),
      q.Lambda((x: any) => q.Get(x))
      )

    ).then(function(res: { data: any; }) {
      faunaRes = JSON.stringify(res.data);
      console.log(res.data +'from StockInfo')
      return { statusCode: 200, body: faunaRes };
    })
};

export { handler };
