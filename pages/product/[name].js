import axios from 'axios';

export async function getServerSideProps({query}) {
  const { id } = query;
  // itemIdNumber
  const apiKey = 'b64a42b01b4338554f8a2a48ff803f79da7ed7a3';
  // https://[apikey]:x@[subdomain].salesbinder.com/api/2.0/[method].[format]
  const res = await axios({
    method: 'GET',
    url: `https://${apiKey}:x@corbinscompany.salesbinder.com/api/2.0/items.json?itemIdNumber=${id}`,
    auth: {
      username: 'corbin.jensen@me.com',
      password: 'y8S4%^YOMhN*',
    }
  });

  return {
    props: {
      product: res.data.item[0]
    }
  }
}

export default function Product({product}) {
  console.log('product: ', product);  
  return (
    <div>
      <h1>{product.name}</h1>
      <h3>{product.description}</h3>

      <p>${product.price}</p>
    </div>
  )
}