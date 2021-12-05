import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../../services/cryptoNewsApi';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../../services/cryptoApi';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';
const { Text, Title } = Typography;
const { Option } = Select;
type Props = { simplified?: boolean };

const News = ({ simplified }: Props) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  if (isFetching) return <h1>Loading...</h1>;

  return (
    <>
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value: any) => setNewsCategory(value)}
              filterOption={(input, option) => option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
              {data?.data?.coins.map((coin: any) => (
                <Option value={coin.name}>{coin.name}</Option>
              ))}
            </Select>
          </Col>
        )}
        {cryptoNews.value.map((news: any, index: number) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news.name.length > 50 ? `${news.name.substring(0, 50)}...` : news.name}
                  </Title>
                  <img
                    style={{ maxWidth: '200px', maxHeight: '100px' }}
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt="Image news"
                  />
                </div>
                <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
                <div className="provider-container">
                  <div>
                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                    <Text className="provider-name">{news.provider[0]?.name}</Text>
                  </div>
                  <Text>
                    {
                      // @ts-ignore
                      moment(news.datePublished).startOf('ss').fromNow()
                    }
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
