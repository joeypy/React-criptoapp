import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../../services/cryptoApi';
import { Crypto } from '../../types/models';
import { loadingAnimation } from '../../assets/';

type Props = {
  simplified?: boolean;
};

const Cryptocurrencies = ({ simplified }: Props) => {
  const count = simplified ? 10 : 100;

  // @ts-ignore
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState<Crypto[]>();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coins: Crypto) =>
      coins.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching)
    return (
      <div className="loading-animation">
        <h1>Loading...</h1>
        <img src={loadingAnimation} alt="Loading" />
      </div>
    );

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
              >
                <p>
                  <b>Price:</b> {millify(parseInt(currency.price))}
                </p>
                <p>
                  <b>Market Cap:</b> {millify(currency.marketCap)}
                </p>
                <p>
                  <b>Daily Change:</b> {millify(currency.change)}%
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
