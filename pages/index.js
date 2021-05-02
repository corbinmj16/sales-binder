import axios from 'axios';
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export async function getServerSideProps() {
  const apiKey = 'b64a42b01b4338554f8a2a48ff803f79da7ed7a3';
  // https://[apikey]:x@[subdomain].salesbinder.com/api/2.0/[method].[format]
  const res = await axios({
    method: 'GET',
    url: `https://${apiKey}:x@corbinscompany.salesbinder.com/api/2.0/items.json`,
    auth: {
      username: 'corbin.jensen@me.com',
      password: 'y8S4%^YOMhN*',
    }
  });

  const { data } = res;

  return {
    props: { data },
  }
}

export default function Home({ data }) {
  const { items } = data;
  const products = items.reduce((acc, curr) => {
    acc.push(curr[0]);
    return acc;
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Products:</h1>

        {products.map((product) => 
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <Link href={`/product/${product.name.replace(/ /g, '-')}?id=${product.item_number}`}>
              Details
            </Link>
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <p>Footer</p>
      </footer>
    </div>
  )
}
